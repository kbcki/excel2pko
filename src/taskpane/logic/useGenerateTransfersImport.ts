import React from "react";

import { useAppContext } from "../context/AppContext";
import { getTableContent } from "../commands/getTableContent";
import { TransferImportRow } from "./TransferImportRow";
import { TransferRowProps } from "../types";

export const useGenerateTransfersImport = () => {
  const { columnMappings, selectedTable, setResult } = useAppContext();

  const generateTransfersImport = React.useCallback(async () => {
    if (!selectedTable) {
      return;
    }

    const tableContent = await getTableContent(selectedTable.id);
    const result = tableContent.items
      .map((item) => {
        const cells = item.values[0];

        const transferRowProps = Object.keys(columnMappings).reduce(
          (acc, key) => ({
            ...acc,
            [key]: cells[columnMappings[key] - 1],
          }),
          {}
        );

        return transferRowProps as TransferRowProps;
      })
      .map((transferRowProps) => {
        const row = new TransferImportRow(transferRowProps);
        return row.toString();
      })
      .join("\n");

    setResult(result);
  }, [selectedTable, columnMappings, setResult]);

  return {
    generateTransfersImport,
  };
};
