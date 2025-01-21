try:
    from pymongo import MongoClient
    from bson.objectid import ObjectId
except ImportError as e:
    print(f"Error importing MongoDB modules: {e}")
    print("Please install required packages using:")
    print("pip install pymongo")
    exit(1)

class Teacher:
    def __init__(self):
        self.name = ''
        self.subject = ''
        self.workload = 0

class Subject:
    def __init__(self):
        self.name = ''
        self.periodsPerWeek = 0

class School:
    def __init__(self):
        self.name = ''
        self.daysOfWeek = []
        self.startTime = ''
        self.endTime = ''
        self.periodsPerDay = 0
        self.periodDuration = 0
        self.numberOfClasses = 0
        self.subjects = []
        self.teachers = []

def connect_to_mongodb():
    try:
        # Usando a mesma URI do servidor Node.js
        uri = "mongodb+srv://bryanbernardo:bryanbernardo12345678@montacalendario.mzzfz.mongodb.net/?retryWrites=true&w=majority&appName=MontaCalendario"
        client = MongoClient(uri)
        # Test the connection using admin command instead of server_info
        client.admin.command('ping')
        print("Successfully connected to MongoDB")
        return client.get_database("montacalendario")
    except Exception as e:
        print(f"Error connecting to MongoDB: {e}")
        return None

def load_school_from_db(schedule_id):
    db = connect_to_mongodb()
    print("AQUI")
    if db is None:  # Modificado aqui: usando 'is None' em vez de 'not db'
        print("Failed to connect to database")
        return None
    
    try:
        print(f"Searching for schedule with ID: {schedule_id}")
        schedule_data = db.schedules.find_one({"_id": ObjectId(schedule_id)})
        if not schedule_data:
            # Debug: list all available schedules
            all_schedules = list(db.schedules.find({}, {"_id": 1}))
            print("Available schedule IDs:", [str(s["_id"]) for s in all_schedules])
            print("Schedule not found")
            return None
        
        school = School()
        school.name = schedule_data.get("name", "")
        school.daysOfWeek = schedule_data.get("daysOfWeek", "").split(',')
        school.startTime = schedule_data.get("startTime", "")
        school.endTime = schedule_data.get("endTime", "")
        school.periodsPerDay = schedule_data.get("periodsPerDay", 0)
        school.periodDuration = schedule_data.get("periodDuration", 0)
        school.numberOfClasses = schedule_data.get("numberOfClasses", 0)
        
        # Load subjects
        for subject_data in schedule_data.get("subjects", []):
            subject = Subject()
            subject.name = subject_data.get("name", "")
            subject.periodsPerWeek = subject_data.get("periodsPerWeek", 0)
            school.subjects.append(subject)
        
        # Load teachers
        for teacher_data in schedule_data.get("teachers", []):
            teacher = Teacher()
            teacher.name = teacher_data.get("name", "")
            teacher.subject = teacher_data.get("subject", "")
            teacher.workload = teacher_data.get("workload", 0)
            school.teachers.append(teacher)
        
        return school
    
    except Exception as e:
        print(f"Error loading schedule data: {e}")
        return None

def printSchool(school):
    print(f'School: {school.name}')
    print(f'Days: {school.daysOfWeek}')
    print(f'Time: {school.startTime} - {school.endTime}')
    print(f'Periods per day: {school.periodsPerDay}')
    print(f'Period duration: {school.periodDuration} minutes')
    print(f'Number of classes: {school.numberOfClasses}')
    
    print('\nSubjects:')
    for s in school.subjects:
        print(f'  {s.name} - {s.periodsPerWeek} periods/week')
    
    print('\nTeachers:')
    for t in school.teachers:
        print(f'  {t.name} - {t.subject} ({t.workload} hours)')

def main():
    # Example usage with your school ID - using a valid ID from the database
    school_id = "65badad72ff4111c10cc2397"  # Atualize este ID com um válido do seu banco
    school = load_school_from_db(school_id)
    
    if school:
        printSchool(school)
    else:
        print("Failed to load school data")

if __name__ == "__main__":
    main()