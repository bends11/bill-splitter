#!/usr/bin/bash

GOOS=linux GOARCH=amd64 go build -ldflags="-s -w" -o bin/main main.go
./connect.sh 'sudo systemctl stop webservice'
scp -i "~/.ssh/bill-splitter-ec2.pem" ./bin/main ec2-user@api.bill-spliiter.com:~/webservice/
./connect.sh 'sudo systemctl start webservice'
