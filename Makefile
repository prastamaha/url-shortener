# Default version if not provided
VERSION ?= latest

build-and-push-backend:
	@echo "Building and pushing backend with tag: $(VERSION)"
	cd backend && \
	docker build --platform="linux/amd64" -t prasta/url-shortener-backend:$(VERSION) . && \
	docker push prasta/url-shortener-backend:$(VERSION)

build-and-push-frontend:
	@echo "Building and pushing backend with tag: $(VERSION)"
	cd frontend && \
	docker build --platform="linux/amd64" -t prasta/url-shortener-frontend:$(VERSION) . && \
	docker push prasta/url-shortener-frontend:$(VERSION)
