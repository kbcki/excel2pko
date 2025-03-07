import { Button, makeStyles, Textarea } from "@fluentui/react-components";
import * as React from "react";

import { useAppContext } from "../../../context/AppContext";
import { useGenerateTransfersImport } from "../../../logic/useGenerateTransfersImport";

const useStyles = makeStyles({
  textarea: {
    margin: "0 16px",
    height: "200px",
  },
});

export const Result = () => {
  const { result } = useAppContext();
  const styles = useStyles();

  return <Textarea className={styles.textarea} value={result ?? ""} />;
};
