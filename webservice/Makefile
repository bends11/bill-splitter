build:
	env GOARCH=amd64 GOOS=linux go build -ldflags="-s -w" -o bootstrap main.go && tar -a -c -f bootstrap.zip bootstrap
deploy: build
	serverless deploy --stage prod