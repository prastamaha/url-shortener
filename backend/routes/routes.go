package routes

import (
	"github.com/gorilla/mux"
	"github.com/prastamaha/url-shortener/controllers"
)

func RegisterRoutes() *mux.Router {
	router := mux.NewRouter()

	// CRUD routes
	router.HandleFunc("/shorten", controllers.CreateShortURL).Methods("POST")
	router.HandleFunc("/original", controllers.GetOriginalURL).Methods("GET")
	router.HandleFunc("/update", controllers.UpdateURL).Methods("PUT")
	router.HandleFunc("/delete", controllers.DeleteURL).Methods("DELETE")
	router.HandleFunc("/urls", controllers.ListURLs).Methods("GET")

	// Redirection route
	router.HandleFunc("/{id}", controllers.RedirectToOriginalURL).Methods("GET")

	return router
}
