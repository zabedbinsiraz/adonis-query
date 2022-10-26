import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  ManyToMany,
  manyToMany,
  scope,
} from "@ioc:Adonis/Lucid/Orm";
import { DateTime } from "luxon";
import Status from "./../../contracts/Enums/Status";
import Project from "./Project";
import User from "./User";

export default class Task extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public description?: string;

  @column()
  public dueAt?: DateTime;

  @column()
  public statusId: Status;

  @column()
  public createdBy: number;

  @column()
  public assignedTo?: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @belongsTo(() => User, {
    localKey: "createdBy",
  })
  public creator: BelongsTo<typeof User>;

  @belongsTo(() => User, {
    localKey: "assignedTo",
  })
  public assignee: BelongsTo<typeof User>;

  @manyToMany(() => Project, {
    pivotColumns: ["sort_order"],
  })
  public projects: ManyToMany<typeof Project>;

  public static incomplete = scope((query, userId?: number) => {
    // query.whereNot("status_id", Status.COMPLETE).where('assignedTo',userId);

    // if(!userId) return;

    query
      .whereNot("status_id", Status.COMPLETE)
      .if(userId, (query) => query.where("assignedTo", <number>userId));
  });

  public static createdThisMonth = scope((query) => {
    const thirtyDaysAgo = DateTime.local().minus({ days: 30 }).toSQL();
    query.where("createdAt", ">=", thirtyDaysAgo);
  });

  // nested query scopes
  public static incompleteThisMonth = scope<typeof Task>((query) => {
    query.apply((scopes) => scopes.incomplete().createdThisMonth());
  });
}
