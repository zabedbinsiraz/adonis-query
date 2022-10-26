// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class QueriesController {
  public async index({ response }: HttpContextContract) {
    return response.json({ message: "working souccessfully" });
  }
}
