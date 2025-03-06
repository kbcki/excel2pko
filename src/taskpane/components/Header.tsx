import * as React from "react";
import { tokens, makeStyles } from "@fluentui/react-components";

const useStyles = makeStyles({
  welcome__header: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: "16px",
    paddingTop: "8px",
    backgroundColor: tokens.colorNeutralBackground3,
  },
  message: {
    fontSize: tokens.fontSizeBase600,
    fontWeight: tokens.fontWeightRegular,
    fontColor: tokens.colorNeutralBackgroundStatic,
  },
});

export const Header = () => {
  const styles = useStyles();

  return (
    <section className={styles.welcome__header}>
      <h1 className={styles.message}>Eksport do PKO BP</h1>
    </section>
  );
};
