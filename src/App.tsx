import './css/global.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MainPagesContainer } from './components/navigation/MainPagesContainer';
import { LoginPage } from './components/login/LoginPage';
import { RegisterPage } from './components/register/RegisterPage';

const App = () => {
  return (
    <Router>
      <div className="app-header">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<MainPagesContainer />}/>
        </Routes>
      </div>
    </Router>
  )
}

export default App;
