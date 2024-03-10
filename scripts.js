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
            songTitle.textContent = '七里香';
            albumTitle.textContent = '七里香 - 周杰伦';
            videoFrame.src = 'video/七里香.mp4';
            break;
        case 'jaychou2':
            songTitle.textContent = '反方向的钟';
            albumTitle.textContent = 'Jay - 周杰伦';
            videoFrame.src = 'video/反方向的钟.mp4';
            break;
        case 'jaychou3':
            songTitle.textContent = '稻香';
            albumTitle.textContent = '魔杰座 - 周杰伦';
            videoFrame.src = 'video/稻香.mp4';
            break;
        case 'jaychou4':
            songTitle.textContent = '我是如此相信';
            albumTitle.textContent = '最伟大的作品 - 周杰伦';
            videoFrame.src = 'video/我是如此相信.mp4';
            break;        
        case 'jaychou5':
            songTitle.textContent = '晴天';
            albumTitle.textContent = '叶惠美 - 周杰伦';
            videoFrame.src = 'video/晴天.mp4';
            break;
        case 'jaychou6':
            songTitle.textContent = '青花瓷';
            albumTitle.textContent = '我很忙 - 周杰伦';
            videoFrame.src = 'video/青花瓷.mp4';
            break;
        case 'jaychou7':
            songTitle.textContent = '蒲公英的约定';
            albumTitle.textContent = '我很忙 - 周杰伦';
            videoFrame.src = 'video/蒲公英的约定.mp4';
            break;
        case 'jaychou8':
            songTitle.textContent = '不能说的秘密';
            albumTitle.textContent = '不能说的秘密 - 周杰伦';
            videoFrame.src = 'video/不能说的秘密.mp4';
            break;
        case 'jaychou9':
            songTitle.textContent = '枫';
            albumTitle.textContent = '十一月的萧邦 - 周杰伦';
            videoFrame.src = 'video/枫.mp4';
            break;
        case 'jaychou10':
            songTitle.textContent = '搁浅';
            albumTitle.textContent = '七里香 - 周杰伦';
            videoFrame.src = 'video/搁浅.mp4';
            break;
        case 'jaychou11':
            songTitle.textContent = '花海';
            albumTitle.textContent = '魔杰座 - 周杰伦';
            videoFrame.src = 'video/花海.mp4';
            break;
        case 'jaychou12':
            songTitle.textContent = '简单爱';
            albumTitle.textContent = '范特西 - 周杰伦';
            videoFrame.src = 'video/简单爱.mp4';
            break;
        case 'jaychou13':
            songTitle.textContent = '龙卷风';
            albumTitle.textContent = 'Jay - 周杰伦';
            videoFrame.src = 'video/龙卷风.mp4';
            break;
        case 'jaychou14':
            songTitle.textContent = '明明就';
            albumTitle.textContent = '十二新作 - 周杰伦';
            videoFrame.src = 'video/明明就.mp4';
            break;
        case 'westlife1':
            songTitle.textContent = '多远都要在一起';
            albumTitle.textContent = '新的心跳 - 邓紫棋';
            videoFrame.src = 'video/多远都要在一起.mp4';
            break;
        case 'westlife2':
            songTitle.textContent = 'My Love';
            albumTitle.textContent = 'Coast To Coast - Westlife';
            videoFrame.src = 'video/My-Love.mp4';
            break;
        case 'westlife3':
            songTitle.textContent = 'Lemon Tree';
            albumTitle.textContent = 'Dish of the Day - Fool\'s Garden';
            videoFrame.src = 'video/Lemon-Tree.mp4';
            break;
        case 'westlife4':
            songTitle.textContent = 'Seasons In The Sun';
            albumTitle.textContent = 'Westlife - Westlife';
            videoFrame.src = 'video/Seasons-in-the-sun.mp4';
            break;
        case 'westlife5':
            songTitle.textContent = 'My Stupid Heart';
            albumTitle.textContent = 'Stand By You - Walk Off The Earth';
            videoFrame.src = 'video/My-Stupid-Heart.mp4';
            break;
        default:
            break;
    }
}