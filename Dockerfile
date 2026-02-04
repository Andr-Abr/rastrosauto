# ============================================
# Dockerfile para Spring Boot + PostgreSQL
# ============================================

# Imagen base: Java 21
FROM eclipse-temurin:21-jdk-alpine

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar el JAR compilado
COPY src/springbootfsa-0.0.1-SNAPSHOT.jar app.jar

# Puerto que expone la aplicación
EXPOSE 8080

# Comando para ejecutar la app
ENTRYPOINT ["java", "-jar", "app.jar"]