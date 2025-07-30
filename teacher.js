// Global variables
let currentTab = 'attendance';
let currentTeacher = null;
let students = [];
let fees = [];
let attendance = [];
let progress = [];
let selectedClass = '';
let selectedDate = '';

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    checkLoginStatus();
});

// Initialize the application
function initializeApp() {
    // Set current date for attendance
    document.getElementById('attendance-date').value = new Date().toISOString().split('T')[0];
    selectedDate = new Date().toISOString().split('T')[0];
    
    // Load initial data
    loadStudents();
    loadFees();
    loadAttendance();
    loadProgress();
    
    // Set up real-time listeners
    setupRealtimeListeners();
}

// Set up event listeners
function setupEventListeners() {
    // Tab navigation
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const tab = this.getAttribute('data-tab');
            switchTab(tab);
        });
    });

    // Search functionality
    document.getElementById('student-search').addEventListener('input', function() {
        filterStudents(this.value);
    });

    // Login form
    document.getElementById('login-form').addEventListener('submit', function(e) {
        e.preventDefault();
        loginTeacher();
    });
}

// Check login status
function checkLoginStatus() {
    const teacherId = localStorage.getItem('teacherId');
    const teacherData = localStorage.getItem('teacherData');
    
    if (!teacherId || !teacherData) {
        showLoginModal();
    } else {
        try {
            const teacher = JSON.parse(teacherData);
            currentTeacher = teacher;
            loadTeacherProfile(teacher);
            hideLoginModal();
            updateTeacherUI();
        } catch (error) {
            console.error('Error loading teacher data:', error);
            localStorage.removeItem('teacherId');
            localStorage.removeItem('teacherData');
            showLoginModal();
        }
    }
}

// Show login modal
function showLoginModal() {
    document.getElementById('login-modal').classList.add('active');
}

// Hide login modal
function hideLoginModal() {
    document.getElementById('login-modal').classList.remove('active');
}

// Login teacher
function loginTeacher() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    
    if (!username || !password) {
        alert('Please enter both username and password');
        return;
    }
    
    // Find teacher by username
    dbHelpers.getAll(dbRef.teachers).then((snapshot) => {
        const teachers = [];
        snapshot.forEach((childSnapshot) => {
            teachers.push({ ...childSnapshot.val(), key: childSnapshot.key });
        });
        
        const teacher = teachers.find(t => t.username === username && t.password === password);
        
        if (teacher) {
            localStorage.setItem('teacherId', teacher.key);
            localStorage.setItem('teacherData', JSON.stringify(teacher));
            currentTeacher = teacher;
            loadTeacherProfile(teacher);
            hideLoginModal();
            updateTeacherUI();
        } else {
            alert('Invalid username or password');
        }
    }).catch((error) => {
        console.error('Login error:', error);
        alert('Login failed. Please try again.');
    });
}

// Load teacher profile
function loadTeacherProfile(teacher) {
    currentTeacher = teacher;
    updateTeacherUI();
    
    // Load attendance data for assigned classes
    loadAllAssignedClassStudents();
}

// Update teacher UI
function updateTeacherUI() {
    if (currentTeacher) {
        document.getElementById('teacher-name').textContent = currentTeacher.name;
        document.getElementById('teacher-subject').textContent = currentTeacher.subject;
        
        document.getElementById('profile-name').textContent = currentTeacher.name;
        document.getElementById('profile-subject').textContent = currentTeacher.subject;
        document.getElementById('profile-phone').textContent = currentTeacher.phone;
        document.getElementById('profile-email').textContent = currentTeacher.email;
    }
}

// Switch between tabs
function switchTab(tabName) {
    // Update active tab
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    
    // Hide all tab content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Show selected tab content
    document.getElementById(tabName).classList.add('active');
    
    currentTab = tabName;
    
    // Load specific data for the tab
    switch(tabName) {
        case 'attendance':
            loadAttendanceData();
            break;
        case 'fees':
            loadFeesData();
            break;
        case 'students':
            loadStudentsData();
            break;
        case 'progress':
            loadProgressData();
            break;
        case 'profile':
            loadProfileData();
            break;
    }
}

