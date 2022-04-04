import { useState, useEffect, useReducer } from 'react';
import styled from 'styled-components';

import { Button } from '../Components/common/Button';
import Input from '../Components/common/Input';
import palette from '../lib/styles';
import registerReducer from '../reducer/registerRecuer';
import checkRegExp from '../lib/checkRegExp';

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
  // pass되지 않은 input 경고
  border-bottom: ${({ helpMessage }) => (helpMessage ? '2px solid ' + palette.redColor.warning : '1px solid black')};
`;

const HelpMessage = styled.span`
  margin-left: 0.5rem;
  color: ${palette.redColor.warning};
  font-size: 0.8rem;
`;

const Register = () => {
  const [inputs, dispatch] = useReducer(registerReducer, [
    {
      name: 'id',
      type: 'text',
      placeholder: '아이디',
      value: '',
      helpMessage: null,
      isPass: false,
    },
    {
      name: 'password',
      type: 'password',
      placeholder: '비밀번호',
      value: '',
      helpMessage: null,
      isPass: false,
    },
    {
      name: 'confirmPassword',
      type: 'password',
      placeholder: '비밀번호 확인',
      value: '',
      helpMessage: null,
      isPass: false,
    },
    {
      name: 'nickname',
      type: 'text',
      placeholder: '닉네임',
      value: '',
      helpMessage: null,
      isPass: false,
    },
  ]);
  const [id, password, confirmPassword, nickname] = inputs;

  const onSubmit = e => {
    e.preventDefault();

    let emptyIndex = [];
    inputs.forEach((el, i) => {
      if (el.value === '') emptyIndex.push(i);
    });
    const checkPassword =
      password.value === confirmPassword.value && password.value !== '' && confirmPassword.value !== '';
    const regExp = checkRegExp(id.value, password.value, nickname.value);
    // regExp
    // regExp
    // regExp
    // regExp
    // regExp
    // regExp
    dispatch({ type: 'onSubmit', emptyIndex, checkPassword, regExp });
  };

  console.log(inputs);
  return (
    <StyledRegisterBlock className="page-container">
      <StyledHeading>Register</StyledHeading>
      <StyledForm onSubmit={onSubmit}>
        {inputs.map(props => {
          const { name, type, placeholder, value, helpMessage, isPass } = props;

          return (
            <div className="d-flex flex-column" key={name}>
              <StyledInput
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={e => {
                  const { name, value } = e.target;
                  dispatch({ type: 'onChange', name, value });
                }}
                helpMessage={helpMessage}
                isPass={isPass}
              />
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
