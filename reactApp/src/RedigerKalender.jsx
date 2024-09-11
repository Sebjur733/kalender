import React, { useState, useEffect } from 'react';
import './RedigerKalender.css'; // Pass på at CSS-filen fortsatt er der
import html2pdf from 'html2pdf.js/dist/html2pdf';



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

    const [events, setEvents] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDay, setSelectedDay] = useState(null);
    const [eventTitle, setEventTitle] = useState('');
    const [eventDetails, setEventDetails] = useState('');

    // Hent data fra localStorage når komponenten mountes
    useEffect(() => {
        // Hent kalenderdata
        const data = localStorage.getItem('calendarData');
        if (data) {
            const parsedData = JSON.parse(data);
            setKalenderData({
                name: parsedData.name,
                month: parsedData.month,
                year: parsedData.year
            });
        }
    
        // Hent eventer fra localStorage
        const storedEvents = localStorage.getItem('calendarEvents');
        if (storedEvents) {
            setEvents(JSON.parse(storedEvents));
        }
    }, []);
    

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

    const handleAddEventClick = (day) => {
        setSelectedDay(day);  // Sett valgt dag
        setIsModalOpen(true);  // Åpne modalen
    };

    const handleSaveEvent = () => {
        if (eventTitle.trim() === '') {
            alert('Tittel kan ikke være tom.');
            return;
        }
        // Lagre eventet i state for den valgte dagen
        // Hvis det allerede finnes eventer på denne dagen, legg til i arrayen, ellers lag en ny array
        setEvents(prevEvents => {
            const updatedEvents = {
                ...prevEvents,
                [selectedDay]: [...(prevEvents[selectedDay] || []), {
                    title: eventTitle,
                    details: eventDetails
                }]
            };
    
            // Lagre eventene i localStorage
            localStorage.setItem('calendarEvents', JSON.stringify(updatedEvents));
    
            return updatedEvents;
        });
        
        // Tøm modal input
        setEventTitle('');
        setEventDetails('');
        setIsModalOpen(false);  // Lukk modalen
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setEventTitle('');
        setEventDetails('');
    };

    const handleDeleteEvent = (day, index) => {
        setEvents(prevEvents => {
            const updatedEvents = { ...prevEvents };
            updatedEvents[day].splice(index, 1); // Fjern eventen ved gitt index
    
            if (updatedEvents[day].length === 0) {
                delete updatedEvents[day]; // Fjern hele dagen hvis ingen eventer er igjen
            }
    
            // Oppdater localStorage
            localStorage.setItem('calendarEvents', JSON.stringify(updatedEvents));
    
            return updatedEvents;
        });
    };

    const generatePDF = () => {
        const element = document.querySelector('.rediger-kalender'); // Referanse til kalender-diven
        
        const opt = {
            margin: 0.5,
            filename: `${kalenderData.name}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
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
    
        // Lag en celle for hver dag i måneden med knapp for å legge til hendelse
        for (let day = 1; day <= totalDays; day++) {
            days.push(
                <div key={day} className="calendar-day">
                    <div className="day-number">{day}</div>
                    {/* Vis eventer som er lagret for denne dagen */}
                    {events[day] && events[day].map((event, index) => (
                        <div key={index} className="event-box">
                            <span onClick={() => alert(`${event.title}: ${event.details}`)}>
                                {event.title}
                            </span>
                            {/* Slett event-knapp */}
                            <button 
                                className="delete-btn" 
                                onClick={() => handleDeleteEvent(day, index)} 
                                title="Slett event">
                                🗑️
                            </button>
                        </div>
                    ))}
                    {/* Knapp for å legge til flere eventer */}
                    <button onClick={() => handleAddEventClick(day)}>
                        Legg til event
                    </button>
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
            <button onClick={generatePDF}>Lagre som PDF</button>
            

            <div className="calendar-grid">
                {/* Vis ukedager */}
                <div className="calendar-header">
                {renderWeekDays()}
                </div>
                {renderDays()} {/* Vis dagene */}
            </div>

            
            
              {/* Modal for å legge til event */}
              {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Legg til event for dag {selectedDay}</h3>
                        <input
                            type="text"
                            placeholder="Tittel"
                            value={eventTitle}
                            onChange={(e) => setEventTitle(e.target.value)}
                        />
                        <textarea
                            placeholder="Detaljer om hendelsen"
                            value={eventDetails}
                            onChange={(e) => setEventDetails(e.target.value)}
                        />
                        <button onClick={handleSaveEvent}>Legg til event</button>
                        <button onClick={handleModalClose}>Lukk</button>
                    </div>
                </div>
            )}
        </div>
        
    );
};

export default RedigerKalender;
