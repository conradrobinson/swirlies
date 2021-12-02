function loadPlaylist() {
  fetch('./playlist.json')
    .then((response) => response.json())
    .then((json) => (playlist = json))
    .catch((e) => console.log(e))
}

function play(src, type) {
  let audio = document.getElementById('audio2')
  audio.src = src
  audio.type = 'audio/' + type
  audio = document.getElementById('audio2')
  audio.play()
  console.log(`playing: ${audio.src}`)
  
}

function end(audio) {
    audio.pause()
    audio.currentTime = 0;
}




function playPlaylist(category) {
  end(document.getElementById("audio2"))
  loadPlaylist()
  let shuffled = false
  setInterval(() => {
    if (playlist != []) {
      if (!shuffled) {
        playlist[category] = shuffle(playlist[category])
      }
      shuffled = true
      if (!isPlaying(document.getElementById('audio2'))) {
        song = playlist[category][currentSong]
        currentSong++
        if (currentSong == playlist[category].length - 1) {
          currentSong = 0
        }
        play(song.filename, song.type)
      }
    }
  }, 1000)
}

function isPlaying(audio) {
  return audio.currentTime > 0 && !audio.paused && !audio.ended;
}
if (!isSettingsPage) {
  playlist = []
  loadPlaylist()
  currentSong = 0

  playPlaylist(settings.genre)
}

//not my code
function shuffle(array) {
  let currentIndex = array.length,
    randomIndex

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--

    ;[array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ]
  }

  return array
}
