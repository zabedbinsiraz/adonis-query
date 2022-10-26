import Hash from "@ioc:Adonis/Core/Hash";
import {
  BaseModel,
  beforeSave,
  column,
  HasMany,
  hasMany,
  ManyToMany,
  manyToMany,
  scope,
} from "@ioc:Adonis/Lucid/Orm";
import { DateTime } from "luxon";
import Project from "./Project";
import Task from "./Task";

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public email: string;

  @column()
  public username: string;

  @column({ serializeAs: null })
  public password: string;

  @column()
  public rememberMeToken?: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password);
    }
  }

  @hasMany(() => Task, {
    foreignKey: "createdBy",
  })
  public tasks: HasMany<typeof Task>;

  @hasMany(() => Task, {
    foreignKey: "assignedTo",
  })
  public assignedTasks: HasMany<typeof Task>;

  @manyToMany(() => Project)
  public projects: ManyToMany<typeof Project>;

  // , {
  //   pivotColumns: ["role_id"],
  // }

  public static hasAssignedTasks = scope<typeof User>((query) => {
    query.whereHas("assignedTasks", (taskQuery) =>
      taskQuery.apply((scopes) => scopes.incomplete)
    );
  });

  public static withAssignedTasks = scope<typeof User>((query) => {
    query.preload("assignedTasks", (taskQuery) =>
      taskQuery.apply((scopes) => scopes.incomplete)
    );
  });
}
