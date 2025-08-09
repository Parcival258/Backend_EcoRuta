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
    hello: 'world',
  }
})

// recordar siempre importar
const UsersController = () => import('../app/controllers/usuarios_controller.js')

// crear usuarios
router.post('/users', [UsersController, 'store'])

// flatan probar
// Listar usuarios
router.get('/users', [UsersController, 'index'])
// Ver un usuario
router.get('/users/:id', [UsersController, 'show']) 
// Actualizar usuario
router.put('/users/:id', [UsersController, 'update']) 
 // Eliminar usuario
router.delete('/users/:id', [UsersController, 'destroy'])