// Set up real-time listeners
function setupRealtimeListeners() {
    // Listen for students changes
    dbHelpers.listen(dbRef.students, (snapshot) => {
        students = [];
        snapshot.forEach(child => {
            students.push({ id: child.key, ...child.val() });
        });
        if (currentTab === 'students') {
            renderStudentsGrid();
        }
    });

    // Listen for attendance changes
    dbHelpers.listen(dbRef.attendance, (snapshot) => {
        attendance = [];
        snapshot.forEach(child => {
            attendance.push({ id: child.key, ...child.val() });
        });
        if (currentTab === 'attendance') {
            updateAttendanceSummary();
        }
    });

    // Listen for fees changes
    dbHelpers.listen(dbRef.fees, (snapshot) => {
        fees = [];
        snapshot.forEach(child => {
            fees.push({ id: child.key, ...child.val() });
        });
        if (currentTab === 'fees') {
            renderFeesList();
        }
    });

    // Listen for progress changes
    dbHelpers.listen(dbRef.progress, (snapshot) => {
        progress = [];
        snapshot.forEach(child => {
            progress.push({ id: child.key, ...child.val() });
        });
        if (currentTab === 'progress') {
            loadProgressData();
        }
    });
}

// Load students data
function loadStudents() {
    dbHelpers.getAll(dbRef.students).then(snapshot => {
        students = [];
        snapshot.forEach(child => {
            students.push({ id: child.key, ...child.val() });
        });
        if (currentTab === 'students') {
            renderStudentsGrid();
        }
    });
}

// Load fees data
function loadFees() {
    dbHelpers.getAll(dbRef.fees).then(snapshot => {
        fees = [];
        snapshot.forEach(child => {
            fees.push({ id: child.key, ...child.val() });
        });
        if (currentTab === 'fees') {
            renderFeesList();
        }
    });
}

// Load attendance data
function loadAttendance() {
    dbHelpers.getAll(dbRef.attendance).then(snapshot => {
        attendance = [];
        snapshot.forEach(child => {
            attendance.push({ id: child.key, ...child.val() });
        });
        if (currentTab === 'attendance') {
            updateAttendanceSummary();
        }
    });
}

// Load progress data
function loadProgress() {
    dbHelpers.getAll(dbRef.progress).then(snapshot => {
        progress = [];
        snapshot.forEach(child => {
            progress.push({ id: child.key, ...child.val() });
        });
        if (currentTab === 'progress') {
            loadProgressData();
        }
    });
}

// Load attendance data for specific date
function loadAttendanceData() {
    selectedDate = document.getElementById('attendance-date').value;
    loadAllAssignedClassStudents();
    updateAttendanceSummary();
}

// Load all students from assigned classes
function loadAllAssignedClassStudents() {
    if (!currentTeacher || !currentTeacher.assignedClasses || currentTeacher.assignedClasses.length === 0) {
        document.getElementById('students-list').innerHTML = `
            <div class="empty-state">
                <i class="fas fa-exclamation-triangle"></i>
                <h3>No Classes Assigned</h3>
                <p>You don't have any classes assigned to you</p>
            </div>
        `;
        return;
    }
    
    // Get all students from teacher's assigned classes
    const assignedClassStudents = students.filter(student => 
        currentTeacher.assignedClasses.includes(student.class)
    );
    
    renderStudentsList(assignedClassStudents);
}

