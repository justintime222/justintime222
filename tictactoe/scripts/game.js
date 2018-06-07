/* Game object with all variables. */
var game = {
    first: true,
    user: '',
    computer: '',
    currentPlayer: '',
    moves: 1,
    finished: false,
};

/* FIRST GAME FUNCTIONS */

function setFig(id) {
    if (id === 'x') {
        game.user = 'x';
        game.computer = 'o';
        firstMove();
    } else if (id === 'o') {
        game.user = 'o';
        game.computer = 'x';
        setCurrPl('user')
    }
    //firstMove();
    setCurrPl('user');
    $('#x').addClass('hidden')
    $('#o').addClass('hidden');
}

/* GAME MECHANICS */
//First Move by Computer
function firstMove() {
    setCurrPl('computer');
    icon('fifth');
    setCurrPl('user');
    game.moves++;
}

// Add icon to certain field
function icon(id) {
    
    if (game.currentPlayer == 'user') {
        game.finished = false;
        $('#' + id).removeAttr('onClick');
        $('#' + id).attr('value', game.user);
        $('#' + id).addClass(game.user + ' square' + ' human')
        gameStatus();
        setCurrPl('computer');
        if (game.currentPlayer == 'computer' && game.finished == false) {
            comp();
        }
    } else if (game.currentPlayer == 'computer') {
        $('#' + id).removeAttr('onClick');
        $('#' + id).attr('value', game.computer);
        $('#' + id).addClass(game.computer + ' square' + ' computer')
        gameStatus()
        setCurrPl('user');
        
    }
    game.moves++;

    
}

// How computer thinks?
function comp() {
    
    switch (true) {
        case $('#first').attr('value') != game.user && $('#first').attr('value') != game.computer:
            icon('first');
            break;
        case $('#second').attr('value') !== game.user && $('#second').attr('value') !== game.computer:
            icon('second');
            break;
        case $('#third').attr('value') !== game.user && $('#third').attr('value') !== game.computer:
            icon('third');
            break;
        case $('#fourth').attr('value') !== game.user && $('#fourth').attr('value') !== game.computer:
            icon('fourth');
            break;
        case $('#fifth').attr('value') !== game.user && $('#fifth').attr('value') !== game.computer:
            icon('fifth');
            break;
        case $('#sixth').attr('value') !== game.user && $('#sixth').attr('value') !== game.computer:
            icon('sixth');
            break;
        case $('#seventh').attr('value') !== game.user && $('#seventh').attr('value') !== game.computer:
            icon('seventh');
            break;
        case $('#eighth').attr('value') !== game.user && $('#eighth').attr('value') !== game.computer:
            icon('eighth');
            break;
        case $('#ninth').attr('value') !== game.user && $('#ninth').attr('value') !== game.computer:
            icon('ninth');
            break;
    }
};

//Mini functions
function lockAll() {
    $('.grid-content').removeAttr('onClick');
}

function setCurrPl(curr) {
    game.currentPlayer = curr;
}

/* GAME OVER */

// Check game status - win/draw or still going?
function gameStatus() {
    var curPlayer;

    if (game.currentPlayer == 'user') {
        curPlayer = game.user;
    } else if (game.currentPlayer == 'computer') {
        curPlayer = game.computer;
    }

    switch (true) {
        case $('#first').attr('value') === curPlayer && $('#second').attr('value') === curPlayer &&
            $('#third').attr('value') === curPlayer:
            game.finished = true;
            show('#first', '#second', '#third');
            break;
        case $('#fourth').attr('value') === curPlayer && $('#fifth').attr('value') === curPlayer &&
            $('#sixth').attr('value') === curPlayer:
            game.finished = true;
            show('#fourth', '#fifth', '#sixth');
            break;
        case $('#seventh').attr('value') === curPlayer && $('#eighth').attr('value') === curPlayer &&
            $('#ninth').attr('value') === curPlayer:
            game.finished = true;
            show('#seventh', '#eighth', '#ninth');
            break;
        case $('#first').attr('value') === curPlayer && $('#fourth').attr('value') === curPlayer &&
            $('#seventh').attr('value') === curPlayer:
            game.finished = true;
            show('#first', '#fourth', '#seventh');
            break;
        case $('#second').attr('value') === curPlayer && $('#fifth').attr('value') === curPlayer &&
            $('#eighth').attr('value') === curPlayer:
            game.finished = true;
            show('#second', '#fifth', '#eighth');
            break;
        case $('#third').attr('value') === curPlayer && $('#sixth').attr('value') === curPlayer &&
            $('#ninth').attr('value') === curPlayer:
            show('#third', '#sixth', '#ninth');
            game.finished = true;
            break;
        case $('#first').attr('value') === curPlayer && $('#fifth').attr('value') === curPlayer &&
            $('#ninth').attr('value') === curPlayer:
            game.finished = true;
            show('#first', '#fifth', '#ninth');
            break;
        case $('#third').attr('value') === curPlayer && $('#fifth').attr('value') === curPlayer &&
            $('#seventh').attr('value') === curPlayer:
            game.finished = true;
            show('#third', '#fifth', '#seventh');
            break;
        default:
            draw();
    }
};

// Is it a draw??
function draw() {
    if (game.moves === 9) {
        setTimeout(reset, 1000);
    }
}

// Show which row wins!
function show(x, y, z) {
    var x = $(x),
        y = $(y),
        z = $(z);
    x.addClass('win');
    y.addClass('win');
    z.addClass('win');
    lockAll();
    setTimeout(reset, 1500);
}

/* RESET THE GAME */
function reset() {
    $('.grid-content').removeClass('o x square human computer');
    //$('.grid-content').removeClass('x square computer');
    game.moves = 1;
    $('.grid-content').removeAttr('value');
    $('.grid-content').attr('onClick', 'icon(this.id)');
    $('.win').removeClass('win');
    setCurrPl('user');
    if (game.computer == 'o') {
        firstMove()
    }
}