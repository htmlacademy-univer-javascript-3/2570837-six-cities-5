import { Link } from 'react-router-dom';

export default function NotFoundScreen():JSX.Element {
  return (
    <div>
      <h1>404 Not Found</h1>
      <Link to="/"> Go back to Main</Link>
    </div>
  );
}
