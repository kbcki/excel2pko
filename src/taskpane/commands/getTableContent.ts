/* global Excel */

export const getTableContent = async (tableId: string) => {
  return await Excel.run(async (context) => {
    const table = context.workbook.tables.getItem(tableId);
    const columns = table.columns.load("items");
    const rows = table.rows.load("items");

    await context.sync();
    const result = rows.toJSON();

    return result;
  });
};
