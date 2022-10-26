// ORM = Object Relational Mapping
// NoQql(mongodb)'s orm is mongoose
// Sql(MySql)'s orm is Lucid

// node ace --help

// 'node ace' run to see the ace terminals
// as get command help like this: node ace make:view -h

// a routing context name is HttpContextContract and in a short it is ctx
// import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext
// the HttpContextContract is always available all routes, routes related functions like controllers and middlewares
// {request,response,params,...} = ctx/HttpContextContract;
//grouping route:
Route.group(()=>{
//all routes after routes name like /:id instead of /users/:id
}).prefix('/users');// .prefix('/users').as('users.');//get().as('index');
Route.get('/',()=>{}).as(users.index);
// to create a controller
node ace make:controller UserController

//create: app/services/UserService.ts=>
class UserService{
public static test():string{
return 'test';
//public test:string = 'test';
}
}
export default UserService;
and: Route.resource('/','YourController').as('test');
// in a controller method: const test = UserService.test();
// we can call a controller with its full path using namespace method
Rout.resource('/','ControllerName').namespace('App/Controllers/Http/Users)// need to make here same 'ControllerName';

// adonis learnig curve in this project=>>

1. project set up
2. database connection
3. routing
4. controllers
5. migration
6. model
7. relationship
8. query builder
9. querying + aggregation
10. reusable query using query scope

// authentication:
npm i @adonisjs/auth
// then configure it
// kernel.ts =>>
server.middleware.register([
,
App/Middleware/SilentAuth,

])
server.middleware.registerNamed({
auth: 'App/Middleware/Auth',

})
