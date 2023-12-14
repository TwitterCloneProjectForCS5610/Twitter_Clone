import { useSelector, useStore } from 'react-redux';
import { useEffect, useState } from 'react';
import { appActions } from '../store/app.js';
import axios from 'axios';
import { Card } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { StatusCard } from './StatusCard.jsx';

export function StatusList({ uid }) {
  const list = useSelector((state) => state.app.list);
  const store = useStore();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    store.dispatch(appActions.setList([]));
  }, [store]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      store.dispatch(appActions.setList(await axios.get('/api/status', { params: { uid } })));
      setLoading(false);
    })();
  }, [store, uid]);

  return loading ? (
    <div>Loading...</div>
  ) : list.length ? (
    <div>
      {list.map((item) => (
        <StatusCard key={item._id} item={item} />
      ))}
    </div>
  ) : (
    <div>No statuses yet.</div>
  );
}
