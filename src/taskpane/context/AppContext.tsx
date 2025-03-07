import * as React from "react";
import { createContext, PropsWithChildren, useState } from "react";

import { Column, Table, TransferRowProps } from "../types";
import { loadTableColumns } from "../commands/loadTableColumns";

type AppContextProps = {
  tables: Table[];
  setTables: (tables: Table[]) => void;
  selectedTable: Table | undefined;
  setSelectedTable: (table: Table | undefined) => void;
  loadedColumns: Column[] | undefined;
  setLoadedColumns: (columns: Column[] | undefined) => void;
  columnMappings: Record<keyof TransferRowProps, string | undefined>;
  setColumnMappings: (mappings: Record<string, string>) => void;
  patchColumnMapping: (key: keyof TransferRowProps, value: string) => void;
  result: string | undefined;
  setResult: (result: string | undefined) => void;
};

const createEmptyMapping = () => ({
  paymentDate: undefined,
  amount: undefined,
  senderAccountNumber: undefined,
  receiverAccountNumber: undefined,
  senderNameLine1: undefined,
  senderNameLine2: undefined,
  senderAddressLine1: undefined,
  senderAddressLine2: undefined,
  receiverNameLine1: undefined,
  receiverNameLine2: undefined,
  receiverAddressLine1: undefined,
  receiverAddressLine2: undefined,
  details: undefined,
});

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppContextProvider = ({ children }: PropsWithChildren) => {
  const [tables, setTables] = useState<Table[]>([]);
  const [selectedTable, _setSelectedTable] = useState<Table | undefined>(undefined);
  const [loadedColumns, setLoadedColumns] = useState<Column[] | undefined>(undefined);
  const [columnMappings, setColumnMappings] = useState<Record<string, string>>(createEmptyMapping());
  const [result, setResult] = useState<string | undefined>(undefined);

  const setSelectedTable = React.useCallback(
    async (table: Table | undefined) => {
      _setSelectedTable(table);
      if (!table) {
        setLoadedColumns(undefined);
        setColumnMappings(createEmptyMapping());
        setResult(undefined);

        return;
      }

      const columns = await loadTableColumns(table.id);
      setLoadedColumns(columns);
      setColumnMappings(createEmptyMapping());
      setResult(undefined);
    },
    [_setSelectedTable, setLoadedColumns, setColumnMappings, setResult]
  );

  const patchColumnMapping = React.useCallback(
    (key: keyof TransferRowProps, value: string) => {
      setColumnMappings((prevMappings) => ({
        ...prevMappings,
        [key]: value,
      }));
    },
    [setColumnMappings]
  );

  return (
    <AppContext.Provider
      value={{
        tables,
        setTables,
        selectedTable,
        setSelectedTable,
        loadedColumns,
        setLoadedColumns,
        columnMappings,
        setColumnMappings,
        patchColumnMapping,
        result,
        setResult,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = React.useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within a AppContextProvider");
  }
  return context;
};
