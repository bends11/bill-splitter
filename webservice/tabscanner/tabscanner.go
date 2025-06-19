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

const tabscannerUrl = "https://api.tabscanner.com/api"
const tabscannerVersion = "2"
const tabscannerApiKey = "xz9G0OBXUzsE5BKeN6pF0zG7KNHGtGBn87ORDLVJ19f1j98Qx0CDYaySfQ7Zx35l"

func ProcessReceipt(c *gin.Context) {
	apiUrl := fmt.Sprintf("%s/%s/process", tabscannerUrl, tabscannerVersion)

	receipt, _ := c.FormFile("receipt")

	file, err := receipt.Open()
	if err != nil {
		//TODO
		log.Fatalf("Failed to Open File: %v", err)
	}
	defer file.Close()

	body := &bytes.Buffer{}
	writer := multipart.NewWriter(body)

	part, err := writer.CreateFormFile("file", receipt.Filename)
	if err != nil {
		//TODO
		log.Fatalf("Failed to Create Form Data: %v", err)
	}

	io.Copy(part, file)
	if err != nil {
		//TODO
		log.Fatalf("Failed to Copy file: %v", err)
	}

	writer.Close()

	req, err := http.NewRequest("POST", apiUrl, body)
	if err != nil {
		//TODO
		log.Fatalf("Failed to Create Request: %v", err)
	}

	req.Header.Set("Content-Type", writer.FormDataContentType())
	req.Header.Set("apikey", tabscannerApiKey)

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		log.Fatalf("Failed to call tabscanner: %v", err)
	}
	defer resp.Body.Close()

	bodyBytes, err := io.ReadAll(resp.Body)
	if err != nil {
		log.Fatalf("Error reading response body: %v", err)
	}
	bodyString := string(bodyBytes)

	var response any

	json.Unmarshal([]byte(bodyString), &response)

	c.JSON(http.StatusCreated, response)
}

func GetResult(c *gin.Context) {
	apiUrl := fmt.Sprintf("%s/result/%s", tabscannerUrl, c.Param("token"))

	req, err := http.NewRequest("GET", apiUrl, nil)
	if err != nil {
		//TODO
		log.Fatalf("Failed to Create Request: %v", err)
	}

	req.Header.Set("apikey", tabscannerApiKey)

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		log.Fatalf("Failed to call tabscanner: %v", err)
	}
	defer resp.Body.Close()

	bodyBytes, err := io.ReadAll(resp.Body)
	if err != nil {
		log.Fatalf("Error reading response body: %v", err)
	}
	bodyString := string(bodyBytes)

	var response any

	json.Unmarshal([]byte(bodyString), &response)

	c.JSON(http.StatusCreated, response)

}
