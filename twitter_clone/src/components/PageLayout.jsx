import { useState } from 'react';
import { theme } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  LoginOutlined,
  UserAddOutlined,
  LogoutOutlined,
  UserOutlined,
  ProfileOutlined,
  CaretDownOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button } from 'antd';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useStore } from 'react-redux';
import axios from 'axios';
import { appActions } from '../store/app.js';

export function PageLayout() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const user = useSelector((state) => state.app.user);
  const location = useLocation();
  const store = useStore();
  const navigation = useNavigate();
  // console.log(location.pathname);

  const userRoutes = user
    ? [
        {
          key: '/welcome',
          label: (
            <span>
              Welcome, {user.nickname} <CaretDownOutlined />
            </span>
          ),
          icon: <UserOutlined />,
          children: [
            {
              key: '/profile/' + user._id,
              icon: <ProfileOutlined />,
              label: <Link to={'/profile/' + user._id}>Profile</Link>,
            },
            {
              key: '/logout',
              icon: <LogoutOutlined />,
              label: 'Logout',
              onClick: async () => {
                await axios.get('/api/user/logout');
                store.dispatch(appActions.setUser(null));
                navigation('/login');
              },
            },
          ],
        },
      ]
    : [
        {
          key: '/login',
          icon: <LoginOutlined />,
          label: <Link to={'/login'}>Login</Link>,
        },
        {
          key: '/register',
          icon: <UserAddOutlined />,
          label: <Link to={'/register'}>Register</Link>,
        },
      ];

  return (
    <Layout className={'h-screen w-screen overflow-hidden'}>
      <Layout.Sider breakpoint="lg" collapsedWidth="0">
        <div className={'text-lg text-dark font-bold bg-amber-300 p-5 mb-4'}>{'TwitterApp'}</div>
        <Menu
          mode={'inline'}
          theme="dark"
          // mode="horizontal"
          selectedKeys={[location.pathname]}
          items={[
            {
              key: '/',
              icon: <HomeOutlined />,
              label: <Link to={'/'}>Home</Link>,
            },
            {
              key: '/search',
              icon: <SearchOutlined />,
              label: <Link to={'/search'}>Search</Link>,
            },
            ...userRoutes,
          ]}
        />
      </Layout.Sider>
      <Layout>
        <Layout.Content className={'mx-6 my-6 p-10 bg-white rounded overflow-auto'}>
          <Outlet />
        </Layout.Content>
      </Layout>
    </Layout>
  );
}
