import { useSelector } from 'react-redux';
import { WriteStatus } from './WriteStatus.jsx';
import { StatusList } from './StatusList.jsx';

export function Home() {
  const user = useSelector((state) => state.app.user);

  return (
    <div>
      <h1>Welcome to TwitterApp</h1>
      {!!user && <WriteStatus />}
      <StatusList />
    </div>
  );
}
