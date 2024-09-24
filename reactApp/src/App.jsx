import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Nav from './Nav';
import MainContent from './MainContent';   //Importerer MainContent
import NyKalender from './NyKalender'; // Importer komponenten for å lage ny kalender 
import RedigerKalender from './RedigerKalender'; // Importer RedigerKalender
import SeKalender from './SeKalender'; // Importer SeKalender
import Footer from './Footer';
import './App.css';

// Hovedkomponenten i applikasjonen
const App = () => {
    return (
        // Router håndterer navigasjon mellom sidene
        <Router>
            <div className="app">
                <Nav />
                {/* Definerer ruter for ulike sider */}
                <Routes>
                    <Route path="/" element={<MainContent />} />
                    <Route path="/ny-kalender" element={<NyKalender />} />
                    <Route path="/rediger-kalender" element={<RedigerKalender />} /> 
                    <Route path="/se-kalender" element={<SeKalender />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
};

export default App;

