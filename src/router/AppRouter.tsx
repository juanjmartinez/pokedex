import React from 'react'
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import { HomePage } from '../../src/pages/HomePage';

export const AppRouter = () => {
  return (
    <Router>
        <div>
            <Routes>                
                <Route path='/' element={<HomePage />}/>
            </Routes>
        </div>
    </Router>
  )
}
