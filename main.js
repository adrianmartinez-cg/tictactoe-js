let gameStates = {0: 'defPlayers',
                  1: 'play',
                  2: 'result'};
let gameSection = document.getElementById('gameSection');
let playerTurn = 0;
let gameBoard = [['','',''],['','',''],['','','']];
let gameEnd = false;
let players = {0: '', 1: ''};

function createElement(elemType,id='',className='',name='',type='',innerText='',htmlFor=''){
    let elem = document.createElement(elemType);
    if(id !== ''){
        elem.id = id;
    }
    if(className !== ''){
        elem.classList.add(className);
    }
    if(name !==''){
        elem.name=name;
    }
    if(type !==''){
        elem.type=type;
    }
    if(innerText !==''){
        elem.innerText=innerText;
    }
    if(htmlFor !== ''){
        elem.htmlFor = htmlFor;
    }
    return elem;
}

// Pq caralhos gameSection.childNodes.forEach((node)=> gameSection.removeChild(node)) nao funciona ????????

function removePreviousContent(){
    while(gameSection.firstChild){
        gameSection.removeChild(gameSection.firstChild);
    }
    
}

function constructDefPlayersState(){
    removePreviousContent();
    let inputFirstPlayer = createElement('input','inputFirstPlayer','nameInput','inputFirstPlayer','text');
    let inputSecPlayer = createElement('input','inputSecPlayer','nameInput','inputSecPlayer','text');
    let labelInputFirstPlayer = createElement('label','','nameLabel','','','Insira o nome do primeiro jogador: ','inputFirstPlayer');
    let labelInputSecPlayer = createElement('label','','nameLabel','','','Insira o nome do segundo jogador: ','inputSecPlayer');
    let gameStartBtn = createElement('button','gameStartBtn','','','button','Iniciar jogo','');
    let br1 = document.createElement('br');
    let br2 = document.createElement('br');
    gameSection.append(labelInputFirstPlayer,inputFirstPlayer,br1,labelInputSecPlayer,inputSecPlayer,br2,gameStartBtn);
    gameStartBtn.addEventListener('click', (ev)=> {
        if(inputFirstPlayer.value !== '' && inputSecPlayer.value !== ''){
            players[0]=inputFirstPlayer.value;
            players[1]=inputSecPlayer.value;
            changeGameState(gameStates[1]);
        }
    });
}

function checkGameBoardLines(){
    let winner = '';
    for(let i = 0 ; i < gameBoard.length; i++){
        let initChar = gameBoard[i][0];
        let completeLine = true;
        for(let j = 1; j < gameBoard[0].length;j++){
            if(gameBoard[i][j] != initChar){
                completeLine = false;
                break;
            }
        }
        if(completeLine == true){
            winner = initChar;
            break;
        }
    }
    
    return winner;
}

function checkGameBoardColumns(){
    let winner = '';
    let numCols = 3;
    for(let j=0; j < numCols; j++){
        let initChar = gameBoard[0][j];
        let completeColumn = true;
        for(let i=1; i < gameBoard.length; i++){
            if(gameBoard[i][j] !== initChar){
                completeColumn = false;
                break;
            }
        }
        if(completeColumn){
            winner = initChar;
            break;
        }
    }
    return winner;  
}

function checkGameBoardDiag(){
    let winner = '';
    let boardSize = 3;
    let initChar = gameBoard[0][0];
    let completeDiag = true;
    for(let k = 1; k < boardSize; k++){
        if(gameBoard[k][k] !== initChar){
            completeDiag = false;
            break;
        }
    }
    if(completeDiag === true){
        winner = initChar;
    }
    else {
        completeDiag = true;
        initChar = gameBoard[0][2];
        for(let i = 1; i < boardSize; i++){
            if(gameBoard[i][boardSize-1-i] !== initChar){
                completeDiag = false;
                break;
            }
        }
        if(completeDiag === true){
            winner = initChar;
        }
    }
    return winner;

}

function changeLineStyleToVictory(line){
    let initElem = line * 3;
    let secElem = initElem + 1;
    let thirdElem = secElem + 1;
    document.querySelectorAll('#gamezone-'+initElem+',#gamezone-'+secElem+',#gamezone-'+thirdElem).forEach((elem)=>{
        elem.classList.add('gamezone-victory');
    });
}

