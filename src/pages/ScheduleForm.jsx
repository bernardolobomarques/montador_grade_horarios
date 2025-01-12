import React, { useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import { ScheduleFormStyles } from './ScheduleFormStyles';

const ScheduleForm = () => {
    const [step, setStep] = useState(1);
    const [scheduleDetails, setScheduleDetails] = useState({
        name: '',
        daysOfWeek: [], // Alterado de weekdays para daysOfWeek
        startTime: '',
        endTime: '',
        periodsPerDay: '',
        periodDuration: '',
        numberOfClasses: '',
        subjects: [{ name: '', periodsPerWeek: '' }],
        teachers: [{ name: '', subject: '', workload: '' }]
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setScheduleDetails({ ...scheduleDetails, [name]: value });
    };

    const handleWeekdayChange = (e) => {
        const { name } = e.target;
        setScheduleDetails((prevDetails) => {
            const daysOfWeek = prevDetails.daysOfWeek.includes(name)
                ? prevDetails.daysOfWeek.filter((d) => d !== name)
                : [...prevDetails.daysOfWeek, name];
            return { ...prevDetails, daysOfWeek };
        });
    };

    const handleSubjectChange = (index, e) => {
        const { name, value } = e.target;
        const subjects = [...scheduleDetails.subjects];
        subjects[index][name] = value;
        setScheduleDetails({ ...scheduleDetails, subjects });
    };

    const handleTeacherChange = (index, e) => {
        const { name, value } = e.target;
        const teachers = [...scheduleDetails.teachers];
        teachers[index][name] = value;
        setScheduleDetails({ ...scheduleDetails, teachers });
    };

    const addSubject = () => {
        setScheduleDetails({
            ...scheduleDetails,
            subjects: [...scheduleDetails.subjects, { name: '', periodsPerWeek: '' }]
        });
    };

    const addTeacher = () => {
        setScheduleDetails({
            ...scheduleDetails,
            teachers: [...scheduleDetails.teachers, { name: '', subject: '', workload: '' }]
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
    
        try {
            const user = JSON.parse(localStorage.getItem('user')); // Assumindo que o usuário está armazenado no localStorage
            const response = await axios.post('http://localhost:5000/schedule', { ...scheduleDetails, user: user.email });
            if (response.data.success) {
                alert('Schedule registered successfully!');
                setScheduleDetails({
                    name: '',
                    daysOfWeek: [], // Alterado de weekdays para daysOfWeek
                    startTime: '',
                    endTime: '',
                    periodsPerDay: '',
                    periodDuration: '',
                    numberOfClasses: '',
                    subjects: [{ name: '', periodsPerWeek: '' }],
                    teachers: [{ name: '', subject: '', workload: '' }],
                    user: localStorage.getItem('user')
                });
                setStep(1);
            } else {
                setError(response.data.message);
            }
        } catch (err) {
            setError('An error occurred while registering the schedule.');
        } finally {
            setLoading(false);
        }
    };

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);
    const goToStep = (stepNumber) => setStep(stepNumber);

    return (
        <>
            <Header />
            <ScheduleFormStyles>
                <div className='progress-bar'>
                    <ul>
                        <li className={step === 1 ? 'active' : ''} onClick={() => goToStep(1)}>Step 1: Initial Information</li>
                        <li className={step === 2 ? 'active' : ''} onClick={() => goToStep(2)}>Step 2: Register Subjects</li>
                        <li className={step === 3 ? 'active' : ''} onClick={() => goToStep(3)}>Step 3: Register Teachers</li>
                    </ul>
                </div>
                <div className='main-div-schedule'>
                    <h1>Register Schedule</h1>
                    <form onSubmit={handleSubmit}>
                        {step === 1 && (
                            <>
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    value={scheduleDetails.name}
                                    onChange={handleChange}
                                    required
                                    className="input-field"
                                />
                                <label>Days of the Week</label>
                                <div className="weekday-container">
                                    {[
                                        { name: 'Sunday', label: 'S' },
                                        { name: 'Monday', label: 'M' },
                                        { name: 'Tuesday', label: 'T' },
                                        { name: 'Wednesday', label: 'W' },
                                        { name: 'Thursday', label: 'T' },
                                        { name: 'Friday', label: 'F' },
                                        { name: 'Saturday', label: 'S' }
                                    ].map((day) => (
                                        <div key={day.name} className="weekday-item">
                                            <input
                                                type="checkbox"
                                                id={`check_${day.name.toLowerCase()}`}
                                                name={day.name}
                                                checked={scheduleDetails.daysOfWeek.includes(day.name)} // Alterado de weekdays para daysOfWeek
                                                onChange={handleWeekdayChange}
                                            />
                                            <label htmlFor={`check_${day.name.toLowerCase()}`}>{day.label}</label>
                                        </div>
                                    ))}
                                </div>
                                <label htmlFor="startTime">Start Time</label>
                                <input
                                    type="time"
                                    name="startTime"
                                    placeholder="Start Time"
                                    value={scheduleDetails.startTime}
                                    onChange={handleChange}
                                    required
                                    className="input-field"
                                />
                                <label htmlFor="endTime">End Time</label>
                                <input
                                    type="time"
                                    name="endTime"
                                    placeholder="End Time"
                                    value={scheduleDetails.endTime}
                                    onChange={handleChange}
                                    required
                                    className="input-field"
                                />
                                <label htmlFor="periodsPerDay">Periods per Day</label>
                                <input
                                    type="number"
                                    name="periodsPerDay"
                                    placeholder="Periods per Day"
                                    value={scheduleDetails.periodsPerDay}
                                    onChange={handleChange}
                                    required
                                    className="input-field"
                                />
                                <label htmlFor="periodDuration">Period Duration (minutes)</label>
                                <input
                                    type="number"
                                    name="periodDuration"
                                    placeholder="Period Duration (minutes)"
                                    value={scheduleDetails.periodDuration}
                                    onChange={handleChange}
                                    required
                                    className="input-field"
                                />
                                <label htmlFor="numberOfClasses">Number of Classes</label>
                                <input
                                    type="number"
                                    name="numberOfClasses"
                                    placeholder="Number of Classes"
                                    value={scheduleDetails.numberOfClasses}
                                    onChange={handleChange}
                                    required
                                    className="input-field"
                                />
                                <button type="button" onClick={nextStep}>Next</button>
                            </>
                        )}
                        {step === 2 && (
                            <>
                                {scheduleDetails.subjects.map((subject, index) => (
                                    <div key={index}>
                                        <label htmlFor={`subject-name-${index}`}>Subject Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Subject Name"
                                            value={subject.name}
                                            onChange={(e) => handleSubjectChange(index, e)}
                                            required
                                            className="input-field"
                                        />
                                        <label htmlFor={`periodsPerWeek-${index}`}>Periods per Week</label>
                                        <input
                                            type="number"
                                            name="periodsPerWeek"
                                            placeholder="Periods per Week"
                                            value={subject.periodsPerWeek}
                                            onChange={(e) => handleSubjectChange(index, e)}
                                            required
                                            className="input-field"
                                        />
                                    </div>
                                ))}
                                <button type="button" onClick={addSubject}>Add Subject</button>
                                <button type="button" onClick={prevStep}>Previous</button>
                                <button type="button" onClick={nextStep}>Next</button>
                            </>
                        )}
                        {step === 3 && (
                            <>
                                {scheduleDetails.teachers.map((teacher, index) => (
                                    <div key={index}>
                                        <label htmlFor={`teacher-name-${index}`}>Teacher Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Teacher Name"
                                            value={teacher.name}
                                            onChange={(e) => handleTeacherChange(index, e)}
                                            required
                                            className="input-field"
                                        />
                                        <label htmlFor={`teacher-subject-${index}`}>Subject</label>
                                        <input
                                            type="text"
                                            name="subject"
                                            placeholder="Subject"
                                            value={teacher.subject}
                                            onChange={(e) => handleTeacherChange(index, e)}
                                            required
                                            className="input-field"
                                        />
                                        <label htmlFor={`teacher-workload-${index}`}>Workload (hours)</label>
                                        <input
                                            type="number"
                                            name="workload"
                                            placeholder="Workload (hours)"
                                            value={teacher.workload}
                                            onChange={(e) => handleTeacherChange(index, e)}
                                            required
                                            className="input-field"
                                        />
                                    </div>
                                ))}
                                <button type="button" onClick={addTeacher}>Add Teacher</button>
                                <button type="button" onClick={prevStep}>Previous</button>
                                <button type="submit" disabled={loading}>Register Schedule</button>
                            </>
                        )}
                    </form>
                    {error && <p>{error}</p>}
                </div>
            </ScheduleFormStyles>
        </>
    );
};

export default ScheduleForm;