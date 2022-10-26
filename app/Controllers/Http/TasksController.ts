import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Project from "./../../Models/Project";
import Task from "./../../Models/Task";

export default class TasksController {
  public async index({ response }: HttpContextContract) {
    // select * from tasks where status_id =1;

    // with database
    // const tasksDb = await Database.from('tasks').where('status_id',Status.IDLE).select('*');

    // with model
    // const tasksDb = await Task.query()
    //   .where("statusId", Status.IDLE)
    //   .select("*");
    // return response.json({ tasksDb });

    // const incompleteTasks = await Task.query()
    //   .whereNot("status_id", Status.COMPLETE)
    //   .orderBy("created_at", "desc");

    // using scope query
    // const incompleteTasks = await Task.query()
    //   .apply((scopes) => scopes.incomplete())
    //   .orderBy("created_at", "desc");

    // sending parameter to the scope query
    const userId = 2;
    const incompleteTasks = await Task.query()
      .apply((scopes) => scopes.incomplete(userId))
      .apply((scopes) => scopes.createdThisMonth())
      .orderBy("created_at", "desc");

    return response.json({ incompleteTasks });
  }

  public async create({}: HttpContextContract) {}

  public async store({ response }: HttpContextContract) {
    const project = await Project.query().firstOrFail();
    const task = await Task.create({
      name: "Example task for today",
      createdBy: 1,
      assignedTo: 2,
    });

    // {
    //   [project.id]: { sort_order: 2 },
    // }

    await task.related("projects").attach([17]);
    return response.json({ task });
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
