

var drawModule = (function () {
    
  //definiowanie wygladu weza, jablka i power-upow
  var regularSnake = function(x, y) {
        ctx.fillStyle = 'green';
        ctx.fillRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
  }
  
  var immuneSnake = function(x, y) {
        ctx.fillStyle = 'gold';
        ctx.fillRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
  }

  var apple = function(x, y) {
        ctx.fillStyle = 'red';
        ctx.fillRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
        ctx.fillStyle = 'red';
        ctx.fillRect(x*snakeSize+1, y*snakeSize+1, snakeSize-2, snakeSize-2);
  }
  
  var blueberry = function(x, y, z) {
        ctx.fillStyle = 'blue';
        ctx.fillRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
        ctx.fillStyle = 'blue';
        ctx.fillRect(x*snakeSize+1, y*snakeSize+1, snakeSize-2, snakeSize-2);
  }
  
  var lime = function(x, y, z) {
        ctx.fillStyle = 'greenyellow';
        ctx.fillRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
        ctx.fillStyle = 'greenyellow';
        ctx.fillRect(x*snakeSize+1, y*snakeSize+1, snakeSize-2, snakeSize-2);
  }
  
  var grape = function(x, y, z) {
        ctx.fillStyle = 'purple';
        ctx.fillRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
        ctx.fillStyle = 'purple';
        ctx.fillRect(x*snakeSize+1, y*snakeSize+1, snakeSize-2, snakeSize-2);
  }
  
  var orange = function(x, y, z) {
        ctx.fillStyle = 'orange';
        ctx.fillRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
        ctx.fillStyle = 'orange';
        ctx.fillRect(x*snakeSize+1, y*snakeSize+1, snakeSize-2, snakeSize-2);
  }
  
  var cherry = function(x, y, z) {
        ctx.fillStyle = 'darkred';
        ctx.fillRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
        ctx.fillStyle = 'darkred';
        ctx.fillRect(x*snakeSize+1, y*snakeSize+1, snakeSize-2, snakeSize-2);
  }
  
  var mushroom = function(x, y, z) {
        ctx.fillStyle = 'chocolate';
        ctx.fillRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
        ctx.fillStyle = 'chocolate';
        ctx.fillRect(x*snakeSize+1, y*snakeSize+1, snakeSize-2, snakeSize-2);
  }

  //funkcja uaktualniania wyniku z obecnej gry
  var scoreText = function() {
    document.getElementById('score').innerHTML = "Obecny wynik: " + score;
  }

  //wartosci poczatkowe weza
  var drawSnake = function() {
      var length = 1;
      snake = [];
      snake.push({x:3, y:3});
  }
  
  //sprawdzenie czy wartosci podane przez uzytkownika sa numerami
  var isNumeric = function (number) {
    return !isNaN(parseFloat(number)) && isFinite(number);
  }
    
  var paint = function(){
        //generowanie planszy, schowanie ustawien
        ctx.fillStyle = 'lightgrey';
        ctx.fillRect(0, 0, width, height);
        ctx.lineWidth = "10";
        btn.setAttribute('disabled', true);
        userSettings.className += " settings--hidden";

        var snakeX = snake[0].x;
        var snakeY = snake[0].y;

        //renderowanie kierunku weza po nacisnieciu klawiszy
        if (direction == 'right') { 
          snakeX++; }
        else if (direction == 'left') { 
          snakeX--; }
        else if (direction == 'up') { 
          snakeY--; 
        } else if(direction == 'down') { 
          snakeY++; }
      
        //przechodzenie przez sciany
        if (snakeX == -1) {
            snakeX = 34;
        }
        if (snakeX == 35) {
            snakeX = 0;
        }
        if (snakeY == -1) {
            snakeY = 34;
        }
        if (snakeY == 35) {
            snakeY = 0;
        }
      
        //poziomy
        stage = document.getElementById("select-stage").value;
        switch (stage) {

            case "2":

                stage2();
                
                //jesli jedzienie pojawi sie w scianie, wyrenderuj je ponownie
                if ((food.x == 0 && (food.y > 22)) || (food.x == 0 && (snakfood.yeY < 12)) || + 
                    (food.x == 0 && (food.x > 22)) || (food.y == 0 && (food.x < 12)) || +
                    (food.x == 34 && (food.y > 22)) || (food.x == 34 && (food.y < 12)) || +
                    (food.x == 34 && (food.x > 22)) || (food.y == 34 && (food.x < 12))) {
                    createFood();
                }

                //jesli waz trafi w sciane lub we wlasny ogon - koniec gry
                if ((immunity == false) && ((snakeX == 0 && (snakeY > 22)) || (snakeX == 0 && (snakeY < 12)) || + 
                    (snakeY == 0 && (snakeX > 22)) || (snakeY == 0 && (snakeX < 12)) || +
                    (snakeX == 34 && (snakeY > 22)) || (snakeX == 34 && (snakeY < 12)) || +
                    (snakeY == 34 && (snakeX > 22)) || (snakeY == 34 && (snakeX < 12))) || +
                checkCollision(snakeX, snakeY, snake)) {
                    gameOver();
                }
                break;
                
            case "3":
                
                stage3();

                if ((food.x == 0) || (food.x == 34) || +
                    (food.y == 0) || (food.y == 34)) {
                        createFood();
                }
                
                if ((immunity == false) && ((snakeX == 0) || (snakeX == 34) || +
                    (snakeY == 0) || (snakeY == 34)) || +
                    checkCollision(snakeX, snakeY, snake)) {
                        gameOver();
                }
                
                break;
                
            case "4":
                
                stage4();

                if ((food.x == 0 && (food.y < 25)) && (food.x == 0 && (food.y > 9)) || + 
                    (food.y == 0 && (snakeX < 25)) && (food.y == 0 && (food.x > 9)) || +
                    (food.x == 34 && (food.y < 25)) && (food.x == 34 && (food.y > 9)) || +
                    (food.y == 34 && (food.x < 25)) && (food.y == 34 && (food.x > 9)) || +
                    (food.y == 6 && (food.x > 3) && (food.x < 13))  +
                    (food.y == 6 && (food.x > 21) && (food.x < 31))  +
                    (food.y == 29 && (food.x > 3) && (food.x < 13))  +
                    (food.y == 29 && (food.x > 21) && (food.x < 31))  +
                    (food.x == 4 && (food.y > 21) && (food.y < 30))  +
                    (food.x == 30 && (food.y > 21) && (food.y < 30))  +
                    (food.x == 4 && (food.y > 5) && (food.y < 15))  +
                    (food.x == 30 && (food.y > 5) && (food.y < 15))) {
                    createFood();
                }
                
                if ((immunity == false) && ((snakeX == 0 && (snakeY < 25)) && (snakeX == 0 && (snakeY > 9)) || + 
                    (snakeY == 0 && (snakeX < 25)) && (snakeY == 0 && (snakeX > 9)) || +
                    (snakeX == 34 && (snakeY < 25)) && (snakeX == 34 && (snakeY > 9)) || +
                    (snakeY == 34 && (snakeX < 25)) && (snakeY == 34 && (snakeX > 9)) || +
                    (snakeY == 6 && (snakeX > 3) && (snakeX < 13))  +
                    (snakeY == 6 && (snakeX > 21) && (snakeX < 31))  +
                    (snakeY == 29 && (snakeX > 3) && (snakeX < 13))  +
                    (snakeY == 29 && (snakeX > 21) && (snakeX < 31))  +
                    (snakeX == 4 && (snakeY > 21) && (snakeY < 30))  +
                    (snakeX == 30 && (snakeY > 21) && (snakeY < 30))  +
                    (snakeX == 4 && (snakeY > 5) && (snakeY < 15))  +
                    (snakeX == 30 && (snakeY > 5) && (snakeY < 15)))  +
                    checkCollision(snakeX, snakeY, snake)) {
                    gameOver();
                }
                break;
                
            case "5": {
                stage5();
                
                if  (food.x == 0 || food.x == 34 || +
                     food.y == 0 || food.y == 34 || +
                    (food.y == 6 && (food.x > 3) && (food.x < 13))  +
                    (food.y == 6 && (food.x > 21) && (food.x < 31))  +
                    (food.y == 29 && (food.x > 3) && (food.x < 13))  +
                    (food.y == 29 && (food.x > 21) && (food.x < 31))  +
                    (food.x == 4 && (food.y > 21) && (food.y < 30))  +
                    (food.x == 30 && (food.y > 21) && (food.y < 30))  +
                    (food.x == 4 && (food.y > 5) && (food.y < 15))  +
                    (food.x == 30 && (food.y > 5) && (food.y < 15))) {
                        createFood();
                }
                
                if  ((immunity == false) && (snakeX == 0 || snakeX == 34 || +
                     snakeY == 0 || snakeY == 34 || +
                    (snakeY == 6 && (snakeX > 3) && (snakeX < 13))  +
                    (snakeY == 6 && (snakeX > 21) && (snakeX < 31))  +
                    (snakeY == 29 && (snakeX > 3) && (snakeX < 13))  +
                    (snakeY == 29 && (snakeX > 21) && (snakeX < 31))  +
                    (snakeX == 4 && (snakeY > 21) && (snakeY < 30))  +
                    (snakeX == 30 && (snakeY > 21) && (snakeY < 30))  +
                    (snakeX == 4 && (snakeY > 5) && (snakeY < 15))  +
                    (snakeX == 30 && (snakeY > 5) && (snakeY < 15)))  +
                    checkCollision(snakeX, snakeY, snake)) {
                        gameOver();
                }
                break;
            }
                
            default:

                if (checkCollision(snakeX, snakeY, snake)) {
                    gameOver();
                }
        }
        
          if(snakeX == food.x && snakeY == food.y) {
              //akcje power-upow. Jesli uzytkownik nie wprowadzi liczby, lub wprowadzi niepoprawny format danych, wykonaj predefiniowane bonusy

              //zmniejsz dlugosc weza
                if (food.z == 1) {
                    powerUp1 = document.getElementById("select-powerUp1").value;
                    if (isNumeric(powerUp1)) {
                        for (var i=0; i < powerUp1; i++) {
                            snake.pop();
                        }
                    }
                    else {
                       snake.pop(); 
                    }
                    snake.pop();
                }
                
//              zwieksz dlugosc weza
                if (food.z == 2) {
                    powerUp2 = document.getElementById("select-powerUp2").value;
                    if (isNumeric(powerUp2)) {
                        for (var i=0; i < powerUp2; i++) {
                            if (direction == 'right') { 
                                var tail = {x:snakeX-1, y: snakeY} }
                            else if (direction == 'left') { 
                                var tail = {x:snakeX+1, y: snakeY} }
                            else if (direction == 'up') { 
                                var tail = {x:snakeX, y: snakeY+1} }
                            else if(direction == 'down') { 
                                var tail = {x:snakeX, y: snakeY-1} }
                            snake.unshift(tail);
                        }
                    } else {

                        if (direction == 'right') { 
                            var tail = {x:snakeX-1, y: snakeY} }
                        else if (direction == 'left') { 
                            var tail = {x:snakeX+1, y: snakeY} }
                        else if (direction == 'up') { 
                            var tail = {x:snakeX, y: snakeY+1} }
                        else if(direction == 'down') { 
                            var tail = {x:snakeX, y: snakeY-1} }
                        snake.unshift(tail);
                    }
                }
                
                //przyspiesz weza
                if (food.z == 3) {
                    gameloop = clearInterval(gameloop);
                    gameloop = setInterval(paint, (currentSpeed-20));
                    
                    powerUp3 = document.getElementById("select-powerUp3").value;
                    if (isNumeric(powerUp3)) {
                        powerUp3Time = powerUp3 * 1000;
                        setTimeout(function() {
                          gameloop = clearInterval(gameloop);
                          gameloop = setInterval(paint, currentSpeed);
                        }, powerUp3Time);
                    } else {
                          setTimeout(function() {
                          gameloop = clearInterval(gameloop);
                          gameloop = setInterval(paint, currentSpeed);
                        }, 5000);
                    }
                }
                
                //spowolnij weza
                if (food.z == 4) {
                    gameloop = clearInterval(gameloop);
                    gameloop = setInterval(paint, (currentSpeed+20));
                    
                    powerUp4 = document.getElementById("select-powerUp4").value;
                    if (isNumeric(powerUp4)) {
                        powerUp4Time = powerUp4 * 1000;
                        setTimeout(function() {
                          gameloop = clearInterval(gameloop);
                          gameloop = setInterval(paint, currentSpeed);
                        }, powerUp4Time);
                    } else {
                          setTimeout(function() {
                          gameloop = clearInterval(gameloop);
                          gameloop = setInterval(paint, currentSpeed);
                        }, 5000);
                    }
                }
                
                //dodatkowe punkty
                if (food.z == 5) {
                    powerUp5 = document.getElementById("select-powerUp5").value;
                    if (isNumeric(powerUp5)) {
                        score =  score + ((powerUp5/10)*10);
                    } else {
                        score += 3;
                    }
                    if (stageMultiplier == 1) {
                        score --;
                    } 
                }
                
                //czasowa nietykalnosc
                if (food.z == 6) {
                    immunity = true;
                    powerUp6 = document.getElementById("select-powerUp6").value;
                    if (isNumeric(powerUp6)) {
                        powerUp6Time = powerUp6 * 1000;
                    setTimeout(function() {
                      immunity = false;
                    }, powerUp6Time);
                    } else {
                      setTimeout(function() {
                      immunity = false;
                      }, 10000);
                    }
                }

                 //tworzenie nowej glowy
                var tail = {x:snakeX, y: snakeY};
                score += stageMultiplier + speedMultiplier;
                powerUpCounter ++;
                createFood();
                
                snake.unshift(tail);
              
          } else {
            var tail = snake.pop();
            tail.x = snakeX; 
            tail.y = snakeY;
            snake.unshift(tail);
          }

          //jesli waz ma status nietykalnosci, generuj zlotego, w przeciwnym razie - zwyklego
          for(var i = 0; i < snake.length; i++) {
            if (immunity == true) {
                immuneSnake(snake[i].x, snake[i].y);
            }
            else {
                regularSnake(snake[i].x, snake[i].y);
            }
          }
          //przypisanie odpowiednich kolorow do power-upow
          if (food.z > 0) {
              switch(food.z) {
                  case 1:
                      blueberry(food.x, food.y, food.z);
                      break;
                  case 2:
                      lime(food.x, food.y, food.z);
                      break;
                  case 3:
                      grape(food.x, food.y, food.z);
                      break;
                  case 4:
                      orange(food.x, food.y, food.z);
                      break;
                  case 5:
                      cherry(food.x, food.y, food.z);
                      break;
                  case 6:
                      mushroom(food.x, food.y, food.z);
                      break;
              }
          }
          
          else {
              apple(food.x, food.y);  
          }

          scoreText();

        }
        
    var createFood = function() {
      //generowanie losowych wspolrzednych dla jedzenia, w zakresie planszy
      food = {
        x: Math.floor((Math.random() * 34) + 1),
        y: Math.floor((Math.random() * 34) + 1),
        z: 0
      }
      
      // jesli licznik sie zgadza, nastepny owoc bedzie losowym power-upem. Domyslnie co 3 owoc jest power-upem
      if (powerUpCounter > 0 && (powerUpCounter+1) % 3 == 0) {
          food.z = Math.floor((Math.random() * 6) + 1);
      }

      //jesli jedzenie pojawi sie tam gdzie waz, losuj ponownie
      for (var i=0; i>snake.length; i++) {
        var snakeX = snake[i].x;
        var snakeY = snake[i].y;

        if (food.x===snakeX && food.y === snakeY || food.y === snakeY && food.x===snakeX) {
          food.x = Math.floor((Math.random() * 34) + 1);
          food.y = Math.floor((Math.random() * 34) + 1);
        }
      }
    }
        
  var gameOver = function() {
              //czyszczenie planszy, mozliwosc restartu gry
              btn.removeAttribute('disabled', true);
              gameloop = clearInterval(gameloop);
              //tablica wynikow
              if (scoreBoard.length < 5) {
                  scoreBoard.push(score);
              } else {
                  scoreBoard.sort(function(a, b){ return a - b; });;
                  if (scoreBoard[0] < score) {
                      scoreBoard.shift();
                      scoreBoard.push(score);
                  }
              }
              //sortowanie i wyswietlenie wynikow
              scoreBoard.sort(function(a, b){ return a - b; });
              scoreBoard.reverse();
              document.getElementById('scoreFinal').innerHTML = "Koniec gry. Wynik: " + score;
              document.getElementById('scoreBoard').innerHTML = "";
              document.getElementById('scoreBoard').innerHTML += "Najlepsze wyniki: <br>"
              for (var i=0; i < scoreBoard.length; i++) {
                  document.getElementById('scoreBoard').innerHTML += (i+1) + ") " + scoreBoard[i] + "<br>";
              }
              //ponowne pokazanie ustawien, resetowanie wyniku i licznika power-upow
              userSettings.className = " settings";
              score = 0;
              powerUpCounter = 0;
              return;
  }
  
  //rendery plansz
  var stage2 = function () {
      stageMultiplier = 2;
      ctx.strokeStyle = 'black';
      ctx.beginPath();
      ctx.moveTo(115, 1);
      ctx.lineTo(1, 1);
      ctx.lineTo(1, 115);

      ctx.moveTo(235, 1);
      ctx.lineTo(349, 1);
      ctx.lineTo(349, 115);

      ctx.moveTo(235, 349);
      ctx.lineTo(349, 349);
      ctx.lineTo(349, 235);

      ctx.moveTo(115, 349);
      ctx.lineTo(1, 349);
      ctx.lineTo(1, 235);
      ctx.stroke();
  }
  
  var stage3 = function() {
    stageMultiplier = 3;
    ctx.strokeStyle = 'black';
    ctx.beginPath();
    ctx.moveTo(1, 1);
    ctx.lineTo(349, 1);
    ctx.lineTo(349, 349);
    ctx.lineTo(1, 349);
    ctx.lineTo(1, 1);
    ctx.stroke();
  }
  
  var stage4 = function() {
    stageMultiplier = 4;
    ctx.strokeStyle = 'black';
    ctx.beginPath();
    ctx.moveTo(125, 65);
    ctx.lineTo(45, 65);
    ctx.lineTo(45, 150);

    ctx.moveTo(125, 295);
    ctx.lineTo(45, 295);
    ctx.lineTo(45, 220);

    ctx.moveTo(225, 65);
    ctx.lineTo(305, 65);
    ctx.lineTo(305, 150);

    ctx.moveTo(225, 295);
    ctx.lineTo(305, 295);
    ctx.lineTo(305, 220);

    ctx.moveTo(1, 250);
    ctx.lineTo(1, 100);

    ctx.moveTo(349, 250);
    ctx.lineTo(349, 100);

    ctx.moveTo(250, 1);
    ctx.lineTo(100, 1);

    ctx.moveTo(250, 349);
    ctx.lineTo(100, 349);
    ctx.stroke();
  }
  
  var stage5 = function() {
    stageMultiplier = 5;
    ctx.strokeStyle = 'black';
    ctx.beginPath();
    ctx.moveTo(125, 65);
    ctx.lineTo(45, 65);
    ctx.lineTo(45, 150);

    ctx.moveTo(125, 295);
    ctx.lineTo(45, 295);
    ctx.lineTo(45, 220);

    ctx.moveTo(225, 65);
    ctx.lineTo(305, 65);
    ctx.lineTo(305, 150);

    ctx.moveTo(225, 295);
    ctx.lineTo(305, 295);
    ctx.lineTo(305, 220);

    ctx.moveTo(1, 1);
    ctx.lineTo(349, 1);
    ctx.lineTo(349, 349);
    ctx.lineTo(1, 349);
    ctx.lineTo(1, 1);
    ctx.stroke();
  }


//sprawdzanie kolizji weza z samym soba
  var checkCollision = function(x, y, array) {
      for(var i = 0; i < array.length; i++) {
        if(array[i].x === x && array[i].y === y)
        return true;
      } 
      return false;
  }


//inicjowanie nowej gry, sprawdzenie czy uzytkownik wybral predkosc gry, jesli tak to jaka
  var init = function(){
      direction = 'down';
      drawSnake();
      createFood();
      immunity = false;
      if (document.getElementById("select-speed1").checked == true) {
          gameloop = setInterval(paint, speed1);
          currentSpeed = speed1;
          speedMultiplier = 0;
      }
      else if (document.getElementById("select-speed2").checked == true) {
          gameloop = setInterval(paint, speed2);
          currentSpeed = speed2;
          speedMultiplier = 1;
      }
      else if (document.getElementById("select-speed3").checked == true) {
          gameloop = setInterval(paint, speed3);
          currentSpeed = speed3;
          speedMultiplier = 2;
      }
      else {
          document.getElementById("select-speed1").checked = true
          gameloop = setInterval(paint, speed1);
          currentSpeed = speed1;
          speedMultiplier = 1;
      }
      ctx.clearRect(0, 0, width, height);
  }


    return {
      init : init
    };

    
}());
