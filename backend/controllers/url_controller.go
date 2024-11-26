package controllers

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"strconv"

	"github.com/gorilla/mux"
	"github.com/prastamaha/url-shortener/models"
	"github.com/prastamaha/url-shortener/utils"
	"github.com/teris-io/shortid"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// Create Short URL
func CreateShortURL(w http.ResponseWriter, r *http.Request) {
	var url models.URL
	json.NewDecoder(r.Body).Decode(&url)

	shortID := shortid.MustGenerate()
	url.ID = shortID
	url.ShortURL = fmt.Sprintf("%s/%s", os.Getenv("APP_SHORTENER_URI"), shortID)

	collection := utils.DB.Collection("urls")
	_, err := collection.InsertOne(context.TODO(), url)
	if err != nil {
		http.Error(w, "Failed to save URL", http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(url)
}

// Retrieve URL
func GetOriginalURL(w http.ResponseWriter, r *http.Request) {
	shortID := r.URL.Query().Get("id")

	var url models.URL
	collection := utils.DB.Collection("urls")
	err := collection.FindOne(context.TODO(), bson.M{"_id": shortID}).Decode(&url)
	if err == mongo.ErrNoDocuments {
		http.Error(w, "Short URL not found", http.StatusNotFound)
		return
	}

	json.NewEncoder(w).Encode(url)
}

// Update URL
func UpdateURL(w http.ResponseWriter, r *http.Request) {
	shortID := r.URL.Query().Get("id")
	var url models.URL
	json.NewDecoder(r.Body).Decode(&url)

	update := bson.M{"$set": bson.M{"original_url": url.OriginalURL}}
	collection := utils.DB.Collection("urls")
	_, err := collection.UpdateOne(context.TODO(), bson.M{"_id": shortID}, update)
	if err != nil {
		http.Error(w, "Failed to update URL", http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(map[string]string{"message": "URL updated successfully"})
}

// Delete URL
func DeleteURL(w http.ResponseWriter, r *http.Request) {
	shortID := r.URL.Query().Get("id")

	collection := utils.DB.Collection("urls")
	result, err := collection.DeleteOne(context.TODO(), bson.M{"_id": shortID})

	if result.DeletedCount == 0 {
		http.Error(w, `{"message": "URL not found"}`, http.StatusNotFound)
		return
	}

	if err != nil {
		http.Error(w, "Failed to delete URL", http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(map[string]string{"message": "URL deleted successfully"})
}

// List URLs with Pagination
func ListURLs(w http.ResponseWriter, r *http.Request) {
	// Get query parameters for pagination
	query := r.URL.Query()
	pageStr := query.Get("page")
	limitStr := query.Get("limit")

	// Default values for page and limit
	page, err := strconv.Atoi(pageStr)
	if err != nil || page < 1 {
		page = 1
	}
	limit, err := strconv.Atoi(limitStr)
	if err != nil || limit < 1 {
		limit = 10
	}

	// Calculate skip value
	skip := (page - 1) * limit

	// MongoDB options for pagination
	findOptions := options.Find()
	findOptions.SetSkip(int64(skip))
	findOptions.SetLimit(int64(limit))

	// Query MongoDB
	var urls []models.URL
	collection := utils.DB.Collection("urls")
	cursor, err := collection.Find(context.TODO(), bson.M{}, findOptions)
	if err != nil {
		http.Error(w, "Failed to fetch URLs", http.StatusInternalServerError)
		return
	}
	defer cursor.Close(context.TODO())

	for cursor.Next(context.TODO()) {
		var url models.URL
		if err := cursor.Decode(&url); err != nil {
			http.Error(w, "Failed to decode URL", http.StatusInternalServerError)
			return
		}
		urls = append(urls, url)
	}

	if err := cursor.Err(); err != nil {
		http.Error(w, "Error while iterating through URLs", http.StatusInternalServerError)
		return
	}

	// Return URLs as JSON response
	response := map[string]interface{}{
		"page":    page,
		"limit":   limit,
		"results": urls,
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

// Redirect to Original URL
func RedirectToOriginalURL(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	id := params["id"]

	var url models.URL
	collection := utils.DB.Collection("urls")
	err := collection.FindOne(context.TODO(), bson.M{"_id": id}).Decode(&url)
	if err == mongo.ErrNoDocuments {
		http.Error(w, "Short URL not found", http.StatusNotFound)
		return
	} else if err != nil {
		http.Error(w, "Failed to retrieve URL", http.StatusInternalServerError)
		return
	}

	// Redirect to the original URL
	http.Redirect(w, r, url.OriginalURL, http.StatusFound)
}
