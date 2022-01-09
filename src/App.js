import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux';
import {store, persistor} from './store';

import Pokemon from './page/Pokemon';
import Login from './page/Login';
import View from './page/View';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor} >
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/pokemon' element={<Pokemon/>} />
            <Route path='/pokemon/:pokemonID' element={<View />}/>
          </Routes>
        </BrowserRouter>    
      </PersistGate>
    </Provider>
  );
}

export default App;
