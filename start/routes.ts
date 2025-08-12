/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

router.get('/', async () => {
  return {
    hello: 'que haces mirando esto?',
  }
})

// recordar siempre importar
const UsersController = () => import('../app/controllers/usuarios_controller.js')
const AuthController = () => import('../app/controllers/AuthController.js')
const RouteController = () => import('../app/controllers/RouteController.js')
const TripHistoriesController = () => import('#controllers/TripHistoriesController')
const RewardController = () => import('../app/controllers/RewardController.js')
const UserRewardsController = () => import('../app/controllers/UserRewardController.js')

// crear usuarios (crud completo por si queda tiempo)
router.post('/users', [UsersController, 'store'])

// Listar usuarios
router.get('/users', [UsersController, 'index'])
router.get('/users/:id', [UsersController, 'show']) 
router.put('/users/:id', [UsersController, 'update']) 
router.delete('/users/:id', [UsersController, 'destroy'])

//para la autenticacion
router.post('/auth/login', [AuthController, 'login'])
router.post('/auth/register', [AuthController, 'register'])
router.post('/auth/logout', [AuthController, 'logout'])

// Rutas protegidas con JWT
router.get('/auth/me', [AuthController, 'me']).use(middleware.jwtAuth())
router.put('/auth/change-password', [AuthController, 'changePassword']).use(middleware.jwtAuth())

//ruta routes
router.get('/routes', [RouteController, 'getAll'])
router.get('/routes/:id', [RouteController, 'getById'])
router.post('/routes', [RouteController, 'create'])
router.put('/routes/:id', [RouteController, 'update'])
router.delete('/routes/:id', [RouteController, 'delete'])

//rutas para historial (protegidas con JWT)
router
  .group(() => {
    router.get('/', [TripHistoriesController, 'index'])
    router.get('/:id', [TripHistoriesController, 'show'])
    router.post('/', [TripHistoriesController, 'store'])
    router.put('/:id', [TripHistoriesController, 'update'])
    router.delete('/:id', [TripHistoriesController, 'destroy'])
  })
  .prefix('trip-histories')
  .use(middleware.jwtAuth())


router.get('/rewards', [RewardController, 'getAll'])
router.get('/rewards/:id', [RewardController, 'getById'])
router.post('/rewards', [RewardController, 'create'])
router.put('/rewards/:id', [RewardController, 'update'])
router.delete('/rewards/:id', [RewardController, 'delete'])

router.get('/user-rewards', [UserRewardsController, 'getAll'])
router.get('/user-rewards/:id', [UserRewardsController, 'getById'])
router.post('/user-rewards', [UserRewardsController, 'create'])
router.put('/user-rewards/:id', [UserRewardsController, 'update'])
router.delete('/user-rewards/:id', [UserRewardsController, 'delete'])