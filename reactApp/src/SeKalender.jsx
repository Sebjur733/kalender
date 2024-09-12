// src/SeKalender.jsx
import React, { useEffect, useState } from 'react';

const SeKalender = () => {
    const [kalenderData, setKalenderData] = useState(null);
    const [events, setEvents] = useState({});

    useEffect(() => {
        // Hent kalenderdata og eventer fra localStorage
        const storedCalendarData = localStorage.getItem('calendarData');
        const storedEvents = localStorage.getItem('calendarEvents');

        if (storedCalendarData) {
            setKalenderData(JSON.parse(storedCalendarData));
        }

        if (storedEvents) {
            setEvents(JSON.parse(storedEvents));
        }
    }, []);

    // Funksjoner for å vise kalenderdata og eventer kan legges her

    return (
        <div className="se-kalender">
            <h1>Se Kalender</h1>
            {kalenderData ? (
                <div>
                    <h2>{kalenderData.name}</h2>
                    <p>Måned: {kalenderData.month + 1}</p>
                    <p>År: {kalenderData.year}</p>
                    {/* Vis kalenderen og eventer her */}
                </div>
            ) : (
                <p>Ingen kalenderdata tilgjengelig.</p>
            )}
        </div>
    );
};

export default SeKalender;
