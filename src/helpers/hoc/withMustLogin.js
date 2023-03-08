import React from "react";

import { useAuthContext } from "../../context/AuthContext";

import { ProfileButton } from "../../containers/auth/ProfileButton";

export const withMustLogin = (Component) => {
  const Memo = React.memo(Component);

  // eslint-disable-next-line react/display-name
  return (props = {}) => {
    const { currentAccount } = useAuthContext();

    if (!currentAccount) {
      return props.children || <ProfileButton text={"Log In"}></ProfileButton>;
    }

    return <Memo {...props} />;
  };
};
