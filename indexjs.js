// 从配置文件加载歌曲数据
fetch('songs.json')
    .then(response => response.json())
    .then(songs => {
        const fixedSongList = document.querySelector('.song-list.fixed');
        const randomSongLists = document.querySelectorAll('.song-list.random');

        // 固定展示的歌曲
        const fixedSongs = songs.filter(song => song.isFixed);
        fixedSongs.forEach(song => {
            fixedSongList.innerHTML += `
                <li>
                    <a href="detail.html?song=${song.title}">
                        <span class="song-title">${song.title}</span>
                        <span class="album-title">${song.album} - ${song.artist}</span>
                    </a>
                    <a href="${song.videoSource}" target="_blank"><img class="play-icon" src="img/play-icon.png" alt="Play"></a>
                </li>
            `;
        });

        // 随机展示的歌曲
        const randomSongs = shuffleArray(songs.filter(song => !song.isFixed));
        randomSongLists.forEach(list => {
            randomSongs.slice(0, 5).forEach(song => {
                list.innerHTML += `
                    <li>
                        <a href="detail.html?song=${song.title}">
                            <span class="song-title">${song.title}</span>
                            <span class="album-title">${song.album} - ${song.artist}</span>
                        </a>
                        <a href="${song.videoSource}" target="_blank"><img class="play-icon" src="img/play-icon.png" alt="Play"></a>
                    </li>
                `;
            });
            randomSongs.splice(0, 5);
        });
    })
    .catch(error => console.error('Error fetching song data:', error));

// 用于随机打乱数组顺序
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}