import { makeStyles } from "@fluentui/react-components";
import * as React from "react";

import { SummaryButtons } from "./components/SummaryButtons";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  buttonsContainer: {
    marginTop: "auto",
  },
});

export const Summary = () => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <span>Summary</span>
      <div className={styles.buttonsContainer}>
        <SummaryButtons />
      </div>
    </div>
  );
};