function changeColumnStyleToVictory(column){
    let initElem = column;
    let secElem = initElem + 3;
    let thirdElem = secElem + 3;
    document.querySelectorAll('#gamezone-'+initElem+',#gamezone-'+secElem+',#gamezone-'+thirdElem).forEach((elem)=>{
        elem.classList.add('gamezone-victory');
    });
}

function changeDiagStyleToVictory(winner){
    let initElem = 0;
    let secElem = 4;
    let thirdElem = 8;
    if(gameBoard[0][2]==winner){
        initElem = 2;
        thirdElem = 6;
    }
    document.querySelectorAll('#gamezone-'+initElem+',#gamezone-'+secElem+',#gamezone-'+thirdElem).forEach((elem)=>{
        elem.classList.add('gamezone-victory');
    });
}

function endGame(zoneId,winner,typeOfVictory){
    gameEnd = true;
    let zoneLine = Math.floor(zoneId/3);
    let zoneColumn = zoneId%3;
    let winnerPlayer = winner ==='X' ? players[0] : players[1];
    document.getElementById('gameBoardInfo').innerText = 'Parabéns pela vitória, ' + winnerPlayer + '!';
    let playAgainBtn = createElement('button','playAgainBtn','','','button','Jogar novamente');
    playAgainBtn.addEventListener('click',(ev)=>{
        changeGameState(gameStates[0]);
        playerTurn = 0;
        gameBoard = [['','',''],['','',''],['','','']];
        gameEnd = false;
        players = {0: '', 1: ''};
    });
    gameSection.appendChild(playAgainBtn);
    if(typeOfVictory == 'line'){
        changeLineStyleToVictory(zoneLine);
    } else if(typeOfVictory == 'column'){
        changeColumnStyleToVictory(zoneColumn);
    } else if(typeOfVictory == 'diag'){
        changeDiagStyleToVictory(winner);
    }
}

function checkGameBoard(zoneId){
    let winner = '';
    let typeOfVictory = '';
    winner = checkGameBoardLines();
    if(winner == ''){
        winner = checkGameBoardColumns();
        if(winner == ''){
            winner = checkGameBoardDiag();
            if(winner != ''){
                typeOfVictory = 'diag';
                endGame(zoneId,winner,typeOfVictory);
            }
        } else {
            typeOfVictory = 'column';
            endGame(zoneId,winner,typeOfVictory);
        }
    } else {
        typeOfVictory = 'line'
        endGame(zoneId,winner,typeOfVictory);
    }
}

function constructPlayState(){
    removePreviousContent();
    let numZones = 9;
    let gameZones = [];

    let gameBoardInfo = createElement('div','gameBoardInfo','gameBoardInfo');
    let gameContainer = createElement('div','gameContainer','gameContainer');

    for(let i=0;i<numZones;i++){
        let zone = createElement('div','gamezone-'+i,'gameZone','','','','');
        zone.classList.add('zone-hover');
        zone.addEventListener('click',(ev)=>{
            if(!gameEnd){
                if(!zone.classList.contains('zone-clicked')){
                    zone.classList.remove('zone-hover');
                    let zoneInnerText = '';
                    if(playerTurn===0){
                        zoneInnerText = 'X';
                        zone.classList.add('cross-click');
                    } else if(playerTurn == 1){
                        zoneInnerText = 'O';
                        zone.classList.add('circle-click');
                    }
                    zone.innerText = zoneInnerText;
                    zone.classList.add('zone-clicked');
                    playerTurn = (playerTurn + 1) % 2;
                    document.getElementById('gameBoardInfoPlayerName').innerText = players[playerTurn];
                    let zoneLine = Math.floor(i/3);
                    let zoneColumn = i%3;
                    gameBoard[zoneLine][zoneColumn] = zoneInnerText;
                    checkGameBoard(i);
                }
            }
        });
        gameZones.push(zone);
    }
    gameZones.forEach((gamezone)=>{
        gameContainer.appendChild(gamezone);
    });


    let gameBoardInfoText = createElement('p','gameBoardInfoText','','','','Realize sua jogada, ');
    let gameBoardInfoPlayerName = createElement('span','gameBoardInfoPlayerName','','','',players[0]);
    gameBoardInfo.append(gameBoardInfoText,gameBoardInfoPlayerName);
    gameSection.append(gameBoardInfo,gameContainer);
    
}

function changeGameState(gameState){
    if(gameState==='defPlayers'){
        constructDefPlayersState();
    } else if(gameState==='play'){
        constructPlayState();
    }  
}

changeGameState(gameStates[0]);