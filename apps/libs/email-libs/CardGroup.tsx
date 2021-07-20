import React from "react";

const CardGroup = ({ title, children }) => (
  <>
    <h3 style={{ marginBottom: 18 }}>{title}</h3>
    {children}
  </>
);

export { CardGroup };
