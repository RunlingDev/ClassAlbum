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
        typeof song.title === 'string' &&           //曲名
        typeof song.artist === 'string' &&          //歌手
        typeof song.album === 'string' &&           //专辑
        typeof song.videoSource === 'string' &&     //曲源
        typeof song.weight === 'number' &&          //权重：0不出现，1随机，2一定
        song.weight >= 0 &&
        song.weight <= 2
    );
}

// 根据权重随机选择歌曲
function selectSongsByWeight(songs) {
    const selectedSongs = [];
    const totalWeight = songs.reduce((sum, song) => sum + song.weight, 0);

    while (selectedSongs.length < songs.length && selectedSongs.length < getMaxDisplayCount()) {
        const randomWeight = Math.random() * totalWeight;
        let weightSum = 0;

        for (const song of songs) {
            weightSum += song.weight;
            if (weightSum >= randomWeight && !selectedSongs.includes(song)) {
                selectedSongs.push(song);
                break;
            }
        }
    }

    return selectedSongs;
}

// 获取最大显示条数
function getMaxDisplayCount() {
    const screenHeight = window.innerHeight || document.documentElement.clientHeight;
    const songItemHeight = 50; // 根据您的样式调整每个歌曲项的高度
    const maxDisplayCount = Math.floor((screenHeight - 200) / songItemHeight); // 减去其他元素的高度
    return maxDisplayCount;
}

// 在页面中显示歌曲列表
function displaySongs(songs) {
    const fixedSongList = document.querySelector('.song-list.fixed');
    const randomSongLists = document.querySelectorAll('.song-list.random');

    // 根据权重选择歌曲
    const selectedSongs = selectSongsByWeight(songs);

    // 固定展示的歌曲
    const fixedSongs = selectedSongs.filter(song => song.weight === 2);
    fixedSongs.forEach(song => {
        fixedSongList.innerHTML += `
            <li>
                <a href="detail.html?song=${encodeURIComponent(song.title)}">
                    <span class="song-title">${song.title}</span>
                    <span class="album-title">${song.album} - ${song.artist}</span>
                </a>
                <a href="${song.videoSource}" target="_blank"><img class="play-icon" src="img/play-icon.png" alt="Play"></a>
            </li>
        `;
    });

    // 随机展示的歌曲
    const randomSongs = selectedSongs.filter(song => song.weight !== 2);
    const halfCount = Math.ceil(randomSongs.length / 2);

    randomSongLists.forEach((list, index) => {
        const startIndex = index * halfCount;
        const endIndex = startIndex + halfCount;

        randomSongs.slice(startIndex, endIndex).forEach(song => {
            list.innerHTML += `
                <li>
                    <a href="detail.html?song=${encodeURIComponent(song.title)}">
                        <span class="song-title">${song.title}</span>
                        <span class="album-title">${song.album} - ${song.artist}</span>
                    </a>
                    <a href="${song.videoSource}" target="_blank"><img class="play-icon" src="img/play-icon.png" alt="Play"></a>
                </li>
            `;
        });
    });
}

// 处理主页面加载
window.onload = function() {
    loadSongsData(songs => {
        displaySongs(songs);
    });
};