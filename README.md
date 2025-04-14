# Proyecto Final: Reserva de hoteles.

# Página principal

# SIENTETE COMO EN TU HOGAR

Siéntete como en tu hogar es una plataforma de reserva de hoteles orientada para el público en general que ofrece al usuario una experiencia sencilla e intuitiva a la hora de
buscar disponibilidad de hoteles, casas, departamentos y cabañas. El objetivo es consolidar e integrar los conocimientos adquiridos a lo largo del curso del programa
Certified Tech Developer de Digital House. Se busca coordinar de manera más eficiente las tareas a fin de desarrollar los conocimientos teóricos y técnicos, pero también
para trabajar las habilidades blandas como: la comunicación, resolución de conflictos y mejora a través de feedback.

Jeffrey Leonardo Rincon Corredor
Soy Ingeniero electrónico de Bogotá, Colombia, sin conocimientos previos a la carrera certified tech developer.

-- Roles desempeñados y tareas realizadas durante los diferentes sprints:

Sprint 1 → Desarrollador Front End Tareas: Implementación template bloque categorías, Implementación template bloque listado, Implementación de template general responsive.

Sprint 2 → Testing Tareas: Diseño y ejecución de casos de prueba, implementación de test automatizados, test automatizados con Postman.

Sprint 3 → Desarrollador Back-End | Bases de datos Tareas: Endpoints de reservas en api con JPARepository, dar funcionalidad al botón de reserva en página de detalle del
producto, Implementar, creación de tablas para la base de datos.

Sprint 4 → Analista de control de calidad Tareas: Elaboración de Informe final de Testing, elaboración de Wiki del proyecto.

# Metodología de trabajo

Para la realización de la plataforma se trabajó aplicando la creación del código en react con Visual studio y en paralelo con java spring boot con intellij IDEA, definiendo 
en primer lugar el producto que se va a desarrollar.
Planificación  de cada sprint se designó ir haciendo cada sprint día tras día solucionando e investigando con videos previos y con internet de igual manera 
hasta su solución óptima, teniendo en cuenta la complejidad de este. Las áreas de trabajo determinadas fueron las siguientes:

•	Test

•	FronEnd

•	Backend y Base de Datos(H2)

Desarrollo Para garantizar que el proyecto fuera funcional se fue desarrollando el código tanto frontend como backend y su respectivo funcionamiento
con postman para así poder continuar con los siguientes sprints

# Bitácora del proyecto

El desarrollo de cada uno de los sprint fue una experiencia desafiante, enriquecedora y multifacética.  Como fortalezas se puede mencionar la versatilidad,
el aprendizaje día tras día ya que muchas veces toco hacer el código luego modificarlo luego nuevos errores luego quedaba funcional pero otra parte del código que antes
funcionaba ya no lo hacia y volver a revisar que paso mejorarlo y luego volver a probarlo hasta su completo funcionamiento un reto fue conectar el backend con el frontend
entendiendo las variables de uno y del otro para que así coincidiera todo el proyecto en conjunto sabiendo que uno iba por el puerto localhost:3000 y el otro por el
localhost:8080

# Documentación técnica del proyecto

# Tecnologías Utilizadas

# Frontend:

•	Framework: React.js

•	Editor: Visual Studio Code

o	HTML

o	CSS

o	Javascript

o	Node.js

•	Consumo de API: Axios / Fetch API

# Backend:

•	Framework: Java Spring Boot

•	IDE: IntelliJ IDEA

o	Maven

•	Base de datos: H2 Database (en memoria)

•	Seguridad: Spring Security

•	Validaciones: Java Bean Validation (Hibernate Validator)

# Testing y Verificación:

•	Postman: Para pruebas de los endpoints y verificación de respuestas del backend.

# Estructura del Proyecto

# Frontend (React)

•	Rutas principales:

o	/ → hotel-reservation

o	Assets – Imágenes predeterminadas (logo)

o	Components – admin,caracteristicas, producto, header, footer, main

o	Context – Auth context, feature context 

o	Pages – Login, registro, disponibilidad calendario 

o	Routes – rutas privadas 

o	Services – todo lo del servicio del proyecto (ProductService, reservationService …)

o	Styles – todo lo de la parte de CSS del proyecto

