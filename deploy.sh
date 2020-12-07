#!/bin/sh

cd $TRAVIS_BUILD_DIR/mlnba-ss
docker build -t elmarco6/mlnba-ss:latest -t elmarco6/mlnba-ss:$BUILD_ID -f ./Dockerfile .
cd $TRAVIS_BUILD_DIR
ls -l

docker build -t elmarco6/mlnba-client:latest -t elmarco6/mlnba-client:$BUILD_ID -f ./mlnba-client/Dockerfile ./mlnba-client

docker push elmarco6/mlnba-ss:latest

docker push elmarco6/mlnba-client:latest

docker push elmarco6/mlnba-ss:$BUILD_ID

docker push elmarco6/mlnba-client:$BUILD_ID

kubectl apply -f ./mlnba-deployment/k8s
kubectl set image deployments/mlnba-frontend-deployment mlnba-frontend=elmarco6/mlnba-client:$BUILD_ID
kubectl set image deployments/mlnba-backend-deployment mlnba-api=elmarco6/mlnba-ss:$BUILD_ID
