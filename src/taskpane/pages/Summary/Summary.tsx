import { makeStyles } from "@fluentui/react-components";
import * as React from "react";

import { SummaryButtons } from "./components/SummaryButtons";
import { Result } from "./components/Result";
import { UtilButtons } from "./components/UtilButtons";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  buttonsContainer: {
    marginTop: "auto",
  },
  info__section: {
    padding: "16px",
  },
});

export const Summary = () => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <section className={styles.info__section}>
        Skopiuj zawartość poniższego pola, wklej ją do Notatnika. Taki plik możesz zaimportować do systemu bankowego.
      </section>
      <Result />
      <UtilButtons />
      <div className={styles.buttonsContainer}>
        <SummaryButtons />
      </div>
    </div>
  );
};
