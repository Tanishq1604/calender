'use client';
import { useState, useEffect } from 'react';
import { Plus, X } from 'lucide-react';

const EventManager = ({ date, onAddEvent }) => {
    const [showForm, setShowForm] = useState(false);
    const [eventTitle, setEventTitle] = useState('');
    const [eventTime, setEventTime] = useState('');
    const [eventDescription, setEventDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddEvent({
            title: eventTitle,
            time: eventTime,
            description: eventDescription,
            date: date
        });
        setShowForm(false);
        setEventTitle('');
        setEventTime('');
        setEventDescription('');
    };

    return (
        <div className="mt-4">
            {!showForm ? (
                <button
                    onClick={() => setShowForm(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                >
                    <Plus size={20} />
                    <span>Add Event</span>
                </button>
            ) : (
                <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-lg p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold">Add New Event</h3>
                        <button type="button" onClick={() => setShowForm(false)}>
                            <X size={20} />
                        </button>
                    </div>
                    <input
                        type="text"
                        placeholder="Event Title"
                        value={eventTitle}
                        onChange={(e) => setEventTitle(e.target.value)}
                        className="w-full p-2 mb-2 rounded border bg-white/50"
                        required
                    />
                    <input
                        type="time"
                        value={eventTime}
                        onChange={(e) => setEventTime(e.target.value)}
                        className="w-full p-2 mb-2 rounded border bg-white/50"
                        required
                    />
                    <textarea
                        placeholder="Event Description"
                        value={eventDescription}
                        onChange={(e) => setEventDescription(e.target.value)}
                        className="w-full p-2 mb-2 rounded border bg-white/50"
                        rows="3"
                    />
                    <button
                        type="submit"
                        className="w-full py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    >
                        Save Event
                    </button>
                </form>
            )}
        </div>
    );
};

export default EventManager;
