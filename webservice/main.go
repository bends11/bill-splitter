package main

import (
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"

	"bill-splitter-webservice/tabscanner"
)

func main() {
	r := gin.Default()
	r.Use(cors.Default())
	r.GET("/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "pong",
		})
	})
	r.POST("/tabscanner/process", tabscanner.ProcessReceipt)
	r.GET("/tabscanner/result/:token", tabscanner.GetResult)
	r.Run() // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
}
