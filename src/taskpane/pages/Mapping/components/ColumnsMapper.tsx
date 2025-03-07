import * as React from "react";
import { makeStyles } from "@fluentui/react-components";

import { CONFIG_LINE_PROPS } from "../../../consts";
import { ColumnsMapperLine } from "./ColumnsMapperLine";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    padding: "16px",
    maxWidth: "500px",
  },
});

export const ColumnsMapper = () => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      {CONFIG_LINE_PROPS.map((lineConfig) => (
        <ColumnsMapperLine key={lineConfig.id} lineConfig={lineConfig} />
      ))}
    </div>
  );
};
