package main

import (
	"flag"
	"log"
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"

	"bill-splitter-webservice/tabscanner"
)

func main() {
	local := initFlags()
	runGinServer(*local)
}

func initFlags() *bool {
	tabscannerUrl := flag.String("tabscannerUrl", "", "the base url or tabscanner")
	tabscannerVersion := flag.String("tabscannerVersion", "", "the version of tabscanner to use")
	tabscannerApiKey := flag.String("tabscannerApiKey", "", "the tabscanner api key")
	local := flag.Bool("local", false, "indicates if being run in a local environment")
	flag.Parse()

	if *tabscannerUrl == "" {
		log.Fatal("tabscanner url not provided")
	}

	if *tabscannerVersion == "" {
		log.Fatal("tabscanner version not provided")
	}

	if *tabscannerApiKey == "" {
		log.Fatal("tabscanner api key not provided")
	}

	tabscanner.InitTabscannerApi(*tabscannerUrl, *tabscannerVersion, *tabscannerApiKey)

	return local
}

func runGinServer(local bool) {
	r := gin.Default()
	if local {
		r.Use(cors.Default())
	}
	r.GET("/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "pong",
		})
	})
	r.POST("/tabscanner/process", tabscanner.ProcessReceipt)
	r.GET("/tabscanner/result/:token", tabscanner.GetResult)
	r.Run() // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
}
