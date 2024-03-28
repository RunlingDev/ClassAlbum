// 歌曲数据的请求地址列表
const songDataUrls = [
    'songs.json',
    'https://example.com/songs.json',
    'https://backup.example.com/songs.json'
];

// 加载歌曲数据
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
                    if (Array.isArray(songs) && songs.every(isValidSong)) {
                        callback(songs);
                    } else {
                        console.error('Invalid song data format.');
                        tryNextUrl();
                    }
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

// 检查歌曲对象是否有效
function isValidSong(song) {
    return (
        typeof song.title === 'string' &&
        typeof song.artist === 'string' &&
        typeof song.album === 'string' &&
        typeof song.weight === 'number' &&
        song.weight >= 0 &&
        song.weight <= 2 &&
        typeof song.type === 'string' &&
        (song.type === 'video' || song.type === 'audio') &&
        typeof song.source === 'string' &&
        typeof song.lrc === 'string'
    );
}

// 设置歌曲对象的缺省值
function setDefaultSongValues(song) {
    if (song.weight === undefined) {
        song.weight = 1;
    }// 防止weight===0时default为1.
    song.lrc = song.lrc || 'none';
    return song;
}

// 根据权重随机选择歌曲
function selectSongs(songs) {
    const selectedSongs = [];
    while (selectedSongs.length < songs.length && selectedSongs.length <= getMaxDisplayCount()*2) {
        const randomIndex = Math.floor(Math.random() * songs.length);
        const song = songs[randomIndex];
        if (!selectedSongs.includes(song)) {
            selectedSongs.push(song);
        }
    }

    return selectedSongs;
}

// 获取最大显示条数
function getMaxDisplayCount() {
    const screenHeight = window.innerHeight || document.documentElement.clientHeight;
    const songItemHeight = 50;
    const maxDisplayCount = Math.floor((screenHeight - 230) / songItemHeight);
    return maxDisplayCount;
}

// 在页面中显示歌曲列表
function displaySongs(songs) {
    const songLists = document.querySelectorAll('.song-list');
    const weightedSongs = songs.filter(song => song.weight > 0);
    const fixedSongs = weightedSongs.filter(song => song.weight === 2);
    const randomSongs = weightedSongs.filter(song => song.weight === 1);
    const selectedSongs = fixedSongs.concat(selectSongs(randomSongs));

    const songsPerList  = Math.min((selectedSongs.length/2),getMaxDisplayCount());
    songLists.forEach((list,index) => {
        const startIndex = index === 0 ? 0 : songsPerList;
        const endIndex = index === 0 ? songsPerList : (songsPerList*2);
        console.log(startIndex,endIndex);
        console.log(selectedSongs);
        console.log(songsPerList);
        selectedSongs.slice(startIndex, endIndex).forEach(song => {
            const detailPage = song.type === 'video' ? 'vDetail.html' : 'aDetail.html';
            list.innerHTML += `
                <li>
                    <a href="${detailPage}?song=${encodeURIComponent(song.title)}">
                        <span class="song-title">${song.title}</span>
                        <span class="album-title">${song.album} - ${song.artist}</span>
                    </a>
                    <a href="${song.source}" target="_blank"><img class="play-icon" src="img/play-icon.png" alt="Play"></a>
                </li>
            `;
        });
    });
}

// 处理主页面加载
window.onload = function() {
    loadSongsData(songs => {
        const validSongs = songs.filter(isValidSong).map(setDefaultSongValues);
        displaySongs(validSongs);
    });
};