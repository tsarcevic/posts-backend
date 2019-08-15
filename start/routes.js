'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can store
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('welcome')

Route.get('posts', 'PostController.index').middleware(["userLogged"])
Route.get('posts/search', 'PostController.search')

Route.group(() => {
  Route.post('', 'PostController.store')
  Route.get('/:id', 'PostController.show')
  Route.patch('/:id', 'PostController.update')
  Route.delete('/:id', 'PostController.delete')
}).prefix('/posts').middleware(["userLogged", "postAvailable"])

Route.group(() => {
  Route.get('/getInfo', 'UserController.getInfo').middleware(["userLogged"])
  Route.post('/signUp', 'UserController.store')
  Route.post('/login', 'UserController.login')
  Route.get('/validation/:token', 'UserController.validateMail')
}).prefix('/user')

Route.get('/image/:id', 'MediaController.show').middleware(["imageAvailable"])
  Route.post('/saveImage', 'MediaController.store').middleware(["userLogged"])
