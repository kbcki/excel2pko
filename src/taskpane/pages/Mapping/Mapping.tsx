import * as React from "react";
import { makeStyles } from "@fluentui/react-components";

import { TablesList } from "./components/TablesList";
import { ColumnsMapper } from "./components/ColumnsMapper";
import { SummaryButtons } from "./components/SummaryButtons";

const useStyles = makeStyles({
  info__section: {
    padding: "16px",
  },
});

export const Mapping = () => {
  const styles = useStyles();

  return (
    <div>
      <section className={styles.info__section}>
        Wybierz tabelę, z której chcesz wyeksportować listę przelewów. Następnie zmapuj odpowiednie kolumny.
      </section>
      <TablesList />
      <ColumnsMapper />
      <SummaryButtons />
    </div>
  );
};
