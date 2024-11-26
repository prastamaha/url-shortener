package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/gorilla/handlers"
	"github.com/prastamaha/url-shortener/routes"
	"github.com/prastamaha/url-shortener/utils"
	"github.com/rs/cors"
	"github.com/subosito/gotenv"
)

func init() {
	// Load .env variables
	gotenv.Load()
}

func main() {
	// Read environment variables
	mongoURI := os.Getenv("MONGO_URI")
	mongoPort := os.Getenv("MONGO_PORT")
	mongoCollection := os.Getenv("MONGO_COLLECTION")

	appHost := os.Getenv("APP_HOST")
	appPort := os.Getenv("APP_PORT")

	// Print to verify (optional)
	fmt.Printf("MongoDB URI: %s:%s, Collection: %s\n", mongoURI, mongoPort, mongoCollection)
	fmt.Printf("App running on %s:%s\n", appHost, appPort)

	// Initialize DB connection
	utils.ConnectDBWithEnv(mongoURI, mongoPort)

	// Register routes
	router := routes.RegisterRoutes()

	// cors
	c := cors.New(cors.Options{
		AllowedOrigins:   utils.SplitAndTrimByComma(os.Getenv("CORS_ALLOWED_ORIGIN")),
		AllowedHeaders:   utils.SplitAndTrimByComma(os.Getenv("CORS_ALLOWED_HEADERS")),
		AllowedMethods:   utils.SplitAndTrimByComma(os.Getenv("CORS_ALLOWED_METHODS")),
		AllowCredentials: os.Getenv("CORS_ALLOW_CREDENTIALS") == "true",
	})
	handler := c.Handler(router)

	// logging
	handler = handlers.LoggingHandler(os.Stdout, handler)

	// Start server
	address := fmt.Sprintf("%s:%s", appHost, appPort)
	log.Printf("Server started on %s\n", address)
	log.Fatal(http.ListenAndServe(address, handler))
}