o	App.js – las rutas del proyecto redireccionamientos

•	Funcionalidades clave:

o	Visualización de imágenes de los hoteles 

o	Registro e inicio de sesión

o	Reservación con selección de fechas

o	Panel administrativo con gestión de productos, usuarios, categorías y características

# Backend (Spring Boot)

•	Paquetes principales:

o	Configuration - Configuración de seguridad y autenticación

o	Controller → Controladores REST  

o	Service → Lógica de negocio

o	Repository → Acceso a datos

o	Model → Entidades

o	DTO → Clases para transferencia de datos

o	Uploads → Donde se guardan las imágenes de hoteles habitaciones 

•	Funcionalidades clave:

o	CRUD de hoteles (productos)

o	Registro e inicio de sesión de usuarios

o	Control de roles y permisos (admin / user)

o	Manejo de reservas y disponibilidad

o	Subida de imágenes y asociación con productos

# Comunicación Frontend ↔ Backend

•	El frontend se comunica con el backend a través de peticiones HTTP REST (usando Axios o Fetch).

•	Las respuestas son en formato JSON.

•	Autenticación basada en tokens JWT.

# Endpoints Principales (verificados en Postman)

•	POST /api/categorias → Registro de categorias

•	POST /api/productos→ Listado de hoteles

JSON  product - text - {"productName": "Hotel paraiso", "description": "Un hotel en el paraiso especial", "categoryId" : 2, "random": false}
(random true si aparece en productos aleatorios false si aparece como un producto por el usuario y no como aleatorio 
Images - file (la imagen que esta guardada en la carpeta uploads)

•	POST /api/auth/registrar→ Registro de usuarios

•	POST /api/features→ Crear nueva caracteristica (solo admin)

•	GET /api/reservaciones/create→ Realizar una reserva 
Raw - JSON   {
                       "user": { "id": 3 },
                       "product": { "id": 2 },
                       "startDate": "2025-05-01",
                      "endDate": "2025-05-05"
                      }
                      
•	POST /api/favorites/1/1→Para tener  un producto como favorito

•	GET /api/reservaciones/unavailable-dates/{id}→ Fechas ocupadas para un producto


 # Seguridad
 
•	Rutas públicas: Registro, login, visualización de hoteles

•	Rutas protegidas: Administración, creación/edición de productos, asignación de roles

•	Solo los usuarios con rol ADMIN pueden acceder al panel administrativo y realizar modificaciones críticas

# Base de datos 
H2 es una base de datos relacional escrita en Java, liviana y muy utilizada en proyectos de desarrollo, especialmente en pruebas y entornos de desarrollo.  
In-memory (en memoria): Se guarda en la RAM, lo que la hace muy rápida, pero se borra al reiniciar la aplicación (ideal para pruebas).
Standalone o embebida: Puede funcionar como un servidor o directamente integrada en la app. Fácil de usar: No requiere configuración complicada. 
Compatible con JDBC: Funciona muy bien con Spring Boot. Consola web incluida: Se puede acceder a una consola visual para consultar datos (http://localhost:8080/h2-console).

# Configuraciones previas en el backend application.properties

spring.application.name=HReservation 

# Habilitar la consola de H2

spring.h2.console.enabled=true

spring.h2.console.path=/h2-console

spring.web.resources.static-locations=file:uploads/

# Configurar la base de datos H2 en modo en memoria

spring.datasource.url=jdbc:h2:mem:testdb

spring.datasource.driverClassName=org.h2.Driver

spring.datasource.username=sa

spring.datasource.password=sa

spring.datasource.platform=h2

spring.datasource.hikari.maximum-pool-size=5

logging.level.org.hibernate.SQL=DEBUG

logging.level.org.hibernate.type.descriptor.sql=TRACE


# Configuración de JPA

spring.jpa.database-platform=org.hibernate.dialect.H2Dialect

spring.jpa.hibernate.ddl-auto=update

spring.jpa.show-sql=true

spring.servlet.multipart.enabled=true

spring.servlet.multipart.max-file-size=10MB

spring.servlet.multipart.max-request-size=20MB

logging.level.io.jsonwebtoken=DEBUG

logging.level.org.springframework.security=DEBUG
