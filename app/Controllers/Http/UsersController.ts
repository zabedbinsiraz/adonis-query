import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Project from "./../../Models/Project";
import User from "./../../Models/User";

export default class UsersController {
  public async index({ response }: HttpContextContract) {
    // const test_result = UserService.test();
    // return response.json({ users: test_result });
    // try {
    //   const user = await User.query()
    //     .where("id", 2)
    //     .preload("projects", (query) =>
    //       query.preload("tasks").orderBy("created_at", "desc")
    //     );
    //   return response.json({ user });
    // } catch (error) {
    //   return response.json({ message: error.message });
    // }
    // querying through relation
    // const user = await User.findOrFail(1);
    // const userProjects = await user
    //   .related("projects")
    //   .query()
    //   .preload("tasks");
    // return response.json({ userProjects });
    // nested preload querying
    // try {
    //   const user = await User.findOrFail(4);
    //   const userProjects = await user
    //     .related("projects")
    //     .query()
    //     .preload("tasks", (query) =>
    //       query.preload("assignee").preload("creator")
    //     );
    //   return response.json({ userProjects });
    // } catch (error) {
    //   return response.json({ message: error.message });
    // } // these code don't working
    // alternative codes here.....
    // try {
    //   const user = await User.query()
    //     .where("id", 1)
    //     .preload("projects", (query) => {
    //       query.preload("tasks", (query) => {
    //         query.preload("assignee").preload("creator");
    //       });
    //     });
    //   return response.json({ user });
    // } catch (error) {
    //   return response.json({ message: error.message });
    // }

    // to get project ids (doesn't working)
    // const projectIds = await (
    //   await User.query().where("id", 4).preload("projects")
    // ).map((project) => project.$extras.pivot_project_id);

    // all types of aggregation methods
    // to count the total tasks under a project
    // const projects = await Project.query().withCount("tasks");
    const projects = await Project.query()
      .withCount("tasks", (query) => query.as("taskCounts"))
      .preload("tasks"); // to get the total number of tasks

    // const projects = await Project.query().withCount("tasks",query=>query.where('status_id',Status.COMPLETE));// to get the total number of completed tasks
    // const projects = await Project.query().withCount("tasks", (query) =>
    //   query.sum("sort_order").as("sort_sum")
    // );
    return response.json({ projects });
  }

  public async create({}: HttpContextContract) {}

  public async store({ response, request }: HttpContextContract) {
    // const user1 = {
    //   username: "username1",
    //   email: "user1@gmail.com",
    //   password: "user111",
    // };
    // const user2 = {
    //   username: "username2",
    //   email: "user2@gmail.com",
    //   password: "user222",
    // };

    const data = request.body();
    try {
      // const users = await User.createMany([user1, user2]);
      const createdUser = await User.create(data);
      return response.json({ createdUser });
    } catch (error) {
      return response.json({ message: error.message });
    }
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({ response, params }: HttpContextContract) {
    //to delete
    try {
      const user = await User.findOrFail(params.id);
      const deletedProjects = await user.related("projects").query().delete();
      const deletedTasks = await user.related("tasks").query().delete();
      const deletedUser = await user.delete();
      return response.json({ deletedProjects, deletedTasks, deletedUser });
    } catch (error) {
      return response.json({ message: error.message });
    }
  }
}
