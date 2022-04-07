const useLogin = () => {
  axios({
    method: 'post',
    url: '/api/login',
    data: {
      id,
      password,
    },
  }).then(({ data }) => {
    if (data.success) {
      setUser(data.userInfo);
      closeLoginForm();
    } else return alert("That's not correct info");
  });
};

export default useLogin;