// Render students list for attendance
function renderStudentsList(assignedClassStudents) {
    const studentsList = document.getElementById('students-list');
    
    if (assignedClassStudents.length === 0) {
        studentsList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-users"></i>
                <h3>No Students Found</h3>
                <p>No students found in your assigned classes</p>
            </div>
        `;
        return;
    }
    
    studentsList.innerHTML = assignedClassStudents.map(student => {
        const existingAttendance = attendance.find(a => 
            a.studentId === student.id && 
            a.date === selectedDate && 
            a.class === student.class
        );
        
        const status = existingAttendance ? existingAttendance.status : 'inactive';
        
        return `
            <div class="student-item" data-student-id="${student.id}" data-student-class="${student.class}">
                <div class="student-info">
                    <h4>${student.name}</h4>
                    <p>ID: ${student.id} | Class: ${student.class}</p>
                </div>
                <div class="attendance-toggle">
                    <button class="toggle-btn ${status === 'present' ? 'present' : 'inactive'}" 
                            onclick="toggleAttendance('${student.id}', 'present', '${student.class}')">
                        Present
                    </button>
                    <button class="toggle-btn ${status === 'absent' ? 'absent' : 'inactive'}" 
                            onclick="toggleAttendance('${student.id}', 'absent', '${student.class}')">
                        Absent
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

// Toggle attendance status
function toggleAttendance(studentId, status, studentClass) {
    const studentItem = document.querySelector(`[data-student-id="${studentId}"]`);
    const buttons = studentItem.querySelectorAll('.toggle-btn');
    
    // Update button states
    buttons.forEach(btn => {
        btn.classList.remove('present', 'absent');
        btn.classList.add('inactive');
    });
    
    if (status === 'present') {
        buttons[0].classList.remove('inactive');
        buttons[0].classList.add('present');
    } else {
        buttons[1].classList.remove('inactive');
        buttons[1].classList.add('absent');
    }
    
    // Save attendance
    saveAttendance(studentId, status, studentClass);
}

// Save attendance
function saveAttendance(studentId, status, studentClass) {
    const attendanceData = {
        studentId: studentId,
        class: studentClass,
        date: selectedDate,
        status: status,
        teacherId: currentTeacher.id,
        timestamp: new Date().toISOString()
    };
    
    // Check if attendance already exists
    const existingAttendance = attendance.find(a => 
        a.studentId === studentId && 
        a.date === selectedDate && 
        a.class === studentClass
    );
    
    if (existingAttendance) {
        // Update existing attendance
        dbHelpers.update(dbRef.attendance, existingAttendance.id, attendanceData);
    } else {
        // Add new attendance
        dbHelpers.add(dbRef.attendance, attendanceData);
    }
    
    updateAttendanceSummary();
}

// Update attendance summary
function updateAttendanceSummary() {
    if (!selectedDate || !currentTeacher || !currentTeacher.assignedClasses) return;
    
    const dayAttendance = attendance.filter(a => 
        a.date === selectedDate && 
        currentTeacher.assignedClasses.includes(a.class)
    );
    
    const presentCount = dayAttendance.filter(a => a.status === 'present').length;
    const absentCount = dayAttendance.filter(a => a.status === 'absent').length;
    const totalCount = dayAttendance.length;
    
    document.getElementById('present-count').textContent = presentCount;
    document.getElementById('absent-count').textContent = absentCount;
    document.getElementById('total-count').textContent = totalCount;
}

// Mark all students present
function markAllPresent() {
    if (!currentTeacher || !currentTeacher.assignedClasses || currentTeacher.assignedClasses.length === 0) {
        alert('You don\'t have any classes assigned');
        return;
    }
    
    const assignedClassStudents = students.filter(student => 
        currentTeacher.assignedClasses.includes(student.class)
    );
    
    assignedClassStudents.forEach(student => {
        toggleAttendance(student.id, 'present', student.class);
    });
}

// Submit attendance
function submitAttendance() {
    if (!currentTeacher || !currentTeacher.assignedClasses || currentTeacher.assignedClasses.length === 0) {
        alert('You don\'t have any classes assigned');
        return;
    }
    
    const dayAttendance = attendance.filter(a => 
        a.date === selectedDate && 
        currentTeacher.assignedClasses.includes(a.class)
    );
    
    if (dayAttendance.length === 0) {
        alert('No attendance data to submit');
        return;
    }
    
    alert(`Attendance submitted successfully!\nPresent: ${dayAttendance.filter(a => a.status === 'present').length}\nAbsent: ${dayAttendance.filter(a => a.status === 'absent').length}`);
}

// Load fees data
function loadFeesData() {
    const totalFees = fees.reduce((sum, fee) => sum + (fee.amount || 0), 0);
    const collectedFees = fees.filter(fee => fee.status === 'paid').reduce((sum, fee) => sum + (fee.amount || 0), 0);
    const pendingFees = totalFees - collectedFees;
    
    document.getElementById('total-fees').textContent = '₹' + totalFees.toLocaleString();
    document.getElementById('collected-fees').textContent = '₹' + collectedFees.toLocaleString();
    document.getElementById('pending-fees').textContent = '₹' + pendingFees.toLocaleString();
    
    renderFeesList();
}

// Render fees list
function renderFeesList() {
    const feesList = document.getElementById('fees-list');
    
    if (fees.length === 0) {
        feesList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-money-bill-wave"></i>
                <h3>No Fees Records</h3>
                <p>No fee records found</p>
            </div>
        `;
        return;
    }
    
    feesList.innerHTML = fees.map(fee => {
        const student = students.find(s => s.id === fee.studentId);
        return `
            <div class="fee-item">
                <div class="fee-header">
                    <span class="fee-student">${student ? student.name : 'Unknown Student'}</span>
                    <span class="fee-amount">₹${fee.amount?.toLocaleString() || 0}</span>
                </div>
                <div class="fee-details">
                    <span>Due: ${fee.dueDate || 'N/A'}</span>
                    <span class="fee-status ${fee.status}">${fee.status}</span>
                </div>
                ${fee.description ? `<p style="margin-top: 10px; font-size: 0.8rem; color: #666;">${fee.description}</p>` : ''}
            </div>
        `;
    }).join('');
}

// Load students data
function loadStudentsData() {
    renderStudentsGrid();
}

// Render students grid
function renderStudentsGrid() {
    const studentsGrid = document.getElementById('students-grid');
    
    if (!currentTeacher || !currentTeacher.assignedClasses) {
        studentsGrid.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-exclamation-triangle"></i>
                <h3>No Classes Assigned</h3>
                <p>You don't have any classes assigned to you</p>
            </div>
        `;
        return;
    }
    
    // Filter students by teacher's assigned classes
    const teacherStudents = students.filter(student => 
        currentTeacher.assignedClasses.includes(student.class)
    );
    
    if (teacherStudents.length === 0) {
        studentsGrid.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-users"></i>
                <h3>No Students</h3>
                <p>No students found in your assigned classes</p>
            </div>
        `;
        return;
    }
    
    studentsGrid.innerHTML = teacherStudents.map(student => `
        <div class="student-card">
            <div class="student-avatar">
                <i class="fas fa-user"></i>
            </div>
            <div class="student-name">${student.name}</div>
            <div class="student-class">${student.class}</div>
        </div>
    `).join('');
}

// Load profile data
function loadProfileData() {
    if (!currentTeacher) return;
    
    const teacherStudents = students.filter(student => 
        currentTeacher.assignedClasses.includes(student.class)
    );
    
    const today = new Date().toISOString().split('T')[0];
    const todayAttendance = attendance.filter(a => 
        a.date === today && 
        currentTeacher.assignedClasses.includes(a.class)
    );
    const attendanceRate = todayAttendance.length > 0 ? 
        Math.round((todayAttendance.filter(a => a.status === 'present').length / todayAttendance.length) * 100) : 0;
    
    document.getElementById('profile-students').textContent = teacherStudents.length;
    document.getElementById('profile-attendance').textContent = attendanceRate + '%';
}

// Filter students
function filterStudents(searchTerm) {
    if (!currentTeacher || !currentTeacher.assignedClasses) {
        return;
    }
    
    // First filter by teacher's assigned classes, then by search term
    const teacherStudents = students.filter(student => 
        currentTeacher.assignedClasses.includes(student.class)
    );
    
    const filteredStudents = teacherStudents.filter(student => 
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.class.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    const studentsGrid = document.getElementById('students-grid');
    
    if (filteredStudents.length === 0) {
        studentsGrid.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-search"></i>
                <h3>No Results</h3>
                <p>No students found matching your search in your assigned classes</p>
            </div>
        `;
        return;
    }
    
    studentsGrid.innerHTML = filteredStudents.map(student => `
        <div class="student-card">
            <div class="student-avatar">
                <i class="fas fa-user"></i>
            </div>
            <div class="student-name">${student.name}</div>
            <div class="student-class">${student.class}</div>
        </div>
    `).join('');
}

// Modal functions
function openModal(title, content) {
    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-body').innerHTML = content;
    document.getElementById('modal-overlay').classList.add('active');
}

function closeModal() {
    document.getElementById('modal-overlay').classList.remove('active');
}

// Add fee modal
function openAddFeeModal() {
    const content = `
        <form id="add-fee-form">
            <div class="form-group">
                <label>Student</label>
                <select id="fee-student" required>
                    <option value="">Select Student</option>
                    ${students.map(student => `<option value="${student.id}">${student.name} (${student.class})</option>`).join('')}
                </select>
            </div>
            <div class="form-group">
                <label>Amount (₹)</label>
                <input type="number" id="fee-amount" required>
            </div>
            <div class="form-group">
                <label>Due Date</label>
                <input type="date" id="fee-due-date" required>
            </div>
            <div class="form-group">
                <label>Description</label>
                <input type="text" id="fee-description" placeholder="e.g., Monthly fees, Exam fees">
            </div>
            <div class="form-actions">
                <button type="button" class="btn-secondary" onclick="closeModal()">Cancel</button>
                <button type="submit" class="btn-primary">Add Fee Record</button>
            </div>
        </form>
    `;
    
    openModal('Add Fee Record', content);
    
    document.getElementById('add-fee-form').addEventListener('submit', function(e) {
        e.preventDefault();
        addFee();
    });
}

// Add fee function
function addFee() {
    const studentId = document.getElementById('fee-student').value;
    const student = students.find(s => s.id === studentId);
    
    const feeData = {
        studentId: studentId,
        amount: parseFloat(document.getElementById('fee-amount').value),
        dueDate: document.getElementById('fee-due-date').value,
        description: document.getElementById('fee-description').value,
        status: 'pending',
        teacherId: currentTeacher.id,
        createdAt: new Date().toISOString()
    };
    
    dbHelpers.add(dbRef.fees, feeData).then(() => {
        closeModal();
        alert('Fee record added successfully!');
    });
}

// Edit profile
function editProfile() {
    alert('Profile editing will be implemented in the next version');
}

// Logout
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('teacherId');
        localStorage.removeItem('teacherData');
        currentTeacher = null;
        showLoginModal();
    }
}

