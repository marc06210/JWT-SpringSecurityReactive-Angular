#!/bin/sh


echo ">>> starting deploy.sh"

cd $TRAVIS_BUILD_DIR/mlnba-ss
docker build -t elmarco6/mlnba-ss:latest -t elmarco6/mlnba-ss:$BUILD_ID -f ./Dockerfile .
cd $TRAVIS_BUILD_DIR
ls -l
echo ">>> current dir" $PWD
docker build -t elmarco6/mlnba-client:latest -t elmarco6/mlnba-client:$BUILD_ID -f ./mlnba-client/Dockerfile ./mlnba-client
echo ">>> pushing ss latest"
docker push elmarco6/mlnba-ss:latest
echo ">>> pushing cs latest"
docker push elmarco6/mlnba-client:latest

echo ">>> pushing ss build"
docker push elmarco6/mlnba-ss:$BUILD_ID
echo ">>> pushing cs build"
docker push elmarco6/mlnba-client:$BUILD_ID

echo ">>> applying k8s dep files"
kubectl apply -f ./mlnba-deployment/k8s
kubectl set image deployments/mlnba-frontend-deployment mlnba-frontend=elmarco6/mlnba-client:$BUILD_ID
kubectl set image deployments/mlnba-backend-deployment mlnba-api=elmarco6/mlnba-ss:$BUILD_ID
