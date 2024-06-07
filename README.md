# Pokémon API

Esta es una API para interactuar con la PokeAPI y almacenar datos de Pokémon en una base de datos MongoDB. Implementa varias funcionalidades adicionales como caché y eliminación por tipo de Pokémon.

## Requisitos

- Node.js
- Docker y Docker Compose
- MongoDB (previamente configurado de forma local)
- Redis (se necesita licencia)

## Instalación

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/armju/addv.git
   cd addv

## Observabilidad

### Logging

Esta aplicación usa `morgan` para el logging de solicitudes HTTP.

### Monitoreo

Para el monitoreo de la aplicación, se pueden utilizar herramientas como:

Notas:

- **Prometheus y Grafana**: Para la recolección de métricas y visualización.
- **ELK Stack (Elasticsearch, Logstash, Kibana)**: Para el análisis y visualización de logs.

-**Instalar Dependencias**
Instala las dependencias necesarias utilizando npm:

npm install

-**Configurar Variables de Entorno**

MONGO_URI=mongodb://localhost:27017/pokemon
PORT=3000
REDIS_URI=redis://localhost:6379

-**Asegúrate de que MongoDB esté corriendo en tu máquina local**

Inicia la aplicación

npm start

-**Construir y Correr los Contenedores**

docker-compose up --build

Uso
Endpoints

POST /api/pokemon/:name: Añadir un Pokémon por nombre.

DELETE /api/pokemon/id/:id: Eliminar un Pokémon por ID.

DELETE /api/pokemon/name/:name: Eliminar un Pokémon por nombre.

DELETE /api/pokemon/type/:type: Eliminar Pokémon por tipo.

GET /api/pokemons: Listar todos los Pokémon guardados.

-**Pruebas Unitarias**

npm test