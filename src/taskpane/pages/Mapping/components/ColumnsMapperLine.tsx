import * as React from "react";
import { Dropdown, Option, makeStyles } from "@fluentui/react-components";

import { TransferPropsLineConfig } from "../../../types";
import { useAppContext } from "../../../context/AppContext";

type ColumnsMapperLineProps = {
  lineConfig: TransferPropsLineConfig;
};

const NOT_MAP_VALUE = "__NOT_MAP__";
const NOT_MAP_TEXT = "-- Puste --";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "row",
    gap: "8px",
    alignItems: "center",
  },
  dropdown: {
    marginLeft: "auto",
  },
});

const useColumns = (lineConfig: TransferPropsLineConfig) => {
  const { loadedColumns, patchColumnMapping, columnMappings } = useAppContext();

  React.useEffect(() => {
    const matchingColumn = loadedColumns?.find((column) => column.name === lineConfig.name);
    if (matchingColumn && !columnMappings[lineConfig.id]) {
      patchColumnMapping(lineConfig.id, matchingColumn.id);
      return;
    }
  }, [lineConfig, loadedColumns, columnMappings]);

  return {
    columns: loadedColumns || [],
  };
};

const useDropdownValue = (lineId: TransferPropsLineConfig["id"]) => {
  const { columnMappings, loadedColumns } = useAppContext();

  const currentMapped = columnMappings[lineId];
  const loadedColumn = loadedColumns?.find((column) => column.id === currentMapped);

  if (!currentMapped || !loadedColumn) {
    return {
      value: NOT_MAP_TEXT,
      selectedOptions: [NOT_MAP_VALUE],
    };
  }

  return {
    value: loadedColumn.name,
    selectedOptions: [loadedColumn.id],
  };
};

const useOnMappingChange = (lineId: TransferPropsLineConfig["id"]) => {
  const { patchColumnMapping } = useAppContext();
  const onMappingChange = React.useCallback(
    (_event, data) => {
      if (data.optionValue === NOT_MAP_VALUE) {
        patchColumnMapping(lineId, undefined);
        return;
      }

      patchColumnMapping(lineId, data.optionValue);
    },
    [patchColumnMapping, lineId]
  );

  return { onMappingChange };
};

export const ColumnsMapperLine = ({ lineConfig }: ColumnsMapperLineProps) => {
  const styles = useStyles();

  const { columns } = useColumns(lineConfig);
  const { onMappingChange } = useOnMappingChange(lineConfig.id);
  const { selectedOptions, value } = useDropdownValue(lineConfig.id);

  return (
    <div className={styles.container}>
      <div>{lineConfig.name}</div>
      <Dropdown
        className={styles.dropdown}
        selectedOptions={selectedOptions}
        value={value}
        onOptionSelect={onMappingChange}
      >
        <Option value={NOT_MAP_VALUE} text={NOT_MAP_TEXT}>
          {NOT_MAP_TEXT}
        </Option>
        {columns.map((column) => (
          <Option key={column.id} value={column.id} text={column.name}>
            {column.name}
          </Option>
        ))}
      </Dropdown>
    </div>
  );
};
