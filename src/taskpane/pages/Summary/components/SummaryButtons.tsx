import { Button, makeStyles } from "@fluentui/react-components";
import * as React from "react";

import { useNavigationContext } from "../../../context/NavigationContext";
import { useGenerateTransfersImport } from "../../../logic/useGenerateTransfersImport";
import { Pages } from "../../../consts";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "end",
    padding: "32px 16px 16px",
  },
});

export const SummaryButtons = () => {
  const styles = useStyles();

  const { setCurrentPage } = useNavigationContext();
  const { generateTransfersImport } = useGenerateTransfersImport();
  const onBackClick = React.useCallback(() => {
    setCurrentPage(Pages.MAPPING);
    generateTransfersImport();
  }, [setCurrentPage, generateTransfersImport]);

  return (
    <div className={styles.container}>
      <Button onClick={onBackClick}>Powrót</Button>
    </div>
  );
};
