FROM amazoncorretto:21

WORKDIR /app

ARG JAR_FILE=../staging/*.jar
COPY ${JAR_FILE} app.jar

ENTRYPOINT ["java","-jar","/app.jar"]


# docker build -t spring-docker . - to build the image
# docker run -dp 8080:8080 spring-docker - to run the image
