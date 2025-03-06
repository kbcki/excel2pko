import * as React from "react";
import { createContext, PropsWithChildren, useState } from "react";

import { Column, Table } from "../types";
import { loadTableColumns } from '../commands/loadTableColumns';

type AppContextProps = {
  tables: Table[];
  setTables: (tables: Table[]) => void;
  selectedTable: Table | undefined;
  setSelectedTable: (table: Table | undefined) => void;
  loadedColumns: Column[] | undefined;
  setLoadedColumns: (columns: Column[] | undefined) => void;
};

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppContextProvider = ({ children }: PropsWithChildren) => {
  const [tables, setTables] = useState<Table[]>([]);
  const [selectedTable, _setSelectedTable] = useState<Table | undefined>(undefined);
  const [loadedColumns, setLoadedColumns] = useState<Column[] | undefined>(undefined);

  const setSelectedTable = React.useCallback(
    async (table: Table | undefined) => {
      _setSelectedTable(table);
      if (!table) {
        setLoadedColumns(undefined);
        return;
      }

      const columns = await loadTableColumns(table.id);
      setLoadedColumns(columns);
    },
    [_setSelectedTable, setLoadedColumns]
  );

  return (
    <AppContext.Provider
      value={{ tables, setTables, selectedTable, setSelectedTable, loadedColumns, setLoadedColumns }}
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
