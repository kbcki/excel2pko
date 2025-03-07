import * as React from "react";
import { Button, makeStyles } from "@fluentui/react-components";

import { useNavigationContext } from "../../../context/NavigationContext";
import { Pages } from "../../../consts";
import { useGenerateTransfersImport } from "../../../logic/useGenerateTransfersImport";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "row",
    padding: "32px 16px 16px",
  },
  button: {
    marginLeft: "auto",
  },
});

export const SummaryButtons = () => {
  const styles = useStyles();
  const { setCurrentPage } = useNavigationContext();
  const { generateTransfersImport } = useGenerateTransfersImport();

  const onSaveClick = React.useCallback(() => {
    setCurrentPage(Pages.SUMMARY);
    generateTransfersImport();
  }, [setCurrentPage, generateTransfersImport]);

  const onBackClick = React.useCallback(() => {
    setCurrentPage(Pages.SPLASH);
  }, [setCurrentPage]);

  return (
    <div className={styles.container}>
      <Button onClick={onBackClick}>Wróć</Button>
      <Button className={styles.button} onClick={onSaveClick} appearance="primary">
        Zapisz
      </Button>
    </div>
  );
};
