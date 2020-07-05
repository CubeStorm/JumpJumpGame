//=*=\\ Wczytywanie przycisków //=*=\\
window.addEventListener('keydown', function(event) {
    switch (event.keyCode) {
        /*
        case 38: // Strzałka w górę
            game.clear();
            game.up();
        break;

        case 40: // Strzałka w dół
            game.clear();
            game.down();
        break;

        case 39: // Strzałka w prawo
            game.clear();
            game.right();
        break;

        case 37: // Strzałka w lewo
            game.clear();
            game.left();
        break;
        */

        case 18: // ALT
        case 38: // Strzałka w górę
        case 32: // Spacja
            if (endGame == false) {
                game.jump();
            }
        break;
        case 80: // Klawisz P
            if (endGame == true) {
                returnGame();
            }
        break;
    }
  }, false);

//=*=\\ Wczytywanie przycisków myszki//=*=\\
const getCanvas = document.getElementById('canvas');
getCanvas.onclick = function(e) {
    e = e || window.event;
    if (endGame == true) {
        returnGame();
    }
};