import Navbar from './Component/Header/Navbar';
import './App.css';
import MainHeader from './Component/Header/MainHeader';
import Login from './Component/Header/Login';

function App() {
  return (
    <div className="App">
      <Navbar />
      <MainHeader />
      <Login />
    </div>
  );
}

export default App;
