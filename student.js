// Load student modules
async function loadStudentModules() {
    try {
        // In a real app, you would fetch this from your backend
        // This is mock data for demonstration
        const mockModules = [
            { code: 'CS101', name: 'Introduction to Programming' },
            { code: 'CS102', name: 'Data Structures' },
            { code: 'CS201', name: 'Database Systems' },
            { code: 'CS301', name: 'Web Development' }
        ];
        
        const modulesList = document.getElementById('modulesList');
        
        if (mockModules.length === 0) {
            modulesList.innerHTML = '<div class="module-card"><div class="module-icon"><i class="fas fa-book-open"></i></div><h4>No modules enrolled</h4></div>';
        } else {
            modulesList.innerHTML = mockModules.map(module => `
                <div class="module-card">
                    <div class="module-icon">
                        <i class="fas fa-laptop-code"></i>
                    </div>
                    <h4>${module.code}</h4>
                    <p>${module.name}</p>
                </div>
            `).join('');
        }
        
        // Update stats
        document.getElementById('todayAttendance').textContent = '2/4';
        document.getElementById('overallAttendance').textContent = '85%';
        document.getElementById('activeModules').textContent = mockModules.length;
    } catch (err) {
        console.error('Error loading modules:', err);
        document.getElementById('modulesList').innerHTML = '<div class="module-card"><div class="module-icon"><i class="fas fa-exclamation-triangle"></i></div><h4>Error loading modules</h4></div>';
    }
}

// Handle attendance form submission
document.getElementById('attendanceForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const sessionCode = document.getElementById('sessionCode').value;
    
    if (!sessionCode) {
        alert('Please enter a session code');
        return;
    }
    
    try {
        // Show loading state
        const submitBtn = e.target.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        submitBtn.disabled = true;
        
        // In a real app, you would make a fetch request to your backend
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Show success message
        alert('Attendance marked successfully!');
        
        // Close modal and reset form
        document.getElementById('markAttendanceModal').style.display = 'none';
        e.target.reset();
        
        // Refresh modules (in a real app, this would update attendance stats)
        loadStudentModules();
    } catch (err) {
        console.error('Error:', err);
        alert('Failed to mark attendance. Please try again.');
    } finally {
        // Reset button state
        const submitBtn = e.target.querySelector('button[type="submit"]');
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
});