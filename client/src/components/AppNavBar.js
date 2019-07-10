import React, { useState, useEffect } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { useStoreActions, useStoreState } from "easy-peasy";
import Login from "../components/users/Login";
import Register from "../components/users/Register";
import CartQuantity from "./hooks/CartQuantity";

const AppNavBar = () => {
  const authed = useStoreState(state => state.authed);
  const user = useStoreState(state => state.user);
  const { logOut } = useStoreActions(actions => ({
    logOut: actions.logOut
  }));

  const [toggle, settoggle] = useState(false);

  const logout = () => {
    logOut();
  };

  useEffect(() => {}, [user]);
  return (
    <div>
      <Navbar color="primary" light expand="md">
        <NavbarBrand href="/">
          <img src="" style={{ width: 100, marginTop: -7 }} alt="" />
          BookStore
        </NavbarBrand>
        <NavbarToggler onClick={() => settoggle(!toggle)} />
        <Collapse isOpen={toggle} navbar>
          <Nav className="ml-auto" navbar style={{ fontSize: "20px" }}>
            {authed ? (
              <>
                <NavItem style={{ cursor: "pointer" }}>
                  <NavLink onClick={() => window.location.replace("/")}>
                    <i className="fab fa-person" />
                    {`Welcome ${user.name}`}
                  </NavLink>
                </NavItem>

                <NavItem style={{ cursor: "pointer" }}>
                  <NavLink onClick={() => logout()}>
                    <i className="fab fa-github" />
                    Logout
                  </NavLink>
                </NavItem>

                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    <i className="fa fa-shopping-cart">
                      Cart ({CartQuantity()})
                    </i>
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                      <NavLink onClick={() => window.location.replace("/cart")}>
                        <i className="fa fa-shopping-cart">
                          Cart ({CartQuantity()})
                        </i>
                      </NavLink>
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>
                      <NavLink
                        onClick={() => window.location.replace("/checkout")}
                      >
                        Proceed to Checkout
                      </NavLink>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </>
            ) : (
              <>
                <NavItem style={{ cursor: "pointer" }}>
                  <NavLink onClick={() => window.location.replace("/")}>
                    Dashboard
                  </NavLink>
                </NavItem>
                <NavItem>
                  <Login />
                </NavItem>
                <NavItem>
                  <Register opened={false} />
                </NavItem>
              </>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};
export default AppNavBar;
