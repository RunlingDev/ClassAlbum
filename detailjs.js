// 为详情页面加载视频
const urlParams = new URLSearchParams(window.location.search);
const songTitle = urlParams.get('song');

if (songTitle) {
    fetch('songs.json')
        .then(response => response.json())
        .then(songs => {
            const song = songs.find(s => s.title === songTitle);
            if (song) {
                const songTitleElement = document.getElementById('songTitle');
                const albumTitleElement = document.getElementById('albumTitle');
                const videoFrame = document.getElementById('videoFrame');

                songTitleElement.textContent = song.title;
                albumTitleElement.textContent = `${song.album} - ${song.artist}`;
                videoFrame.src = song.videoSource;
            } else {
                console.error('Song data not found.');
            }
        })
        .catch(error => console.error('Error fetching song data:', error));
}