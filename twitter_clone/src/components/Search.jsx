import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Input } from 'antd';

export function Search() {
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);

  useEffect(() => {
    if (!q) {
      setLoading(false);
      setList([]);
      return;
    }
    let canceled = false;
    (async () => {
      setLoading(true);
      const users = await axios.get('/api/users', { params: { q } });
      if (canceled) {
        return;
      }
      setLoading(false);
      setList(users);
    })();

    return () => {
      canceled = true;
    };
  }, [q]);

  return (
    <div>
      <h1>Search User</h1>
      <Input
        rootClassName={'mb-5'}
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={'Type to search...'}
      />
      {list.length ? (
        <ol className={'mt-5'}>
          {list.map((v) => (
            <li key={v._id}>
              <Link to={'/profile/' + v._id}>
                {v.nickname}@{v.username}
              </Link>
            </li>
          ))}
        </ol>
      ) : loading ? (
        <div>Loading...</div>
      ) : q ? (
        <div>No result</div>
      ) : null}
    </div>
  );
}
