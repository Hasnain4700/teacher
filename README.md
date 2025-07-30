# Teacher Panel - School Management System

This folder contains the Teacher Panel application for the School Management System.

## Files Structure

- `index.html` - Main HTML file (renamed from teacher.html for GitHub deployment)
- `teacher.css` - Styles for the teacher panel
- `teacher.js` - JavaScript logic for the teacher panel
- `js/firebase-config.js` - Firebase configuration and database helpers
- `js/demo-data.js` - Demo data import script

## Deployment

This folder is designed to be deployed as a separate GitHub Pages site. The `index.html` file serves as the entry point.

## Features

- Teacher authentication and login
- Class-based access control (teachers only see their assigned classes)
- Attendance management for assigned classes
- Fee updates for students
- Student progress tracking and reporting
- Mobile-optimized interface

## Usage

1. Open `index.html` in a web browser
2. Login with teacher credentials (set in admin panel)
3. Manage attendance, fees, and student progress for assigned classes

## Dependencies

- Firebase Realtime Database
- Font Awesome icons
- Chart.js (for data visualization) 