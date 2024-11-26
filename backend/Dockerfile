# Stage 1: Build
FROM golang:1.21-alpine AS build

# Set the working directory inside the builder container
WORKDIR /app

# Copy go.mod and go.sum files
COPY go.mod go.sum ./

# Download dependencies
RUN go mod download

# Copy the source code into the builder container
COPY . .

# Build the Go application
RUN go build -o main .

# Stage 2: Run
FROM alpine:3.18

# Set the working directory inside the runtime container
WORKDIR /app

# Copy the binary from the build stage
COPY --from=build /app/main .

# Expose the application port
EXPOSE 8080

# Run the compiled binary
CMD ["./main"]
