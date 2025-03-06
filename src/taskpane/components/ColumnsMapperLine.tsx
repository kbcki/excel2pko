import * as React from "react";
import { TransferPropsLineConfig } from "../types";
import { Dropdown, makeStyles } from "@fluentui/react-components";

type ColumnsMapperLineProps = {
  lineConfig: TransferPropsLineConfig;
};

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

export const ColumnsMapperLine = ({ lineConfig }: ColumnsMapperLineProps) => {
  const styles = useStyles();
  return (
    <div className={styles.container}>
      <div>{lineConfig.name}</div>
      <Dropdown className={styles.dropdown} />
    </div>
  );
};
