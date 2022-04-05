import { useState, useEffect, useReducer } from 'react';
import styled from 'styled-components';

import { Button } from '../Components/common/Button';
import Input from '../Components/common/Input';
import palette from '../lib/styles';
import registerReducer from '../reducer/registerRecuer';
import { BsCheckLg } from 'react-icons/bs';

const StyledRegisterBlock = styled.div`
  width: 400px;
  margin-top: 3rem;
  justify-content: center;
`;

const StyledButton = styled(Button)`
  margin-top: 1rem;
  background: ${palette.customColor.brandColor};
  color: ${palette.customColor.subColor};
`;

const StyledHeading = styled.h1`
  color: ${palette.customColor.subColor};
  text-align: center;
  margin-bottom: 1rem;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const StyledInput = styled(Input)`
  width: 100%;
  // pass되지 않은 input 경고
  border-bottom: ${({ helpMessage }) => (helpMessage ? '2px solid ' + palette.redColor.warning : '1px solid black')};
`;

const HelpMessage = styled.span`
  margin-left: 0.5rem;
  color: ${palette.redColor.warning};
  font-size: 0.8rem;
`;

const StyledBsCheckLg = styled(BsCheckLg)`
  position: absolute;
  right: 1rem;
  top: 1.2rem;
  color: ${palette.greenColor.pass};
`;

const Register = () => {
  const [inputs, dispatch] = useReducer(registerReducer, {
    id: {
      name: 'id',
      type: 'text',
      placeholder: '아이디',
      value: '',
      helpMessage: null,
      isPass: false,
    },
    password: {
      name: 'password',
      type: 'password',
      placeholder: '비밀번호',
      value: '',
      helpMessage: null,
      isPass: false,
    },
    confirmPassword: {
      name: 'confirmPassword',
      type: 'password',
      placeholder: '비밀번호 확인',
      value: '',
      helpMessage: null,
      isPass: false,
    },
    nickname: {
      name: 'nickname',
      type: 'text',
      placeholder: '닉네임',
      value: '',
      helpMessage: null,
      isPass: false,
    },
  });
  const { id, password, confirmPassword, nickname } = inputs;

  const onChange = e => {
    const { name, value } = e.target;
    dispatch({ type: 'onChange', name, value });
  };

  const onSubmit = e => {
    e.preventDefault();
    console.log(inputs);
    if (!id.isPass || !password.isPass || !confirmPassword.isPass || !nickname.isPass) {
      alert('서식을 알맞게 입력해주세요.');
    }
  };
  console.log(inputs);
  return (
    <StyledRegisterBlock className="page-container">
      <StyledHeading>Register</StyledHeading>
      <StyledForm onSubmit={onSubmit}>
        {Object.keys(inputs).map(key => {
          const { name, type, placeholder, value, helpMessage, isPass } = inputs[key];
          return (
            <div key={name} className="position-relative">
              <StyledInput
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}
                helpMessage={helpMessage}
                isPass={isPass}
                onChange={onChange}
              />
              {isPass && <StyledBsCheckLg />}
              {helpMessage && <HelpMessage>{helpMessage}</HelpMessage>}
            </div>
          );
        })}
        <StyledButton>회원가입</StyledButton>
      </StyledForm>
    </StyledRegisterBlock>
  );
};

export default Register;
