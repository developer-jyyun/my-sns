import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === "name") {
      setUserName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(userName, email, password);
    if (isLoading || userName === "" || email === "" || password === "") {
      return;
    }
    try {
      setIsLoading(true);
      //계정 생성
      const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("credentials.user", credentials.user);
      //사용자 이름 저장하기
      await updateProfile(credentials.user, { displayName: userName });
      navigate("/");

      //사용자 프로필 이름 지정
      //홈페이지 리디렉션
    } catch (error) {
      console.error(error);
      //   setError()
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Wrapper>
      <Title>만나서 반가워요👋</Title>
      <SubTitle>계정 생성하기 </SubTitle>
      <Form onSubmit={onSubmit}>
        <Input
          name="name"
          value={userName}
          onChange={onChange}
          placeholder="Name"
          type="text"
        />
        <Input
          name="email"
          value={email}
          onChange={onChange}
          placeholder="Email"
          type="text"
        />
        <Input
          name="password"
          value={password}
          onChange={onChange}
          placeholder="password"
          type="password"
          required
        />
        {error !== "" ? <ErrMsg>{error}</ErrMsg> : null}
        {/* <ErrMsg>error</ErrMsg> */}
        <Input
          type="submit"
          value={isLoading ? "loading..." : "Create Account"}
        />
      </Form>
    </Wrapper>
  );
}

const ErrMsg = styled.p`
  font-weight: bold;
  background: pink;
  padding: 4px 20px;
  border-radius: 5px;
  color: tomato;
  margin: 10px auto;
  width: 100%;
  text-align: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 500px;
  height: 100vh;
`;
const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 2rem;
  font-weight: 600;
`;
const SubTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 2rem;
  font-weight: 600;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 100%;
`;
const Input = styled.input`
  width: 100%;
  padding: 10px 20px;
  border-radius: 50px;
  font-size: 15px;
  outline: none;
  border: 2px solid #eee;

  &[type="submit"] {
    cursor: pointer;    
    background: #fff19a;
    color: #001153;
    font-weight: 600;
    font-size: 24px;
    padding: 16px 20px;
}

    &:hover {
      opacity: 0.8;
    }
  }
`;
