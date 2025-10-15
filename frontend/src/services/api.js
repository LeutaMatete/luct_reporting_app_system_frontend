// API service for consistent data fetching
const API_BASE = process.env.NODE_ENV === 'development' 
  ? 'http://localhost:5000' 
  : '';// or your local backend port

export const apiService = {
    // Ratings endpoints
    submitRating: (token, ratingData) => 
        fetch(`${API_BASE}/ratings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(ratingData)
        }),
    
    getLecturerRatings: (token) => 
        fetch(`${API_BASE}/ratings/lecturer`, {
            headers: { 'Authorization': `Bearer ${token}` }
        }),
    
    getPRLRatings: (token) =>
        fetch(`${API_BASE}/ratings/prl`, {
            headers: { 'Authorization': `Bearer ${token}` }
        }),
    
    getProgramRatings: (token) =>
        fetch(`${API_BASE}/ratings/program`, {
            headers: { 'Authorization': `Bearer ${token}` }
        }),
    
    getRatingStatistics: (token) =>
        fetch(`${API_BASE}/ratings/statistics`, {
            headers: { 'Authorization': `Bearer ${token}` }
        }),
    
    // Reports endpoints
    createReport: (token, reportData) =>
        fetch(`${API_BASE}/reports`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(reportData)
        }),
    
    getStudentReports: (token) =>
        fetch(`${API_BASE}/reports/student`, {
            headers: { 'Authorization': `Bearer ${token}` }
        }),
    
    getLecturerReports: (token) =>
        fetch(`${API_BASE}/reports/lecturer`, {
            headers: { 'Authorization': `Bearer ${token}` }
        }),
    
    deleteReport: (token, reportId) =>
        fetch(`${API_BASE}/reports/${reportId}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        }),
    
    // Courses endpoints
    addCourse: (token, courseData) =>
        fetch(`${API_BASE}/courses`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(courseData)
        }),
    
    assignModule: (token, assignmentData) =>
        fetch(`${API_BASE}/courses/assign`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(assignmentData)
        }),
    
    getCourses: (token) =>
        fetch(`${API_BASE}/courses`, {
            headers: { 'Authorization': `Bearer ${token}` }
        }),
    
    getLecturers: (token) =>
        fetch(`${API_BASE}/courses/lecturers`, {
            headers: { 'Authorization': `Bearer ${token}` }
        }),
    
    // Auth endpoints
    login: (credentials) =>
        fetch(`${API_BASE}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        }),
    
    register: (userData) =>
        fetch(`${API_BASE}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        }),
    
    getProfile: (token) =>
        fetch(`${API_BASE}/auth/profile`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
};

export default apiService;