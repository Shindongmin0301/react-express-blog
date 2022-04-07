import { useState, useEffect, useReducer } from 'react';
import styled from 'styled-components';

import axios from 'axios';
import { Button } from '../Components/common/Button';
import Input from '../Components/common/Input';
import palette from '../lib/styles';
import registerReducer from '../reducer/registerRecuer';
import { BsCheckLg } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
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

  const isExistId = id => {
    if (id.isPass) {
      axios({
        method: 'POST',
        url: '/api/user/findId',
        data: { id: id.value },
      })
        .then(({ data }) => {
          if (!data.success) {
            dispatch({ type: 'AlreadyExistId' });
          }
        })
        .catch(e => {
          console.log(e);
        });
    }
  };
  const isExistNickname = nickname => {
    if (nickname.isPass) {
      axios({
        method: 'POST',
        url: '/api/user/find-nickname',
        data: { nickname: nickname.value },
      }).then(({ data }) => {
        if (!data.success) {
          dispatch({ type: 'AlreadyExistNickname' });
        }
      });
    }
  };

  const onChange = e => {
    const { name, value } = e.target;
    dispatch({ type: 'onChange', name, value });
  };

  const onSubmit = e => {
    e.preventDefault();
    if (!id.isPass || !password.isPass || !confirmPassword.isPass || !nickname.isPass) {
      alert('서식을 알맞게 입력해주세요.');
    }
    axios({
      method: 'POST',
      url: '/api/user/register',
      data: {
        id: id.value,
        password: password.value,
        confirmPassword: confirmPassword.value,
        nickname: nickname.value,
      },
    }).then(({ data }) => {
      if (data.success) {
        alert('회원가입 되었습니다. 홈화면에서 로그인 해주세요.');
        navigate('/');
      }
    });
  };

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
                onBlur={
                  name === 'id'
                    ? () => isExistId(id)
                    : null || name === 'nickname'
                    ? () => isExistNickname(nickname)
                    : null
                }
              />
              {isPass && !helpMessage && <StyledBsCheckLg />}
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
