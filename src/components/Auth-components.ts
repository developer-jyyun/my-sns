import styled from "styled-components";

export const Switcher = styled.p`
  margin: 30px auto 0;
  a {
    background: #4672bd;
    padding: 5px;
    border-radius: 5px;
    text-decoration: none;
    color: #fff;
    &:hover {
      background: #0657e2;
    }
  }
`;
export const ErrMsg = styled.p`
  font-weight: bold;
  background: pink;
  padding: 4px 20px;
  border-radius: 10px;
  color: tomato;
  margin: 10px auto;
  width: 100%;
  text-align: center;
`;
export const Title = styled.h1`
  font-size: 2.4rem;
  margin-bottom: 2rem;
  font-weight: 600;
`;
export const SubTitle = styled.h2`
  font-size: 1.4rem;
  margin-bottom: 2rem;
  font-weight: 600;
`;
export const Input = styled.input`
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
    font-size: 1.4rem;
    padding: 16px 20px;
}

    &:hover {
      opacity: 0.8;
    }
  }
`;
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 100%;
`;
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 500px;
  width: 95%;
  height: 100vh;
`;
