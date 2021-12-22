class Field {
    constructor(width, height, bombsCount, canvas, canvasHeight = 700, canvasWidth = 700, fontSize = 36, gapsSize = 1) {
        this._array = []
        this._width = width;
        this._height = height;
        this._bombsCount = bombsCount;
        this._canvas = canvas;
        this._fontSize = fontSize;
        this._canvas.width = canvasWidth;
        this._canvas.height = canvasHeight;
        this._gapsSize = gapsSize;
        this._blockHeight = 0;
        this._blockWidth = 0;
        this._relived = [];
        this.setupArray();
        this.setupDrawCanvas();
        this.setupBombs();
        this.setupNumbers();
        this._warning = [];
    }
    reset() {
        this._array = [];
        this._relived = [];
        this._warning = [];
        this.setupArray();
        this.setupDrawCanvas();
        this.setupBombs();
        this.setupNumbers();
    }
    setupDrawCanvas() {
        this._blockHeight = (this._canvas.height-this._gapsSize*this._height-this._gapsSize)/this._height;
        this._blockWidth = (this._canvas.width-this._gapsSize*this._width-this._gapsSize)/this._width;

        //this._blockHeight = Math.floor((this._canvas.height-this._gapsSize*this._height-this._gapsSize)/this._height);
        //this._blockWidth = Math.floor((this._canvas.width-this._gapsSize*this._width-this._gapsSize)/this._width);
        //this._canvas.width = (this._blockWidth+this._gapsSize) * this._width + this._gapsSize;
        //this._canvas.height = (this._blockHeight+this._gapsSize) * this._height + this._gapsSize;
    }
    setupArray() {
        for (let i = 0; i < this._height; i++) {
            this._array.push([]);
            for (let j = 0; j < this._width; j++) {
                this._array[i].push(0);
            }
        }
    }
    setupBombs() {
        let curCount = 0;
        while (curCount < this._bombsCount) {
            let x = Math.floor(Math.random() * this._width);
            let y = Math.floor(Math.random() * this._height);
            if (this._array[y][x] != -1) {
                this._array[y][x] = -1;
                curCount++;
            }
        }
    }
    setupNumbers() {
        for (let y = 0; y < this._array.length; y++) {
            for (let x = 0; x < this._array[0].length; x++) {
                if (this._array[y][x] == -1) {
                    if (x+1 < this._width && y+1 < this._height && this._array[y+1][x+1] != -1)                   
                    {
                        this._array[y+1][x+1] = this._array[y+1][x+1] + 1;
                    }
                    if (y+1 < this._height && this._array[y+1][x] != -1) 
                    {
                        this._array[y+1][x] = this._array[y+1][x] + 1;
                    }
                    if (x-1 >= 0 && y+1 < this._height && this._array[y+1][x-1] != -1) 
                    {
                        this._array[y+1][x-1] = this._array[y+1][x-1] + 1;
                    }
                    if (x-1 >= 0 && this._array[y][x-1] != -1) 
                    {
                        this._array[y][x-1] = this._array[y][x-1] + 1;
                    }
                    if (x-1 >= 0 && y-1 >= 0 && this._array[y-1][x-1] != -1) 
                    {
                        this._array[y-1][x-1] = this._array[y-1][x-1] + 1;
                    }
                    if (y-1 >= 0 && this._array[y-1][x] != -1) 
                    {
                        this._array[y-1][x] = this._array[y-1][x] + 1;
                    }
                    if (x+1 < this._width && y-1 >= 0 && this._array[y-1][x+1] != -1) 
                    {
                        this._array[y-1][x+1] = this._array[y-1][x+1] + 1;
                    }
                    if (x+1 < this._width && this._array[y][x+1] != -1) 
                    {
                        this._array[y][x+1] = this._array[y][x+1] + 1;
                    }
                }       
            }       
        }
    }
    showArray(color) {
        let ctx = this._canvas.getContext('2d');
        let x = 0;
        let y = 0;
        for (let i = 0; i < this._height; i++) {
            ctx.fillStyle = 'black';
            ctx.fillRect(x, y, this._canvas.width, this._gapsSize);
            y += this._gapsSize;
            for (let j = 0; j < this._width; j++) {
                ctx.fillStyle = 'black';
                ctx.fillRect(x, y, this._gapsSize, this._blockHeight);
                x += this._gapsSize;
                if (this._array[i][j] == -1) {
                    ctx.fillStyle = color;
                    ctx.fillRect(x, y, this._blockWidth, this._blockHeight);
                }
                else {
                    ctx.fillStyle = 'black';
                    ctx.font = `${this._fontSize}px monospace`;
                    ctx.fillText(this._array[i][j], x+this._fontSize-12, y+this._fontSize)
                }
                x += this._blockWidth;
                if (this._array[0].length == j + 1) {
                    ctx.fillStyle = 'black';
                    ctx.fillRect(x, y, this._gapsSize, this._blockHeight + this._gapsSize);
                }
            }
            x = 0;
            y += this._blockHeight;
            if (this._array.length == i + 1) {
                ctx.fillStyle = 'black';
                ctx.fillRect(x, y, this._canvas.width, this._gapsSize);
            }
        }
    }
    clearField() {
        let ctx = this._canvas.getContext('2d');
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, this._canvas.width, this._canvas.height);
    }
    showField() {
        let ctx = this._canvas.getContext('2d');
        let x = 0;
        let y = 0;
        for (let i = 0; i < this._height; i++) {
            ctx.fillStyle = 'black';
            ctx.fillRect(x, y, this._canvas.width, this._gapsSize);
            y += this._gapsSize;
            for (let j = 0; j < this._width; j++) {
                ctx.fillStyle = 'black';
                ctx.fillRect(x, y, this._gapsSize, this._blockHeight);
                x += this._gapsSize;
                let relived = false;
                let warn = false; 
                this._relived.forEach(e => {
                    if (e.x == j && e.y == i) {
                        relived = true;
                    }
                });
                this._warning.forEach(e => {
                    if (e.x == j && e.y == i) {
                        warn = true;
                    }
                });
                if (relived) {
                    if (this._array[i][j] != 0) {
                        ctx.fillStyle = 'black';
                        ctx.font = `${this._fontSize}px monospace`;
                        ctx.fillText(this._array[i][j], x+this._fontSize-12, y+this._fontSize)
                    }
                    else {
                        let obj;
                        obj = {x: j-1,y: i-1};
                        if (!(this.includes(this._relived, obj)) && j-1 >= 0 && i-1 >= 0) {
                            this._relived.push(obj)
                        }
                        obj = {x: j,y: i-1};
                        if (!(this.includes(this._relived, obj)) && i-1 >= 0) {
                            this._relived.push(obj)
                        }
                        obj = {x: j+1,y: i-1};
                        if (!(this.includes(this._relived, obj)) && j+1 < this._width && i-1 >= 0) {
                            this._relived.push(obj)
                        }
                        obj = {x: j+1,y: i};
                        if (!(this.includes(this._relived, obj)) && j+1 < this._width) {
                            this._relived.push(obj)
                        }
                        obj = {x: j+1,y: i+1};
                        if (!(this.includes(this._relived, obj)) && j+1 < this._width && i+1 < this._height) {
                            this._relived.push(obj)
                        }
                        obj = {x: j,y: i+1};
                        if (!(this.includes(this._relived, obj)) && i+1 < this._height) {
                            this._relived.push(obj)
                        }
                        obj = {x: j-1,y: i+1};
                        if (!(this.includes(this._relived, obj)) && j-1 >= 0 && i+1 < this._height) {
                            this._relived.push(obj)
                        }
                        obj = {x: j-1,y: i};
                        if (!(this.includes(this._relived, obj))  && j-1 >= 0) {
                            this._relived.push(obj)
                        }
                    }
                }
                else if (warn) {
                    ctx.fillStyle = 'orange';
                    ctx.fillRect(x, y, this._blockWidth, this._blockHeight);
                }
                else {
                    ctx.fillStyle = 'blue';
                    ctx.fillRect(x, y, this._blockWidth, this._blockHeight);
                }
                x += this._blockWidth;
                if (this._array[0].length == j + 1) {
                    ctx.fillStyle = 'black';
                    ctx.fillRect(x, y, this._gapsSize, this._blockHeight + this._gapsSize);
                }
            }
            x = 0;
            y += this._blockHeight;
            if (this._array.length == i + 1) {
                ctx.fillStyle = 'black';
                ctx.fillRect(x, y, this._canvas.width, this._gapsSize);
            }
        }
    }

    bombsCoordinates() {
        let coordinates = [];
        for (let y = 0; y < this._height; y++) {
            for (let x = 0; x < this._width; x++) {
                if (this._array[y][x] == -1) {
                    coordinates.push({x: x, y: y});
                }
            }
        }
        return coordinates;
    }
    notBombsCoordinates() {
        let coordinates = [];
        for (let y = 0; y < this._height; y++) {
            for (let x = 0; x < this._width; x++) {
                if (this._array[y][x] != -1) {
                    coordinates.push({x: x, y: y});
                }
            }
        }
        return coordinates;
    }
    Relive(value) {
        if (this._warning.includes(value)) {
            this._warning.splice(this._warning.indexOf(value), 1);
        }
        this._relived.push(value);
    }
    Warn(value) {
        let flag = false
        for (let i = 0; i < this._warning.length; i++) {
            if (this._warning[i].x == value.x && this._warning[i].y == value.y) {
                this._warning.splice(i);
                flag = true;
            }
        }
        if (!flag) {
            this._warning.push(value);
        }
    }

    includes(arr, obj) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].x == obj.x && arr[i].y == obj.y) {
                return true;
            }
        }
        return false;
    }

    
    get blockHeight() {
        return this._blockHeight;
    }
    get blockWidth() {
        return this._blockWidth;
    }
    get Width() {
        return this._width;
    }
    get Height() {
        return this._height;
    }
    get relived() {
        return this._relived;
    }
}
export default Field;