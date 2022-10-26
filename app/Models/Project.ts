import {
  BaseModel,
  column,
  ManyToMany,
  manyToMany,
} from "@ioc:Adonis/Lucid/Orm";
import { DateTime } from "luxon";
import Status from "./../../contracts/Enums/Status";
import Task from "./Task";
import User from "./User";

export default class Project extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public description?: string;

  @column()
  public statusId: Status;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
  // , {
  //   pivotColumns: ["role_id"],
  // }
  @manyToMany(() => User)
  public users: ManyToMany<typeof User>;

  @manyToMany(() => Task, {
    pivotColumns: ["sort_order"],
  })
  public tasks: ManyToMany<typeof Task>;
}
