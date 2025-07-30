// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBFuXUCtYrniuV6X_I2Ktk880-yAV-TFZU",
    authDomain: "school-demo-6759c.firebaseapp.com",
    projectId: "school-demo-6759c",
    storageBucket: "school-demo-6759c.firebasestorage.app",
    messagingSenderId: "619056455153",
    appId: "1:619056455153:web:596db79d130b89fdcff850",
    measurementId: "G-DR3VQWCEP6",
    databaseURL: "https://school-demo-6759c-default-rtdb.asia-southeast1.firebasedatabase.app"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firebase services
const database = firebase.database();
const auth = firebase.auth();

// Database references
const dbRef = {
    students: database.ref('students'),
    teachers: database.ref('teachers'),
    classes: database.ref('classes'),
    attendance: database.ref('attendance'),
    fees: database.ref('fees'),
    progress: database.ref('progress'),
    activities: database.ref('activities')
};

// Helper functions for database operations
const dbHelpers = {
    // Add new record
    add: (ref, data) => {
        return ref.push(data);
    },

    // Update existing record
    update: (ref, key, data) => {
        return ref.child(key).update(data);
    },

    // Remove record
    remove: (ref, key) => {
        return ref.child(key).remove();
    },

    // Get single record
    get: (ref, key) => {
        return ref.child(key).once('value');
    },

    // Get all records
    getAll: (ref) => {
        return ref.once('value');
    },

    // Listen for changes
    listen: (ref, callback) => {
        return ref.on('value', callback);
    },

    // Generate unique ID
    generateId: () => {
        return database.ref().push().key;
    }
};

// Export for use in other files
window.dbRef = dbRef;
window.dbHelpers = dbHelpers; 