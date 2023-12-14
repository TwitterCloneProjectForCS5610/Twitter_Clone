import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Card, Input, message, Modal, Popconfirm } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useStore } from 'react-redux';
import axios from 'axios';
import { appActions } from '../store/app.js';
import { useState } from 'react';

export function StatusCard({ item: { _id, image, text, created_by, created_at } }) {
  const user = useSelector((state) => state.app.user);
  const store = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [utext, setUtext] = useState(text);
  const navigate = useNavigate();

  return (
    <Card
      className={'my-5'}
      cover={image ? <img alt="img" src={image} /> : null}
      actions={
        created_by._id === user?._id
          ? [
              <EditOutlined
                key="edit"
                onClick={() => {
                  setIsModalOpen(true);
                  setUtext(text);
                }}
              />,
              <Popconfirm
                key="delete"
                title="Delete status"
                description="Are you sure?"
                onConfirm={async () => {
                  await axios.delete('/api/status/' + _id);
                  store.dispatch(appActions.removeFromList(_id));
                }}
                okText="Yes"
                cancelText="No">
                <DeleteOutlined />
              </Popconfirm>,
            ]
          : null
      }>
      <Card.Meta
        title={text}
        description={
          <div>
            created by
            <Link
              to={`/profile/${created_by._id}`}>{`${created_by.nickname}@${created_by.username}`}</Link>
            , posted at
            <span>{new Date(created_at).toLocaleString()}</span>
          </div>
        }
      />
      <Modal
        title="Update Text"
        open={isModalOpen}
        onOk={async function () {
          if (utext === '') {
            message.warning('Please input updated text');
            return;
          }
          const update = {
            text: utext,
          };
          await axios.put('/api/status/' + _id, update);
          store.dispatch(appActions.updateListItem({ id: _id, update: update }));
          setIsModalOpen(false);
          message.success('Status updated');
        }}
        onCancel={() => setIsModalOpen(false)}>
        <Input.TextArea
          rootClassName={'mb-6'}
          showCount
          maxLength={140}
          value={utext}
          onChange={(e) => setUtext(e.target.value)}
        />
      </Modal>
    </Card>
  );
}
