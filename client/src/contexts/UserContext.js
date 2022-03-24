import { createContext, useCallback, useState } from 'react';

const UserContext = createContext({
  user: {},
  setUser: () => {},
});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const value = {
    user,
    setUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

const { Consumer: UserConsumer } = UserContext;
export { UserProvider, UserConsumer };

export default UserContext;
