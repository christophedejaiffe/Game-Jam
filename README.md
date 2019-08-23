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
```
</details>


<details>
<summary>Fichier client.js</summary>

```markdown

</details>
