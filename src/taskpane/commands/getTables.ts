/* global Excel */

import { Table } from "../types";

export const getTables = async (): Promise<Table[]> => {
  return await Excel.run(async (context) => {
    const result = [];

    const tables = context.workbook.tables.load("items");
    await context.sync();

    for (const table of tables.items) {
      table.load("name");
      table.load("id");

      result.push({
        id: table.id,
        name: table.name,
      });
    }

    return result;
  });
};
