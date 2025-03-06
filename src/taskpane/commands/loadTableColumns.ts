/* global Excel */

import { Column } from "../types";

export const loadTableColumns = async (tableId: string): Promise<Column[]> => {
  return await Excel.run(async (context) => {
    // Office.context.document.get
    // File

    const result = [];

    const table = context.workbook.tables.getItem(tableId);
    const columns = table.columns.load("items");

    await context.sync();

    for (const column of columns.items) {
      column.load("name");
      column.load("id");

      result.push({
        id: column.id,
        name: column.name,
      });
    }

    return result;
  });
};
