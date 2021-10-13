const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(field = [[]]){
      this.field = field;
      this.width = 0;
      this.height = 0;
      this.field[0][0] = pathCharacter;
    }

    runGame() {
      let playing = true;
      while(playing) {
        this.print();
        this.askQuestion();
        if(!this.inBounds()) {
          console.log("You are out of bounds!");
          playing = false;
          break;
        } else if(this.isOnHole()) {
          console.log("You are on a hole!");
          playing = false;
          break;
        } else if(this.isOnHat()) {
          console.log("Congratulations! You have won.");
          playing = false;
          break;
        }
        this.field[this.height][this.width] = pathCharacter;
      }
    }

    print() {
      const displayField = this.field.map(row => {
        return row.join("")
      }).join("\n");
      console.log(displayField);
    }

    askQuestion() {
      let direction = prompt("Which way? ").toLowerCase();
      switch(direction) {
        case 'r':
          this.width += 1;
          break;
        case 'l' :
          this.width -= 1;
          break;
        case 'u' :
          this.height -= 1;
          break;
        case 'd' :
          this.height += 1;
          break;
        default:
          console.log("Enter u, d, r, or l");
          this.askQuestion();
          break;
      }
    }

    inBounds() {
      return (
        this.width >= 0 && this.height >= 0 &&
        this.height < this.field.length &&
        this.width < this.field[0].length
      );
    }

    isOnHole() {
      return this.field[this.height][this.width] === hole;
    }

    isOnHat() {
      return this.field[this.height][this.width] === hat;
    }

    static generateField(height, width, probability = 0.1) {
      const field = new Array(height).fill(0).map(e => new Array(width));
      for(let y = 0; y < height; y++) {
        for(let x = 0; x < width; x++) {
          const prob = Math.random();
          field[y][x] = prob > probability ? fieldCharacter : hole;
        }
      }

      const hatLocation = {
        x: Math.floor(Math.random() * width),
        y: Math.floor(Math.random() * height)
      }

      while(hatLocation.x === 0 && hatLocation.y === 0) {
        hatLocation.x = Math.floor(Math.random() * width);
        hatLocation.y = Math.floor(Math.random() * height);
      }
      field[hatLocation.y][hatLocation.x] = hat;
      return field;
    }
}

const myField = new Field(Field.generateField(10, 10));
myField.runGame();