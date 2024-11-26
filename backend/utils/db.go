package utils

import (
	"context"
	"fmt"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var DB *mongo.Database

func ConnectDBWithEnv(uri string, port string) {
	connectionString := fmt.Sprintf("mongodb://%s:%s", uri, port)

	client, err := mongo.NewClient(options.Client().ApplyURI(connectionString))
	if err != nil {
		panic(err)
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	err = client.Connect(ctx)
	if err != nil {
		panic(err)
	}

	// Use collection from the environment
	collectionName := "urls" // default collection name, replaceable by environment variable
	DB = client.Database(collectionName)
}
