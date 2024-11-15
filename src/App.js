import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './components/Landing/Landing.component';
import Authentication from './components/Authentication/Authentication.component';
import Questions from './components/Questions/Questions.component';
import Home from './components/Home/Home.component';

function App() {
  return (
    <BrowserRouter basename='/aie'>
      <Routes>
        <Route path="/landing" element={<Landing/>}/>
        <Route path="/auth" element={<Authentication/>}/>
        <Route path="/questions" element={<Questions />}/>
        <Route path="/discussions" element={<Home page={'discussions'}/>}/>
        <Route path="/groups" element={<Home page={'groups'}/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
