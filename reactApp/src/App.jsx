import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Nav from './Nav';
import MainContent from './MainContent';   //Importerer MainContent
import NyKalender from './NyKalender'; // Importer komponenten for å lage ny kalender 
import RedigerKalender from './RedigerKalender'; // Importer RedigerKalender
import Footer from './Footer';
import './App.css';

const App = () => {
    return (
        <Router>
            <div className="app">
                <Nav />
                <Routes>
                    <Route path="/" element={<MainContent />} />
                    <Route path="/ny-kalender" element={<NyKalender />} />
                    <Route path="/rediger-kalender" element={<RedigerKalender />} /> 
                    <Route path="/seKalender" element={<SeKalender />} /> {/* Ny rute */}
                </Routes>
                <Footer />
            </div>
        </Router>
    );
};

export default App;

