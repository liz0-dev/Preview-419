
// Global variables
let currentTheme = 'dark';
let isLoggedIn = false;
let currentUser = null;

// Sample video data
const sampleVideos = [
    {
        id: 1,
        title: "Epic Gaming Montage",
        category: "gaming",
        views: "1.2M",
        likes: "45K",
        description: "Amazing gaming highlights from the best players around the world"
    },
    {
        id: 2,
        title: "Incredible Sports Moments",
        category: "sports",
        views: "890K",
        likes: "32K",
        description: "The most incredible sports moments caught on camera"
    },
    {
        id: 3,
        title: "Hilarious Pet Compilation",
        category: "funny",
        views: "2.1M",
        likes: "78K",
        description: "Funny pets doing the most adorable and hilarious things"
    },
    {
        id: 4,
        title: "Trending Dance Challenge",
        category: "trending",
        views: "3.5M",
        likes: "125K",
        description: "The latest dance trend that's taking the world by storm"
    },
    {
        id: 5,
        title: "Cooking Masterclass",
        category: "lifestyle",
        views: "756K",
        likes: "28K",
        description: "Learn to cook like a professional chef with these amazing tips"
    },
    {
        id: 6,
        title: "Music Production Behind the Scenes",
        category: "music",
        views: "445K",
        likes: "19K",
        description: "Go behind the scenes of creating a hit song from start to finish"
    }
];

// DOM elements
const elements = {
    loadingScreen: document.getElementById('loading-screen'),
    navToggle: document.getElementById('nav-toggle'),
    navMenu: document.getElementById('nav-menu'),
    themeToggle: document.getElementById('theme-toggle'),
    loginBtn: document.getElementById('login-btn'),
    signupBtn: document.getElementById('signup-btn'),
    chiTownBtn: document.getElementById('chi-town-btn'),
    loginModal: document.getElementById('login-modal'),
    signupModal: document.getElementById('signup-modal'),
    videoModal: document.getElementById('video-modal'),
    closeLogin: document.getElementById('close-login'),
    closeSignup: document.getElementById('close-signup'),
    closeVideo: document.getElementById('close-video'),
    switchToSignup: document.getElementById('switch-to-signup'),
    switchToLogin: document.getElementById('switch-to-login'),
    loginForm: document.getElementById('login-form'),
    signupForm: document.getElementById('signup-form'),
    videoGrid: document.getElementById('video-grid')
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Hide loading screen after a delay
    setTimeout(() => {
        elements.loadingScreen.style.opacity = '0';
        setTimeout(() => {
            elements.loadingScreen.style.display = 'none';
        }, 500);
    }, 1500);

    // Set up event listeners
    setupEventListeners();
    
    // Load videos
    loadVideos();
    
    // Initialize animations
    initializeAnimations();
}

function setupEventListeners() {
    // Navigation toggle
    elements.navToggle.addEventListener('click', toggleMobileMenu);
    
    // Theme toggle
    elements.themeToggle.addEventListener('click', toggleTheme);
    
    // Auth buttons
    elements.loginBtn.addEventListener('click', () => openModal('login'));
    elements.signupBtn.addEventListener('click', () => openModal('signup'));
    
    // Chi Town button
    elements.chiTownBtn.addEventListener('click', handleChiTownClick);
    
    // Modal close buttons
    elements.closeLogin.addEventListener('click', () => closeModal('login'));
    elements.closeSignup.addEventListener('click', () => closeModal('signup'));
    elements.closeVideo.addEventListener('click', () => closeModal('video'));
    
    // Modal switch buttons
    elements.switchToSignup.addEventListener('click', (e) => {
        e.preventDefault();
        closeModal('login');
        openModal('signup');
    });
    
    elements.switchToLogin.addEventListener('click', (e) => {
        e.preventDefault();
        closeModal('signup');
        openModal('login');
    });
    
    // Form submissions
    elements.loginForm.addEventListener('submit', handleLogin);
    elements.signupForm.addEventListener('submit', handleSignup);
    
    // Category cards
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', () => {
            const category = card.dataset.category;
            filterVideosByCategory(category);
        });
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            closeAllModals();
        }
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function toggleMobileMenu() {
    elements.navMenu.classList.toggle('active');
    elements.navToggle.classList.toggle('active');
}

function toggleTheme() {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.body.className = currentTheme === 'dark' ? 'dark-theme' : '';
    
    const themeIcon = elements.themeToggle.querySelector('.theme-icon');
    themeIcon.textContent = currentTheme === 'dark' ? '☀️' : '🌙';
    
    // Save theme preference
    localStorage.setItem('theme', currentTheme);
}

function openModal(modalType) {
    const modal = elements[modalType + 'Modal'];
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalType) {
    const modal = elements[modalType + 'Modal'];
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
}

function closeAllModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.remove('show');
    });
    document.body.style.overflow = 'auto';
}

function handleChiTownClick() {
    // Create a special effect for Chi Town button
    const btn = elements.chiTownBtn;
    btn.style.transform = 'scale(1.1)';
    btn.style.background = 'linear-gradient(45deg, #ff9ff3, #f8b500)';
    
    // Show a special message
    setTimeout(() => {
        alert('🔥 Chi Town Special Event Coming Soon! 🔥\n\nGet ready for exclusive content from the Windy City!');
        btn.style.transform = 'scale(1)';
        btn.style.background = 'linear-gradient(45deg, #ff6b6b, #feca57)';
    }, 200);
}

