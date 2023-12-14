import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './components/Home.jsx';
import { Login } from './components/Login.jsx';
import { PageLayout } from './components/PageLayout.jsx';
import { Register } from './components/Register.jsx';
import { useEffect } from 'react';
import { useStore } from 'react-redux';
import { appActions } from './store/app.js';
import axios from 'axios';
import { Profile } from './components/Profile.jsx';
import { Search } from './components/Search.jsx';

function App() {
  const store = useStore();
  useEffect(() => {
    (async () => {
      store.dispatch(appActions.setUser(await axios.get('/api/user/me')));
    })();
  }, [store]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageLayout />}>
          <Route index element={<Home />} />
          <Route path={'/search'} element={<Search />} />
          <Route path={'/profile/:id'} element={<Profile />} />
          <Route path={'/login'} element={<Login />} />
          <Route path={'/register'} element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
