// ===== script.js – Monarch-Rise Music =====

// ===== Top 100 Data =====
const top100Songs = [
    { id: 1, title: "Malaŵi Sunrise", artist: "Lilongwe Collective", type: "audio", votes: 45230, views: 125000, src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", icon: "fa-headphones" },
    { id: 2, title: "Blantyre Nights", artist: "Blantyre Soul", type: "audio", votes: 38750, views: 98000, src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", icon: "fa-headphones" },
    { id: 3, title: "Lake Malawi (Live)", artist: "Nyasa Rhythms", type: "video", votes: 35120, views: 156000, src: "https://www.w3schools.com/html/mov_bbb.mp4", icon: "fa-video" },
    { id: 4, title: "Zomba Groove", artist: "Mzuzu Vibes", type: "audio", votes: 28900, views: 87000, src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", icon: "fa-headphones" },
    { id: 5, title: "Malawi Freedom", artist: "Lilongwe Collective", type: "audio", votes: 25430, views: 72000, src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", icon: "fa-headphones" },
    { id: 6, title: "Mulanje Mountain", artist: "Nyasa Rhythms", type: "video", votes: 22100, views: 94000, src: "https://www.w3schools.com/html/mov_bbb.mp4", icon: "fa-video" },
    { id: 7, title: "Northern Lights", artist: "Mzuzu Vibes", type: "audio", votes: 19870, views: 56000, src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", icon: "fa-headphones" },
    { id: 8, title: "Soul of Malawi", artist: "Blantyre Soul", type: "audio", votes: 17540, views: 48000, src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3", icon: "fa-headphones" },
    { id: 9, title: "Mzuzu City", artist: "Mzuzu Vibes", type: "audio", votes: 15230, views: 42000, src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3", icon: "fa-headphones" },
    { id: 10, title: "Sunset in Salima", artist: "Lilongwe Collective", type: "audio", votes: 13400, views: 38000, src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3", icon: "fa-headphones" }
];

// ===== Render Top 100 Preview on Homepage =====
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

// ===== Render Full Top 100 List =====
function renderTop100List(filter = 'all') {
    const listContainer = document.getElementById('top100List');
    if (!listContainer) return;
    
    const filtered = filter === 'all' ? top100Songs : top100Songs.filter(s => s.type === filter);
    
    listContainer.innerHTML = filtered.map((song, index) => `
        <div class="top100-item">
            <div class="rank">#${index + 1}</div>
            <div class="song-icon"><i class="fas ${song.icon}"></i></div>
            <div class="song-details">
                <h4>${song.title}</h4>
                <p>${song.artist}</p>
            </div>
            <div class="song-meta">
                <span><i class="fas fa-heart"></i> ${formatNumber(song.votes)} votes</span>
                <span><i class="fas fa-eye"></i> ${formatNumber(song.views)} views</span>
                <span><i class="fas fa-tag"></i> ${song.type}</span>
            </div>
            <div class="song-actions">
                <button class="btn-vote" onclick="voteSong(${song.id})"><i class="fas fa-thumbs-up"></i> Vote</button>
                <button class="btn-play-small" onclick="playSong('${song.src}', '${song.title}', '${song.artist}')"><i class="fas fa-play"></i></button>
            </div>
        </div>
    `).join('');
}

// ===== Vote Function =====
function voteSong(id) {
    const song = top100Songs.find(s => s.id === id);
    if (song) {
        song.votes += 1;
        alert(`You voted for "${song.title}"! Total votes: ${formatNumber(song.votes)}`);
        renderTop100List(document.querySelector('.top100-controls .filter-btn.active')?.dataset?.filter || 'all');
        renderTop100Preview();
    }
}

// ===== Format Numbers =====
function formatNumber(num) {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
}

// ===== Navigation Toggle =====
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
    
    // ===== Render Top 100 Preview =====
    renderTop100Preview();
    
    // ===== Render Full Top 100 =====
    renderTop100List('all');
    
    // ===== Top 100 Filter Buttons =====
    const top100FilterBtns = document.querySelectorAll('.top100-controls .filter-btn');
    if (top100FilterBtns.length) {
        top100FilterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                top100FilterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                renderTop100List(this.dataset.filter);
            });
        });
    }
    
    // ===== Play Song Function =====
    window.playSong = function(src, title, artist) {
        const player = document.getElementById('nowPlayingTitle');
        const artistEl = document.getElementById('nowPlayingArtist');
        if (player) player.textContent = title || 'Unknown Track';
        if (artistEl) artistEl.textContent = artist || 'Unknown Artist';
        
        let audio = document.getElementById('playerAudio');
        if (!audio) {
            audio = document.createElement('audio');
            audio.id = 'playerAudio';
            audio.controls = true;
            audio.style.display = 'none';
            document.body.appendChild(audio);
        }
        audio.src = src;
        audio.play().catch(e => console.log('Playback failed:', e));
        
        const playBtn = document.getElementById('playPauseBtn');
        if (playBtn) {
            playBtn.innerHTML = '<i class="fas fa-pause"></i>';
            playBtn.dataset.playing = 'true';
        }
    };
    
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
});