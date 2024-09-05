import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importer useNavigate
import MonthYearSelector from './MonthYearSelector';
import './NyKalender.css'; // Pass på at CSS-filen fortsatt er der

const NyKalender = () => {
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [calendarName, setCalendarName] = useState('');
    const navigate = useNavigate(); // Bruk useNavigate for navigering

    const handleMonthYearChange = (month, year) => {
        setSelectedMonth(month);
        setSelectedYear(year);
    };

    const handleNameChange = (e) => {
        setCalendarName(e.target.value);
    };

    const handleCreateCalendar = () => {
        if (calendarName && selectedMonth && selectedYear) {
            // Her kan du implementere logikken for å lage en ny kalender
            const calendarData = {
                name: calendarName,
                month: selectedMonth,
                year: selectedYear
            };

            // Lagre i localStorage
            localStorage.setItem('calendarData', JSON.stringify(calendarData));

            // For debugging: vis data i konsollen
            console.log('Kalender opprettet:', calendarData);

            // Naviger til RedigerKalender
            navigate('/rediger-kalender');


        } else {
            alert("Vennligst fyll ut alle feltene før du oppretter en kalender.");
        }
    };

    return (
        <div className="ny-kalender">
            <h1>Lag Ny Kalender</h1>
            
            {/* Input for Kalendernavn */}
            <input 
                type="text" 
                placeholder="Navn på kalender" 
                value={calendarName} 
                onChange={handleNameChange} 
            />
            
            {/* Dropdown for Måned og År */}
            <MonthYearSelector onMonthYearChange={handleMonthYearChange} />
            
           

            {/* Lag Kalender Knapp */}
            <button onClick={handleCreateCalendar}>Lag kalender</button>
        </div>
    );
};

export default NyKalender;
