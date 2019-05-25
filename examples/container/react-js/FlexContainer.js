import React from "react";

const constants = {
  width: { fixed: "g-flex-container", fluid: "g-flex-container-fluid" }
};
export default ({ width, children }) => (
  <div className={constants.width[width] || ""}>
    {children !== undefined ? (
      children
    ) : (
      <React.Fragment>Rows...</React.Fragment>
    )}
  </div>
);
