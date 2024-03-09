// 为详情页面加载视频
const urlParams = new URLSearchParams(window.location.search);
const songParam = urlParams.get('song');

if (songParam) {
    const songTitle = document.getElementById('songTitle');
    const albumTitle = document.getElementById('albumTitle');
    const videoFrame = document.getElementById('videoFrame');

    // 根据 songParam 设置标题和视频源
    switch (songParam) {
        case 'jaychou1':
            songTitle.textContent = 'Jay Chou - Song 1';
            albumTitle.textContent = 'Album 1';
            videoFrame.src = 'video/jaychou1.mp4';
            break;
        case 'jaychou2':
            songTitle.textContent = 'Jay Chou - Song 2';
            albumTitle.textContent = 'Album 2';
            videoFrame.src = 'video/jaychou2.mp4';
            break;
        case 'jaychou3':
            songTitle.textContent = 'Jay Chou - Song 3';
            albumTitle.textContent = 'Album 3';
            videoFrame.src = 'video/jaychou3.mp4';
            break;
        case 'westlife1':
            songTitle.textContent = 'Westlife - Song 1';
            albumTitle.textContent = 'Album 1';
            videoFrame.src = 'video/westlife1.mp4';
            break;
        case 'westlife2':
            songTitle.textContent = 'Westlife - Song 2';
            albumTitle.textContent = 'Album 2';
            videoFrame.src = 'video/westlife2.mp4';
            break;
        case 'westlife3':
            songTitle.textContent = 'Westlife - Song 3';
            albumTitle.textContent = 'Album 3';
            videoFrame.src = 'video/westlife3.mp4';
            break;
        default:
            break;
    }
}