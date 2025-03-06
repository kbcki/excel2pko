import * as React from "react";
import { makeStyles, tokens } from "@fluentui/react-components";

import { getTables } from "./commands/getTables";
import { useAppContext } from "./context/AppContext";
import { Header } from "./components/Header";
import { TablesList } from "./components/TablesList";
import { ColumnsMapper } from "./components/ColumnsMapper";
import { SummaryButtons } from "./components/SummaryButtons";

interface AppProps {
  title: string;
}

const useStyles = makeStyles({
  root: {
    background: tokens.colorNeutralBackground2,
    minHeight: "100vh",
    margin: "0",
    padding: "0",
  },
  info__section: {
    padding: "16px",
  },
});

export const App: React.FC<AppProps> = () => {
  const styles = useStyles();
  const { setTables, setSelectedTable } = useAppContext();

  React.useEffect(() => {
    getTables().then((tables) => {
      setTables(tables);
      if (tables.length > 0) {
        setSelectedTable(tables[0]);
      } else {
        setSelectedTable(undefined);
      }
    });
  }, []);

  return (
    <div className={styles.root}>
      <Header />
      <section className={styles.info__section}>
        Wybierz tabelę, z której chcesz wyeksportować listę przelewów. Następnie zmapuj odpowiednie kolumny.
      </section>
      <TablesList />
      <ColumnsMapper />
      <SummaryButtons />
    </div>
  );
};
