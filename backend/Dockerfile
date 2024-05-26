FROM amazoncorretto:21

WORKDIR /app

# Debug step to check contents
RUN ls -la /app

# Copy the packaged jar file into the container
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} app.jar

# Debug step to check the copied file
RUN ls -la /app


ENTRYPOINT ["java","-jar","/app.jar"]


# docker build -t spring-docker . - to build the image
# docker run -dp 8080:8080 spring-docker - to run the image
