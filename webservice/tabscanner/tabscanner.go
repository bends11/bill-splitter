package tabscanner

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"mime/multipart"
	"net/http"

	"github.com/gin-gonic/gin"
)

type tabscannerApi struct {
	url     string
	version string
	key     string
}

func newTabscannerApi(url string, version string, key string) *tabscannerApi {
	return &tabscannerApi{
		url:     url,
		version: version,
		key:     key,
	}
}

func (api tabscannerApi) getResultUrl(token string) string {
	return fmt.Sprintf("%s/result/%s", api.url, token)
}

func (api tabscannerApi) getProcessUrl() string {
	return fmt.Sprintf("%s/%s/process", api.url, api.version)
}

var api tabscannerApi

func InitTabscannerApi(url string, version string, key string) {
	api = *newTabscannerApi(url, version, key)
}

func ProcessReceipt(gctx *gin.Context) {
	file, fileName, err := getFormFile(gctx, "receipt")

	if file == nil {
		abort(gctx, fmt.Sprintf("Failed to get file from form or File is empty: %v", err))
	}
	defer file.Close()

	if err != nil {
		abort(gctx, fmt.Sprintf("Failed to get file from form: %v", err))
	}

	body, contentType, err := createFileBody("file", file, fileName)
	if err != nil {
		abort(gctx, fmt.Sprintf("Failed to create form body: %v", err))
	}

	response, err := post(api.getProcessUrl(), body, contentType)

	if err != nil {
		abort(gctx, fmt.Sprintf("Failed get response: %v", err))
	}

	gctx.JSON(http.StatusCreated, response)
}

func GetResult(gctx *gin.Context) {
	response, err := get(api.getResultUrl(gctx.Param("token")))

	if err != nil {
		abort(gctx, fmt.Sprintf("Failed get response: %v", err))
	}

	gctx.JSON(http.StatusCreated, response)

}

func abort(gctx *gin.Context, errorMessage string) {
	log.Print(errorMessage)
	gctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": errorMessage})
}

func getFormFile(gctx *gin.Context, formFieldName string) (multipart.File, string, error) {
	fileHeder, err := gctx.FormFile(formFieldName)
	if err != nil {
		return nil, "", err
	}

	file, err := fileHeder.Open()
	if err != nil {
		return nil, "", err
	}

	return file, fileHeder.Filename, nil
}

func createFileBody(formFieldName string, file multipart.File, fileName string) (*bytes.Buffer, string, error) {
	body := &bytes.Buffer{}
	writer := multipart.NewWriter(body)
	defer writer.Close()

	part, err := writer.CreateFormFile(formFieldName, fileName)
	if err != nil {
		return nil, "", err
	}

	_, err = io.Copy(part, file)
	if err != nil {
		return nil, "", err
	}

	return body, writer.FormDataContentType(), nil
}

func post(apiUrl string, body *bytes.Buffer, contentType string) (any, error) {
	req, err := http.NewRequest("POST", apiUrl, body)
	if err != nil {
		return nil, err
	}

	req.Header.Set("Content-Type", contentType)
	req.Header.Set("apikey", api.key)

	return doHttpRequest(req)
}

func get(apiUrl string) (any, error) {
	req, err := http.NewRequest("GET", apiUrl, nil)
	if err != nil {
		return nil, err
	}

	req.Header.Set("apikey", api.key)

	return doHttpRequest(req)
}

func doHttpRequest(req *http.Request) (any, error) {
	client := &http.Client{}
	resp, err := client.Do(req)

	if resp == nil || resp.Body == nil {
		return nil, fmt.Errorf("could not get response from api")
	}
	defer resp.Body.Close()

	if err != nil {
		return nil, err
	}

	bodyBytes, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}
	bodyString := string(bodyBytes)

	var response any

	err = json.Unmarshal([]byte(bodyString), &response)
	if err != nil {
		return nil, err
	}

	return response, nil
}
