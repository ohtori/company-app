import React, { Suspense, lazy, useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { IUser, IAuthContext } from './appInterfaces';
import PageLoader from './components/Loader';

const Admin = lazy(() => import('./pages/Admin'));
const Main = lazy(() => import('./pages/Main'));

export const AuthContext = React.createContext({} as IAuthContext);

function App(): JSX.Element {
  const [globalAuth, setGlobalAuth] = useState({token: '', role: 'User'});

  const login = (user: IUser) => {
    setGlobalAuth(user);
  }

  const logout = () => {
    setGlobalAuth({token: '', role: 'User'});
    localStorage.removeItem('currentUser');
  }

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser')!);
    if (user) {
      login(user);
    }
  }, []);

  return (
    <BrowserRouter>
      <AuthContext.Provider value={{
        token: globalAuth.token, 
        role: globalAuth.role, 
        login, 
        logout
      }}>
        <Suspense fallback={<PageLoader />}>
          <Switch>
            <Route path="/administrator" component={Admin} />
            <Route path="/" component={Main} />
          </Switch>
        </Suspense>
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
