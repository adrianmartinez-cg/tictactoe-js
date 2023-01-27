let gameStates = {0: 'defPlayers',
                  1: 'play',
                  2: 'result'};
let gameSection = document.getElementById('gameSection');
let playerTurn = 0;
let gameBoard = [['','',''],['','',''],['','','']];

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
            changeGameState(gameStates[1]);
        }
    });
}

function constructPlayState(){
    removePreviousContent();
    let numZones = 9;
    let gameZones = [];

    let gameContainer = createElement('div','gameContainer','gameContainer','','','','');

    for(let i=0;i<numZones;i++){
        let zone = createElement('div','gamezone-'+i,'gameZone','','','','');
        zone.classList.add('zone-hover');
        zone.addEventListener('click',(ev)=>{
            if(!zone.classList.contains('zone-clicked')){
                zone.classList.remove('zone-hover');
                if(playerTurn===0){
                    zone.innerText = 'X';
                    zone.classList.add('cross-click');
                } else if(playerTurn == 1){
                    zone.innerText = 'O';
                    zone.classList.add('circle-click');
                }
                zone.classList.add('zone-clicked');
                playerTurn = (playerTurn + 1) % 2;
            }
        });
        gameZones.push(zone);
    }
    gameZones.forEach((gamezone)=>{
        gameContainer.appendChild(gamezone);
    });

    gameSection.appendChild(gameContainer);
    
}

function changeGameState(gameState){
    if(gameState==='defPlayers'){
        constructDefPlayersState();
    } else if(gameState==='play'){
        constructPlayState();
    } else if(gameState==='result'){
        constructResultState();
    }    
}

changeGameState(gameStates[0]);