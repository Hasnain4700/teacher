// Demo Data Script for School Management System
// Uncomment the function call at the bottom to add demo data

// Demo Students
const demoStudents = [
    { id: 'ST001', name: 'Rahul Kumar', class: 'Class 1', phone: '+91 98765 43210', address: 'Delhi, India' },
    { id: 'ST002', name: 'Priya Sharma', class: 'Class 1', phone: '+91 98765 43211', address: 'Mumbai, India' },
    { id: 'ST003', name: 'Amit Singh', class: 'Class 2', phone: '+91 98765 43212', address: 'Bangalore, India' },
    { id: 'ST004', name: 'Neha Patel', class: 'Class 2', phone: '+91 98765 43213', address: 'Chennai, India' },
    { id: 'ST005', name: 'Vikram Malhotra', class: 'Class 3', phone: '+91 98765 43214', address: 'Kolkata, India' },
    { id: 'ST006', name: 'Anjali Desai', class: 'Class 3', phone: '+91 98765 43215', address: 'Hyderabad, India' },
    { id: 'ST007', name: 'Rajesh Verma', class: 'Class 4', phone: '+91 98765 43216', address: 'Pune, India' },
    { id: 'ST008', name: 'Sneha Reddy', class: 'Class 4', phone: '+91 98765 43217', address: 'Ahmedabad, India' },
    { id: 'ST009', name: 'Karan Mehta', class: 'Class 5', phone: '+91 98765 43218', address: 'Jaipur, India' },
    { id: 'ST010', name: 'Pooja Gupta', class: 'Class 5', phone: '+91 98765 43219', address: 'Lucknow, India' }
];

// Demo Teachers
const demoTeachers = [
    { id: 'T001', name: 'Dr. Sunita Verma', subject: 'Mathematics', phone: '+91 98765 43220', email: 'sunita.verma@school.com', username: 'sunita', password: 'sunita123', assignedClasses: ['Class 1', 'Class 2'], status: 'active' },
    { id: 'T002', name: 'Prof. Rajesh Kumar', subject: 'Science', phone: '+91 98765 43221', email: 'rajesh.kumar@school.com', username: 'rajesh', password: 'rajesh123', assignedClasses: ['Class 3', 'Class 4'], status: 'active' },
    { id: 'T003', name: 'Ms. Priya Sharma', subject: 'English', phone: '+91 98765 43222', email: 'priya.sharma@school.com', username: 'priya', password: 'priya123', assignedClasses: ['Class 1', 'Class 5'], status: 'active' },
    { id: 'T004', name: 'Mr. Amit Singh', subject: 'Social Studies', phone: '+91 98765 43223', email: 'amit.singh@school.com', username: 'amit', password: 'amit123', assignedClasses: ['Class 2', 'Class 3'], status: 'active' },
    { id: 'T005', name: 'Mrs. Neha Patel', subject: 'Hindi', phone: '+91 98765 43224', email: 'neha.patel@school.com', username: 'neha', password: 'neha123', assignedClasses: ['Class 4', 'Class 5'], status: 'active' }
];

// Demo Classes
const demoClasses = [
    { name: 'Class 1', description: 'First Grade - Primary Education' },
    { name: 'Class 2', description: 'Second Grade - Primary Education' },
    { name: 'Class 3', description: 'Third Grade - Primary Education' },
    { name: 'Class 4', description: 'Fourth Grade - Primary Education' },
    { name: 'Class 5', description: 'Fifth Grade - Primary Education' }
];

// Demo Fees
const demoFees = [
    { studentId: 'ST001', amount: 5000, dueDate: '2024-02-15', description: 'Monthly fees - January 2024', status: 'pending' },
    { studentId: 'ST002', amount: 5000, dueDate: '2024-02-15', description: 'Monthly fees - January 2024', status: 'paid' },
    { studentId: 'ST003', amount: 6000, dueDate: '2024-02-20', description: 'Monthly fees - January 2024', status: 'pending' },
    { studentId: 'ST004', amount: 6000, dueDate: '2024-02-20', description: 'Monthly fees - January 2024', status: 'paid' },
    { studentId: 'ST005', amount: 7000, dueDate: '2024-02-25', description: 'Monthly fees - January 2024', status: 'pending' },
    { studentId: 'ST006', amount: 7000, dueDate: '2024-02-25', description: 'Monthly fees - January 2024', status: 'paid' },
    { studentId: 'ST007', amount: 8000, dueDate: '2024-03-01', description: 'Monthly fees - February 2024', status: 'pending' },
    { studentId: 'ST008', amount: 8000, dueDate: '2024-03-01', description: 'Monthly fees - February 2024', status: 'pending' },
    { studentId: 'ST009', amount: 9000, dueDate: '2024-03-05', description: 'Monthly fees - February 2024', status: 'pending' },
    { studentId: 'ST010', amount: 9000, dueDate: '2024-03-05', description: 'Monthly fees - February 2024', status: 'pending' }
];

// Demo Attendance (Today's attendance)
function generateDemoAttendance() {
    const today = new Date().toISOString().split('T')[0];
    const attendance = [];
    
    demoStudents.forEach((student, index) => {
        // Randomly assign attendance status (80% present, 20% absent)
        const status = Math.random() > 0.2 ? 'present' : 'absent';
        const teacherId = 'T001'; // Default teacher
        
        attendance.push({
            studentId: student.id,
            class: student.class,
            date: today,
            status: status,
            teacherId: teacherId,
            timestamp: new Date().toISOString()
        });
    });
    
    return attendance;
}

