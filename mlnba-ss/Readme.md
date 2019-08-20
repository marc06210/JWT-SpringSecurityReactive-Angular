to launch the backend part first run mongo

cd /Users/guerrini/tools/mongodb-osx-x86_64-3.4.9/bin
./mongod --dbpath /Users/guerrini/data


to launch the frontend

cd ../mlnba-cs
ng serve --proxy-config proxy.conf.json


test the login
curl works
curl -v -i -X POST -d username=marc -d password=password http://localhost:8080/login

httpie (see https://devhints.io/httpie)
this one does not work
http -v POST :8080/login&username=toto Content-Type:application/x-www-form-urlencoded username=marc password=password

do not forget the --form :)
http --form -v POST :8080/login Content-Type:application/x-www-form-urlencoded username=marc password=password

sources

https://www.infoq.com/presentations/reactive-spring-security-5-1/

https://medium.com/@ard333/authentication-and-authorization-using-jwt-on-spring-webflux-29b81f813e78
this link to disable loginPage() and httpBasic() and create a controller to make the 
authentication, then we need to create a JWT and of course validate the token afterwards

https://content.pivotal.io/springone-platform-2018/full-stack-reactive-with-react-and-spring-webflux
another link spring-webflux and react