import Route from "@ioc:Adonis/Core/Route";

Route.get("/", async (ctx) => {
  return ctx.response.json({ message: "welcome to my fresh adonis app!" });
}).as("apps.index");

// Route.group(() => {
//   Route.get("/", "UsersController.index").as("index");
//   Route.get("/create", "UsersController.create").as("create");
//   Route.post("/", "UsersController.store").as("store");

//   Route.get("/:id", "UsersController.show").as("show");
//   Route.get("/:id/edit", "UsersController.edit").as("edit");
//   Route.patch("/:id", "UsersController.update").as("update");

//   Route.delete("/:id", "UsersController.destroy").as("destroy");
// })
//   .prefix("users")
//   .as("users");

// you can fixed your route name
// Route.resource("/users", "UsersController").as("test");

// to use same name controller from another path
// Route.resource("/users", "UsersController").namespace(
//   "App/Controllers/Http/Users"
// );
Route.resource("/users", "UsersController");
Route.resource("/tasks", "TasksController");
Route.resource("/projects", "ProjectsController");

// queries purpose
Route.resource("/queries", "QueriesController");
