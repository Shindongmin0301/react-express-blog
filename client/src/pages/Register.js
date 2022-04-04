import { useState, useEffect } from 'react';
import styled from 'styled-components';
import produce from 'immer';

import { Button } from '../Components/common/Button';
import Input from '../Components/common/Input';
import palette from '../lib/styles';

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
  const [inputs, setInputs] = useState([
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

  const message = {
    idAlreayExist: '이미 존재하는 아이디입니다.',
    idLengthErr: '아이디는 6~30자 안으로 정해주세요.',
    confirmPasswordErr: '비밀번호가 서로 달라요. 다시 확인 해주세요.',
    passwordLengthErr: '비밀번호는 8~30자 안으로 정해주세요.',
    nickAlreadyExist: '닉네임은 2~8자 안으로 정해주세요.',
    emptyInputErr: '빈칸을 채워주세요.',
  };

  const onChange = e => {
    setInputs(
      produce(draft => {
        draft.forEach(el => {
          if (el.name === e.target.name) {
            el.value = e.target.value;
          }
        });
      }),
    );
  };

  const onSubmit = e => {
    e.preventDefault();
    // helpMessage 초기화
    setInputs(
      produce(draft => {
        draft.forEach(input => {
          input.helpMessage = null;
        });
      }),
    );

    // 빈칸 에러
    if (!id || !password || !confirmPassword || !nickname) {
      setInputs(
        produce(draft => {
          draft.forEach(el => {
            if (el.value === '') el.helpMessage = message.emptyInputErr;
          });
        }),
      );
    }

    // password 확인 에러
    if (password.value !== confirmPassword.value) {
      setInputs(
        produce(draft => {
          draft.forEach(input => {
            if (input.name === 'password' || input.name === 'confirmPassword') {
            }
          });
        }),
      );
    }
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
                onChange={onChange}
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
