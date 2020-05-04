to launch the backend part first run mongo

cd /Users/guerrini/tools/mongodb-osx-x86_64-3.4.9/bin
./mongod --dbpath /Users/guerrini/data


to launch the frontend (angular but not working)

cd ../mlnba-cs
ng serve --proxy-config proxy.conf.json

to launch the frontend (react)
cd react-app-test
yarn start
https://react-bootstrap.github.io/components/navbar/#navbar-brand-props

test the login
curl works
curl -v -i -X POST -d username=marc -d password=password http://localhost:8080/login

httpie (see https://devhints.io/httpie)
this one does not work
http -v POST :8080/login&username=toto Content-Type:application/x-www-form-urlencoded username=marc password=password

do not forget the --form :)
http --form -v POST :8080/login Content-Type:application/x-www-form-urlencoded username=marc password=password

working version

http POST :8080/process_login <<< '{"username": "marc","password": "password"}'

http :8080/api/me Authorization:"Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtYXJjIiwiYXV0aCI6InJvbGVfYWRtaW4iLCJleHAiOjE1ODg2ODk2MjJ9.7qa47u9tOJnh9kRB7bAK_P5zDIBba5RUB9APBg8o0UwrxIeG4_7fOpZO_FD6xktHVKr_Bjx2loD19RGwjQL6tA"



sources

https://www.infoq.com/presentations/reactive-spring-security-5-1/

https://medium.com/@ard333/authentication-and-authorization-using-jwt-on-spring-webflux-29b81f813e78
this link to disable loginPage() and httpBasic() and create a controller to make the 
authentication, then we need to create a JWT and of course validate the token afterwards

https://content.pivotal.io/springone-platform-2018/full-stack-reactive-with-react-and-spring-webflux
another link spring-webflux and react

=> example to follow first 
https://github.com/duyleduc/spring-boot-webflux-security/blob/master/src/main/java/com/l2d/tuto/springbootwebfluxsecurity/security/controller/UserJWTController.java

maybe to read about react https://jasonwatmore.com/post/2019/04/06/react-jwt-authentication-tutorial-example

this about http interceptor in react
https://stackoverflow.com/questions/31302689/react-native-http-interceptor


=> remplir un contenu à partir d'une liste
https://medium.com/maxime-heckel/asynchronous-rendering-with-react-c323cda68f41

https://www.robinwieruch.de/react-function-component





CORS



Voir la conf WebFluxConfigurationSupport.getCorsConfigurations()



debug au runtime

org.springframework.web.cors.reactive.CorsWebFilter.filter()





// init d'un programme angular

npm install -g @angular/cli

ng new my-dream-app

cd my-dream-appng serve

ng g s shared/team

ng g c team

// ajout theme angular material

ng add @angular/material

ng add @angular/cdk

// ajout services, composants

// configuration proxy

ng serve --proxy-config proxy.conf.json





------------

https://medium.com/@raghavendra.pes/deploying-angular-java-spring-boot-application-in-google-kubernetes-engine-gke-b7d96ce084b5



travis



*docker run -it -v $(pwd):/app ruby:2.3 sh*

=> $(pwd) mounted on /app

gem install launchy -v 2.4.3

gem install travis -v 1.8.8

cd /app

travis login --org

travis encrypt-file service_account.json -r marc06210/JWT-SpringSecurityReactive-Angular 

**openssl aes-256-cbc -K $encrypted_248d61edfafe_key -iv $encrypted_248d61edfafe_iv -in service_account.json.enc -out service_account.json -d**







----

build and run a docker image







----



fichiers de déploiement : répertoire 

Attention aux noms des repo docker



kubectl create secret generic mangopassword --from-literal=MANGOPASSWORD=winona77



kubectl describe ing



to have nginx working we must install it first because it is not part of gee

kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-0.32.0/deploy/static/provider/cloud/deploy.yaml



kubectl get pods

kubectl logs mlnba-backend-deployment-6b65d8d8f8-9qkgm







use mlnba

db

db.new_collection.insert({x:'1'})

db.createUser({ user: "mlnba" , pwd: "mlnba", roles: [{role:"readWrite", db: "mlnba"}]})