import produce from 'immer';
import checkRegExp from '../lib/checkRegExp';

const message = {
  idAlreayExist: '이미 존재하는 아이디입니다.',
  idLengthErr: '아이디는 영문과 숫자로 6~30자 안으로 정해주세요.',
  confirmPasswordHelp: '비밀번호가 서로 달라요. 다시 확인 해주세요.',
  passwordHelp: '비밀번호는 영어,숫자,특수문자로 8~30자 안으로 정해주세요.',
  nicknameHelp: '닉네임은 한글,영어 또는 숫자로 2~16자 안으로 정해주세요.',
  emptyInputErr: '빈칸을 채워주세요.',
};

const registerReducer = (state, action) => {
  switch (action.type) {
    case 'initailizeState':
      return produce(state, draft => {
        Object.keys(draft).forEach(key => {
          draft[key].helpMessage = null;
        });
      });

    case 'onChange':
      return produce(state, draft => {
        Object.keys(draft).forEach(key => {
          draft[key].helpMessage = null;
          draft[key].isPass = false;
        });

        draft[action.name].value = action.value;

        const idTest = checkRegExp.id(draft.id.value);
        const passwordTest = checkRegExp.password(draft.password.value);
        const nicknameTest = checkRegExp.nickname(draft.nickname.value);
        // id reg
        if (!idTest && draft.id.value.length > 0) {
          draft.id.helpMessage = message.idLengthErr;
        } else if (idTest) {
          draft.id.isPass = true;
        } else {
          draft.id.helpMessage = null;
        }

        // password reg
        if (!passwordTest && draft.password.value.length > 0) {
          draft.password.helpMessage = message.passwordHelp;
        } else if (passwordTest) {
          draft.password.isPass = true;
        } else {
          draft.password.helpMessage = null;
        }

        // password comfirm
        if (draft.password.value !== draft.confirmPassword.value && draft.confirmPassword.value.length > 0) {
          draft.confirmPassword.helpMessage = message.confirmPasswordHelp;
        } else if (draft.password.value === draft.confirmPassword.value) {
          draft.confirmPassword.isPass = true;
        } else {
          draft.confirmPassword.helpMessage = null;
        }

        //nickname reg
        if (!nicknameTest && draft.nickname.value.length > 0) {
          // nickname reg
          draft.nickname.helpMessage = message.nicknameHelp;
        } else if (nicknameTest) {
          draft.nickname.isPass = true;
        } else {
          draft.nickname.helpMessage = null;
        }
      });
  }
};

export default registerReducer;
