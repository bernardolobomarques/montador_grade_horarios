interface Subject {
    name: string;
    periodsPerWeek: number;
}

interface Teacher {
    name: string;
    subject: string;
    workload: number;
}

interface Schedule {
    id: string;
    name: string;
    daysOfWeek: string;
    startTime: string;
    endTime: string;
    periodsPerDay: number;
    periodDuration: number;
    numberOfClasses: number;
    subjects: Subject[];
    teachers: Teacher[];
    user: string; // User ID
}

export type { Schedule, Subject, Teacher };