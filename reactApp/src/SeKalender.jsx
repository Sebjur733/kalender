import React from 'react';
import './seKalender.css';
import html2pdf from 'html2pdf.js/dist/html2pdf';

const SeKalender = () => {
    const kalenderData = JSON.parse(localStorage.getItem('calendarData')) || { name: '', month: 0, year: 2023 };
    const events = JSON.parse(localStorage.getItem('calendarEvents')) || {};

    // Funksjon for å finne antall dager i måneden
    const daysInMonth = (year, month) => {
        return new Date(year, month + 1, 0).getDate();
    };

    // Funksjon for å finne hvilken ukedag den første dagen i måneden faller på
    const getFirstDayOfMonth = (year, month) => {
        const date = new Date(year, month, 1);
        return (date.getDay() + 6) % 7; // Konverter til 0 = mandag, 6 = søndag
    };

    // Konverter månedsnavn til indeks
    const monthIndex = monthNameToIndex(kalenderData.month);
    // Beregn antall dager i måneden
    const totalDays = daysInMonth(kalenderData.year, monthIndex);
    // Beregn hvilken ukedag den første dagen i måneden er
    const firstDayIndex = getFirstDayOfMonth(kalenderData.year, monthIndex);

    const generatePDF = () => {
        const element = document.querySelector('.calendar-grid'); // Kalenderens grid
        
        const opt = {
            margin: 0.5, // Margin rundt innholdet
            filename: `${kalenderData.name}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 1 }, // Juster skalaen for å få innholdet til å passe
            jsPDF: { unit: 'in', format: 'a4', orientation: 'landscape' } // Landskapsmodus for bredere format
        };
        
        html2pdf().from(element).set(opt).save();
    };
    

    // Lag en array med dagene i måneden
    const renderDays = () => {
        let days = [];

        // Fyll ut tomme celler for dager før den første dagen i måneden
        for (let i = 0; i < firstDayIndex; i++) {
            days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
        }

        // Lag en celle for hver dag i måneden med eventer
        for (let day = 1; day <= totalDays; day++) {
            days.push(
                <div key={day} className="calendar-day">
    <div className="day-number">{day}</div>
    <div className="event-container">
        {events[day] && events[day].map((event, index) => (
            <div key={index} className="event-text">
                {event.title}
            </div>
        ))}
    </div>
</div>

            );
        }

        return days;
    };

    // Lag en array med ukedagene
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
            <p>Måned: {kalenderData.month + 1}</p>
            <p>År: {kalenderData.year}</p>
            <button onClick={generatePDF}>Lagre som PDF</button>

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

// Funksjon for å konvertere månedsnavn til indeks
const monthNameToIndex = (monthName) => {
    const months = [
        'Januar', 'Februar', 'Mars', 'April', 'Mai', 'Juni',
        'Juli', 'August', 'September', 'Oktober', 'November', 'Desember'
    ];
    return months.indexOf(monthName);
};

// Funksjon for å få navnene på ukedager
const getWeekDays = () => {
    return ['Man', 'Tir', 'Ons', 'Tor', 'Fre', 'Lør', 'Søn'];
};

export default SeKalender;
