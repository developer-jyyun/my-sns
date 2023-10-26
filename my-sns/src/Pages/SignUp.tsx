import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import {
  ErrMsg,
  Form,
  Input,
  SubTitle,
  Switcher,
  Title,
  Wrapper,
} from "../components/auth-components";

// const errors ={
//     "auth/email-already-in-use":"이미 가입된 이메일 주소입니다."
// }

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
    setError("");
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
    } catch (err) {
      if (err instanceof FirebaseError) {
        console.log(err.code, err.message);
        setError(err.message);
      }
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
        <Input type="submit" value={isLoading ? "loading..." : "회원가입"} />
        <Switcher>
          이미 계정이 있으신가요? &nbsp;&nbsp;
          <Link to="/signin">로그인 하러 가기 🤗 </Link>
        </Switcher>
      </Form>
    </Wrapper>
  );
}
