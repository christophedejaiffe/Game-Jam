# Game-Jam

## Création d'un jeux en Javascript

<p>Réalisation d'un jeux en JavaScript, partant du célébre tir au canard " Duck Hunt "</p>

--- 

## Les langages et outils utilisés 

* HTML5
* CSS3
* JavaScript
* Phaser
* Socket IO
---

## Personnes ayant travaillé sur le projet

* Cléo Buck
* Arianne Flamme
* Antoine Notte
* Jean David Wuilquot
* Christophe Dejaiffe


## Quand a t-il été réalisé ? 

Ce projet a été réalisé le 16 Aout 2019.

## Dans quel cadre ce projet a vu le jour ?

Il s'agit d'un travail de groupe réalisé dans le cadre de la formation BeCode.

--- 

## Présentation du code

<p>Dans cette partie, nous allons vous présenter le code qui a été réalisé pour le projet. </p>

### Partie HTML
<details>
<summary>Fichier HTML</summary>

```markdown

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" type="text/css" href="./src/assets/css/style.css">
    
    <title>Document</title>
</head>
<body id="body">
    <div id="popup" class="unvisible">
       
    </div>
    <script src="src/index.js"></script>
</body>
</html>
```
</details>


### Partie CSS
<details>
<summary>Fichier CSS</summary>

```markdown
body {
    background-color: black;
    display: flex;
    justify-content: center;
    }
    
 .popup {
      display:block !important;
    position:absolute;
    transform: translateX(-50%);
    background-color:#384c4b ;
    color:white;  
    animation: in 0.5s linear, out 0.5s linear 1.0s;
    z-index: 2;
    margin-left:-500px;
    margin-top:480px;
    font-size:22px;
    border-radius: .4em;
    width:180px;
    height: 70px;
}


.popup:after{
	content: '';
	position: absolute;
	bottom: 0;
	left: 50%;
	width: 0;
	height: 0;
	border: 20px solid transparent;
	border-top-color: #00aabb;
	border-bottom: 0;
	border-left: 0;
	
	margin-bottom: -20px;
}
Resources
.unvisible {
    display:none;
}
@keyframes in {
    0%{
        opacity: 0;
    }
    100%{
        opacity: 1;
    }
}

@keyframes out {
    0%{
        opacity: 1;
    }
    100%{
        opacity: 0;
    
    }
}
li{
    list-style: none;
    margin-top:15px;
}
.unvisible{
    display:none;
}  
```
</details>

### Partie JS
<details>
<summary>Fichier index.js</summary>