// Demo Activities
const demoActivities = [
    { type: 'student', title: 'New student added', description: 'Rahul Kumar was added to the system', timestamp: new Date(Date.now() - 3600000).toISOString() },
    { type: 'teacher', title: 'New teacher added', description: 'Dr. Sunita Verma was added to the system', timestamp: new Date(Date.now() - 7200000).toISOString() },
    { type: 'attendance', title: 'Attendance submitted', description: 'Class 1 attendance submitted for today', timestamp: new Date(Date.now() - 10800000).toISOString() },
    { type: 'fees', title: 'Fee payment received', description: 'Priya Sharma paid monthly fees', timestamp: new Date(Date.now() - 14400000).toISOString() },
    { type: 'student', title: 'Student updated', description: 'Amit Singh profile was updated', timestamp: new Date(Date.now() - 18000000).toISOString() }
];

// Function to add all demo data
function addAllDemoData() {
    console.log('Adding demo data to the system...');
    
    // Check if Firebase is ready
    if (!window.dbHelpers || !window.dbRef) {
        console.error('Firebase not initialized yet. Please wait a moment and try again.');
        alert('Firebase is not ready yet. Please wait a moment and try again.');
        return;
    }
    
    try {
        // Add students
        demoStudents.forEach(student => {
            window.dbHelpers.add(window.dbRef.students, {
                ...student,
                createdAt: new Date().toISOString()
            });
        });
        
        // Add teachers
        demoTeachers.forEach(teacher => {
            window.dbHelpers.add(window.dbRef.teachers, {
                ...teacher,
                createdAt: new Date().toISOString()
            });
        });
        
        // Add classes
        demoClasses.forEach(cls => {
            window.dbHelpers.add(window.dbRef.classes, {
                ...cls,
                createdAt: new Date().toISOString()
            });
        });
        
        // Add fees
        demoFees.forEach(fee => {
            window.dbHelpers.add(window.dbRef.fees, {
                ...fee,
                teacherId: 'T001',
                createdAt: new Date().toISOString()
            });
        });
        
        // Add attendance
        const attendance = generateDemoAttendance();
        attendance.forEach(att => {
            window.dbHelpers.add(window.dbRef.attendance, att);
        });
        
        // Add activities
        demoActivities.forEach(activity => {
            window.dbHelpers.add(window.dbRef.activities, activity);
        });
        
        console.log('Demo data added successfully!');
        alert('Demo data has been added to the system. You can now test all features.');
    } catch (error) {
        console.error('Error adding demo data:', error);
        alert('Error adding demo data: ' + error.message);
    }
}

// Function to clear all data
function clearAllData() {
    if (confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
        console.log('Clearing all data...');
        
        // Check if Firebase is ready
        if (!window.dbRef) {
            console.error('Firebase not initialized yet. Please wait a moment and try again.');
            alert('Firebase is not ready yet. Please wait a moment and try again.');
            return;
        }
        
        try {
            // Clear students
            window.dbRef.students.remove();
            
            // Clear teachers
            window.dbRef.teachers.remove();
            
            // Clear classes
            window.dbRef.classes.remove();
            
            // Clear fees
            window.dbRef.fees.remove();
            
            // Clear attendance
            window.dbRef.attendance.remove();
            
            // Clear activities
            window.dbRef.activities.remove();
            
            console.log('All data cleared successfully!');
            alert('All data has been cleared from the system.');
        } catch (error) {
            console.error('Error clearing data:', error);
            alert('Error clearing data: ' + error.message);
        }
    }
}

// Function to add demo data for testing
function addDemoDataForTesting() {
    console.log('Adding demo data for testing...');
    
    // Check if Firebase is ready
    if (!window.dbHelpers || !window.dbRef) {
        console.error('Firebase not initialized yet. Please wait a moment and try again.');
        alert('Firebase is not ready yet. Please wait a moment and try again.');
        return;
    }
    
    try {
        // Add a few students for testing
        const testStudents = demoStudents.slice(0, 5);
        testStudents.forEach(student => {
            window.dbHelpers.add(window.dbRef.students, {
                ...student,
                createdAt: new Date().toISOString()
            });
        });
        
        // Add a few teachers for testing
        const testTeachers = demoTeachers.slice(0, 3);
        testTeachers.forEach(teacher => {
            window.dbHelpers.add(window.dbRef.teachers, {
                ...teacher,
                createdAt: new Date().toISOString()
            });
        });
        
        // Add a few fees for testing
        const testFees = demoFees.slice(0, 3);
        testFees.forEach(fee => {
            window.dbHelpers.add(window.dbRef.fees, {
                ...fee,
                teacherId: 'T001',
                createdAt: new Date().toISOString()
        });
        });
        
        console.log('Demo data for testing added successfully!');
        alert('Demo data for testing has been added. You can now test the basic features.');
    } catch (error) {
        console.error('Error adding demo data for testing:', error);
        alert('Error adding demo data: ' + error.message);
    }
}

// Function to check if Firebase is ready
function checkFirebaseReady() {
    return window.dbHelpers && window.dbRef;
}

// Function to test Firebase connection
function testFirebaseConnection() {
    if (!checkFirebaseReady()) {
        console.error('Firebase not initialized');
        alert('Firebase is not ready. Please refresh the page and try again.');
        return false;
    }
    
    // Test connection by trying to read from database
    window.dbRef.students.once('value')
        .then(() => {
            console.log('Firebase connection successful');
            alert('Firebase connection is working!');
        })
        .catch((error) => {
            console.error('Firebase connection failed:', error);
            alert('Firebase connection failed: ' + error.message);
        });
}

// Export functions for use in other files
window.addAllDemoData = addAllDemoData;
window.clearAllData = clearAllData;
window.addDemoDataForTesting = addDemoDataForTesting;
window.checkFirebaseReady = checkFirebaseReady;
window.testFirebaseConnection = testFirebaseConnection;

// Uncomment the line below to automatically add demo data when the script loads
// addDemoDataForTesting(); 