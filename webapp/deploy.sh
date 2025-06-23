#!/usr/bin/bash

project=bill-splitter
bucket="s3://$project.sweeney-project.com"
backup=backup
exclusions="--exclude=$backup/* --exclude=$project/*"

ng build
aws s3 rm "$bucket/$backup" --recursive
aws s3 cp $bucket "$bucket/$backup" --recursive $exclusions
aws s3 cp ./dist/ $bucket --recursive
aws s3 rm $bucket --recursive $exclusions
aws s3 cp "$bucket/$project" $bucket --recursive
aws s3 rm "$bucket/$project" --recursive

aws amplify start-deployment --app-id d1imr70vv1ry63 --branch-name master --source-url $bucket --source-url-type BUCKET_PREFIX
