package models

type URL struct {
	ID          string `json:"id" bson:"_id"`
	OriginalURL string `json:"original_url" bson:"original_url"`
	ShortURL    string `json:"short_url" bson:"short_url"`
}

