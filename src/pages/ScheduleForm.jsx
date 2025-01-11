import React, { useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import { LoginStyles } from './LoginStyles';

const ScheduleForm = () => {
    const [step, setStep] = useState(1);
    const [scheduleDetails, setScheduleDetails] = useState({
        name: '',
        daysOfWeek: '',
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
                    daysOfWeek: '',
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

    return (
        <>
            <Header />
            <LoginStyles>
                <div className='main-div-login'>
                    <div className='progress-bar'>
                        <p>Step {step} of 3</p>
                        <ul>
                            <li className={step >= 1 ? 'completed' : ''}>Step 1: Initial Information</li>
                            <li className={step >= 2 ? 'completed' : ''}>Step 2: Register Subjects</li>
                            <li className={step >= 3 ? 'completed' : ''}>Step 3: Register Teachers</li>
                        </ul>
                    </div>
                    <h1>Register Schedule</h1>
                    <form onSubmit={handleSubmit}>
                        {step === 1 && (
                            <>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    value={scheduleDetails.name}
                                    onChange={handleChange}
                                    required
                                />
                                <input
                                    type="text"
                                    name="daysOfWeek"
                                    placeholder="Days of the Week"
                                    value={scheduleDetails.daysOfWeek}
                                    onChange={handleChange}
                                    required
                                />
                                <input
                                    type="time"
                                    name="startTime"
                                    placeholder="Start Time"
                                    value={scheduleDetails.startTime}
                                    onChange={handleChange}
                                    required
                                />
                                <input
                                    type="time"
                                    name="endTime"
                                    placeholder="End Time"
                                    value={scheduleDetails.endTime}
                                    onChange={handleChange}
                                    required
                                />
                                <input
                                    type="number"
                                    name="periodsPerDay"
                                    placeholder="Periods per Day"
                                    value={scheduleDetails.periodsPerDay}
                                    onChange={handleChange}
                                    required
                                />
                                <input
                                    type="number"
                                    name="periodDuration"
                                    placeholder="Period Duration (minutes)"
                                    value={scheduleDetails.periodDuration}
                                    onChange={handleChange}
                                    required
                                />
                                <input
                                    type="number"
                                    name="numberOfClasses"
                                    placeholder="Number of Classes"
                                    value={scheduleDetails.numberOfClasses}
                                    onChange={handleChange}
                                    required
                                />
                                <button type="button" onClick={nextStep}>Next</button>
                            </>
                        )}
                        {step === 2 && (
                            <>
                                {scheduleDetails.subjects.map((subject, index) => (
                                    <div key={index}>
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Subject Name"
                                            value={subject.name}
                                            onChange={(e) => handleSubjectChange(index, e)}
                                            required
                                        />
                                        <input
                                            type="number"
                                            name="periodsPerWeek"
                                            placeholder="Periods per Week"
                                            value={subject.periodsPerWeek}
                                            onChange={(e) => handleSubjectChange(index, e)}
                                            required
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
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Teacher Name"
                                            value={teacher.name}
                                            onChange={(e) => handleTeacherChange(index, e)}
                                            required
                                        />
                                        <input
                                            type="text"
                                            name="subject"
                                            placeholder="Subject"
                                            value={teacher.subject}
                                            onChange={(e) => handleTeacherChange(index, e)}
                                            required
                                        />
                                        <input
                                            type="number"
                                            name="workload"
                                            placeholder="Workload (hours)"
                                            value={teacher.workload}
                                            onChange={(e) => handleTeacherChange(index, e)}
                                            required
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
            </LoginStyles>
        </>
    );
};

export default ScheduleForm;