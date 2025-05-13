// Load lecturer modules
async function loadLecturerModules() {
    try {
        // In a real app, you would fetch this from your backend
        // This is mock data for demonstration
        const mockModules = [
            { _id: '1', code: 'CS301', name: 'Web Development', academicYear: '2023/2024', year: '3' },
            { _id: '2', code: 'CS302', name: 'Mobile App Development', academicYear: '2023/2024', year: '3' },
            { _id: '3', code: 'CS401', name: 'Artificial Intelligence', academicYear: '2023/2024', year: '4' }
        ];
        
        // Update stats
        document.getElementById('lecturerModulesCount').textContent = mockModules.length;
        document.getElementById('todaySessions').textContent = '2';
        document.getElementById('activeStudents').textContent = '85';
        document.getElementById('avgAttendance').textContent = '78%';
        
        return mockModules;
    } catch (err) {
        console.error('Error loading modules:', err);
        return [];
    }
}

// Populate module dropdowns
async function populateModuleDropdowns() {
    const modules = await loadLecturerModules();
    const sessionModuleSelect = document.getElementById('sessionModule');
    const statsModuleSelect = document.getElementById('statsModuleSelect');
    
    if (modules.length === 0) {
        sessionModuleSelect.innerHTML = '<option value="">No modules available</option>';
        statsModuleSelect.innerHTML = '<option value="">No modules available</option>';
        return;
    }
    
    const options = modules.map(module => 
        `<option value="${module._id}">${module.code} - ${module.name}</option>`
    ).join('');
    
    sessionModuleSelect.innerHTML = '<option value="" disabled selected>Select module</option>' + options;
    statsModuleSelect.innerHTML = '<option value="" disabled selected>Select module</option>' + options;
    
    // Select first module by default for stats
    if (modules.length > 0) {
        statsModuleSelect.value = modules[0]._id;
    }
}

// Handle module form submission
document.getElementById('moduleForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const code = document.getElementById('moduleCode').value;
    const name = document.getElementById('moduleName').value;
    const academicYear = document.getElementById('academicYear').value;
    const year = document.getElementById('moduleYear').value;
    
    try {
        // Show loading state
        const submitBtn = e.target.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating...';
        submitBtn.disabled = true;
        
        // In a real app, you would make a fetch request to your backend
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Show success message
        alert('Module created successfully!');
        
        // Close modal and reset form
        document.getElementById('createModuleModal').style.display = 'none';
        e.target.reset();
        
        // Refresh modules
        await populateModuleDropdowns();
    } catch (err) {
        console.error('Error:', err);
        alert('Failed to create module. Please try again.');
    } finally {
        // Reset button state
        const submitBtn = e.target.querySelector('button[type="submit"]');
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
});

// Handle session form submission
document.getElementById('sessionForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const module = document.getElementById('sessionModule').value;
    const duration = document.getElementById('sessionDuration').value;
    
    if (!module) {
        alert('Please select a module');
        return;
    }
    
    try {
        // Show loading state
        const submitBtn = e.target.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating...';
        submitBtn.disabled = true;
        
        // In a real app, you would make a fetch request to your backend
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Generate a random session code (in a real app, this would come from the backend)
        const sessionCode = generateSessionCode();
        const now = new Date();
        const validUntil = new Date(now.getTime() + duration * 60000);
        
        // Display the session code
        document.getElementById('sessionCodeDisplay').textContent = sessionCode;
        document.getElementById('sessionValidUntil').textContent = validUntil.toLocaleString();
        document.getElementById('sessionResult').classList.remove('hidden');
        
        // Reset form but keep module selected
        e.target.reset();
        document.getElementById('sessionModule').value = module;
    } catch (err) {
        console.error('Error:', err);
        alert('Failed to create session. Please try again.');
    } finally {
        // Reset button state
        const submitBtn = e.target.querySelector('button[type="submit"]');
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
});

// Generate a random session code
function generateSessionCode() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}