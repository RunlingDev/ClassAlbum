const songDataUrls = [
    'songs.json',
    'https://example.com/songs.json',
    'https://backup.example.com/songs.json'
];

function loadSongsData(callback) {
    const xhr = new XMLHttpRequest();

    function tryNextUrl() {
        if (songDataUrls.length > 0) {
            const url = songDataUrls.shift();
            xhr.open('GET', url, true);
            xhr.send();
        } else {
            console.error('Failed to load song data from all provided URLs.');
        }
    }

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                try {
                    const songs = JSON.parse(xhr.responseText);
                    callback(songs);
                } catch (error) {
                    console.error('Failed to parse song data:', error);
                    tryNextUrl();
                }
            } else {
                tryNextUrl();
            }
        }
    };

    tryNextUrl();
}

// 为视频详情页面加载媒体
const urlParams = new URLSearchParams(window.location.search);
const songTitle = urlParams.get('song');

if (songTitle) {
    loadSongsData(songs => {
        const song = songs.find(s => s.title === decodeURIComponent(songTitle));
        if (song && song.type === 'video') {
            const songTitleElement = document.getElementById('songTitle');
            const albumTitleElement = document.getElementById('albumTitle');
            const mediaContainer = document.getElementById('mediaContainer');

            songTitleElement.textContent = song.title;
            albumTitleElement.textContent = `${song.album} - ${song.artist}`;
            mediaContainer.innerHTML = `<iframe id="videoFrame" src="${song.source}" frameborder="0" allowfullscreen width="100%" height="500"></iframe>`;
        } else {
            console.error('Song data not found or invalid media type.');
        }
    });
}