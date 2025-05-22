/**
 * Japanese Minimal Vinyl Player
 */

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const floorRecords = document.getElementById('floorRecords');
  const platter = document.getElementById('platter');
  const playingRecord = document.getElementById('playingRecord');
  const recordLabel = document.getElementById('recordLabel');
  const tonearm = document.getElementById('tonearm');
  const nowPlaying = document.getElementById('nowPlaying');
  const nowPlayingTitle = document.getElementById('nowPlayingTitle');
  const nowPlayingArtist = document.getElementById('nowPlayingArtist');
  const playPauseBtn = document.getElementById('playPauseBtn');
  const playPauseIcon = document.getElementById('playPauseIcon');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const flyingRecord = document.getElementById('flyingRecord');
  const flyingRecordImg = flyingRecord.querySelector('img');

  // State
  let selectedAlbum = null;
  let currentTrackIndex = 0;
  let isPlaying = false;
  let player = null;
  let playerReady = false;

  // Initialize
  init();

  function init() {
    createFloorRecords();
    loadYouTubeAPI();
    setupEventListeners();
  }

  // Create scattered records on floor
  function createFloorRecords() {
    // Define random positions for natural scattered look
    const positions = generateScatteredPositions(albums.length);
    
    albums.forEach((album, index) => {
      const record = createRecordElement(album, positions[index]);
      floorRecords.appendChild(record);
    });
  }

  // Generate natural scattered positions
  function generateScatteredPositions(count) {
    const positions = [];
    const minDistance = 150; // Minimum distance between records
    
    for (let i = 0; i < count; i++) {
      let position;
      let attempts = 0;
      
      do {
        position = {
          x: Math.random() * 70 + 5, // 5-75% of container width
          y: Math.random() * 70 + 10, // 10-80% of container height
          rotation: Math.random() * 40 - 20, // -20 to 20 degrees
          scale: 0.9 + Math.random() * 0.2 // 0.9 to 1.1 scale
        };
        attempts++;
      } while (attempts < 50 && isTooClose(position, positions, minDistance));
      
      positions.push(position);
    }
    
    return positions;
  }

  // Check if position is too close to existing positions
  function isTooClose(newPos, existingPositions, minDistance) {
    return existingPositions.some(pos => {
      const dx = (newPos.x - pos.x) * window.innerWidth / 100;
      const dy = (newPos.y - pos.y) * window.innerHeight / 100;
      const distance = Math.sqrt(dx * dx + dy * dy);
      return distance < minDistance;
    });
  }

  // Create record element
  function createRecordElement(album, position) {
    const record = document.createElement('div');
    record.className = 'floor-record';
    record.dataset.albumId = album.id;
    
    // Apply position
    record.style.left = `${position.x}%`;
    record.style.top = `${position.y}%`;
    record.style.transform = `rotate(${position.rotation}deg) scale(${position.scale})`;
    record.style.setProperty('--hover-rotation', `${position.rotation + 5}deg`);
    
    record.innerHTML = `
      <div class="record-sleeve">
        <img src="${album.coverUrl}" alt="${album.title}">
        <div class="record-info">
          <div class="record-title">${album.title}</div>
          <div class="record-artist">${album.artist}</div>
        </div>
      </div>
    `;
    
    record.addEventListener('click', () => selectRecord(album, record));
    
    return record;
  }

  // Handle record selection
  function selectRecord(album, recordElement) {
    if (selectedAlbum?.id === album.id) return;
    
    // Mark previous record as available
    if (selectedAlbum) {
      document.querySelector(`[data-album-id="${selectedAlbum.id}"]`).classList.remove('selected');
    }
    
    selectedAlbum = album;
    currentTrackIndex = 0;
    recordElement.classList.add('selected');
    
    // Animate record flying to player
    animateRecordToPlayer(album, recordElement);
  }

  // Animate record to player
  function animateRecordToPlayer(album, recordElement) {
    const recordRect = recordElement.getBoundingClientRect();
    const platterRect = platter.getBoundingClientRect();
    
    // Setup flying record
    flyingRecordImg.src = album.coverUrl;
    flyingRecord.style.display = 'block';
    flyingRecord.style.left = `${recordRect.left}px`;
    flyingRecord.style.top = `${recordRect.top}px`;
    flyingRecord.style.width = `${recordRect.width}px`;
    flyingRecord.style.height = `${recordRect.height}px`;
    
    // Force reflow
    flyingRecord.offsetHeight;
    
    // Animate to platter
    flyingRecord.style.left = `${platterRect.left + platterRect.width/2 - 100}px`;
    flyingRecord.style.top = `${platterRect.top + platterRect.height/2 - 100}px`;
    flyingRecord.style.transform = 'scale(1.3) rotate(720deg)';
    
    setTimeout(() => {
      // Place record on platter
      recordLabel.src = album.coverUrl;
      playingRecord.classList.add('active');
      flyingRecord.style.display = 'none';
      
      // Update now playing
      nowPlayingTitle.textContent = album.title;
      nowPlayingArtist.textContent = album.artist;
      nowPlaying.style.display = 'block';
      
      // Start playing
      playTrack();
    }, 1000);
  }

  // Play current track
  function playTrack() {
    if (!selectedAlbum || !playerReady) return;
    
    const track = selectedAlbum.tracks[currentTrackIndex];
    if (!track) return;
    
    // Load and play video
    player.loadVideoById(track.youtubeId);
    player.playVideo();
    
    // Start animations
    platter.classList.add('spinning');
    tonearm.classList.add('playing');
    playPauseIcon.className = 'fas fa-pause';
    isPlaying = true;
  }

  // Pause playback
  function pausePlayback() {
    if (player && playerReady) {
      player.pauseVideo();
      platter.classList.remove('spinning');
      playPauseIcon.className = 'fas fa-play';
      isPlaying = false;
    }
  }

  // Toggle play/pause
  function togglePlayPause() {
    if (!selectedAlbum) return;
    
    if (isPlaying) {
      pausePlayback();
    } else {
      if (player && playerReady) {
        player.playVideo();
        platter.classList.add('spinning');
        playPauseIcon.className = 'fas fa-pause';
        isPlaying = true;
      } else {
        playTrack();
      }
    }
  }

  // Next track
  function nextTrack() {
    if (!selectedAlbum) return;
    
    currentTrackIndex = (currentTrackIndex + 1) % selectedAlbum.tracks.length;
    playTrack();
  }

  // Previous track
  function prevTrack() {
    if (!selectedAlbum) return;
    
    currentTrackIndex = currentTrackIndex === 0 
      ? selectedAlbum.tracks.length - 1 
      : currentTrackIndex - 1;
    playTrack();
  }

  // Setup event listeners
  function setupEventListeners() {
    playPauseBtn.addEventListener('click', togglePlayPause);
    nextBtn.addEventListener('click', nextTrack);
    prevBtn.addEventListener('click', prevTrack);
    
    // Keyboard controls
    document.addEventListener('keydown', (e) => {
      switch(e.key) {
        case ' ':
          e.preventDefault();
          togglePlayPause();
          break;
        case 'ArrowRight':
          nextTrack();
          break;
        case 'ArrowLeft':
          prevTrack();
          break;
      }
    });
  }

  // Load YouTube API
  function loadYouTubeAPI() {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);
  }

  // YouTube API callback
  window.onYouTubeIframeAPIReady = function() {
    player = new YT.Player('youtubePlayer', {
      height: '0',
      width: '0',
      playerVars: {
        autoplay: 0,
        controls: 0,
        disablekb: 1,
        fs: 0,
        iv_load_policy: 3,
        modestbranding: 1,
        rel: 0,
        showinfo: 0
      },
      events: {
        onReady: () => {
          playerReady = true;
        },
        onStateChange: (event) => {
          if (event.data === YT.PlayerState.ENDED) {
            nextTrack();
          }
        }
      }
    });
  };
});