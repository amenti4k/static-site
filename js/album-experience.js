// Main JavaScript for Album Experience

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const albumGrid = document.querySelector('.album-grid');
  const recordPlayerContainer = document.querySelector('.record-player-container');
  const backButton = document.querySelector('.back-button');
  const youtubePlayer = document.querySelector('.youtube-player');
  const record = document.querySelector('.record');
  const recordLabel = document.querySelector('.record-label');
  const tonearm = document.querySelector('.player-tonearm');
  const powerButton = document.querySelector('.power-button');
  const playButton = document.querySelector('.play-button');
  const stopButton = document.querySelector('.stop-button');
  const volumeSlider = document.querySelector('.volume-slider');
  const albumCoverLarge = document.querySelector('.album-cover-large');
  const albumTitleElement = document.querySelector('.album-title');
  const albumArtistElement = document.querySelector('.album-artist');
  const albumYearElement = document.querySelector('.album-year');
  const trackTitleElement = document.querySelector('.track-title');

  // Variables
  let selectedAlbum = null;
  let isPlaying = false;
  let youtubeIframe = null;
  let player = null;

  // Initialize page
  initAlbumGrid();

  // Create album grid
  function initAlbumGrid() {
    albums.forEach(album => {
      const albumElement = createAlbumElement(album);
      albumGrid.appendChild(albumElement);
    });
  }

  // Create album element
  function createAlbumElement(album) {
    const albumElement = document.createElement('div');
    albumElement.className = 'album';
    albumElement.dataset.id = album.id;
    
    const albumCover = document.createElement('div');
    albumCover.className = 'album-cover';
    
    const img = document.createElement('img');
    img.src = album.coverUrl;
    img.alt = `${album.title} by ${album.artist}`;
    
    const overlay = document.createElement('div');
    overlay.className = 'album-overlay';
    
    const title = document.createElement('h3');
    title.className = 'album-title';
    title.textContent = album.title;
    
    const artist = document.createElement('p');
    artist.className = 'album-artist';
    artist.textContent = album.artist;
    
    const recordIcon = document.createElement('div');
    recordIcon.className = 'record-icon';
    
    overlay.appendChild(title);
    overlay.appendChild(artist);
    
    albumCover.appendChild(img);
    albumCover.appendChild(overlay);
    albumCover.appendChild(recordIcon);
    
    albumElement.appendChild(albumCover);
    
    // Event listener for album selection
    albumElement.addEventListener('click', () => {
      selectAlbum(album, albumElement);
    });
    
    return albumElement;
  }

  // Select album and animate
  function selectAlbum(album, albumElement) {
    selectedAlbum = album;
    
    // Add selection mode class to album grid
    albumGrid.classList.add('selection-mode');
    
    // Add selected class to album
    albumElement.classList.add('selected');
    
    // Calculate positions
    const albumRect = albumElement.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Create flying record
    createFlyingRecord(album, albumRect);
    
    // Animate album to the side
    setTimeout(() => {
      albumElement.style.transform = `translate(${-viewportWidth/2 + 100}px, ${-viewportHeight/2 + 100}px) scale(0.6)`;
      
      // Show record player after animation
      setTimeout(() => {
        prepareRecordPlayer(album);
        showRecordPlayer();
      }, 1500);
    }, 100);
  }

  // Create and animate flying record
  function createFlyingRecord(album, albumRect) {
    const flyingRecord = document.createElement('div');
    flyingRecord.className = 'flying-record';
    
    const recordGrooves = document.createElement('div');
    recordGrooves.className = 'flying-record-grooves';
    
    const recordLabel = document.createElement('div');
    recordLabel.className = 'flying-record-label';
    recordLabel.style.backgroundImage = `url(${album.coverUrl})`;
    
    flyingRecord.appendChild(recordGrooves);
    flyingRecord.appendChild(recordLabel);
    
    // Position the record initially at the album position
    flyingRecord.style.left = `${albumRect.left + albumRect.width/2 - 100}px`;
    flyingRecord.style.top = `${albumRect.top + albumRect.height/2 - 100}px`;
    
    document.body.appendChild(flyingRecord);
    
    // After animation completes, remove the element
    flyingRecord.addEventListener('animationend', () => {
      flyingRecord.remove();
    });
  }

  // Prepare record player with selected album
  function prepareRecordPlayer(album) {
    // Update record label
    recordLabel.style.backgroundImage = `url(${album.coverUrl})`;
    
    // Update album info
    albumCoverLarge.style.backgroundImage = `url(${album.coverUrl})`;
    albumTitleElement.textContent = album.title;
    albumArtistElement.textContent = album.artist;
    albumYearElement.textContent = album.year;
    
    // Update track info
    const track = album.tracks[0]; // Use the first track
    trackTitleElement.textContent = track.title;
    
    // Prepare YouTube embed
    prepareYouTubeEmbed(track.youtubeId);
  }

  // Show record player
  function showRecordPlayer() {
    recordPlayerContainer.classList.add('visible');
    backButton.classList.add('visible');

    // Auto-play the record
    setTimeout(() => {
      startPlayback();
    }, 1000);
  }

  // Hide record player and return to album grid
  function hideRecordPlayer() {
    // If playing, stop first
    if (isPlaying) {
      stopPlayback();
    }
    
    // Hide elements
    recordPlayerContainer.classList.remove('visible');
    backButton.classList.remove('visible');
    youtubePlayer.classList.remove('visible');
    
    // Return to album grid
    setTimeout(() => {
      // Remove selection mode and selected album
      albumGrid.classList.remove('selection-mode');
      const selectedAlbumElement = document.querySelector('.album.selected');
      if (selectedAlbumElement) {
        selectedAlbumElement.classList.remove('selected');
        selectedAlbumElement.style.transform = '';
      }
      
      // Reset state
      selectedAlbum = null;
      
      // Destroy YouTube player
      if (player) {
        player = null;
        youtubeIframe.remove();
        youtubeIframe = null;
      }
    }, 300);
  }

  // Prepare YouTube embed
  function prepareYouTubeEmbed(videoId) {
    // Clear any existing player
    youtubePlayer.innerHTML = '';

    // Create iframe with mute=1 to work around browser autoplay restrictions
    youtubeIframe = document.createElement('iframe');
    youtubeIframe.id = 'youtube-iframe';
    youtubeIframe.allow = 'autoplay; encrypted-media';
    youtubeIframe.allowFullscreen = true;
    youtubeIframe.src = `https://www.youtube.com/embed/${videoId}?enablejsapi=1&autoplay=1&mute=1&controls=1&modestbranding=1&rel=0&showinfo=0`;

    youtubePlayer.appendChild(youtubeIframe);

    // Initialize YouTube API
    loadYouTubeAPI();

    // Show YouTube player immediately
    youtubePlayer.classList.add('visible');

    // Create play overlay to allow user interaction to unmute
    createAudioOverlay(videoId);
  }

  // Create an overlay that requires user interaction to enable audio
  function createAudioOverlay(videoId) {
    const audioOverlay = document.createElement('div');
    audioOverlay.className = 'audio-overlay';
    audioOverlay.innerHTML = `
      <div class="audio-message">
        <i class="fas fa-volume-up"></i>
        <p>Click to enable audio</p>
      </div>
    `;
    document.body.appendChild(audioOverlay);

    // When clicked, remove overlay and unmute the player
    audioOverlay.addEventListener('click', () => {
      if (player) {
        player.unMute();
        player.setVolume(volumeSlider.value);
      }
      audioOverlay.classList.add('fade-out');
      setTimeout(() => {
        audioOverlay.remove();
      }, 500);
    });
  }

  // Load YouTube API
  function loadYouTubeAPI() {
    // If the API is already loaded, don't load it again
    if (window.YT) {
      initYouTubePlayer();
      return;
    }
    
    // Create script tag
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    
    // Insert script tag before the first script tag
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    
    // Set up callback
    window.onYouTubeIframeAPIReady = initYouTubePlayer;
  }

  // Initialize YouTube player
  function initYouTubePlayer() {
    player = new YT.Player('youtube-iframe', {
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });
  }

  // YouTube player ready
  function onPlayerReady(event) {
    // Set volume
    player.setVolume(volumeSlider.value);

    // Start the video (it will be muted initially due to browser restrictions)
    player.playVideo();
  }

  // YouTube player state change
  function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.ENDED) {
      stopPlayback();
    }
  }

  // Start playback
  function startPlayback() {
    if (!player) return;
    
    // Start player
    player.playVideo();
    
    // Show YouTube player
    youtubePlayer.classList.add('visible');
    
    // Start record spinning
    record.classList.add('spinning');
    
    // Move tonearm to playing position
    tonearm.classList.add('playing');
    
    // Update state
    isPlaying = true;
    playButton.innerHTML = '<i class="fas fa-pause"></i>';
  }

  // Stop playback
  function stopPlayback() {
    if (!player) return;
    
    // Stop player
    player.pauseVideo();
    
    // Hide YouTube player
    youtubePlayer.classList.remove('visible');
    
    // Stop record spinning
    record.classList.remove('spinning');
    
    // Move tonearm back
    tonearm.classList.remove('playing');
    
    // Update state
    isPlaying = false;
    playButton.innerHTML = '<i class="fas fa-play"></i>';
  }

  // Toggle playback
  function togglePlayback() {
    if (isPlaying) {
      stopPlayback();
    } else {
      startPlayback();
    }
  }

  // Event listeners
  backButton.addEventListener('click', hideRecordPlayer);
  
  powerButton.addEventListener('click', () => {
    powerButton.classList.toggle('on');
  });
  
  playButton.addEventListener('click', togglePlayback);
  
  stopButton.addEventListener('click', stopPlayback);
  
  volumeSlider.addEventListener('input', () => {
    if (player) {
      player.setVolume(volumeSlider.value);
    }
  });

  // Window resize handler
  window.addEventListener('resize', () => {
    if (selectedAlbum) {
      const selectedAlbumElement = document.querySelector('.album.selected');
      if (selectedAlbumElement) {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        selectedAlbumElement.style.transform = `translate(${-viewportWidth/2 + 100}px, ${-viewportHeight/2 + 100}px) scale(0.6)`;
      }
    }
  });

  // Handle visibility change
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && isPlaying) {
      stopPlayback();
    }
  });
});