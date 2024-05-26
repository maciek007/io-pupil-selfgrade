FROM amazoncorretto:21

WORKDIR /app

COPY . .

RUN ls -al ./backend

ENTRYPOINT ["java","-jar","app.jar"]


# docker build -t spring-docker . - to build the image
# docker run -dp 8080:8080 spring-docker - to run the image
