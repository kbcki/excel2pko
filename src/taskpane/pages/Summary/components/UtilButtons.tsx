import * as React from "react";
import { Button, makeStyles } from "@fluentui/react-components";

import { useAppContext } from "../../../context/AppContext";
import { useGenerateTransfersImport } from "../../../logic/useGenerateTransfersImport";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "row",
    gap: "8px",
    padding: "8px 16px",
    justifyContent: "end",
  },
});

export const UtilButtons = () => {
  const styles = useStyles();

  const { result } = useAppContext();
  const { generateTransfersImport } = useGenerateTransfersImport();

  const onCopyClick = React.useCallback(() => {
    window.navigator.clipboard.writeText(result);
  }, [result]);

  return (
    <div className={styles.container}>
      <Button onClick={generateTransfersImport}>Generuj</Button>
      <Button onClick={onCopyClick} appearance="primary">
        Skopiuj
      </Button>
    </div>
  );
};
