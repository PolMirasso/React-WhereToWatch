import './App.css'
import {BrowserRouter} from 'react-router-dom'
import { AppRouter } from './Router'; 
import { Container, Button } from '@mui/material';
import { NavBar } from './common/NavBar';

function App() {
  return (
    <BrowserRouter>
      <AppRouter/>
    </BrowserRouter>
  )
}

export default App
