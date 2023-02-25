import React from "react";

export const withDimensionAdminContext = (Component) => {
  const Memo = React.memo(Component);

  // query roles and permissions here

  // eslint-disable-next-line react/display-name
  return () => {
    return <Memo />;
  };
};
export const DimensionAdminContent = () => {
  return <>admin</>;
};

export const DimensionAdmin = withDimensionAdminContext(DimensionAdminContent);
