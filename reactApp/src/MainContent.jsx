import React from 'react';
import { Link } from 'react-router-dom'; // Importer Link fra react-router-dom
import './MainContent.css'; // Importer CSS-filen for stilsetting

const MainContent = () => {
    return (
        <div className="main-content">
           <h1>Welcome!</h1>
           <div className="button-container">
           <Link to="/ny-kalender">
                    <button>New calendar</button>
                </Link>
               
           </div>
        </div>
    );
};

export default MainContent;

