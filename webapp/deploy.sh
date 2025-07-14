#!/usr/bin/bash

ng build
./connect.sh 'sudo rm -rf ~/webapp/backup/*'
./connect.sh 'sudo cp -r ~/webapp/bill-splitter ~/webapp/backup/*'
scp -i "~/.ssh/bill-splitter-ec2.pem" -r ./dist/bill-splitter ec2-user@api.bill-spliiter.com:~/webapp/
./connect.sh 'sudo rm -rf /usr/src/app/bill-splitter/*'
./connect.sh 'sudo cp -r ~/webapp/bill-splitter/ /usr/src/app'
