# Sistema JWT para EcoRuta Backend

## Descripción
El sistema de autenticación ha sido migrado de **Sessions** a **JWT (JSON Web Tokens)** para mejorar la escalabilidad y permitir autenticación sin estado.

## Cambios Principales

### 1. Servicio JWT
- **Archivo**: `app/services/jwt_service.ts`
- **Funciones**:
  - `generateToken(user)`: Genera un token JWT para el usuario
  - `verifyToken(token)`: Verifica y decodifica un token JWT
  - `extractTokenFromHeader(authHeader)`: Extrae el token del header Authorization

### 2. Middleware JWT
- **Archivo**: `app/middleware/jwt_auth_middleware.ts`
- **Propósito**: Valida el token JWT en cada solicitud protegida
- **Uso**: Se ejecuta automáticamente en rutas protegidas

### 3. Controlador de Autenticación Actualizado
- **Archivo**: `app/controllers/AuthController.ts`
- **Cambios**:
  - `login()`: Retorna un token JWT en lugar de crear una sesión
  - `register()`: Retorna un token JWT después del registro
  - `logout()`: Solo retorna un mensaje (el cliente debe eliminar el token)
  - `me()`: Usa el usuario del contexto JWT
  - `changePassword()`: Usa el usuario del contexto JWT

## Uso del API

### Autenticación

#### 1. Registro
```bash
POST /auth/register
Content-Type: application/json

{
  "nombre": "Juan Pérez",
  "email": "juan@ejemplo.com",
  "password": "mi-password"
}
```

**Respuesta:**
```json
{
  "message": "Usuario registrado exitosamente",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "nombre": "Juan Pérez",
    "email": "juan@ejemplo.com",
    "puntos": 0,
    "es_admin": false
  }
}
```

#### 2. Inicio de Sesión
```bash
POST /auth/login
Content-Type: application/json

{
  "email": "juan@ejemplo.com",
  "password": "mi-password"
}
```

**Respuesta:**
```json
{
  "message": "Login exitoso",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "nombre": "Juan Pérez",
    "email": "juan@ejemplo.com",
    "puntos": 0,
    "es_admin": false
  }
}
```

#### 3. Cerrar Sesión
```bash
POST /auth/logout
```

**Respuesta:**
```json
{
  "message": "Logout exitoso. Elimina el token del cliente."
}
```

### Rutas Protegidas

Para acceder a rutas protegidas, debes incluir el token JWT en el header `Authorization`:

```bash
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### Ejemplos:

1. **Obtener información del usuario actual:**
```bash
GET /auth/me
Authorization: Bearer tu-token-jwt
```

2. **Cambiar contraseña:**
```bash
PUT /auth/change-password
Authorization: Bearer tu-token-jwt
Content-Type: application/json

{
  "password": "nueva-password"
}
```

3. **Historial de viajes:**
```bash
GET /trip-histories
Authorization: Bearer tu-token-jwt
```

```bash
POST /trip-histories
Authorization: Bearer tu-token-jwt
Content-Type: application/json

{
  "ruta_id": 1,
  "modo": "bicicleta",
  "iniciado_en": "2024-01-15T10:00:00Z",
  "terminado_en": "2024-01-15T10:30:00Z",
  "distancia_m": 5000,
  "co2_ahorrado_g": 1200
}
```

## Configuración del Entorno

Asegúrate de que el archivo `.env` contenga la clave secreta:

```env
APP_KEY=tu-clave-secreta-muy-larga-y-segura
```

## Rutas Actualizadas

### Rutas Públicas (sin autenticación):
- `POST /auth/login`
- `POST /auth/register`
- `POST /auth/logout`
- `GET /routes` (obtener rutas)
- `GET /routes/:id` (obtener ruta específica)
- `POST /users` (crear usuario)
- `GET /users` (listar usuarios)

### Rutas Protegidas (requieren JWT):
- `GET /auth/me`
- `PUT /auth/change-password`
- `GET /trip-histories`
- `POST /trip-histories`
- `GET /trip-histories/:id`
- `PUT /trip-histories/:id`
- `DELETE /trip-histories/:id`

## Manejo de Errores

### Token Faltante o Inválido:
```json
{
  "message": "Token de acceso requerido"
}
```

```json
{
  "message": "Token inválido o expirado"
}
```

### Usuario No Encontrado:
```json
{
  "message": "Usuario no encontrado"
}
```

## Consideraciones de Seguridad

1. **Expiración**: Los tokens expiran en 24 horas por defecto
2. **Clave Secreta**: Usa una clave secreta larga y segura en producción
3. **HTTPS**: Siempre usa HTTPS en producción para proteger los tokens
4. **Almacenamiento**: En el cliente, almacena los tokens de forma segura (no en localStorage para datos sensibles)

## Testing

Para probar la API con herramientas como Postman o curl:

1. **Registrate o inicia sesión** para obtener un token
2. **Copia el token** de la respuesta
3. **Incluye el token** en el header `Authorization: Bearer [token]` para rutas protegidas

Ejemplo con curl:
```bash
curl -X GET http://localhost:3333/auth/me \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```
