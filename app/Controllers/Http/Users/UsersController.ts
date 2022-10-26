import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import UserService from "App/Services/UserService";

export default class UsersController {
  public async index({ response }: HttpContextContract) {
    const test_result = UserService.test();
    return response.json({ users: test_result, from: "namespace " });
  }

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
