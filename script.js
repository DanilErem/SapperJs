import Field from './Field.js';

let canvas = document.getElementById('root');

let field = new Field(25, 25, 100, canvas, 700, 700, 20, 1);

let bombs = field.bombsCoordinates();

let end = false;

let interval = setInterval(Run, 200);

canvas.addEventListener('click', e => {
    if (!end) {
        let x = Math.floor(e.offsetX/field.blockWidth);
        let y = Math.floor(e.offsetY/field.blockHeight)
        let flag = true;
        field.relived.forEach(e => {
            if (e.x == x && e.y == y) {
                flag = false
            }
        });
        if (x < field.Width && y < field.Height && flag) {
            if (e.shiftKey) {
                field.Warn({x: x, y: y})
            }
            else {
                field.Relive({x: x, y: y});
            }
        }

        field.relived.forEach(r => {
            bombs.forEach(b => {
                if (b.x == r.x && b.y == r.y) {
                    clearInterval(interval);
                    console.log('End');
                    end = true;
                    field.clearField()
                    field.showArray('red');
                }
            });
        });
        if (field.relived.length == field.notBombsCoordinates().length) {
            field.clearField()
            field.showArray('green');
            clearInterval(interval);
            end = true;
        }
    }
    else {
        field.reset()
        bombs = field.bombsCoordinates();
        end = false;
        interval = setInterval(Run, 200);
    }
})

function Run() {
    field.clearField();
    field.showField();
    if (end) {

    }
}
