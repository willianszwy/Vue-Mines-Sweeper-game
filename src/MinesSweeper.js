export default class MinesSweeper {
	// B,F,0,1,2,3,4,5,6,7,8
	constructor(bomb = 0.25){	
	   this._width = 15;
	   this._height = 10;

	   this._grid = new Array(this._height); 

	   for(let i = 0; i < this._height; i++){
	   	    this._grid[i] = new Array(this._width);
	   		for(let j = 0; j < this._width; j++){
	   			 this._grid[i][j] = new GridElement(Math.random() < bomb ? true : false);
	   		}
	   }
	   
	}

	setElement( x, y, element) {
        this._grid[x][y] = element;
	}

	getElement( x, y) {
		if( x >= 0 && y >= 0 && x < this._width && y < this._height)
             return this._grid[x][y];
         return false;
	}

	hasMine( x, y) {
		 if ((x >= 0 && y >= 0) && (x < this._width && y < this._height)){
            return this._grid[y][x]._mine ;
		 }
		 return false;
		
	}

	showMines() {
		this._grid.forEach( row => {
			row.forEach( col => { if(col._mine) col._visible = true } );
		});
	}

	checkWin() {

		for(let i = 0; i < this._height; i++){
			for(let j = 0; j < this._width; j++){
				if( !this._grid[i][j]._visible && !this._grid[i][j]._mine){
					return false;
				} 
			}
		}

		return true;
	}

    adjacentMines( x, y) {
    	let count = 0;
 
    	if (this.hasMine(x,   y+1)) ++count;
    	if (this.hasMine(x+1, y+1)) ++count;
    	if (this.hasMine(x+1, y  )) ++count;
    	if (this.hasMine(x+1, y-1)) ++count;
    	if (this.hasMine(x,   y-1)) ++count;
    	if (this.hasMine(x-1, y-1)) ++count;
    	if (this.hasMine(x-1, y  )) ++count;
    	if (this.hasMine(x-1, y+1)) ++count;
 
    	return count;
    }

    uncover( x, y, visited) {
    
        if (x >= 0 && y >= 0 && x < this._width && y < this._height) {
          
            if (visited[y][x])
              return;
 
            this._grid[y][x]._visible = true;
            this._grid[y][x]._count = this.adjacentMines(x, y);
              
 
        
            if (this.adjacentMines(x, y) > 0)
               return;
 
        
            visited[y][x] = true;
 
        
           this.uncover(x-1, y, visited);
           this.uncover(x+1, y, visited);
           this.uncover(x, y-1, visited);
           this.uncover(x, y+1, visited);
        }
    }


}

export class GridElement {

	constructor(mine = false){
		this._visible = false;
		this._count = 0;
		this._mine = mine;		
	}

}

export function Array2D(x, y)
{
    var array2D = new Array(x);

    for(var i = 0; i < array2D.length; i++)
    {
        array2D[i] = new Array(y);
    }

    return array2D;
}

