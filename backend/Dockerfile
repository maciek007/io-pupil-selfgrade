FROM amazoncorretto:21
VOLUME /tmp
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar", "-Dserver.port=9000","/app.jar"]


# docker build -t spring-docker . - to build the image
# docker run -dp 9000:9000 spring-docker - to run the image