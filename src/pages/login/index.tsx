import React from 'react';
import { Container, Button } from '@mui/material';

export const LoginPage: React.FC<{}> = () =>{
    return(
        <Container sx={{mt:9}} maxWidth='xl'>
        <Button fullWidth variant='contained'>
          LoginPage
        </Button>
      </Container>
    );
}