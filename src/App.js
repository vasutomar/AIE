import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './components/Landing/Landing.component';
import Authentication from './components/Authentication/Authentication.component';

function App() {
  return (
    <BrowserRouter basename='/aie'>
      <Routes>
        <Route path="/landing" element={<Landing/>}/>
        <Route path="/auth" element={<Authentication/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
