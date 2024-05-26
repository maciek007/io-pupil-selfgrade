FROM amazoncorretto:21
VOLUME /tmp

RUN ls /

ARG JAR_FILE=/home/runner/work/io/io/backend/target/backend-0.0.1-SNAPSHOT.jar.original
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","/app.jar"]


# docker build -t spring-docker . - to build the image
# docker run -dp 8080:8080 spring-docker - to run the image
