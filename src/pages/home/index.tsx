import React from 'react';
import { Container, Button } from '@mui/material';
import { ThemeConfig } from '../../config/theme.config';

export const HomePage: React.FC<{}> = () =>{
    return(
        <Container sx={{mt:9}} maxWidth='xl'>
        <Button fullWidth variant='contained'>
          HomePage
        </Button>
      </Container>
    );
}