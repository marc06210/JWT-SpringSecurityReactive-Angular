to launch the backend part first run mongo

cd /Users/guerrini/tools/mongodb-osx-x86_64-3.4.9/bin
./mongod --dbpath /Users/guerrini/data


to launch the frontend

cd /Users/guerrini/Documents/_perso/basket/mlnba/mlnba-v2
ng serve --proxy-config proxy.conf.json


test the login
curl works
curl -v -i -X POST -d username=marc -d password=password http://localhost:8080/login

httpie (see https://devhints.io/httpie)
this one does not work
http -v POST :8080/login&username=toto Content-Type:application/x-www-form-urlencoded username=marc password=password

do not forget the --form :)
http --form -v POST :8080/login Content-Type:application/x-www-form-urlencoded username=marc password=password