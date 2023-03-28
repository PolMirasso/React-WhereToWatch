import React from 'react';
import { Container, Button } from '@mui/material';

export const HomePage: React.FC<{}> = () =>{
    return(
        <Container sx={{mt:9}} maxWidth='xl'>
        <Button fullWidth variant='contained'>
          HomePage
        </Button>
      </Container>
    );
}