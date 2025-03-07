import * as React from "react";
import { makeStyles, tokens } from "@fluentui/react-components";

import { getTables } from "./commands/getTables";
import { useAppContext } from "./context/AppContext";
import { Header } from "./pages/Mapping/components/Header";
import { useNavigationContext } from "./context/NavigationContext";
import { Mapping } from "./pages/Mapping/Mapping";
import { Pages } from "./consts";
import { Summary } from "./pages/Summary/Summary";
import { Splash } from './pages/Splash/Splash';

interface AppProps {
  title: string;
}

const useStyles = makeStyles({
  root: {
    background: tokens.colorNeutralBackground2,
    height: "100%",
    margin: "0",
    padding: "0",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    gap: "0",
  },
  pageContainer: {
    flex: 1,
    overflow: "auto",
  },
});

export const App: React.FC<AppProps> = () => {
  const styles = useStyles();
  const { setTables, setSelectedTable } = useAppContext();
  const { currentPage } = useNavigationContext();

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
      <div className={styles.pageContainer}>
        {currentPage === Pages.SPLASH && <Splash />}
        {currentPage === Pages.MAPPING && <Mapping />}
        {currentPage === Pages.SUMMARY && <Summary />}
      </div>
    </div>
  );
};
