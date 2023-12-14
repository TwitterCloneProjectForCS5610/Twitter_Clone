import React, { useState } from 'react';
import {
  AutoComplete,
  Button,
  Cascader,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  message,
} from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { appActions } from '../store/app.js';
import { useStore } from 'react-redux';

const { Option } = Select;

export function Register() {
  const store = useStore();
  const navigate = useNavigate();

  return (
    <div className={'flex flex-col items-center'}>
      <h1 className={'mb-10'}>Register</h1>
      <Form
        name="basic"
        layout={'vertical'}
        initialValues={{ remember: true }}
        onFinish={async (values) => {
          await axios.post('/api/user/register', values);
          store.dispatch(appActions.setUser(await axios.get('/api/user/me')));
          navigate('/');
          message.success('Register success');
        }}
        autoComplete="off">
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'username is required' }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Nickname"
          name="nickname"
          rules={[{ required: true, message: 'nickname is required' }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'password is required' }]}>
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Confirm Password"
          name="confirm"
          rules={[
            { required: true, message: 'confirm password is required' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('passwords not match!'));
              },
            }),
          ]}>
          <Input.Password />
        </Form.Item>
        <Form.Item className={'flex justify-center pt-10'}>
          <Button type="primary" htmlType="submit" size={'large'}>
            Register
          </Button>
          <Link to={'/login'} className={'ml-10'}>
            Already have an account?
          </Link>
        </Form.Item>
      </Form>
    </div>
  );
}
