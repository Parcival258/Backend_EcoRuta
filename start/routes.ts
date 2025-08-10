/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

router.get('/', async () => {
  return {
    hello: 'que haces mirando esto?',
  }
})

// recordar siempre importar
const UsersController = () => import('../app/controllers/usuarios_controller.js')
const AuthController = () => import('../app/controllers/AuthController.js')
const RouteController = () => import('../app/controllers/RouteController.js')

// crear usuarios (crud completo por si queda tiempo)
router.post('/users', [UsersController, 'store'])

// Listar usuarios
router.get('/users', [UsersController, 'index'])
// Ver un usuario
router.get('/users/:id', [UsersController, 'show']) 
// Actualizar usuario
router.put('/users/:id', [UsersController, 'update']) 
 // Eliminar usuario
router.delete('/users/:id', [UsersController, 'destroy'])

//para la autenticacion
router.post('/auth/login', [AuthController, 'login'])
router.post('/auth/register', [AuthController, 'register'])
router.post('/auth/logout', [AuthController, 'logout'])
router.get('/auth/me', [AuthController, 'me'])
router.put('/auth/change-password', [AuthController, 'changePassword'])

//ruta routes
router.get('/routes', [RouteController, 'getAll'])
router.get('/routes/:id', [RouteController, 'getById'])
router.post('/routes', [RouteController, 'create'])
router.put('/routes/:id', [RouteController, 'update'])
router.delete('/routes/:id', [RouteController, 'delete'])
