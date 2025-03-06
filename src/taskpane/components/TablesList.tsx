import * as React from "react";
import { Dropdown, Option, Button, makeStyles } from "@fluentui/react-components";

import { useAppContext } from "../context/AppContext";
import { getTables } from "../commands/getTables";
import { loadTableColumns } from '../commands/loadTableColumns';

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: "8px 16px",
    padding: "0 16px",
  },
});

export const TablesList: React.FC = () => {
  const styles = useStyles();
  const { tables, setTables, selectedTable, setSelectedTable } = useAppContext();

  const refreshClick = React.useCallback(async () => {
    const nextTables = await getTables();
    setTables(nextTables);

    if (nextTables.length > 0) {
      setSelectedTable(nextTables[0]);
    } else {
      setSelectedTable(undefined);
    }
  }, [setTables]);

  const onValueChange = React.useCallback((_event, data) => {
    const tableId = data.optionValue;
    const nextTable = tables.find((table) => table.id === tableId);
    setSelectedTable(nextTable);
    
    loadTableColumns(tableId);
  }, [tables, setSelectedTable]);

  return (
    <div className={styles.container}>
      <Dropdown
        value={selectedTable?.name ?? null}
        selectedOptions={[selectedTable?.id]}
        onOptionSelect={onValueChange}
      >
        {tables.map((table) => (
          <Option key={table.id} value={table.id} text={table.name}>
            {table.name}
          </Option>
        ))}
      </Dropdown>
      <Button onClick={refreshClick}>Odśwież</Button>
    </div>
  );
};
