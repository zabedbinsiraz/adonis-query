import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "project_user";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();
      table
        .integer("project_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("projects");

      table
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users");
      table.integer("role_id").unsigned().notNullable().defaultTo(0);

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp("created_at").defaultTo(this.now());
      table.timestamp("updated_at").defaultTo(this.now());
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