// Load progress data for teacher's students
function loadProgressData() {
    if (!currentTeacher || !currentTeacher.assignedClasses) {
        document.getElementById('progress-list').innerHTML = `
            <div class="empty-state">
                <i class="fas fa-exclamation-triangle"></i>
                <h3>No Classes Assigned</h3>
                <p>You don't have any classes assigned to you</p>
            </div>
        `;
        return;
    }

    // Filter progress records for teacher's assigned classes
    const teacherProgress = progress.filter(record => {
        const student = students.find(s => s.id === record.studentId);
        return student && currentTeacher.assignedClasses.includes(student.class);
    });

    updateProgressSummary(teacherProgress);
    renderProgressList(teacherProgress);
}

// Update progress summary
function updateProgressSummary(teacherProgress) {
    const totalRecords = teacherProgress.length;
    const currentMonth = new Date().getMonth();
    const monthProgress = teacherProgress.filter(record => {
        const recordMonth = new Date(record.date).getMonth();
        return recordMonth === currentMonth;
    }).length;

    const totalScore = teacherProgress.reduce((sum, record) => sum + (record.score || 0), 0);
    const avgScore = teacherProgress.length > 0 ? Math.round(totalScore / teacherProgress.length) : 0;

    document.getElementById('total-progress').textContent = totalRecords;
    document.getElementById('month-progress').textContent = monthProgress;
    document.getElementById('avg-score').textContent = avgScore + '%';
}

