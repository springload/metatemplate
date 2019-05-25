import * as React from "react";

type Props = {
  width: "fixed" | "fluid";
  children?: React.ReactNode;
};

const constants = {
  width: { fixed: "g-flex-container", fluid: "g-flex-container-fluid" }
};
export default ({ width, children }: Props) => (
  <div className={constants.width[width] || ""}>
    {children !== undefined ? (
      children
    ) : (
      <React.Fragment>Rows...</React.Fragment>
    )}
  </div>
);
