        document.addEventListener('click', function playMusic() {
            const audio = new Audio('../music/music.mp3');
            audio.loop = true;
            audio.play().then(() => {
                console.log('背景音乐已开始播放');
            }).catch(error => {
                console.error('自动播放失败：', error);
            });
            // 只绑定一次，播放后解绑
            document.removeEventListener('click', playMusic);
        });