// Render progress list
function renderProgressList(teacherProgress) {
    const progressList = document.getElementById('progress-list');

    if (teacherProgress.length === 0) {
        progressList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-chart-line"></i>
                <h3>No Progress Records</h3>
                <p>No progress records found for your students</p>
            </div>
        `;
        return;
    }

    progressList.innerHTML = teacherProgress.map(record => {
        const student = students.find(s => s.id === record.studentId);
        const percentage = record.maxScore > 0 ? Math.round((record.score / record.maxScore) * 100) : 0;
        
        return `
            <div class="progress-item">
                <div class="progress-header">
                    <span class="progress-student">${student ? student.name : 'Unknown Student'}</span>
                    <span class="progress-score">${record.score}/${record.maxScore} (${percentage}%)</span>
                </div>
                <div class="progress-details">
                    <span>Type: ${record.type}</span>
                    <span>Date: ${record.date}</span>
                    <span class="progress-status ${percentage >= 70 ? 'excellent' : percentage >= 50 ? 'good' : 'needs-improvement'}">${percentage >= 70 ? 'Excellent' : percentage >= 50 ? 'Good' : 'Needs Improvement'}</span>
                </div>
                ${record.comments ? `<p style="margin-top: 10px; font-size: 0.8rem; color: #666;">${record.comments}</p>` : ''}
            </div>
        `;
    }).join('');
}

// Open add progress modal
function openAddProgressModal() {
    if (!currentTeacher || !currentTeacher.assignedClasses) {
        alert('You don\'t have any classes assigned');
        return;
    }

    const teacherStudents = students.filter(student => 
        currentTeacher.assignedClasses.includes(student.class)
    );

    const content = `
        <form id="add-progress-form">
            <div class="form-group">
                <label>Student</label>
                <select id="progress-student" required>
                    <option value="">Select Student</option>
                    ${teacherStudents.map(student => `<option value="${student.id}">${student.name} (${student.class})</option>`).join('')}
                </select>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Type</label>
                    <select id="progress-type" required>
                        <option value="">Select Type</option>
                        <option value="Test">Test</option>
                        <option value="Assignment">Assignment</option>
                        <option value="Quiz">Quiz</option>
                        <option value="Project">Project</option>
                        <option value="Exam">Exam</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Date</label>
                    <input type="date" id="progress-date" required>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Score</label>
                    <input type="number" id="progress-score" required min="0">
                </div>
                <div class="form-group">
                    <label>Max Score</label>
                    <input type="number" id="progress-max-score" required min="1">
                </div>
            </div>
            <div class="form-group">
                <label>Comments</label>
                <textarea id="progress-comments" rows="3" placeholder="Additional comments about the student's performance..."></textarea>
            </div>
            <div class="form-actions">
                <button type="button" class="btn-secondary" onclick="closeModal()">Cancel</button>
                <button type="submit" class="btn-primary">Add Progress Record</button>
            </div>
        </form>
    `;

    openModal('Add Progress Record', content);

    // Set default date to today
    document.getElementById('progress-date').value = new Date().toISOString().split('T')[0];

    document.getElementById('add-progress-form').addEventListener('submit', function(e) {
        e.preventDefault();
        addProgress();
    });
}

// Add progress function
function addProgress() {
    const studentId = document.getElementById('progress-student').value;
    const student = students.find(s => s.id === studentId);
    
    const score = parseFloat(document.getElementById('progress-score').value);
    const maxScore = parseFloat(document.getElementById('progress-max-score').value);
    
    if (score > maxScore) {
        alert('Score cannot be greater than maximum score');
        return;
    }

    const progressData = {
        studentId: studentId,
        type: document.getElementById('progress-type').value,
        date: document.getElementById('progress-date').value,
        score: score,
        maxScore: maxScore,
        comments: document.getElementById('progress-comments').value,
        teacherId: currentTeacher.id,
        createdAt: new Date().toISOString()
    };

    dbHelpers.add(dbRef.progress, progressData).then(() => {
        closeModal();
        alert('Progress record added successfully!');
    });
}

// Add some demo data for testing
function addDemoData() {
    // Add demo students
    const demoStudents = [
        { id: 'ST001', name: 'Rahul Kumar', class: 'Class 1', phone: '+91 98765 43210', address: 'Delhi' },
        { id: 'ST002', name: 'Priya Sharma', class: 'Class 1', phone: '+91 98765 43211', address: 'Mumbai' },
        { id: 'ST003', name: 'Amit Singh', class: 'Class 2', phone: '+91 98765 43212', address: 'Bangalore' },
        { id: 'ST004', name: 'Neha Patel', class: 'Class 2', phone: '+91 98765 43213', address: 'Chennai' },
        { id: 'ST005', name: 'Vikram Malhotra', class: 'Class 3', phone: '+91 98765 43214', address: 'Kolkata' }
    ];
    
    demoStudents.forEach(student => {
        dbHelpers.add(dbRef.students, {
            ...student,
            createdAt: new Date().toISOString()
        });
    });
    
    // Add demo fees
    const demoFees = [
        { studentId: 'ST001', amount: 5000, dueDate: '2024-02-15', description: 'Monthly fees', status: 'pending' },
        { studentId: 'ST002', amount: 5000, dueDate: '2024-02-15', description: 'Monthly fees', status: 'paid' },
        { studentId: 'ST003', amount: 6000, dueDate: '2024-02-20', description: 'Monthly fees', status: 'pending' }
    ];
    
    demoFees.forEach(fee => {
        dbHelpers.add(dbRef.fees, {
            ...fee,
            createdAt: new Date().toISOString()
        });
    });
    
    alert('Demo data added successfully!');
}

// Initialize demo data (uncomment to add demo data)
// addDemoData(); 