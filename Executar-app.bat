@echo off
cd C:\Users\Usuario\Documents\GitHub\App-Titu
start /B mvn clean spring-boot:run

cd C:\Users\Usuario\Desktop\titu\Angular\App-Titu
start /B ng serve

start /min "" http://localhost:4200