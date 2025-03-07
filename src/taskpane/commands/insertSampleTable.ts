/* global Excel */

import { CONFIG_LINE_PROPS } from "../consts";

export const insertSampleTable = async () => {
  return await Excel.run(async (context) => {
    const sheet = context.workbook.worksheets.getActiveWorksheet();

    const table = sheet.tables.add("A1:M4", true);
    table.getHeaderRowRange().values = [CONFIG_LINE_PROPS.map((prop) => prop.name)];

    await context.sync();
  });
};
