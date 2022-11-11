import Link from 'next/link';
import type { NextPage } from 'next';
import React, { useState } from 'react';
import styled from 'styled-components';
import { isValidId, isValidPassword } from '../utilities';

const LoginPage: NextPage = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const [idErrors, setIdErrors] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState(false);

  
  const checkId = (id:string) => {
    if (isValidId(id)) {
      setIdErrors(false);
    } else {
      setIdErrors(true);
    }
  }

  const checkPassword = (password:string) => {
    if (isValidPassword(password)) {
      setPasswordErrors(false);
    } else {
      setPasswordErrors(true);
    }
  }


  const handleSubmit = async ( e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const postData = async () => {
      const data = {
        id: id,
        password: password,
      };

      const response = await fetch("/login", {
        method: "POST",
        body: JSON.stringify(data),
      });
      return response.json();
    };
    const result = await postData();
    console.log(result.data.user);
    // need to store it in the session and local storage

  }
  

  return (
    <>
      <Header>
        <Link href='/'>
          <Title>HAUS</Title>
        </Link>
        <Link href='/login'>
          <p>login</p>
        </Link>
      </Header>
      <Form onSubmit={handleSubmit}> 
        <TextLabel>아이디</TextLabel>
        <TextInput errors ={idErrors} type='text' value={id} onChange={(e) => {
          setId(e.target.value)
          if(isValidId(e.target.value)){
            setIdErrors(false)
          }
          }} onBlur ={(e) => checkId(e.target.value)} />
        {idErrors &&  <ErrorLabel>{"올바른 아이디 형식으로 입력해주세요."}</ErrorLabel>}
            <Divider/>
        <TextLabel>비밀번호</TextLabel>
        <TextInput errors={passwordErrors} type='password' value={password} onChange={(e) => {
          setPassword(e.target.value)
          if(isValidPassword(e.target.value)){
            setPasswordErrors(false)
          }
          }} onBlur ={(e) => checkPassword(e.target.value)} />
        {passwordErrors &&  <ErrorLabel>{"올바른 비밀번호 형식으로 입력해주세요."}</ErrorLabel>}
        <LoginButton type="submit" disabled ={!id || !password || idErrors || passwordErrors || !isValidId(id) || !isValidPassword(password)}>로그인</LoginButton>
      </Form>
    </>
  );
};

export default LoginPage;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const Title = styled.a`
  font-size: 48px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;

  margin-top: 40px;
  padding: 0 20px 40px;
`;

const Divider = styled.div`
height: 16px;
`

const TextLabel = styled.label`
font-weight: 800;
font-size: 13px;
color: #6c6c7d; 
`

interface Props {
  errors: boolean;
}

const TextInput = styled.input<Props>`
  margin-top: 8px;
  padding: 16px;
  background: ${props => props.errors ? "#fdedee" : "#f7f7fa"};
  border-radius: 12px;
`;

const ErrorLabel = styled.label`
margin-top: 8px;
font-weight: 400;
font-size: 13px;
color:#ed4e5c
`

const LoginButton = styled.button`
  margin-top: 40px;
  padding: 20px;
  border-radius: 12px;
  background-color: #222;
  color: #fff;

  &:disabled {
    background-color: #e2e2ea;
  }


`;
