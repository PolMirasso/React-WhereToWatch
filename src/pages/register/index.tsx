import React from 'react';
import { Container, Button, Grid, Input } from '@mui/material';
import Paper from '@mui/material/Paper/Paper';
import Box from '@mui/material/Box/Box';
import Typography from '@mui/material/Typography/Typography';
import TextField from '@mui/material/TextField';
import { ThemeConfig } from '../../config/theme.config';

type RegisterType = {
  username: string,
  password: string,
} 

export const RegisterPage: React.FC<{}> = () =>{
  const [registerData,setRegisterData] = React.useState<RegisterType>({
    username:"",
    password:"",
  })

  const dataRegister =(e: React.ChangeEvent<HTMLInputElement>)=>{  
    setRegisterData({...registerData,[e.target.name]:e.target.value})
  };

  const handleSubmit = async (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    console.log(registerData);
    try {
      const response = await fetch("http://127.0.0.1:8000/api/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          username: registerData.username,
          password: registerData.password,
        }).toString(),
      });
      const data = await response.json();
      
    } catch (error) {
      console.error("Register Error:", error);
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
                <Typography variant="h4">Registra una compta</Typography>
                <Box component="form" onSubmit={handleSubmit}>
                    <TextField 
                    name='username'
                    margin='normal' 
                    fullWidth 
                    label="Username" 
                    type="text" 
                    sx={{mt:2,mb:1.5}} 
                    required
                    onChange={dataRegister}
                    />
                    <TextField 
                    name='password'
                    margin='normal' 
                    fullWidth 
                    label="Password" 
                    type="password" 
                    sx={{mt:1.5,mb:1.5}} 
                    required
                    onChange={dataRegister}
                    /> 
                    <TextField 
                    name='email'
                    margin='normal' 
                    fullWidth 
                    label="Email" 
                    type="email" 
                    sx={{mt:2,mb:1.5}} 
                    required
                    onChange={dataRegister}
                    />
                    <TextField 
                    name='age'
                    margin='normal' 
                    fullWidth 
                    label="Age" 
                    type="number" 
                    sx={{mt:2,mb:1.5}} 
                    required
                    onChange={dataRegister}
                    />
                    <TextField
                        type="file"
                        name='age'
                        margin='none' 
                        fullWidth 
                        sx={{mt:2,mb:1.5}}
                        inputProps={{accept:"image/*"}} 
                        onChange={dataRegister}
                    />
                <Button fullWidth type="submit"  variant='contained' sx={{mt:1.5,mb:3}}>Registrar-se</Button>
                </Box>
            </Paper>
            </Grid>
        </Grid>  
        </Container>
    </ThemeConfig>
  );
}