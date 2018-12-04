import React, { Fragment } from "react";
import { Nav, NavLink, NavItem } from "reactstrap";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";
import SignOut from "../components/Auth/SignOut";
// functional component example
// ToDo: implement sign with apoloClinetWrapper
const allLinks = [
  {
    name: "Home",
    url: "/",
    permission: "public"
  },
  {
    name: "Recipes",
    url: "/recipe",
    permission: "authorized"
  },
  {
    name: "Add Recipe",
    url: "/recipe/add",
    permission: "authorized"
  },
  {
    name: "Search",
    url: "/search",
    permission: "public"
  },
  {
    name: "Public",
    url: "Public",
    permission: "public"
  },
  {
    name: "Sign In",
    url: "/signin",
    permission: "unAuthorized"
  },
  {
    name: "Sign up",
    url: "/signup",
    permission: "unAuthorized"
  },
  {
    name: "Sign out",
    url: "/signout",
    permission: "authorized"
  },
  {
    name: "Profile",
    url: "/profile",
    permission: "authorized"
  }
];
const prepareNavLinks = session => {
  const linksForUser = allLinks.filter(link => {
    return (
      link.permission === "public" ||
      (link.permission === "authorized" && session && session.getCurrentUser) ||
      (link.permission === "unAuthorized" && session && !session.getCurrentUser)
    );
  });

  return linksForUser.map(link => (
    <NavItem key={link.name}>
      <NavLink tag={Link} to={link.url} key={link.name} active>
        {link.name}
      </NavLink>
    </NavItem>
  ));
};

export default ({ session }) => {
  return (
    <Fragment>
      <Nav className={styles["link-style"]}>
        {prepareNavLinks(session)}
        {session && session.getCurrentUser && <SignOut />}
      </Nav>
    </Fragment>
  );
};
