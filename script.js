window.addEventListener('DOMContentLoaded', () => {
    const loaderContainer = document.getElementById('loaderContainer') || document.getElementById('loader');
    const loaderFill = document.getElementById('loaderFill');
    const loaderText = document.getElementById('loaderText');

    if (sessionStorage.getItem('gameLoadedInSession') == 'true') {
        if (loaderContainer) loaderContainer.style.display = 'none';
        return;
    }

    let progress = 0;
    const loadProgress = setInterval(() => {
        progress += 2;

        if (loaderFill) loaderFill.style.width = progress + '%';
        if (loaderText) loaderText.innerHTML = progress + '%';

        if (progress >= 100) {
            clearInterval(loadProgress);

            if (loaderText) loaderText.innerHTML = "Tap to Play / Press Enter";

            window.addEventListener('click', startGame);
            window.addEventListener('touchstart', startGame);

            window.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    startGame();
                }
            });

            function startGame() {
                const mainLoader = loaderContainer || document.body.firstElementChild;
                if (mainLoader) {
                    mainLoader.style.transition = "opacity 0.4s ease";
                    mainLoader.style.opacity = "0";
                    setTimeout(() => {
                        mainLoader.style.display = 'none';
                        sessionStorage.setItem('gameLoadedInSession', 'true');
                    }, 400);
                }
                window.removeEventListener('click', startGame);
                window.removeEventListener('touchstart', startGame);
            }
        }
    }, 40);
});

    document.getElementById('restartBox').style.display = 'none';
    score = 0;
    cross = true;
    let gameActive = true;


    audio = new Audio('BackGround.mp3');
    audiogo = new Audio('Front.mp3');
    setTimeout(() => {
        audio.play()
    }, 1000)

    document.addEventListener("touchstart", function () {
        let dino = document.querySelector('.dino');
        if (dino && !dino.classList.contains('animateDino')) {
            dino.classList.add('animateDino');
            setTimeout(() => {
                dino.classList.remove('animateDino');
            }, 700);
        }
    });


    document.onkeydown = function (e) {
        console.log("key code is: ", e.key)
        if (e.key == "ArrowUp") {
            dino = document.querySelector('.dino');
            dino.classList.add('animateDino');
            setTimeout(() => {
                dino.classList.remove('animateDino')
            }, 700);

        }
        if (e.key == "ArrowRight") {
            dino = document.querySelector('.dino');
            dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
            dino.style.left = dinoX + 112 + "px"
        }
        if (e.key == "ArrowLeft") {
            dino = document.querySelector('.dino');
            dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
            dino.style.left = (dinoX - 112) + "px"
        }
    }
    setInterval(() => {
        if (document.getElementById('loader') && document.getElementById('loader').style.display !== 'none') return;
        dino = document.querySelector('.dino');
        gameOver = document.querySelector('.gameOver');
        obstacle = document.querySelector('.obstacle');

        dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'));

        ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
        oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

        offsetX = Math.abs(dx - ox);
        offsetY = Math.abs(dy - oy);
        //console.log(offsetX,offsetY)
        if (offsetX < 70 && offsetY < 62) {
            gameOver.innerHTML = "Game Over Reload to Play again";
            document.getElementById('restartBox').style.display = 'block';


            obstacle.classList.remove('obstacleAni')
            audiogo.play();
            setTimeout(() => {
                audiogo.pause();
                audio.pause();


            }, 3000);
            document.getElementById('restartBox').style.display = 'block';

        }
        else if (offsetX < 45 && cross) {
            score += 1;
            updateScore(score);
            cross = false;
            setTimeout(() => {
                cross = true;
            }, 1000);

            setTimeout(() => {

                aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));

                let newDur = aniDur - 0.1;
                obstacle.style.animationDuration = newDur + 's';
                console.log('New animation Duration', newDur)


            }, 100);
        }

    }, 35);

    function updateScore(score) {
        scoreCont.innerHTML = "Your Score :" + score
    }


    document.getElementById('restartBtn').addEventListener('click', function () {
        location.reload();
    });