import React, { useState } from 'react';
import axios from 'axios';
import { ScheduleFormStyles } from './ScheduleFormStyles';
import { Navigate, useNavigate } from 'react-router-dom'; // Import useHistory

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
        subjects: [],
        teachers: [{ name: '', subject: '', workload: '' }]
    });
    const [newSubject, setNewSubject] = useState({ name: '', periodsPerWeek: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [subjectError, setSubjectError] = useState('');
    const navigate = useNavigate();

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

    const handleSubjectChange = (e) => {
        const { name, value } = e.target;
        setNewSubject({ ...newSubject, [name]: value });
    };

    const handleTeacherChange = (index, e) => {
        const { name, value } = e.target;
        const teachers = [...scheduleDetails.teachers];
        teachers[index][name] = value;
        setScheduleDetails({ ...scheduleDetails, teachers });
    };

    const addSubject = () => {
        if (!newSubject.name || !newSubject.periodsPerWeek) {
            setSubjectError('Please fill in both fields before adding a subject.');
            return;
        }
        setScheduleDetails({
            ...scheduleDetails,
            subjects: [...scheduleDetails.subjects, newSubject]
        });
        setNewSubject({ name: '', periodsPerWeek: '' });
        setSubjectError('');
    };

    const removeSubject = (index) => {
        const updatedSubjects = scheduleDetails.subjects.filter((_, i) => i !== index);
        setScheduleDetails({ ...scheduleDetails, subjects: updatedSubjects });
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
                    subjects: [],
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
            <ScheduleFormStyles>
                <button className="close-button" onClick={() => navigate('/content')}>⮜</button> {/* Add close button */}
                <div className='progress-bar'>
                    <ul>
                        <li className={step === 1 ? 'active' : ''} onClick={() => goToStep(1)}>Step 1: Initial Information</li>
                        <li className={step === 2 ? 'active' : ''} onClick={() => goToStep(2)}>Step 2: Register Subjects</li>
                        <li className={step === 3 ? 'active' : ''} onClick={() => goToStep(3)}>Step 3: Register Teachers</li>
                    </ul>
                </div>
                <div className='main-div-schedule'>
                    <form onSubmit={handleSubmit}>
                        {step === 1 && (
                            <>
                                <h1>Inicial Information</h1>
                                <br />
                                <div className="input-group">
                                    <label htmlFor="name">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="ex.: HighSchool - Morning"
                                        value={scheduleDetails.name}
                                        onChange={handleChange}
                                        required
                                        className="input-field"
                                    />
                                </div>
                                <div className='input-group'>
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
                                </div>
                                <div id='time-container'>
                                    <div className='start-time-div'>
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
                                    </div>
                                    <div className='end-time-div'>
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
                                    </div>
                                </div>
                                <div className="input-group">
                                    <label htmlFor="periodsPerDay">Periods per Day</label>
                                    <input
                                        type="number"
                                        name="periodsPerDay"
                                        placeholder="ex.: 7"
                                        value={scheduleDetails.periodsPerDay}
                                        onChange={handleChange}
                                        required
                                        className="input-field"
                                    />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="periodDuration">Period Duration (minutes)</label>
                                    <input
                                        type="number"
                                        name="periodDuration"
                                        placeholder="ex.: 40"
                                        value={scheduleDetails.periodDuration}
                                        onChange={handleChange}
                                        required
                                        className="input-field"
                                    />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="numberOfClasses">Number of Classes</label>
                                    <input
                                        type="number"
                                        name="numberOfClasses"
                                        placeholder="ex.: 4"
                                        value={scheduleDetails.numberOfClasses}
                                        onChange={handleChange}
                                        required
                                        className="input-field"
                                    />
                                </div>
                                <button type="button" onClick={nextStep}>Next</button>
                            </>
                        )}
                        {step === 2 && (
                            <>
                                <h1>Register Subjects</h1>
                                <br />
                                <div className='added-subjects-container'>
                                    <p id='added-subjects-p'>Added Subjects :</p>
                                </div>
                                <div className="subjects">
                                    {scheduleDetails.subjects.map((subject, index) => (
                                        <div key={index} className="added-subjects">
                                            <p>{subject.name} - {subject.periodsPerWeek} periods/week</p>
                                            <button type="button" onClick={() => removeSubject(index)}>X</button>
                                        </div>
                                    ))}
                                </div>
                                <div className='group-subject'>
                                    <div className="input-group">
                                        <label htmlFor="subject-name">Subject Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="ex.: Math"
                                            value={newSubject.name}
                                            onChange={handleSubjectChange}
                                            required
                                            className="input-field"
                                        />
                                    </div>
                                    <div className='input-group'>
                                        <label htmlFor="periodsPerWeek">Periods per Week</label>
                                        <input
                                            type="number"
                                            name="periodsPerWeek"
                                            placeholder="ex.: 5"
                                            value={newSubject.periodsPerWeek}
                                            onChange={handleSubjectChange}
                                            required
                                            className="input-field"
                                        />
                                    </div>
                                    <button type="button" id='addbutton' onClick={addSubject}>+</button>
                                </div>
                                {subjectError && <p className="error-message">{subjectError}</p>}
                                <button type="button" onClick={prevStep}>Previous</button>
                                <button type="button" onClick={nextStep}>Next</button>
                            </>
                        )}
                        {step === 3 && (
                            <>
                                <h1>Register Teachers</h1>
                                <br />
                                {scheduleDetails.teachers.map((teacher, index) => (
                                    <div key={index} className="input-group">
                                        <label htmlFor={`teacher-name-${index}`}>Teacher Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="ex.: John Doe"
                                            value={teacher.name}
                                            onChange={(e) => handleTeacherChange(index, e)}
                                            required
                                            className="input-field"
                                        />
                                        <label htmlFor={`teacher-subject-${index}`}>Subject</label>
                                        <input
                                            type="text"
                                            name="subject"
                                            placeholder="ex.: Math"
                                            value={teacher.subject}
                                            onChange={(e) => handleTeacherChange(index, e)}
                                            required
                                            className="input-field"
                                        />
                                        <label htmlFor={`teacher-workload-${index}`}>Workload (hours)</label>
                                        <input
                                            type="number"
                                            name="workload"
                                            placeholder="ex.: 20"
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