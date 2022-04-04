const checkRegExp = (id, password, nickname) => {
  // 영어 또는 숫자 6~20자
  console.log(id);
  let regTest = { id: false, password: false, nickname: false };
  const idReg = /^[a-zA-Z][0-9a-zA-Z]{5,20}$/;
  regTest.id = idReg.test(id);

  // 영어, 숫자 조합 8~16자
  const passwordReg = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/;
  regTest.password = passwordReg.test(password);

  const nickReg = /^[a-zA-Zㄱ-힣][a-zA-Zㄱ-힣 ]*$/;
  regTest.nickname = nickReg.test(nickname);

  return regTest;
};

export default checkRegExp;
