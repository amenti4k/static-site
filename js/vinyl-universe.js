/**
 * Vinyl Universe - Main JavaScript
 * An immersive vinyl record listening experience
 */

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const vinylGallery = document.getElementById('vinylGallery');
  const recordExperience = document.getElementById('recordExperience');
  const backButton = document.getElementById('backButton');
  const youtubeContainer = document.getElementById('youtubeContainer');
  const platterSpinner = document.getElementById('platterSpinner');
  const tonearmAssembly = document.getElementById('tonearmAssembly');
  const recordLabel = document.getElementById('recordLabel');
  const playingRecord = document.getElementById('playingRecord');
  const flyingRecordContainer = document.getElementById('flyingRecordContainer');
  const nowPlayingCover = document.getElementById('nowPlayingCover');
  const nowPlayingImage = document.getElementById('nowPlayingImage');
  const nowPlayingTitle = document.getElementById('nowPlayingTitle');
  const nowPlayingArtist = document.getElementById('nowPlayingArtist');
  const nowPlayingYear = document.getElementById('nowPlayingYear');
  const trackTitle = document.getElementById('trackTitle');
  const progressBar = document.getElementById('progressBar');
  const currentTime = document.getElementById('currentTime');
  const totalTime = document.getElementById('totalTime');
  const playPauseButton = document.getElementById('playPauseButton');
  const playPauseIcon = document.getElementById('playPauseIcon');
  const prevButton = document.getElementById('prevButton');
  const nextButton = document.getElementById('nextButton');
  const rewindButton = document.getElementById('rewindButton');
  const forwardButton = document.getElementById('forwardButton');
  const volumeSlider = document.getElementById('volumeSlider');
  const volumeIcon = document.getElementById('volumeIcon');
  const audioVisualizer = document.getElementById('audioVisualizer');

  // Variables
  let selectedAlbum = null;
  let selectedAlbumElement = null;
  let isPlaying = false;
  let youtubePlayer = null;
  let progressInterval = null;
  let audioContext = null;
  let analyser = null;
  let audioVisualizerBars = [];
  let currentTrackIndex = 0;

  // Initialize the application
  init();

  function init() {
    // Create album elements
    createAlbumGrid();
    
    // Set up event listeners
    setupEventListeners();
    
    // Initialize audio visualizer
    initAudioVisualizer();
    
    // Add parallax effect to album elements
    addParallaxEffect();
    
    // Initialize YouTube API
    loadYouTubeAPI();
  }

  // Create disorganized album layout
  function createAlbumGrid() {
    albums.forEach(album => {
      const albumElement = createAlbumElement(album);
      vinylGallery.appendChild(albumElement);
    });

    // Apply random positions, rotations and z-indices to albums after all are created
    setTimeout(() => {
      const albumItems = document.querySelectorAll('.album-item');

      albumItems.forEach(item => {
        // Random rotation between -15 and 15 degrees
        const rotation = Math.random() * 30 - 15;

        // Random translation
        const translateX = `${Math.random() * 20 - 10}px`;
        const translateY = `${Math.random() * 20 - 10}px`;

        // Random z-index between 1 and 5 for layering
        const zIndex = Math.floor(Math.random() * 5) + 1;

        // Apply custom properties
        item.style.setProperty('--rotation', rotation);
        item.style.setProperty('--translate-x', translateX);
        item.style.setProperty('--translate-y', translateY);
        item.style.setProperty('--z-index', zIndex);
      });
    }, 100);
  }

  // Create a single album element
  function createAlbumElement(album) {
    const albumItem = document.createElement('div');
    albumItem.className = 'album-item';
    albumItem.dataset.id = album.id;

    const albumCover = document.createElement('div');
    albumCover.className = 'album-cover';

    const albumImage = document.createElement('img');
    albumImage.className = 'album-image';
    albumImage.src = album.coverUrl;
    albumImage.alt = `${album.title} by ${album.artist}`;

    const albumVinyl = document.createElement('div');
    albumVinyl.className = 'album-vinyl';

    const albumDetails = document.createElement('div');
    albumDetails.className = 'album-details';

    const albumTitle = document.createElement('h3');
    albumTitle.className = 'album-title';
    albumTitle.textContent = album.title;

    const albumArtist = document.createElement('p');
    albumArtist.className = 'album-artist';
    albumArtist.textContent = album.artist;

    const albumYear = document.createElement('p');
    albumYear.className = 'album-year';
    albumYear.textContent = album.year;

    albumDetails.appendChild(albumTitle);
    albumDetails.appendChild(albumArtist);
    albumDetails.appendChild(albumYear);

    albumCover.appendChild(albumImage);
    albumCover.appendChild(albumDetails);

    albumItem.appendChild(albumVinyl);
    albumItem.appendChild(albumCover);

    // Event listener for selection
    albumItem.addEventListener('click', () => {
      selectAlbum(album, albumItem);
    });

    return albumItem;
  }

  // Set up event listeners
  function setupEventListeners() {
    // Back button
    backButton.addEventListener('click', returnToCollection);
    
    // Player controls
    playPauseButton.addEventListener('click', togglePlayback);
    prevButton.addEventListener('click', playPreviousTrack);
    nextButton.addEventListener('click', playNextTrack);
    rewindButton.addEventListener('click', rewindTrack);
    forwardButton.addEventListener('click', forwardTrack);
    
    // Volume control
    volumeSlider.addEventListener('input', updateVolume);
    
    // Handle window resize
    window.addEventListener('resize', handleResize);
    
    // Handle visibility change
    document.addEventListener('visibilitychange', handleVisibilityChange);
  }

  // Initialize audio visualizer
  function initAudioVisualizer() {
    // Create bars
    for (let i = 0; i < 128; i++) {
      const bar = document.createElement('div');
      bar.className = 'audio-bar';
      audioVisualizer.appendChild(bar);
      audioVisualizerBars.push(bar);
    }
  }

  // Add parallax effect to albums
  function addParallaxEffect() {
    document.addEventListener('mousemove', (e) => {
      const albumItems = document.querySelectorAll('.album-item:not(.selected)');
      
      albumItems.forEach(item => {
        const rect = item.getBoundingClientRect();
        const itemX = rect.left + rect.width / 2;
        const itemY = rect.top + rect.height / 2;
        
        const distanceX = (e.clientX - itemX) / 20;
        const distanceY = (e.clientY - itemY) / 20;
        
        const rotateX = Math.min(Math.max(distanceY * -0.5, -10), 10);
        const rotateY = Math.min(Math.max(distanceX * 0.5, -10), 10);
        
        // Apply transform only if not too far
        const distance = Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2));
        if (distance < 20) {
          item.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        } else {
          item.style.transform = '';
        }
      });
    });
  }

  // Select an album
  function selectAlbum(album, albumElement) {
    selectedAlbum = album;
    selectedAlbumElement = albumElement;
    currentTrackIndex = 0;
    
    // Apply selected class
    albumElement.classList.add('selected');
    
    // Apply selection mode class to gallery
    vinylGallery.classList.add('selection-mode');
    
    // Get album position
    const albumRect = albumElement.getBoundingClientRect();
    
    // Create flying record animation
    createFlyingRecord(album, albumRect);
    
    // Animate the selected album
    setTimeout(() => {
      albumElement.style.transform = 'scale(0.1) translateY(-300px)';
      albumElement.style.opacity = '0';
      
      // Show record experience
      setTimeout(() => {
        prepareRecordExperience(album);
        showRecordExperience();
      }, 1000);
    }, 500);
  }

  // Create flying record animation
  function createFlyingRecord(album, albumRect) {
    const flyingRecord = document.createElement('div');
    flyingRecord.className = 'flying-record';
    
    const recordGrooves = document.createElement('div');
    recordGrooves.className = 'flying-record-grooves';
    
    const recordLabelImg = document.createElement('div');
    recordLabelImg.className = 'flying-record-label';
    recordLabelImg.style.backgroundImage = `url(${album.coverUrl})`;
    
    flyingRecord.appendChild(recordGrooves);
    flyingRecord.appendChild(recordLabelImg);
    
    // Position initially at the album position
    flyingRecord.style.left = `${albumRect.left + albumRect.width / 2 - 150}px`;
    flyingRecord.style.top = `${albumRect.top + albumRect.height / 2 - 150}px`;
    
    // Apply animation
    flyingRecord.style.animation = 'recordFly 2s cubic-bezier(0.68, -0.6, 0.32, 1.6) forwards';
    
    flyingRecordContainer.appendChild(flyingRecord);
    
    // Remove after animation
    flyingRecord.addEventListener('animationend', () => {
      flyingRecord.remove();
    });
  }

  // Prepare record experience
  function prepareRecordExperience(album) {
    // Set record label
    recordLabel.style.backgroundImage = `url(${album.coverUrl})`;
    
    // Set album info
    nowPlayingImage.src = album.coverUrl;
    nowPlayingTitle.textContent = album.title;
    nowPlayingArtist.textContent = album.artist;
    nowPlayingYear.textContent = album.year;
    
    // Set track info
    const track = album.tracks[currentTrackIndex];
    trackTitle.textContent = track.title;
    
    // Create YouTube embed
    createYouTubeEmbed(track.youtubeId);
  }

  // Show record experience
  function showRecordExperience() {
    // Show elements
    recordExperience.classList.add('active');
    backButton.classList.add('visible');
    
    // Delayed playback start
    setTimeout(() => {
      startPlayback();
    }, 2000);
  }

  // Return to collection view
  function returnToCollection() {
    // If playing, stop first
    if (isPlaying) {
      stopPlayback();
    }
    
    // Hide record experience
    recordExperience.classList.remove('active');
    backButton.classList.remove('visible');
    audioVisualizer.classList.remove('active');
    
    // Reset album grid
    vinylGallery.classList.remove('selection-mode');
    
    if (selectedAlbumElement) {
      selectedAlbumElement.classList.remove('selected');
      selectedAlbumElement.style.transform = '';
      selectedAlbumElement.style.opacity = '';
    }
    
    // Reset state
    selectedAlbum = null;
    selectedAlbumElement = null;
    currentTrackIndex = 0;
    
    // Clear progress interval
    clearInterval(progressInterval);
    
    // Reset progress bar
    progressBar.style.width = '0%';
    currentTime.textContent = '0:00';
    totalTime.textContent = '0:00';
  }

  // Load YouTube API
  function loadYouTubeAPI() {
    // If already loaded, don't load again
    if (window.YT) return;
    
    // Create script element
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    
    // Insert script
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }

  // YouTube API ready callback (will be called automatically)
  window.onYouTubeIframeAPIReady = function() {
    console.log('YouTube API ready');
  };

  // Create YouTube embed with improved initialization
  function createYouTubeEmbed(videoId) {
    // Clear container
    youtubeContainer.innerHTML = '';

    // Create iframe element
    const iframe = document.createElement('iframe');
    iframe.id = 'youtube-player';
    iframe.width = '640';
    iframe.height = '360';
    iframe.src = `https://www.youtube.com/embed/${videoId}?enablejsapi=1&autoplay=0&controls=0&mute=1&loop=1&modestbranding=1&fs=0&origin=${window.location.origin}&rel=0&showinfo=0`;
    iframe.allow = 'autoplay; encrypted-media';
    iframe.allowFullscreen = false;

    youtubeContainer.appendChild(iframe);

    // If YouTube API is already loaded, create player immediately
    if (window.YT && window.YT.Player) {
      createYouTubePlayer();
    } else {
      // Initialize player when iframe is loaded
      iframe.onload = () => {
        // If the API is loaded by now, create the player
        if (window.YT && window.YT.Player) {
          createYouTubePlayer();
        } else {
          // Otherwise wait for API to be ready
          window.onYouTubeIframeAPIReady = function() {
            createYouTubePlayer();
          };
        }
      };
    }
  }

  // Helper function to create YouTube player
  function createYouTubePlayer() {
    youtubePlayer = new YT.Player('youtube-player', {
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange,
        'onError': onPlayerError
      }
    });
  }

  // YouTube player ready
  function onPlayerReady(event) {
    // Set volume
    event.target.setVolume(volumeSlider.value);
    
    // Update total time
    const duration = event.target.getDuration();
    totalTime.textContent = formatTime(duration);
    
    // Connect audio to analyzer if we have Web Audio API
    connectAudioToAnalyzer();
  }

  // YouTube player state change
  function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.ENDED) {
      playNextTrack();
    }
  }

  // YouTube player error
  function onPlayerError(event) {
    console.error('YouTube player error:', event.data);
    showNotification('Error playing track. Trying another...', 'error');
    playNextTrack();
  }

  // Start playback
  function startPlayback() {
    if (!youtubePlayer) return;
    
    // Create audio overlay for user interaction to enable audio
    createAudioOverlay();
    
    // Start record spinning
    platterSpinner.classList.add('spinning');
    
    // Move tonearm
    tonearmAssembly.classList.add('playing');
    
    // Update UI
    playPauseIcon.className = 'fas fa-pause';
    isPlaying = true;
    
    // Start progress tracking
    trackProgress();
    
    // Show audio visualizer
    audioVisualizer.classList.add('active');
  }

  // Stop playback
  function stopPlayback() {
    if (!youtubePlayer) return;
    
    // Pause video
    youtubePlayer.pauseVideo();
    
    // Stop record spinning
    platterSpinner.classList.remove('spinning');
    
    // Move tonearm back
    tonearmAssembly.classList.remove('playing');
    
    // Update UI
    playPauseIcon.className = 'fas fa-play';
    isPlaying = false;
    
    // Clear progress interval
    clearInterval(progressInterval);
    
    // Hide audio visualizer
    audioVisualizer.classList.remove('active');
  }

  // Toggle playback
  function togglePlayback() {
    if (isPlaying) {
      youtubePlayer.pauseVideo();
      platterSpinner.classList.remove('spinning');
      playPauseIcon.className = 'fas fa-play';

      // Update play button label
      const playButtonLabel = playPauseButton.querySelector('.control-label');
      if (playButtonLabel) {
        playButtonLabel.textContent = 'PLAY';
      }

      isPlaying = false;
    } else {
      youtubePlayer.playVideo();
      platterSpinner.classList.add('spinning');
      playPauseIcon.className = 'fas fa-pause';

      // Update play button label
      const playButtonLabel = playPauseButton.querySelector('.control-label');
      if (playButtonLabel) {
        playButtonLabel.textContent = 'PAUSE';
      }

      isPlaying = true;

      // Start progress tracking if needed
      if (!progressInterval) {
        trackProgress();
      }

      // Show audio visualizer
      audioVisualizer.classList.add('active');
    }
  }

  // Play previous track
  function playPreviousTrack() {
    if (!selectedAlbum || !selectedAlbum.tracks) return;
    
    // Stop current playback
    if (isPlaying) {
      stopPlayback();
    }
    
    // Update track index
    currentTrackIndex--;
    if (currentTrackIndex < 0) {
      currentTrackIndex = selectedAlbum.tracks.length - 1;
    }
    
    // Update track info
    const track = selectedAlbum.tracks[currentTrackIndex];
    trackTitle.textContent = track.title;
    
    // Recreate YouTube embed
    createYouTubeEmbed(track.youtubeId);
    
    // Reset progress
    progressBar.style.width = '0%';
    currentTime.textContent = '0:00';
    totalTime.textContent = '0:00';
    
    // Start playback after short delay
    setTimeout(() => {
      startPlayback();
    }, 500);
  }

  // Play next track
  function playNextTrack() {
    if (!selectedAlbum || !selectedAlbum.tracks) return;
    
    // Stop current playback
    if (isPlaying) {
      stopPlayback();
    }
    
    // Update track index
    currentTrackIndex++;
    if (currentTrackIndex >= selectedAlbum.tracks.length) {
      currentTrackIndex = 0;
    }
    
    // Update track info
    const track = selectedAlbum.tracks[currentTrackIndex];
    trackTitle.textContent = track.title;
    
    // Recreate YouTube embed
    createYouTubeEmbed(track.youtubeId);
    
    // Reset progress
    progressBar.style.width = '0%';
    currentTime.textContent = '0:00';
    totalTime.textContent = '0:00';
    
    // Start playback after short delay
    setTimeout(() => {
      startPlayback();
    }, 500);
  }

  // Rewind track
  function rewindTrack() {
    if (!youtubePlayer) return;
    
    const currentTime = youtubePlayer.getCurrentTime();
    youtubePlayer.seekTo(Math.max(0, currentTime - 10), true);
  }

  // Forward track
  function forwardTrack() {
    if (!youtubePlayer) return;
    
    const currentTime = youtubePlayer.getCurrentTime();
    const duration = youtubePlayer.getDuration();
    youtubePlayer.seekTo(Math.min(duration, currentTime + 10), true);
  }

  // Update volume
  function updateVolume() {
    if (!youtubePlayer) return;
    
    const volume = volumeSlider.value;
    youtubePlayer.setVolume(volume);
    
    // Update volume icon
    if (volume === '0') {
      volumeIcon.className = 'fas fa-volume-mute';
    } else if (volume < 50) {
      volumeIcon.className = 'fas fa-volume-down';
    } else {
      volumeIcon.className = 'fas fa-volume-up';
    }
  }

  // Track progress
  function trackProgress() {
    // Clear any existing interval
    clearInterval(progressInterval);
    
    progressInterval = setInterval(() => {
      if (!youtubePlayer || !isPlaying) return;
      
      const currentTimeVal = youtubePlayer.getCurrentTime();
      const duration = youtubePlayer.getDuration();
      const progressPercentage = (currentTimeVal / duration) * 100;
      
      progressBar.style.width = `${progressPercentage}%`;
      currentTime.textContent = formatTime(currentTimeVal);
      
      // Update audio visualizer
      updateAudioVisualizer();
    }, 100);
  }

  // Format time (seconds to MM:SS)
  function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  // Create audio overlay with improved consent message
  function createAudioOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'audio-overlay';

    const messageContent = document.createElement('div');
    messageContent.className = 'audio-message-content';

    const icon = document.createElement('div');
    icon.className = 'audio-icon';
    icon.innerHTML = '<i class="fas fa-volume-up"></i>';

    const title = document.createElement('h3');
    title.className = 'audio-title';
    title.textContent = 'Audio Ready';
    title.style.fontFamily = 'var(--font-mono)';
    title.style.fontSize = '1.5rem';
    title.style.marginBottom = '0.5rem';

    const text = document.createElement('p');
    text.className = 'audio-text';
    text.textContent = 'Click to enable audio and start playback';

    messageContent.appendChild(icon);
    messageContent.appendChild(title);
    messageContent.appendChild(text);

    const message = document.createElement('div');
    message.className = 'audio-message';
    message.appendChild(messageContent);

    overlay.appendChild(message);

    document.body.appendChild(overlay);

    // Click event to enable audio and remove overlay
    overlay.addEventListener('click', () => {
      // Make sure YouTube player is ready and mute status is addressed
      if (youtubePlayer) {
        youtubePlayer.unMute();
        youtubePlayer.setVolume(volumeSlider.value);

        // Force playback to start correctly
        setTimeout(() => {
          youtubePlayer.playVideo();
          isPlaying = true;
          playPauseIcon.className = 'fas fa-pause';
          platterSpinner.classList.add('spinning');
        }, 200);
      }

      overlay.classList.add('fade-out');

      setTimeout(() => {
        overlay.remove();
      }, 500);
    });
  }

  // Connect to audio analyzer for visualizations
  function connectAudioToAnalyzer() {
    // Check if Web Audio API is available
    if (!window.AudioContext && !window.webkitAudioContext) {
      console.log('Web Audio API not supported');
      return;
    }
    
    // Initialize audio context if not already done
    if (!audioContext) {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
      analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
    }
    
    // TODO: Since we're using YouTube and can't directly access its audio stream,
    // we'll have to simulate visualization with random data
  }

  // Update audio visualizer
  function updateAudioVisualizer() {
    if (!isPlaying) return;
    
    // Since we can't directly access YouTube's audio stream,
    // we'll generate random bars for visual effect
    audioVisualizerBars.forEach(bar => {
      // Random height between 5px and 70px with higher probability in the middle
      const height = 5 + Math.random() * 65 * (0.5 + Math.sin(Math.random() * Math.PI) / 2);
      
      bar.style.height = `${height}px`;
      
      // Random duration for smooth transition
      const duration = 0.2 + Math.random() * 0.3;
      bar.style.transition = `height ${duration}s ease`;
    });
  }

  // Handle window resize
  function handleResize() {
    // Update any size-dependent elements
    if (selectedAlbumElement && selectedAlbum) {
      // Recalculate positions if needed
    }
  }

  // Handle visibility change
  function handleVisibilityChange() {
    if (document.hidden && isPlaying) {
      // Pause playback when tab/window is not visible
      stopPlayback();
    }
  }

  // Show notification
  function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 3000);
  }
});