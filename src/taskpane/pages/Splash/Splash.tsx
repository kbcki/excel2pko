import { Button, makeStyles } from "@fluentui/react-components";
import * as React from "react";
import { useNavigationContext } from "../../context/NavigationContext";
import { Pages } from "../../consts";
import { insertSampleTable } from "../../commands/insertSampleTable";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    padding: "16px",
    gap: "16px",
  },
  buttonsContainer: {
    display: "flex",
    gap: "16px",
    marginTop: "32px",
    justifyContent: "center",
  },
});

export const Splash = () => {
  const styles = useStyles();

  const { setCurrentPage } = useNavigationContext();
  const onNextClick = React.useCallback(() => {
    setCurrentPage(Pages.MAPPING);
  }, [setCurrentPage]);

  const onInsertTableClick = React.useCallback(async () => {
    await insertSampleTable();
  }, []);

  return (
    <div className={styles.container}>
      <section>Ten dodatek pozwala wyeksportować listę przelewów do formatu wykorzystywanego przez PKO BP.</section>
      <section>Możesz wybrać istniejącą tabelę lub użyć przycisku, żeby wstawić pustą.</section>
      <div className={styles.buttonsContainer}>
        <Button appearance="subtle" onClick={onInsertTableClick}>
          Wstaw pustą tabelę
        </Button>
        <Button appearance="primary" onClick={onNextClick}>
          Dalej
        </Button>
      </div>
    </div>
  );
};
