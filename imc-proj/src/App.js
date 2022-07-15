
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Connexion from './Views/Connexion/ConnexionComponent';
import Inscription from './Views/Inscription/InscriptionComponent';
import Menu from './Components/Menu/MenuComponent';
import Main from './Views/Main/MainComponent';
import Connect from './Views/Connect/ConnectComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function App() {
  return (
    <div className="App">
      
        <BrowserRouter>
        <Routes>
          <Route path="/connect" element={<Connect/>}/>
          <Route path="/inscription" element={<Inscription/>}/>
          <Route path="/Main" element={<Main/>}/>
          <Route path="/*" element={<Connect/>}/>
        </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
