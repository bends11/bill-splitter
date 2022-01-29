#!/usr/bin/bash

aws s3 rm s3://bill-splitter.sweeney-project.com/backup --recursive
aws s3 cp s3://bill-splitter.sweeney-project.com s3://bill-splitter.sweeney-project.com/backup --recursive --exclude="backup/*" --exclude="bill-splitter/*"
aws s3 cp ./dist/ s3://bill-splitter.sweeney-project.com/ --recursive
aws s3 rm s3://bill-splitter.sweeney-project.com --recursive --exclude="backup/*" --exclude="bill-splitter/*"
aws s3 cp s3://bill-splitter.sweeney-project.com/bill-splitter s3://bill-splitter.sweeney-project.com --recursive
aws s3 rm s3://bill-splitter.sweeney-project.com/bill-splitter --recursive