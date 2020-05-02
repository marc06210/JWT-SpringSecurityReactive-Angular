#!/bin/sh


echo ">>> starting deploy.sh"

cd $TRAVIS_BUILD_DIR/mlnba-ss
docker build -t marc06210/mlnba-ss:latest -t marc06210/mlnba-ss:$BUILD_ID -f ./Dockerfile .
cd $TRAVIS_BUILD_DIR
ls -l
echo $PWD
docker build -t marc06210/mlnba-client:latest -t marc06210/mlnba-client:$BUILD_ID -f ./mlnba-client/Dockerfile ./mlnba-client
docker push marc06210/mlnba-ss:latest
docker push mlnba06210/mlnba-client:latest

docker push marc06210/mlnba-ss:$BUILD_ID
docker push marc06210/mlnba-client:$BUILD_ID

kubectl apply -f ./mlnba-deployment/k8s
kubectl set image deployments/mlnba-frontend-deployment mlnba-frontend=raghav141988/mlnba-client:$BUILD_ID
kubectl set image deployments/mlnba-backend-deployment mlnba-api=marc06210/mlnba-ss:$BUILD_ID
