Maximiliano Fabbri - Comision 70.280
# Backend de e-commerce - Curso Backend 2 Coderhouse 

## Capas de programacion:

### 1. Front
Tiene un pequeñisimo desarrollo en Handlebars, pero no seguí avanzando, porque tengo intenciones de en algún momento hacer un Buen Front en React y no tiene sentido seguir avanzando con este.

### 2. Ruteo
Los archivos que manejan el Ruteo, estan en ./src/routers
#### 2.1 ./api/sessions
- register(POST):
```javascript
body
{
    "name": "ikigraf",
    "email": "mfabbri@ikigraf.com.ar",
    "role": "USER",
    "password": "abc123"
}
```
Luego de registrarse, se recibe un verifyCode por mail y se puede verificar en la siguiente ruta:
- verify(POST):
```javascript
body
{
    "email": "mfabbri@ikigraf.com.ar",
    "verifyCode": "cfac62ee257b95c56aa994a3"
}
```
- login(POST):
```javascript
body
{
    "email": "mfabbri@ikigraf.com.ar",
    "password": "abc123"
}
```
- reset(POST):
```javascript
body
{
    "email": "mfabbri@ikigraf.com.ar",
}
```
- online(POST) (sin body) responde si el usuario esta logueado en base a token guardado en la cookie
- signout(POST) (sin body) desloguea y destruye la cookie con el token

#### 2.2 ./api/users
con permisos de Administrador (usuario admin@aaa.com pw: abc123):
- "/"(GET) lista los usuarios
- "/"(POST) permite crear un usuario
con permisos de Usuario o de Administrador:
- "/:id"(PUT) permite modificar el usuario
- "/:id"(DELETE) borra el usuario 

#### 2.3 ./api/products
- "/:id?"(GET) sin usuario muestra el detalle del producto
con credenciales de Administrador
- "/"(POST) crea un producto
- "/:id"(PUT) actualiza el producto
- "/:id"(DELETE) borra el producto

#### 2.4 ./api/carts
- con permisos de Usuario
    - "/"(POST) crea el cart si no hay uno en estado "reserved" para ese usuario, no permite enviar productos por Body
    - "/addProduct/:cartId/:productId/:quantity"(PUT)<br>
    agrega productos (de a uno) al cart o actualiza la cantidad, revisando el Stock y actualizandolo
    - "/removeProduct/:cartId/:productId/:quantity"(PUT)<br>
    quita productos (de a uno) del cart o actualiza la cantidad, revisando el Stock y actualizandolo<br>
- con permiso de ADMIN o USER<br>
    - "/:id"(PUT) permite actualizar el cart completo (no le veo mucha funcionalidad, salvo para cambiar el status)
    - "/:id"(DELETE) permite borrar el cart completo
    - "/:user_id"(GET) muestra todos los carts, en todos los estados del usuario

### 3. Controller
En ./src/controllers se encuentran los controladores. Estos manejan los req (requerimientos) y res (respuestas), dejando la conexión con la persistencia a la capa de Servicios.

### 4. Servicios
Los servicios estan en ./src/services. Estos manejan la conexión con la persistencia, en este caso Mongo.


### 5. Persistencia
Por el momento solo estoy usando de persistencia Mongo, estando los archivos ubicados en ./src/dao/mongo. 
Para los Schems, tengo la carpeta models
Para los managers hay una carpeta con ese nombre, unificando todas las funciones en el archivo manager.js, que son importadas por los otros managers segun la necesidad de cada uno.

## Middlewares
En esta carpeta unifico todos los Middlewares

## Utils
En esta carpeta unifico las funciones de utilidad

## Otros:
El usuario administrador es:
admin@aaa.com
PW: abc123
