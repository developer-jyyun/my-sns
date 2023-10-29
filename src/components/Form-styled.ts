import styled from "styled-components";
export const SubmitBtn = styled.input`
  cursor: pointer;
  background: #fff4ac;
  padding: 10px 0;
  color: #001153;
  font-weight: bold;
  border: 2px solid #fff;
  border-radius: 20px;
  font-size: 16px;
  text-align: center;
  outline: none;
  &:hover,
  &:active {
    background: #fff19a;
  }
`;

export const LabelBtn = styled.label`
  cursor: pointer;
  background: #5fa578;
  display: block;
  padding: 10px 0;
  color: #edffe9;
  font-weight: bold;
  text-align: center;
  border: 2px solid #edffe9;
  border-radius: 50px;
  font-size: 16px;
  text-transform: uppercase;
  &:hover,
  &:active {
    color: #fff;
    border: 2px solid #fff;
  }
`;
export const FileInput = styled.input`
  display: none;
`;
export const Input = styled.input`
width: 100%;
padding:20px;
font-size: 15px;
border-radius: 5px;
background-color: #eee;
border: 2px solid #fff;
color: #333;
&:focus {
  outline: none;
  border-color: #edffe9;

`;
export const Textarea = styled.textarea`
  width: 100%;
  padding:20px;
  margin-top:10px;
  font-size: 15px;
  border-radius: 5px;
  background-color: #eee;
  border: 2px solid #fff;
  color: #333;
  &:focus {
    outline: none;
    border-color: #edffe9;

`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const FormTitle = styled.h2`
  font-size: 1.4rem;
  font-weight: bold;
  color: #fff;
  display: inline-block;
  padding: 10px;
`;
