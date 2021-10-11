const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(arr, height, width){
      this.field = arr;
      this.gameWon = false;
      this.height = height;
      this.width = width;
    }

    getInput() {
      while(!this.gameWon){
        let moveDir = prompt("Which way? ");
        moveDir.toLowerCase;
        for(let i = 0; i < this.height; i++){
          for(let x = 0; x < this.width; x++){
            if(moveDir === "r"){
              //move to the right (increase width) (if cant move to the right, output error)
            } else if(moveDir === "l"){
              //move to the left (decrease width) (if cant move to the left, output error)
            } else if(moveDir === "d"){
              //move down (increase height) (if cant move down, output error)
            } else if(moveDir === "u"){
              //move up (decrease height) (if cant move up, output error)
            }
          }
        }
      }
    }

    getLocation() {
      console.log(this.field.length)
      for(let i = 0; i < this.field.length; i++){
        for(let k = 0; k <= 5; k++){
          console.log(this.field[i][k]);
        }
      }
    }

    print() {
      this.field = this.field.map(e => e.join("")).join("");
      console.log(this.field);
      for(let i = 0; i < this.field.length; i++){
        if(i % 5 === 0) {
          //add a \n in every 5 i's
        }
      }
    }

    static generateField(height, width) { //generates a random field for user to play on
      //generates a blank 2d Array
      this.height = height;
      this.width = width;
      let array = new Array(height); 
      for(let m = 0; m < height; m++) {
        array[m] = new Array(width);
      }
      array[0][0] = pathCharacter; //sets the player at topleft position
      //iterates through 2d array to randomly place field and holes
      for(let i = 0; i < height; i++) {
        for(let j = 0; j < width; j++) {
          if(i === 0 && j === 0) { //dont place field or hole in leftmost position
            continue;
          }
          let randomNum = Math.floor(Math.random() * 3)
          if(randomNum === 2) {
            array[i][j] = hole;
          } else {
            array[i][j] = fieldCharacter;
          }
        }
      }
      this.field = array;
    }
  }

const myField = new Field([
    [pathCharacter, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter],
    [fieldCharacter, fieldCharacter, fieldCharacter, hole, fieldCharacter],
    [fieldCharacter, hole, fieldCharacter, fieldCharacter, fieldCharacter],
    [hole, fieldCharacter, hole, fieldCharacter, fieldCharacter],
    [fieldCharacter, hole, hole, fieldCharacter, hole],
    [hole, fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter],
    [hole, hole, fieldCharacter, fieldCharacter, hole],
    [fieldCharacter, fieldCharacter, fieldCharacter, fieldCharacter, hole],
    [fieldCharacter, fieldCharacter, fieldCharacter, hole, hole],
    [hat, hole, hole, fieldCharacter, hole],
], 10, 5)

myField.print();
