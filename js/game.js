class Game {
    constructor() {
        this.waterArr = [];
        this.maltArr = [];
        this.hopsArr = [];
        this.waterCount = 0;
        this.maltCount = 0;
        this.hopsCount = 0;
        this.timer = 0;
        this.seconds = 60;
        this.level = 1;
        this.refreshRate = 1500 / 60; // 60 frames per second
        this.resultObj = { water: 0, malt: 0, hops: 0 };
        this.givenObj = { water: 3, malt: 2, hops: 1 };
    }

    start() {

        let waterNeeded = document.getElementById('water-needed');
        waterNeeded.innerHTML = this.givenObj.water;
        let maltNeeded = document.getElementById('malt-needed');
        maltNeeded.innerHTML = this.givenObj.malt;
        let hopsNeeded = document.getElementById('hops-needed');
        hopsNeeded.innerHTML = this.givenObj.hops;
        this.player = new Player();
        this.player.domElement = this.createDomElm(this.player);
        this.drawDomElm(this.player);

        this.addEventListeners();

        // this.countdown(this.seconds);


        // General Function

        // generateItems(itemReplier, obstacleTitle, obstacleArr) {
        //     if (this.timer % Math.floor(Math.random() * itemReplier) === 0) {
        //         const obstacleTitle = new Water();
        //         this.obstacleArr.push(obstacleTitle);
        //         obstacleTitle.domElement = this.createDomElm(obstacleTitle);
        //         this.drawDomElm(obstacleTitle);
        //     }

        //     this.obstacleArr.forEach((elm) => {
        //         elm.moveDown();
        //         this.drawDomElm(elm);
        //         if (this.collision(elm)) {
        //             this.countWater();
        //             this.removeWaterFromArr(this.obstacleArr, elm);
        //             elm.domElement.remove();
        //         }
        //         elm.removeObstacle(elm);
        //     });
        
        // }


        // // General Interval
        // setInterval(() => {
        //     this.timer++;
        //     this.generateItems(250,);

        // }, this.refreshRate);



        // Water
        setInterval(() => {
            this.timer++;

            if (this.timer % Math.floor(Math.random() * 250) === 0) {
                const newWater = new ParentObstacle("water", 3, 8);
                this.waterArr.push(newWater);
                newWater.domElement = this.createDomElm(newWater);
                this.drawDomElm(newWater);
            }

            this.waterArr.forEach((elm) => {
                elm.moveDown();
                this.drawDomElm(elm);
                if (this.collision(elm)) {
                    // this.countWater();
                    this.count(this.resultObj.water, 'water-coll');
                    // this.removeWaterFromArr(this.waterArr, elm);
                    this.removeObstacleFromArr(this.waterArr, elm)
                    elm.domElement.remove();
                }
                elm.removeObstacle(elm);
            });
        }, this.refreshRate);

        // Malt
        setInterval(() => {
            this.timer++;

            if (this.timer % Math.floor(Math.random() * 500) === 0) {
                const newMalt = new ParentObstacle("malt", 3, 5);
                this.maltArr.push(newMalt);
                newMalt.domElement = this.createDomElm(newMalt);
                this.drawDomElm(newMalt);
            }

            this.maltArr.forEach((elm) => {
                elm.moveDown();
                this.drawDomElm(elm);
                if (this.collision(elm)) {
                    // this.countMalt();
                    this.count(this.resultObj.malt, 'malt-coll');
                    // this.removeMaltFromArr(this.maltArr, elm);
                    this.removeObstacleFromArr(this.maltArr, elm)
                    elm.domElement.remove();
                }
                elm.removeObstacle(elm);
            });
        }, this.refreshRate);

        // Hops
        setInterval(() => {
            this.timer++;

            if (this.timer % Math.floor(Math.random() * 1000) === 0) {
                const newHops = new ParentObstacle("hops", 2, 5);
                this.hopsArr.push(newHops);
                newHops.domElement = this.createDomElm(newHops);
                this.drawDomElm(newHops);
            }

            this.hopsArr.forEach((elm) => {
                elm.moveDown();
                this.drawDomElm(elm);
                if (this.collision(elm)) {
                    // this.countHops();
                    this.count(this.resultObj.hops, 'hops-coll');
                    // this.removeHopsFromArr(this.hopsArr, elm);
                    this.removeObstacleFromArr(this.hopsArr, elm)
                    elm.domElement.remove();
                }
                elm.removeObstacle(elm);

            });
        }, this.refreshRate);

        setInterval(() => {
            this.compareObj();
        }, this.refreshRate);

    }

    addEventListeners() {
        document.addEventListener("keydown", (event) => {
            if (event.key === "ArrowLeft") {
                this.player.moveLeft();
            } else if (event.key === "ArrowRight") {
                this.player.moveRight();
            }
            this.drawDomElm(this.player);
        });
        // document.addEventListener("click", myScript);
    }

    createDomElm(instance) {
        const htmlTag = document.createElement("div");
        htmlTag.className = instance.className;
        htmlTag.style.width = instance.width + "vw";
        htmlTag.style.height = instance.height + "vh";
        const board = document.getElementById("board");
        board.appendChild(htmlTag);
        return htmlTag;
    }

    drawDomElm(instance) {
        instance.domElement.style.left = instance.positionX + "vw";
        instance.domElement.style.bottom = instance.positionY + "vh";
    }

    collision(elm) {
        if (
            this.player.positionX < elm.positionX + elm.width &&
            this.player.positionY < elm.positionY + elm.height &&
            elm.positionX < this.player.positionX + this.player.width &&
            elm.positionY < this.player.positionY + this.player.height
        ) {
            return true;
        }
    }

    // General removeObstacle Method
    removeObstacleFromArr(obstacleArr, elm) {
        let index = obstacleArr.indexOf(elm);
        if (index > -1) {
            obstacleArr.splice(index, 1);
        }
    }

    // General Counting Method
    count(elm, elmID) {
        elm += 1;
        let count = document.getElementById(elmID);
        count.innerHTML = elm;
    }


    compareObj() {
        // if (JSON.stringify(this.resultObj) === JSON.stringify(this.givenObj))
        if (this.resultObj.water === this.givenObj.water && this.resultObj.malt === this.givenObj.malt && this.resultObj.hops === this.givenObj.hops) {
            for (let key in this.resultObj) {
                this.resultObj[key] = 0;
            }
            this.level++;
            if (this.level++) {
                let img = document.createElement('img');
                img.src = 'img/beer_bottle.png';
                document.getElementById('level').appendChild(img);
            }
            count.innerHTML = this.resultObj.water;
            count.innerHTML = this.resultObj.malt;
            count.innerHTML = this.resultObj.hops;
        }
    }

    /*
    countdown() {
        function tick(seconds) {
            let timer = document.getElementById("timer");
            seconds--;
            timer.innerHTML = "0:" + (seconds < 10 ? "0" : "") + String(seconds);
            if (seconds > 0) {
                setTimeout(tick, 1000);
            }
        }
        tick();
    }
    */

}

class Player {
    constructor() {
        this.className = "player";
        this.positionX = 50;
        this.positionY = 7;
        this.width = 5;
        this.height = 12;
        this.domElement = null;
    }

    moveLeft() {
        if (this.positionX >= 20) {
            this.positionX -= 3;
        }
    }

    moveRight() {
        if (this.positionX <= 90) {
            this.positionX += 3;
        }
    }
}

class ParentObstacle {
    constructor(className, width, height) {
        this.positionX = (Math.floor(Math.random() * 85) + 15);
        this.positionY = 70;
        this.domElement = null;
        this.className = className;
        this.width = width;
        this.height = height;
    }

    moveDown() {
        this.positionY -= 1;
    }

    removeObstacle(elm) {
        if (elm.positionY < 7) {
            elm.domElement.remove();
        }
    }
}

const game = new Game();
game.start();