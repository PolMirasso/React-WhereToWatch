import React from 'react';
import { Routes, Route } from "react-router-dom";
import { RouterLayout } from './common/RouterLayout';
import { FilmPage } from './pages/film';
import { HomePage } from './pages/home';
import { LoginPage } from './pages/login';
import { RegisterPage } from './pages/register';

export const AppRouter: React.FC<{}> = () =>{
    return(
        <Routes>
            <Route path='/' element={<RouterLayout/>}>
                <Route path='/' element={<HomePage/>}/>
                <Route path='/film/:id' element={<FilmPage/>}/>
            </Route>
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/register' element={<RegisterPage/>}/>
        </Routes>
    );

}