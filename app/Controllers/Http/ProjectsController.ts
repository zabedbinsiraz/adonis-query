import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Database from "@ioc:Adonis/Lucid/Database";
import Status from "./../../../contracts/Enums/Status";
import Project from "./../../Models/Project";
import User from "./../../Models/User";

export default class ProjectsController {
  public async index({ response }: HttpContextContract) {
    // const projects = await Project.query().where("statusId", Status.IDLE);

    // find many by id's array
    // const projects = await Project.findMany([1, 2]);

    // const projects = await Project.query().preload("tasks");
    const projects = await Project.query()
      .preload("tasks", (query) =>
        query.where("status_id", Status.IDLE).orderBy("due_at", "desc")
      )
      .preload("users");

    return response.json({ projects });
  }

  public async create({}: HttpContextContract) {}

  public async store({ request, response }: HttpContextContract) {
    // raw way of creating data
    // const project = new Project();
    // project.name = "This is awesome Project";
    // await project.save();

    // const data = request.only(['name','description']);
    // const project = new Project();
    // const name = request.input("name");
    // project.name = name;
    // await project.save();

    // by model
    // const name = request.input("name");
    // const project = await Project.create({ name });

    // by database
    // const name = request.input("name");
    // const project = await Database.insertQuery()
    //   .table("projects")
    //   .insert({ name }); // its return total record no

    // alter of table name
    // const name = request.input("name");
    // const project = await Database.insertQuery()
    //   .table(Project.table)
    //   .insert({ name }); // its return total record no

    // using firstOrCreate(searchPayload,createPayload) =>> if find ,it will return the find result and if don't find,it will create
    // const { name } = request.body();
    // const project = await Project.firstOrCreate({ name }, { name });

    // const data = request.body();
    // const project = await Project.firstOrCreate({ name: data.name }, data);

    // updateOrCreate(searchPayload,createPayload)=>> if find, it will update,if don't find, it will create
    // const data = request.body();
    // const project = await Project.updateOrCreate({ name: data.name }, data);
    // data receiving way from client
    // const data = request.only(["name", "description"]);

    try {
      const name = request.input("name");
      const user1 = await User.findOrFail(1);
      const user2 = await User.findOrFail(2);

      const project = await Project.create({ name });

      //to create relation with users
      await project.related("users").attach({
        [4]: { role_id: 1 },
        [6]: { role_id: 2 },
      });

      // to create relation with tasks
      await project.related("tasks").create({
        name: "project for user4 and user6",
        createdBy: 4,
        assignedTo: 6,
      });

      console.log(Project.$getRelation("tasks").relationName);

      return response.json({ project });
    } catch (error) {
      return response.json(error.message);
    }
  }

  public async show({ response, params }: HttpContextContract) {
    // const projects = await Project.query().where("statusId", params.id).first();

    // first or fail >> if not find provide an error of 4o4
    // const projects = await Project.query()
    //   .where("statusId", params.id)
    //   .firstOrFail();

    // find a single record by id
    // const project = await Project.find(params.id);
    // const project = await Project.findOrFail(params.id);

    // findBy(key,value) =>> it is used for finding slug or like this things
    // const project = await Project.findBy("id", params.id);
    // const project = await Project.findByOrFail("id", params.id);

    // using Database
    // const project = await Database.from("projects")
    //   .where("id", params.id)
    //   .first();

    // const project = await Database.from("projects")
    //   .where("id", params.id)
    //   .firstOrFail();

    // const project = await Project.findOrFail(params.id);
    // await project.preload('tasks');

    // how many tasks under a specific project
    const project = await Project.query()
      .where("id", params.id)
      .preload("tasks");
    console.log(params.id);

    return response.json({ project });
  }

  public async edit({}: HttpContextContract) {}

  public async update({ request, params, response }: HttpContextContract) {
    // update
    // const project = await Project.findOrFail(params.id);
    // const name = request.input("name");
    // project.name = name;
    // project.save();

    // update using merge
    // const data = request.only(["name", "description"]);
    // const project = await Project.findOrFail(params.id);
    // project.merge(data);
    // await project.save();

    // updating shortcut
    // const data = request.only(["name", "description"]);
    // const project = await Project.query()
    //   .where("id", params.id)
    //   .update(data);

    // using Database in a easy way
    // const data = request.only(["name", "description"]);
    // const project = await Database.from("projects")
    //   .where("id", params.id)
    //   .update(data);

    // update related data
    const data = request.only(["name", "description"]);
    const user2 = await User.findOrFail(2);
    const project = await Project.findOrFail(params.id);
    project.merge(data);
    await project.save();
    // detach=>> detach opposite of attach==>> remove itself
    await project.related("users").detach([user2.id]);
    // using sync instead of detach and attach=>> sync will remove all without itself
    await project.related("users").sync({
      [user2.id]: {
        role_id: 2,
      },
    });

    return response.json({ project });
  }

  public async destroy({ response, params }: HttpContextContract) {
    // const project = await Project.findOrFail(params.id);
    // await project.delete();

    // shortcut delete with model
    // const project = await Project.query().where("id", params.id).delete();

    // shortcut delete with Database
    const project = await Database.from("projects")
      .where("id", params.id)
      .delete();

    return response.json({ project });
  }
}
