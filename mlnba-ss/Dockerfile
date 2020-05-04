FROM openjdk:8-jdk-alpine
VOLUME /tmp
# ARG JAR_FILE

COPY ./target/MlnbaBackend-1.0.0-SNAPSHOT.jar app.jar
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-Dspring.profiles.active=dev","-jar","/app.jar"]
