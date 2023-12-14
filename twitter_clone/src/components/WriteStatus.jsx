import { useSelector, useStore } from 'react-redux';
import axios from 'axios';
import { appActions } from '../store/app.js';
import { Button, Form, Input, message, Upload } from 'antd';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { imgToB64 } from '../utils/index.js';

export function WriteStatus() {
  const store = useStore();
  const user = useSelector((state) => state.app.user);

  const [img, setImg] = useState('');
  const [key, setKey] = useState(Date.now());
  // console.log(img);

  return (
    <div className={'p-4 bg-amber-100 border-2 border-amber-400 border-solid rounded-xl'}>
      <h3>Write Status</h3>
      <Form
        key={key}
        name="basic"
        layout={'vertical'}
        initialValues={{ remember: true }}
        onFinish={async (values) => {
          const s = await axios.post('/api/status', {
            ...values,
            image: img,
          });
          store.dispatch(
            appActions.addToList({
              ...s,
              created_by: user,
            }),
          );
          message.success('New status added');
          setKey(Date.now());
        }}
        autoComplete="off">
        <Form.Item
          label="Text"
          name="text"
          rules={[{ required: true, message: 'text is required' }]}>
          <Input.TextArea showCount maxLength={140} />
        </Form.Item>
        <Form.Item name="files">
          <Upload
            listType="picture"
            accept={'image/*'}
            // fileList={fileList}
            multiple={false}
            maxCount={1}
            onChange={(info) => {
              // console.log(info);
              if (info.fileList.length) {
                imgToB64(info.fileList[0].originFileObj).then(setImg);
              } else {
                setImg('');
              }
            }}
            beforeUpload={() => false}>
            <Button icon={<UploadOutlined />}>Attach image...</Button>
          </Upload>
        </Form.Item>

        <Form.Item className={'flex'}>
          <Button type="primary" htmlType="submit" size={'large'}>
            Post
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