```markdown
import Phaser from 'phaser';
import { Scene } from 'phaser';
import io from 'socket.io-client';



// declaration des variables 
let cow, bombs, cow2, cow3, dog, donkey, sky
let socket, username
let target, scoreLabel
let score = 0
let capture =false
let x, y
let arr


// scene principale du jeu

class GameScene extends Scene {
    constructor() {
      super('game');
    }
    
    create() {

                                                       //SOCKET 
        socket = io(`${location.hostname}:8085`);
        username = prompt('Pseudo');
        
      // emit d'un tableau input avec score et username
        socket.emit("input",{
          username:username,
          score:score,
        })
        
      // pop up de connexion/deconnexion
        let poppers = document.getElementById("popup");
        socket.on("new user",(username)=>{
            poppers.classList.add("popup");
            poppers.innerText = username+ " est"+" connecté";           
        })
        socket.on("user disconnect",(username) => {
            let connect = document.getElementById("popup");
            let child  = connect.children;
            for(let i = 0; i < child.length;i++) {
                if(child[i].innerText == username + " est connecté")
                    connect.removeChild(child[i]);
            }
           poppers.classList.add("popup");
            poppers.innerText = username + " est deconnecté"
        })
        poppers.addEventListener("animationend",(event) => {
         if(event.animationName == "out") {
               poppers.classList.remove("popup");
             }
         })
      
                                                  // JEU 

    //valeurs assignées aux variables 
    x = Phaser.Math.Between(0, 20)
    y = Phaser.Math.Between(0, 20)
 
    this.winText=this.add.text(400,300,null,{ fontSize: '128px', fill: '#600' });
    this.winText.setOrigin(0.3);

     /*création des caractéristiques des cibles*/
       let character=[{
        name:"cow",
        sound:this.sound.add('die',{volume: 0.9}),
        score:5,
      },{
        name:"cow2",
        sound:this.sound.add('cri',{volume: 0.9}),
        score:10,
      },{
        name:"cow3",
        sound:this.sound.add('cri2',{volume: 0.9}),
        score:15,
      },{
        name:"dog",
        sound:this.sound.add('chien',{volume: 0.9}),
        score:20,
      },{
        name:"donkey",
        sound:this.sound.add('special',{volume: 0.9}),
        score:25,
      },{
        name:"bomb",
        sound:this.sound.add('diable',{volume: 0.9}),
        score:-50,

      }]

      // ajout du background
     
      sky = this.add.image(512, 380, 'sky');

      
      /*gestion du son du laser*/
      this.laser=this.sound.add('laser',{volume: 0.7});
      this.input.mouse.capture = true;

 
     
      
                                //Actions 

     // fonction qui crée les groupes d'animaux et les anime pendant le jeu et à leur mort

      let targets = (name,isAnimated = true,repeat = 10) => {

        // on crée le groupe d'objects et l'injecte dans la variable "target"
          target = this.physics.add.group({
            key: name,
            repeat: repeat,
            setXY: { x: 12, y: 0, stepX: x, stepY: y }
          });
       
        //on cree une propriété à chaque objet pour définir les animation 
          target.name = name

        // si il est animé (tout sauf la bombe)
          if(isAnimated){
            
            this.anims.create({
              key: 'die',
              frames: this.anims.generateFrameNumbers("cow", { start: 4, end: 5 }),
              frameRate: 10,
              repeat: -1
            });
        
            this.anims.create({
              key: name,
              frames: this.anims.generateFrameNumbers(name, { start: 0, end: 4 }),
              frameRate: 10,
              repeat: -1
            });

            target.children.iterate(function (child) {
              
              child.on('pointerdown', function (pointer) {
                this.setFrame(5, true);

              })
            })
          } else {
           
            target.children.iterate(function (child) {
             
              child.on('pointerdown', function (pointer) {
                this.setFrame(1, true);
              })
            })
          }

        scoreLabel = this.add.text(680, 710, 'score: 000', { fontSize: '32px', fill: '#000' });
        // création de la physique de chaque membre du groupe + vitesse aléatoire pour chaque
        target.children.iterate(function (child) {
          child.setVelocityX(Phaser.Math.Between(0, 200), 20);
          child.setVelocityY(Phaser.Math.Between(-200, 200), 20);
          child.setBounce(1);
          child.setCollideWorldBounds(true);
          child.setInteractive();
      
        // création d'un évenement quand on clique sur les animaux 
          child.on('pointerdown', function (pointer) {
           
            setTimeout(()=> {
              this.disableBody(true, true)
            }, 100)
            
            /*Recupération son et score dans le tableau*/ 
            let find = character.find((value) => value.name == name)
            find.sound.play();
            score += find.score;
            scoreLabel.setText('Score: ' + score);
            socket.emit("Scored", {
              username,
              score
            })
            console.log(score)
           });
        });
        return target;
      }

      // appel de la fonction targets + on injecte le résultat dans une variable

      cow = targets("cow");
      let timer2 = this.time.delayedCall(5000, () => dog= targets('dog')); 
      let timer3 = this.time.delayedCall(10000, () => cow2= targets('cow2')); 
      let timer4 = this.time.delayedCall(15000, () => donkey = targets('donkey'));
      let timer5 = this.time.delayedCall(20000, () => cow3= targets('cow3'));
      var timerBomb = this.time.addEvent({
        delay: 10000,                // ms
        callback: () => {bombs = targets('bomb', false, 1 )},
        loop: true
    });
  

      /*Remplacement curseur par la mire*/ 
      this.input.setDefaultCursor('url(src/assets/Mire00.cur), pointer');
    }
     // End create

    update() {

    if (score >= 500) {
      this.winText.setText('You Win')
      this.winText.depth = 1000,

        // this.sound.add('win',{volume: 0.9})
        this.physics.shutdown()
      //this.winText.setVisible(true);
      // this.sound.add('win',{volume: 0.9}),
      setTimeout(() => {
        location.reload();
      }, 5000)
    } else if (score < 0) {
      this.winText.setText('You lose')
      this.winText.depth = 1000,
        // this.sound.add('gameover',{volume: 0.9}),
        this.physics.shutdown()
      //this.add.image('gameover','./src/assets/gameover.jpg');
      setTimeout(() => {
        location.reload();
      }, 5000)
    }


 /*Gestion son laser*/
  if(this.input.activePointer.leftButtonDown() && !capture) {
    this.laser.play();
    capture = true;
    
    }
    if(this.input.activePointer.leftButtonReleased()) {
    capture = false;
    }



 // vol des vaches 

  let animalAnim = (target) => {

    target.children.iterate(function (child) {

      child.anims.play(target.name, true);

    });
  }

  animalAnim(cow)
    
  let animTimer1 = this.time.delayedCall(5000, () => animalAnim(dog))
  let animTimer2 = this.time.delayedCall(10000, () => animalAnim(cow2))
  let animTimer3 = this.time.delayedCall(15000, () => animalAnim(donkey))

  let animTimer4 = this.time.delayedCall(20000, () => animalAnim(cow3))
  
   // recupérer le tableau des scores 

    socket.on("ScoretoClient", data => arr = data)
   
  }

 
 

} // END SCENE

export default GameScene
```
</details>

