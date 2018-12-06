import React from "react";
import UserInfo from "./UserInfo";
import withAuth from "../HOCS/withAuth";

const Profile = function({ session }) {
  return (
    <div>
      <UserInfo session={session} />
    </div>
  );
};

export default withAuth(session => session && session.getCurrentUser)(Profile);
