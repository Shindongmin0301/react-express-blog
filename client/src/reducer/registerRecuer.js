import produce from 'immer';

const message = {
  idAlreayExist: '이미 존재하는 아이디입니다.',
  idLengthErr: '아이디는 6~30자 안으로 정해주세요.',
  confirmPasswordErr: '비밀번호가 서로 달라요. 다시 확인 해주세요.',
  passwordLengthErr: '비밀번호는 8~30자 안으로 정해주세요.',
  nickAlreadyExist: '닉네임은 2~8자 안으로 정해주세요.',
  emptyInputErr: '빈칸을 채워주세요.',
};

const registerReducer = (state, action) => {
  switch (action.type) {
    case 'onChange':
      return produce(state, draft => {
        const input = draft.find(input => input.name === action.name);
        input.value = action.value;
      });

    case 'onSubmit':
      return produce(state, draft => {
        // 에러 유도 초기화
        draft.forEach(el => {
          el.helpMessage = null;
        });
        if (!action.checkPassword) {
          draft.forEach((el, i) => {
            if (el.name === 'confirmPassword') {
              draft[i - 1].helpMessage = message.confirmPasswordErr;
              draft[i].helpMessage = message.confirmPasswordErr;
            }
          });
        }

        action.emptyIndex.map(index => {
          draft[index].helpMessage = message.emptyInputErr;
        });
      });
  }
};

export default registerReducer;
