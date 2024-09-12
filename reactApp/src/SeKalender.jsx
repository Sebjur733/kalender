import React, { useEffect, useState } from 'react';
import './SeKalender.css'; // Egen CSS-fil for visningssiden

const SeKalender = () => {
    const [kalenderData, setKalenderData] = useState({
        name: '',
        month: 0,
        year: 2023
    });
    const [events, setEvents] = useState({});

    useEffect(() => {
        // Hent kalenderdata fra localStorage
        const data = localStorage.getItem('calendarData');
        if (data) {
            setKalenderData(JSON.parse(data));
        }

        // Hent eventer fra localStorage
        const storedEvents = localStorage.getItem('calendarEvents');
        if (storedEvents) {
            setEvents(JSON.parse(storedEvents));
        }
    }, []);

    const daysInMonth = (year, month) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (year, month) => {
        const date = new Date(year, month, 1);
        return (date.getDay() + 6) % 7; // 0 = mandag, 6 = søndag
    };

    const renderDays = () => {
        const totalDays = daysInMonth(kalenderData.year, kalenderData.month);
        const firstDayIndex = getFirstDayOfMonth(kalenderData.year, kalenderData.month);
        let days = [];

        // Fyll ut tomme celler før første dagen i måneden
        for (let i = 0; i < firstDayIndex; i++) {
            days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
        }

        // Lag en celle for hver dag i måneden
        for (let day = 1; day <= totalDays; day++) {
            days.push(
                <div key={day} className="calendar-day">
                    <div className="day-number">{day}</div>
                    {/* Vis eventer som er lagret for denne dagen */}
                    {events[day] && events[day].map((event, index) => (
                        <div key={index} className="event-box">
                            {event.title}
                        </div>
                    ))}
                </div>
            );
        }

        return days;
    };

    const getWeekDays = () => {
        return ['Man', 'Tir', 'Ons', 'Tor', 'Fre', 'Lør', 'Søn'];
    };

    const renderWeekDays = () => {
        return getWeekDays().map((day, index) => (
            <div key={index} className="calendar-weekday">
                {day}
            </div>
        ));
    };

    return (
        <div className="se-kalender">
            <h1>{kalenderData.name}</h1>
            <div className="calendar-grid">
                <div className="calendar-header">
                    {renderWeekDays()}
                </div>
                {renderDays()}
            </div>
        </div>
    );
};

export default SeKalender;
