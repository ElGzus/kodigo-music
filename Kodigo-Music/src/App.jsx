import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Welcome } from './components/Welcome';
import HomePage from './components/HomePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/HomePage" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
