# Usiamo amazon corretto 21 perché il 19 non è lts
FROM maven:3.9-amazoncorretto-21 AS build
WORKDIR /app

COPY pom.xml .
COPY src ./src

RUN mvn clean package -DskipTests

RUN ls target

FROM openjdk:19-jdk-slim

WORKDIR /app

COPY --from=build /app/target/eventshub-events-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/app/app.jar"]