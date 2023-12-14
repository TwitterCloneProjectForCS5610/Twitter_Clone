import { useParams } from 'react-router';
import { useSelector, useStore } from 'react-redux';
import { WriteStatus } from './WriteStatus.jsx';
import { StatusList } from './StatusList.jsx';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Input, message, Modal, Tooltip } from 'antd';
import { appActions } from '../store/app.js';
import { EditOutlined } from '@ant-design/icons';

export function Profile() {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ptext, setPtext] = useState('');

  const [profileUser, setProfileUser] = useState(null);
  const user = useSelector((state) => state.app.user);
  const store = useStore();

  useEffect(() => {
    (async () => {
      setProfileUser(await axios.get(`/api/user/${id}`));
    })();
  }, [id]);

  if (!profileUser) {
    return <div>Loading profile...</div>;
  }

  const profileText = profileUser.profile || '(no profile text yet)';

  return (
    <div>
      <div className={'p-4 bg-blue-100 border-2 border-blue-400 border-solid rounded-xl mb-5'}>
        <div className={'text-4xl font-bold'}>{profileUser.nickname}</div>
        <div className={'mb-4'}>
          @{profileUser.username}, joined at {new Date(profileUser.created_at).toLocaleString()}
        </div>
        {user?._id === profileUser._id ? (
          <Tooltip title={'click to update'}>
            <span
              className={'mb-4 cursor-pointer italic'}
              onClick={() => {
                setIsModalOpen(true);
                setPtext(profileUser.profile);
              }}>
              {profileText}
              <EditOutlined />
            </span>
          </Tooltip>
        ) : (
          <span className={'mb-4 italic'}>{profileText}</span>
        )}
      </div>

      {!!user && user._id === profileUser._id && <WriteStatus />}
      <StatusList uid={profileUser._id} />

      <Modal
        title="Update Profile"
        open={isModalOpen}
        onOk={async function () {
          const update = {
            profile: ptext,
          };
          await axios.put('/api/user/me', update);
          store.dispatch(appActions.setUser({ ...user, profile: ptext }));
          setProfileUser({
            ...profileUser,
            profile: ptext,
          });
          setIsModalOpen(false);
          message.success('Your profile updated');
        }}
        onCancel={() => setIsModalOpen(false)}>
        <Input.TextArea
          rootClassName={'mb-6'}
          showCount
          maxLength={500}
          value={ptext}
          onChange={(e) => setPtext(e.target.value)}
        />
      </Modal>
    </div>
  );
}
