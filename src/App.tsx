import './App.css';
import { useAuth } from './context/auth-context';
import { Home } from './views/Home/Index'
import { Login } from './views/Login';

function App() {
  const { user } = useAuth()

  return (
    <div className="App">
      {user ? <Home /> : <Login />}
    </div>
  );
}

export default App;
