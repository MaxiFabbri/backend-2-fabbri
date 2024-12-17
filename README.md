Maximiliano Fabbri - Comision 70.280
# Backend de e-commerce - Curso Backend 2 Coderhouse 


## Capas de programacion:

### 1. Front
Tiene un pequeñisimo desarrollo en Handlebars, pero no seguí avanzando, porque tengo intenciones de en algún momento hacer un Buen Front en React y no tiene sentido seguir avanzando con este.

### 2. Ruteo
Los archivos que manejan el Ruteo, estan en ./src/routers


### 3. Controller
En ./src/controllers se encuentran los controladores. Estos manejan los req (requerimientos) y res (respuestas), dejando la conexión con la persistencia a la capa de Servicios.


### 4. Servicios
Los servicios estan en ./src/services. Estos manejan la conexión con la persistencia, en este caso Mongo.


### 5. Persistencia
Por el momento solo estoy usando de persistencia Mongo, estando los archivos ubicados en ./src/dao/mongo. 
Para los Schems, tengo la carpeta models
Para los managers hay una carpeta con ese nombre, unificando todas las funciones en el archivo manager.js, que son importadas por los otros managers segun la necesidad de cada uno.

### Middlewares
// a Definir //

### Utils
// a Definir //

### Otros:
El usuario administrador es:
admin@aaa.com
PW: abc123
