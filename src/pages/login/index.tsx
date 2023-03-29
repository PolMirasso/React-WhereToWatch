import React from 'react';
import { Container, Button, Grid } from '@mui/material';
import Paper from '@mui/material/Paper/Paper';
import Box from '@mui/material/Box/Box';
import Typography from '@mui/material/Typography/Typography';
import TextField from '@mui/material/TextField';

export const LoginPage: React.FC<{}> = () =>{
    return(
      <Container maxWidth="sm">
        <Grid 
        container 
        direction="column" 
        alignItems="center" 
        justifyContent="center" 
        sx={{ minHeight: "90vh" }}>
          <Grid item>
            <Paper sx={{ padding:"1.2em", borderRadius:"0.5em" }}>
              <Typography variant='h4'>Inicia Sessió</Typography>
              <Box component="form">
                <TextField />
                <TextField />
                <Button type="submit">Iniciar Sessió</Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>  
      </Container>
    );
}