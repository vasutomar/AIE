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
        <Route path="/groups" element={<Home page={'groups'} subPage={'your-groups'}/>}/>
        <Route path="/groups/select" element={<Home page={'groups'} subPage={'select-group'}/>}/>
        <Route path="/groups/create" element={<Home page={'groups'} subPage={'create-group'}/>}/>
        <Route path="/groups/session/:groupId" element={<Home page={'groups'} subPage={'group-call'}/>}/>
        <Route path="/construction/:feature" element={<Home page={'construction'}/>}/>
        <Route path="/todo" element={<Home page={'todo'}/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
