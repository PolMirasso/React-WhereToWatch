import React from 'react';
import { Container, Button } from '@mui/material';
import { useNotification } from '../../context/notification.context';

export const HomePage: React.FC<{}> = () =>{
  const { getError} = useNotification()
  const handleClick = () =>{
    getError("Hola Error")
  }
  
    return(
      <Container sx={{mt:9}} maxWidth='xl'>
        <Button onClick={handleClick} fullWidth variant='contained'>
          HomePage
        </Button>
      </Container>
    );
    
}
export default HomePage;