import React, { useState } from "react";
import { auth } from "../firebase";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import {
  ErrMsg,
  Form,
  Input,
  SubTitle,
  Switcher,
  Title,
  Wrapper,
} from "../components/auth-components";
import GithubLoginBtn from "../components/GithubLoginBtn";
export default function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    console.log(email, password);
    if (isLoading || email === "" || password === "") {
      return;
    }
    try {
      setIsLoading(true);
      await signInWithEmailAndPassword(auth, email, password);

      navigate("/");
    } catch (err) {
      if (err instanceof FirebaseError) {
        console.error(err.message);
        setError(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Wrapper>
      <Title>오늘도 반가워요 👋</Title>
      <SubTitle>로그인 정보를 입력해주세요 :) </SubTitle>
      <Form onSubmit={onSubmit}>
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
        <Input type="submit" value={isLoading ? "loading..." : "로그인"} />
      </Form>
      <Switcher>
        아직 계정이 없으신가요? &nbsp;&nbsp;
        <Link to="/signup">회원가입 하러 가기 🤗</Link>
      </Switcher>
      <GithubLoginBtn />
    </Wrapper>
  );
}
