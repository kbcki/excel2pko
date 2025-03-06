import * as React from "react";
import { Button } from "@fluentui/react-components";

export const SummaryButtons = () => {
  const onSaveClick = React.useCallback(() => {
    navigator.clipboard.writeText("Hello, world!");
    // //
    // var element = document.createElement("a");
    // element.setAttribute("href", "data:text/plain;charset=utf-8," + "");
    // element.setAttribute("download", "filename.csv");

    // element.style.display = "none";
    // document.body.appendChild(element);

    // console.log("click");

    // element.click();

    // document.body.removeChild(element);
  }, []);

  return (
    <div>
      <Button onClick={onSaveClick}>Zapisz</Button>
    </div>
  );
};
