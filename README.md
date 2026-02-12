# 🚗 RastrosAuto

Sistema de búsqueda y gestión de vehículos con más de 45,000 registros de especificaciones técnicas.

<div align="center">
  
  [![Live Demo](https://img.shields.io/badge/demo-live-success?style=for-the-badge)](https://rastrosauto.onrender.com)
  [![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)](LICENSE)
  
</div>

---

## 🌐 Demo
https://rastrosauto.onrender.com

---

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Stack Tecnológico](#️-stack-tecnológico)
- [Capturas de Pantalla](#-capturas-de-pantalla)
- [Instalación Local](#-instalación-local)
- [Despliegue](#-despliegue)

---

## ✨ Características

- 🔍 **Búsqueda avanzada** con múltiples filtros (marca, modelo, año, consumo, tipo de combustible, tracción, carrocería)
- 📊 **Comparador de vehículos** lado a lado
- 👤 **Sistema de autenticación** con registro y login
- ⭐ **Favoritos** personalizados por usuario
- 📝 **Historial de búsquedas**
- 📱 **Diseño responsive** (desktop, tablet, mobile)
- 🎨 **Componentes Angular** integrados con Thymeleaf
- 🐳 **Totalmente dockerizado**

---

## 🛠️ Stack Tecnológico

### Backend
- **Java 21** con **Spring Boot 3.3.7**
  - Spring Data JPA
  - Spring Security
  - Thymeleaf
- **PostgreSQL 15** (base de datos)
- **Maven** (gestión de dependencias)

### Frontend
- **Angular 21** (componentes interactivos)
- **Thymeleaf** (renderizado servidor)
- **Bootstrap 5** + CSS personalizado
- **JavaScript vanilla**

### DevOps
- **Docker** + **Docker Compose**
- **GitHub Actions** (CI/CD)
- **Render** (hosting backend)
- **Supabase** (base de datos en nube)
- **UptimeRobot** (monitoring 24/7)

---

## 📸 Capturas de Pantalla

### Página Principal
<img width="1889" height="1111" alt="01-home" src="https://github.com/user-attachments/assets/c6c9f0fd-35cd-4a47-bc6b-4da1fe2929a6" />

### Búsqueda Avanzada
<img width="1889" height="1430" alt="02-busqueda-avanzada" src="https://github.com/user-attachments/assets/65a73cfc-dd2f-4377-a37d-346c644f931f" />

### Resultados
<img width="1889" height="3847" alt="03-resultados" src="https://github.com/user-attachments/assets/d5bba9cb-ba07-4667-8487-e6bea8ead5aa" />

### Comparador
<img width="1889" height="2189" alt="04-comparador" src="https://github.com/user-attachments/assets/a630a31b-4aec-4e09-b57e-0c9f377302e9" />

### Cuenta
<img width="1889" height="1124" alt="05-cuenta" src="https://github.com/user-attachments/assets/52dcd36c-fc0e-402f-be6b-835191c823c7" />

---

## 💻 Instalación Local

### Prerrequisitos

- Java 21+
- Docker Desktop
- Git

### Pasos

1. **Clonar repositorio**
```bash
git clone https://github.com/Andr-Abr/rastrosauto.git
cd rastrosauto
```

2. **Levantar servicios con Docker**
```bash
docker-compose up -d
```

3. **Acceder a la aplicación**
```
http://localhost:8080
```

4. **Importar datos SQL** (si la BD está vacía)
```bash
docker cp mydb_postgres.sql rastrosauto-db:/tmp/
docker exec -it rastrosauto-db psql -U postgres -d mydb -f /tmp/mydb_postgres.sql
```

---

## 🚀 Despliegue

### Producción (Render + Supabase)

La aplicación está desplegada en:
- **Backend:** [Render](https://rastrosauto.onrender.com)
- **Base de datos:** [Supabase](https://supabase.com)
- **Monitoring:** UptimeRobot (ping cada 14 min)

---

## 📊 Base de Datos

### Esquema

- **vehiculos** (45,184 registros)
  - Marcas: 50+
  - Modelos: 2,000+
  
- **cuenta** (usuarios)
- **favoritos**
- **historial**

---

## 📧 Contacto

- GitHub: [@Andr-Abr](https://github.com/Andr-Abr)
- Email: 1218236@gmail.com
---

<div align="center">  
</div>
