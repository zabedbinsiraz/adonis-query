import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "tasks";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();
      table.string("name").notNullable();
      table.text("description").nullable();
      table.timestamp("due_at").nullable();
      table.integer("status_id").unsigned().notNullable().defaultTo(1);
      table
        .integer("created_by")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users");
      table
        .integer("assigned_to")
        .unsigned()
        .nullable()
        .references("id")
        .inTable("users");

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
