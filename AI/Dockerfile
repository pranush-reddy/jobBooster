# ---- Stage 1: Build the JAR ----
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app

# Copy your pom and source code
COPY pom.xml .
COPY src ./src

# Build the Spring Boot application
RUN mvn -q -e -DskipTests package

# ---- Stage 2: Run the JAR ----
FROM eclipse-temurin:21-jdk-alpine
WORKDIR /app

# Copy the built jar from stage 1
COPY --from=build /app/target/*.jar app.jar

# Expose port
EXPOSE 8080

# Start app
ENTRYPOINT ["java", "-jar", "app.jar"]