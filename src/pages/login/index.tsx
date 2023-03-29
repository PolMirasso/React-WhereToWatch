import React from 'react';
import { Container, Button, Grid } from '@mui/material';
import Paper from '@mui/material/Paper/Paper';
import Box from '@mui/material/Box/Box';
import Typography from '@mui/material/Typography/Typography';
import TextField from '@mui/material/TextField';
import { ThemeConfig } from '../../config/theme.config';

type LoginType = {
  username: string,
  password: string,
} 

export const LoginPage: React.FC<{}> = () =>{
  const [loginData,setLoginData] = React.useState<LoginType>({
    username:"",
    password:"",
  })

  const dataLogin =(e: React.ChangeEvent<HTMLInputElement>)=>{  
    setLoginData({...loginData,[e.target.name]:e.target.value})
  };

  const handleSubmit = async (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    console.log(loginData);
    try {
      const response = await fetch("http://127.0.0.1:8000/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          username: loginData.username,
          password: loginData.password,
        }).toString(),
      });
      const data = await response.json();
      
    } catch (error) {
      console.error("Login Error:", error);
    }
  }

  return(
    <ThemeConfig>
      <Container maxWidth="sm">
        <Grid 
        container 
        direction="column" 
        alignItems="center" 
        justifyContent="center" 
        sx={{ minHeight: "100vh" }}>
          <Grid item>
            <Paper sx={{ padding:"1.2em", borderRadius:"0.5em" }}>
              <Typography variant="h4">Iniciat Sessió</Typography>
                <Box component="form" onSubmit={handleSubmit}>
                  <TextField 
                    name='username'
                    margin='normal' 
                    fullWidth 
                    label="Username" 
                    type="text" 
                    sx={{mt:2,mb:1.5}} 
                    required
                    onChange={dataLogin}
                    />
                  <TextField 
                    name='password'
                    margin='normal' 
                    fullWidth 
                    label="Password" 
                    type="password" 
                    sx={{mt:1.5,mb:1.5}} 
                    required
                    onChange={dataLogin}
                    /> 
                <Button fullWidth type="submit" variant='contained' sx={{mt:1.5,mb:3}}>Iniciar Sessió</Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>  
      </Container>
    </ThemeConfig>
  );
}