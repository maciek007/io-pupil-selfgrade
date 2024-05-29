FROM amazoncorretto:21

WORKDIR /app

COPY ./../../../backend/target/*.jar app.jar

ENTRYPOINT ["java","-jar","app.jar"]

# docker build -t spring-docker . - to build the image
# docker run -dp 8080:8080 spring-docker - to run the image
