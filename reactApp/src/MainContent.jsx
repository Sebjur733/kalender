import React from 'react';
import { Link } from 'react-router-dom'; // Importer Link fra react-router-dom
import './MainContent.css'; // Importer CSS-filen for stilsetting

const MainContent = () => {
    return (
        <div className="main-content">
           <h1>Velg et alternativ</h1>
           <div className="button-container">
           <Link to="/ny-kalender">
                    <button>Lag kalender</button>
                </Link>
                <Link to="/mine-kalendere">
                    <button>Mine kalendere</button>
                </Link>
           </div>
        </div>
    );
};

export default MainContent;

