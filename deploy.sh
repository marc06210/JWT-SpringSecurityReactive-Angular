#!/bin/sh


echo ">>> starting deploy.sh"

cd $TRAVIS_BUILD_DIR/mlnba-ss
docker build -t marc06210/mlnba-ss:latest -t marc06210/mlnba-ss:$BUILD_ID -f ./Dockerfile .
cd $TRAVIS_BUILD_DIR
ls -l
echo ">>> current dir" $PWD
docker build -t marc06210/mlnba-client:latest -t marc06210/mlnba-client:$BUILD_ID -f ./mlnba-client/Dockerfile ./mlnba-client
echo ">>> pushing ss latest"
docker push marc06210/mlnba-ss:latest
echo ">>> pushing cs latest"
docker push marc06210/mlnba-client:latest

echo ">>> pushing ss build"
docker push marc06210/mlnba-ss:$BUILD_ID
echo ">>> pushing cs build"
docker push marc06210/mlnba-client:$BUILD_ID

echo ">>> applying k8s dep files"
kubectl apply -f ./mlnba-deployment/k8s
kubectl set image deployments/mlnba-frontend-deployment mlnba-frontend=raghav141988/mlnba-client:$BUILD_ID
kubectl set image deployments/mlnba-backend-deployment mlnba-api=marc06210/mlnba-ss:$BUILD_ID
