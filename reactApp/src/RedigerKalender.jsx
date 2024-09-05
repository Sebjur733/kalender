import React, { useState, useEffect } from 'react';
import './RedigerKalender.css'; // Pass på at CSS-filen fortsatt er der

// En funksjon for å konvertere månedsnavn til indeks
const monthNameToIndex = (monthName) => {
    const months = [
        'Januar', 'Februar', 'Mars', 'April', 'Mai', 'Juni',
        'Juli', 'August', 'September', 'Oktober', 'November', 'Desember'
    ];
    return months.indexOf(monthName);
};

//Funksjon for å få navnene på ukedager
const getWeekDays = () => {
return ['Man', 'Tir', 'Ons', 'Tor', 'fre', 'Lør', 'Søn'];
};

const RedigerKalender = () => {

    const [kalenderData, setKalenderData] = useState({
        name: '',
        month: 0,
        year: 2023
    });

    // Hent data fra localStorage når komponenten mountes
    useEffect(() => {
        const data = localStorage.getItem('calendarData');
        if (data) {
            const parsedData = JSON.parse(data);
            setKalenderData({
                name: parsedData.name,
                month: parsedData.month,
                year: parsedData.year
            });
        }
    }, []);

    // Funksjon for å finne antall dager i måneden
    const daysInMonth = (year, month) => {
        return new Date(year, month + 1, 0).getDate();
    };

    // Konverter månedsnavn til indeks
    const monthIndex = monthNameToIndex(kalenderData.month);

    // Beregn antall dager i måneden
    const totalDays = daysInMonth(kalenderData.year, monthIndex);

    // Lag en array med dagene i måneden
    const renderDays = () => {
        let days = [];
        for (let day = 1; day <= totalDays; day++) {
            days.push(
                <div key={day} className="calendar-day">
                    {day}
                </div>
            );
        }
        return days;
    };

    //Lag en array med ukedagene
    const renderWeekDays = () => {
        return getWeekDays().map((day, index) => (
            <div key={index} className="calendar-weekday">
                {day}
            </div>
        ));
    };

    return (
        <div className="rediger-kalender">
            <h1>Rediger Kalender</h1>
            
            <h2>{kalenderData.name}</h2>
            <p>Måned: {kalenderData.month + 1}</p>
            <p>År: {kalenderData.year}</p>

            <div className="calendar-grid">
                {/* Vis ukedager */}
                <div className="calendar-header">
                {renderWeekDays()}
                </div>
                {renderDays()} {/* Vis dagene */}
            </div>
        </div>
        
    );
};

export default RedigerKalender;
