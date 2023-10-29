import { Link, Outlet, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import styled from "styled-components";
import {
  RiLogoutCircleRLine,
  RiHomeHeartFill,
  RiUser3Fill,
} from "react-icons/ri";

export default function Layout() {
  const navigate = useNavigate();
  const onLogOut = async () => {
    const ok = confirm("로그아웃 하시겠습니까?");
    if (ok) {
      await auth.signOut();
      navigate("/signin");
    }
  };
  return (
    <Wrapper>
      <Nav>
        <Link to="/">
          <NavItem>
            <RiHomeHeartFill className="icon" />
          </NavItem>
        </Link>
        <Link to="/profile">
          <NavItem>
            <RiUser3Fill className="icon" />
          </NavItem>
        </Link>
        <NavItem onClick={onLogOut} className="log-out icon">
          <RiLogoutCircleRLine />
        </NavItem>
      </Nav>
      <RightLayout>
        <Outlet />
      </RightLayout>
    </Wrapper>
  );
}
const RightLayout = styled.div`
  width: 80%;
  height: 100vh;
  margin-left:20%;
  padding:4rem 0;
  }
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 860px;
`;

const Nav = styled.div`
  display: flex;
  flex-direction: column;
  width: 10%;
  align-items: center;
  gap: 20px;
  position: fixed;
`;

const NavItem = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid white;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  & .icon {
    font-size: 26px;
    fill: white;
  }
  &.log-out {
    border-color: tomato;
    svg {
      font-size: 26px;
      fill: tomato;
    }
  }
`;
