import React from 'react';
import './footer.css'; // Importer CSS-filen for stilsetting

const footer = () => {
    return (
        <footer className="footer">
            <div className="contact-info">
                <p><strong>Navn:</strong> Ola Nordmann</p>
                <p><strong>Telefon:</strong> 123 45 678</p>
                <p><strong>Mail:</strong> ola.nordmann@example.com</p>
            </div>
        </footer>
    );
};

export default footer;
