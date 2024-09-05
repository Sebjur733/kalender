import React, { useState, useEffect } from 'react';

const MonthYearSelector = ({ onMonthYearChange }) => {
    const currentYear = new Date().getFullYear();
    const months = [
        'Januar', 'Februar', 'Mars', 'April', 'Mai', 'Juni',
        'Juli', 'August', 'September', 'Oktober', 'November', 'Desember'
    ];

    const years = Array.from({ length: 9 }, (_, i) => currentYear + i);

    // Set initial values for the state
    const [selectedMonth, setSelectedMonth] = useState(months[0]);
    const [selectedYear, setSelectedYear] = useState(currentYear);

    useEffect(() => {
        // Notify parent component of initial values
        onMonthYearChange(selectedMonth, selectedYear);
    }, [selectedMonth, selectedYear, onMonthYearChange]);

    const handleMonthChange = (e) => {
        const month = e.target.value;
        setSelectedMonth(month);
        onMonthYearChange(month, selectedYear);
    };

    const handleYearChange = (e) => {
        const year = e.target.value;
        setSelectedYear(year);
        onMonthYearChange(selectedMonth, year);
    };

    return (
        <div>
            <select value={selectedMonth} onChange={handleMonthChange}>
                {months.map((month, index) => (
                    <option key={index} value={month}>
                        {month}
                    </option>
                ))}
            </select>

            <select value={selectedYear} onChange={handleYearChange}>
                {years.map((year, index) => (
                    <option key={index} value={year}>
                        {year}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default MonthYearSelector;
