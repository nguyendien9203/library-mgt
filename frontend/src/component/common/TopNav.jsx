import React, { useEffect, useState } from "react";
import "../../assets/style/TopBar.css";
import CategoryMenu from "./CategoryMenu";
import UserDropdown from "./UserDropdown";
import { useAuth } from "../context/AuthContext";

const TopNav = () => {
  const { isMember, isUserAuthenticated } = useAuth();
  const [member, setMember] = useState(isMember);
  const [authenticated, setAuthenticated] = useState(isUserAuthenticated());

  useEffect(() => {
    setMember(isMember);
    setAuthenticated(isUserAuthenticated());
  }
  , [isMember, isUserAuthenticated]);

  return (
    <div
      className="d-flex bg-white align-items-center p-3"
      style={{
        marginBottom: "50px",
        paddingTop: "10px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        height: "50px",
        justifyContent: (member || !authenticated) ? "space-between" : "flex-end"
      }}
    >
      {(member || !authenticated) && <CategoryMenu />}
      <UserDropdown />
    </div>

  );
};

export default TopNav;
