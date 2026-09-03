// ===== script.js – Monarch-Rise Music =====

// ===== Navigation Toggle =====
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }

    // ===== Music Data =====
    const musicData = [
        { id: 1, title: "Malaŵi Sunrise", artist: "Lilongwe Collective", type: "single", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", thumb: "fa-sun", badge: "hit" },
        { id: 2, title: "Zomba Groove", artist: "Mzuzu Vibes", type: "ep", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", thumb: "fa-drum" },
        { id: 3, title: "Lake Malawi (Live)", artist: "Nyasa Rhythms", type: "video", src: "https://www.w3schools.com/html/mov_bbb.mp4", thumb: "fa-water" },
        { id: 4, title: "Blantyre Nights", artist: "Blantyre Soul", type: "single", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", thumb: "fa-moon" },
        { id: 5, title: "Mulanje Mountain", artist: "Nyasa Rhythms", type: "video", src: "https://www.w3schools.com/html/mov_bbb.mp4", thumb: "fa-mountain" },
        { id: 6, title: "Malawi Freedom", artist: "Lilongwe Collective", type: "album", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", thumb: "fa-flag" },
        { id: 7, title: "Northern Lights", artist: "Mzuzu Vibes", type: "ep", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", thumb: "fa-star" },
        { id: 8, title: "Soul of Malawi", artist: "Blantyre Soul", type: "album", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3", thumb: "fa-heart" }
    ];

    // ===== Render Music Grid =====
    const musicGrid = document.getElementById('musicGrid');
    const filterBtns = document.querySelectorAll('.music-filter .filter-btn');

    function renderMusic(filter = 'all') {
        if (!musicGrid) return;
        const filtered = filter === 'all' ? musicData : musicData.filter(m => m.type === filter);
        
        if (filtered.length === 0) {
            musicGrid.innerHTML = `<div style="grid-column:1/-1; text-align:center; padding:3rem; color:var(--text-muted);">
                <i class="fas fa-music" style="font-size:3rem; display:block; margin-bottom:1rem;"></i>
                No tracks found in this category
            </div>`;
            return;
        }

        musicGrid.innerHTML = filtered.map(song => `
            <div class="music-item">
                <div class="music-thumb">
                    <i class="fas ${song.thumb || 'fa-music'}"></i>
                </div>
                <h4>${song.title}</h4>
                <p class="artist-name">${song.artist}</p>
                <span class="release-type" style="display:inline-block; background:var(--gold); color:var(--black); font-size:0.6rem; font-weight:700; padding:0.15rem 0.6rem; border-radius:30px; text-transform:uppercase; margin-top:0.3rem; align-self:flex-start;">
                    ${song.type}
                </span>
                <div class="music-actions">
                    <button class="btn-small btn-play-small" onclick="playSong('${song.src}', '${song.title}', '${song.artist}')">
                        <i class="fas fa-play"></i> Play
                    </button>
                    <a href="${song.src}" download="${song.title}.${song.type === 'video' ? 'mp4' : 'mp3'}" class="btn-small btn-download-small" style="text-decoration:none; display:inline-flex; align-items:center; gap:0.3rem;">
                        <i class="fas fa-download"></i> DL
                    </a>
                </div>
            </div>
        `).join('');
    }

    // ===== Filter Buttons =====
    if (filterBtns.length) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                renderMusic(this.dataset.filter);
            });
        });
    }

    // ===== Play Song Function =====
    window.playSong = function(src, title, artist) {
        const player = document.getElementById('nowPlayingTitle');
        const artistEl = document.getElementById('nowPlayingArtist');
        if (player) player.textContent = title || 'Unknown Track';
        if (artistEl) artistEl.textContent = artist || 'Unknown Artist';
        
        // Create or get audio element
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
        
        // Update play button
        const playBtn = document.getElementById('playPauseBtn');
        if (playBtn) {
            playBtn.innerHTML = '<i class="fas fa-pause"></i>';
            playBtn.dataset.playing = 'true';
        }
    };

    // ===== Gallery Filter =====
    const galleryItems = document.querySelectorAll('.gallery-item');
    const galleryFilterBtns = document.querySelectorAll('.gallery-filter .filter-btn');

    if (galleryFilterBtns.length && galleryItems.length) {
        galleryFilterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                galleryFilterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                const filter = this.dataset.filter;
                galleryItems.forEach(item => {
                    if (filter === 'all' || item.dataset.category === filter) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

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

    // ===== Initialize Music Grid =====
    if (musicGrid) {
        renderMusic('all');
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