function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    // Simulate login process
    if (email && password) {
        isLoggedIn = true;
        currentUser = { email, name: email.split('@')[0] };
        
        // Update UI
        updateAuthUI();
        closeModal('login');
        
        // Show success message
        showNotification('Login successful! Welcome back!', 'success');
        
        // Clear form
        elements.loginForm.reset();
    } else {
        showNotification('Please fill in all fields', 'error');
    }
}

function handleSignup(e) {
    e.preventDefault();
    
    const username = document.getElementById('signup-username').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    
    // Simulate signup process
    if (username && email && password) {
        isLoggedIn = true;
        currentUser = { email, name: username };
        
        // Update UI
        updateAuthUI();
        closeModal('signup');
        
        // Show success message
        showNotification('Account created successfully! Welcome to 419!', 'success');
        
        // Clear form
        elements.signupForm.reset();
    } else {
        showNotification('Please fill in all fields', 'error');
    }
}

function updateAuthUI() {
    if (isLoggedIn) {
        elements.loginBtn.textContent = `Hi, ${currentUser.name}`;
        elements.signupBtn.textContent = 'Logout';
        elements.signupBtn.onclick = logout;
    } else {
        elements.loginBtn.textContent = 'Login';
        elements.signupBtn.textContent = 'Sign Up';
        elements.signupBtn.onclick = () => openModal('signup');
    }
}

function logout() {
    isLoggedIn = false;
    currentUser = null;
    updateAuthUI();
    showNotification('Logged out successfully', 'info');
}

function loadVideos() {
    elements.videoGrid.innerHTML = '';
    
    sampleVideos.forEach((video, index) => {
        const videoCard = createVideoCard(video);
        videoCard.style.animationDelay = `${index * 0.1}s`;
        elements.videoGrid.appendChild(videoCard);
    });
}

function createVideoCard(video) {
    const card = document.createElement('div');
    card.className = 'video-card';
    card.style.animation = 'fade-in 0.6s ease-out both';
    
    card.innerHTML = `
        <div class="video-thumbnail">
            <div class="play-button">▶</div>
        </div>
        <div class="video-info">
            <h3>${video.title}</h3>
            <div class="video-stats">
                <span>${video.views} views</span>
                <span>${video.likes} likes</span>
            </div>
        </div>
    `;
    
    card.addEventListener('click', () => openVideoModal(video));
    
    return card;
}

function openVideoModal(video) {
    document.getElementById('video-title').textContent = video.title;
    document.getElementById('video-description').textContent = video.description;
    document.getElementById('video-views').textContent = `${video.views} views`;
    document.getElementById('video-likes').textContent = `${video.likes} likes`;
    
    openModal('video');
}

function filterVideosByCategory(category) {
    const filteredVideos = sampleVideos.filter(video => video.category === category);
    
    elements.videoGrid.innerHTML = '';
    
    if (filteredVideos.length === 0) {
        elements.videoGrid.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">No videos found in this category.</p>';
        return;
    }
    
    filteredVideos.forEach((video, index) => {
        const videoCard = createVideoCard(video);
        videoCard.style.animationDelay = `${index * 0.1}s`;
        elements.videoGrid.appendChild(videoCard);
    });
    
    // Scroll to videos section
    document.getElementById('trending').scrollIntoView({ behavior: 'smooth' });
    
    showNotification(`Showing ${category} videos`, 'info');
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '90px',
        right: '20px',
        background: type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6',
        color: 'white',
        padding: '12px 24px',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        zIndex: '3000',
        animation: 'fade-in 0.3s ease-out',
        maxWidth: '300px',
        wordWrap: 'break-word'
    });
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'fade-out 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

function initializeAnimations() {
    // Add intersection observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fade-in 0.6s ease-out both';
            }
        });
    }, observerOptions);
    
    // Observe category cards and video cards
    document.querySelectorAll('.category-card, .video-card').forEach(el => {
        observer.observe(el);
    });
}

// Load saved theme on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    currentTheme = savedTheme;
    document.body.className = savedTheme === 'dark' ? 'dark-theme' : '';
    
    const themeIcon = elements.themeToggle?.querySelector('.theme-icon');
    if (themeIcon) {
        themeIcon.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
    }
});

// Add some interactive effects
document.addEventListener('mousemove', (e) => {
    // Create subtle parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        hero.style.background = `linear-gradient(${135 + mouseX * 10}deg, var(--background-color) 0%, var(--surface-color) 100%)`;
    }
});

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // ESC key closes modals
    if (e.key === 'Escape') {
        closeAllModals();
    }
    
    // Ctrl/Cmd + K opens search (placeholder)
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        showNotification('Search feature coming soon!', 'info');
    }
});

// Add video play functionality
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('play-button')) {
        e.target.style.transform = 'scale(1.2)';
        setTimeout(() => {
            e.target.style.transform = 'scale(1)';
        }, 200);
        
        showNotification('Video player coming soon!', 'info');
    }
});

// Export functions for global access (if needed)
window.VideoApp = {
    toggleTheme,
    openModal,
    closeModal,
    filterVideosByCategory,
    showNotification
};
