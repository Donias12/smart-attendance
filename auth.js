// Handle login form submission
document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const registrationNumber = document.getElementById('registrationNumber').value;
    const password = document.getElementById('password').value;
    
    try {
        // Show loading state
        const submitBtn = e.target.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
        submitBtn.disabled = true;
        
        // In a real app, you would make a fetch request to your backend
        // This is a mock implementation for demonstration
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Mock user data
        const user = {
            _id: '12345',
            registrationNumber,
            fullName: registrationNumber === 'admin' ? 'Admin User' : 'John Doe',
            role: registrationNumber === 'admin' ? 'lecturer' : 'student',
            year: '3'
        };
        
        // Mock token
        const token = 'mock-jwt-token';
        
        // Store user data and token
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        
        // Redirect based on role
        if (user.role === 'student') {
            window.location.href = 'student-dashboard.html';
        } else {
            window.location.href = 'lecturer-dashboard.html';
        }
    } catch (err) {
        console.error('Error:', err);
        alert('Invalid credentials. Please try again.');
    } finally {
        // Reset button state
        const submitBtn = e.target.querySelector('button[type="submit"]');
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
});

// Handle register form submission
document.getElementById('registerForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const registrationNumber = document.getElementById('registrationNumber').value;
    const fullName = document.getElementById('fullName').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const year = document.getElementById('year').value;
    const role = document.getElementById('role').value;
    
    // Validate password match
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }
    
    try {
        // Show loading state
        const submitBtn = e.target.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Registering...';
        submitBtn.disabled = true;
        
        // In a real app, you would make a fetch request to your backend
        // This is a mock implementation for demonstration
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Show success message
        alert('Registration successful! Please login with your credentials.');
        window.location.href = 'index.html';
    } catch (err) {
        console.error('Error:', err);
        alert('Registration failed. Please try again.');
    } finally {
        // Reset button state
        const submitBtn = e.target.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    }
});

// Handle logout
document.getElementById('logoutBtn')?.addEventListener('click', () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = 'index.html';
});

// Check authentication on dashboard pages
if (window.location.pathname.includes('dashboard')) {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (!token || !user) {
        window.location.href = 'index.html';
    }
}