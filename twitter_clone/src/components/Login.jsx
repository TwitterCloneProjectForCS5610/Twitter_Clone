import { Link, useNavigate } from 'react-router-dom';
import { Button, Checkbox, Form, Input, message } from 'antd';
import React from 'react';
import { useStore } from 'react-redux';
import axios from 'axios';
import { appActions } from '../store/app.js';

export function Login() {
  const store = useStore();
  const navigate = useNavigate();

  return (
    <div className={'flex flex-col items-center'}>
      <h1 className={'mb-10'}>Login</h1>
      <Form
        name="basic"
        layout={'vertical'}
        initialValues={{ remember: true }}
        onFinish={async (values) => {
          await axios.post('/api/user/login', values);
          store.dispatch(appActions.setUser(await axios.get('/api/user/me')));
          navigate('/');
          message.success('Login success');
        }}
        autoComplete="off">
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'username is required' }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'password is required' }]}>
          <Input.Password />
        </Form.Item>
        <Form.Item className={'flex justify-center pt-10'}>
          <Button type="primary" htmlType="submit" size={'large'}>
            Login
          </Button>
          <Link to={'/register'} className={'ml-10'}>
            Register
          </Link>
        </Form.Item>
      </Form>
    </div>
  );
}
