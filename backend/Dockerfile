FROM maven:3.8.8-eclipse-temurin-21-alpine as builder
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src/ ./src/
RUN mvn clean package -DskipTests=true

FROM amazoncorretto:21 as prod
RUN mkdir /app
COPY --from=builder /app/target/*.jar /app/app.jar
WORKDIR /app
ENTRYPOINT ["java","-jar","app.jar"]


# docker build -t spring-docker . - to build the image
# docker run -dp 8080:8080 spring-docker - to run the image
