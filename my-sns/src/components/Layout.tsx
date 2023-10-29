import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import {
  RiLogoutCircleRLine,
  RiHomeHeartFill,
  RiUser3Fill,
} from "react-icons/ri";
import { auth } from "../firebase";

export default function Layout() {
  const navigate = useNavigate();
  const onLogout = async () => {
    const ok = confirm("로그아웃 하시겠습니까?");
    if (ok) {
      await auth.signOut();
      navigate("/signin");
    }
    console.log("logout");
  };
  return (
    <div>
      <h1> layout</h1>
      <Outlet />
      <Wrapper>
        <Nav>
          <NavItem>
            <Link to="/">
              <RiHomeHeartFill />
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/profile">
              <RiUser3Fill />
            </Link>
          </NavItem>
          <NavItem className="logout">
            <RiLogoutCircleRLine onClick={onLogout} />
          </NavItem>
        </Nav>
      </Wrapper>
    </div>
  );
}

const NavItem = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #fff;
  border-radius: 50px;
  width: 50px;
  height: 50px;
  font-size: 20px;
  & a {
    color: #fff;
  }
  &.logout {
    border-color: OrangeRed;
    color: OrangeRed;
  }
`;

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 14px;
`;

const Wrapper = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr 4fr;
  padding: 50px 0;
  width: 100%;
  max-width: 860px;
  height: 100%;
`;
