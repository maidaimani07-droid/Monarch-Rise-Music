// ===== script.js – Monarch-Rise Music =====

// ===== Top 100 Data =====
const top100Songs = [
    { id: 1, title: "Malaŵi Sunrise", artist: "Lilongwe Collective", type: "audio", votes: 45230, views: 125000, src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", icon: "fa-headphones" },
    { id: 2, title: "Blantyre Nights", artist: "Blantyre Soul", type: "audio", votes: 38750, views: 98000, src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", icon: "fa-headphones" },
    { id: 3, title: "Lake Malawi (Live)", artist: "Nyasa Rhythms", type: "video", votes: 35120, views: 156000, src: "https://www.w3schools.com/html/mov_bbb.mp4", icon: "fa-video" },
    { id: 4, title: "Zomba Groove", artist: "Mzuzu Vibes", type: "audio", votes: 28900, views: 87000, src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", icon: "fa-headphones" },
    { id: 5, title: "Malawi Freedom", artist: "Lilongwe Collective", type: "audio", votes: 25430, views: 72000, src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", icon: "fa-headphones" }
];

// ===== Format Numbers =====
function formatNumber(num) {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
}

// ===== Render Top 100 Preview =====
function renderTop100Preview() {
    const previewContainer = document.getElementById('top100Preview');
    if (!previewContainer) return;
    
    const top5 = top100Songs.slice(0, 5);
    previewContainer.innerHTML = top5.map((song, index) => `
        <div class="top100-preview-item">
            <div class="top100-rank">#${index + 1}</div>
            <div class="song-icon"><i class="fas ${song.icon}"></i></div>
            <div class="song-info">
                <h4>${song.title}</h4>
                <p>${song.artist}</p>
                <div class="song-stats">
                    <span><i class="fas fa-heart"></i> ${formatNumber(song.votes)}</span>
                    <span><i class="fas fa-eye"></i> ${formatNumber(song.views)}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// ===== Navigation Toggle =====
document.addEventListener('DOMContentLoaded', function() {
    // Hamburger menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
    
    // Render Top 100 Preview
    renderTop100Preview();
    
    // ===== Newsletter Form =====
    const newsletterForms = document.querySelectorAll('#newsletterForm');
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const input = this.querySelector('input[type="email"]');
            if (input && input.value) {
                alert('Thank you for subscribing! You\'ll receive updates from Monarch-Rise Music.');
                input.value = '';
            }
        });
    });
    
    // ===== Contact Form =====
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! We\'ll get back to you within 24 hours.');
            this.reset();
        });
    }
    
    // ===== Smooth Scrolling =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});