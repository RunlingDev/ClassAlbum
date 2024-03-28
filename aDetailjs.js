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

    xhr.onreadystatechange = function () {
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

// 为音频详情页面加载媒体和歌词
const urlParams = new URLSearchParams(window.location.search);
const songTitle = urlParams.get('song');

if (songTitle) {
    loadSongsData(songs => {
        const song = songs.find(s => s.title === decodeURIComponent(songTitle));
        if (song && song.type === 'audio') {
            const songTitleElement = document.getElementById('songTitle');
            const albumTitleElement = document.getElementById('albumTitle');
            const mediaContainer = document.getElementById('mediaContainer');
            const lyricsContainer = document.getElementById('lyricsContainer');

            songTitleElement.textContent = song.title;
            albumTitleElement.textContent = `${song.album} - ${song.artist}`;
            mediaContainer.innerHTML = `<audio id="audioPlayer" src="${song.source}" controls></audio>`;

            if (song.lrc !== 'none') {
                if( song.lrc.includes("music.163.com") ){
                    const parser = new LrcParser();
                    const lyrics = parser.parse(getSongLrc(song.lrc));
                    displayLyrics(lyrics);
                }else{
                    fetch(song.lrc)
                    .then(response => response.text())
                    .then(data => {
                        const parser = new LrcParser();
                        const lyrics = parser.parse(data);
                        displayLyrics(lyrics);
                    });
                }
            }
        } else {
            console.error('Song data not found or invalid media type.');
        }
    });
}


// 解析 .lrc 文件内容
class LrcParser {
    parse(data) {
        const lyrics = [];
        const lines = data.split('\n');
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            if (line) {
                const parts = line.split(']');
                const timestamp = parseTimeString(parts[0].substr(1));
                const text = parts[1];
                lyrics.push({ timestamp, text });
            }
        }
        return lyrics;
    }
}

function parseTimeString(timeString) {
    const parts = timeString.split(':');
    const minutes = parseFloat(parts[0]);
    const seconds = parseFloat(parts[1]);
    return minutes * 60 + seconds;
}

// 渲染歌词
function displayLyrics(lyrics) {
    const audio = document.getElementById('audioPlayer');
    const lyricsDiv = document.getElementById('lyricsContainer');

    audio.addEventListener('timeupdate', () => {
        const currentTime = audio.currentTime;
        for (let i = 0; i < lyrics.length; i++) {
            if (lyrics[i].timestamp > currentTime) {
                lyricsDiv.innerText = lyrics[i - 1].text;
                lyricsDiv.scrollTop = lyricsDiv.scrollHeight;
                break;
            }
        }
    });
}

async function getSongLrc(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.lyric;
    } catch (error) {
        console.error('获取歌词失败:', error);
        return '获取歌词失败';
    }
  }