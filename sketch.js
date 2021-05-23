const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;


var engine,world;

var particle;
var divisions=[];
var particles=[particle];
var plinkos=[];
var line;

var divisionsHeight=300;


var gameState= "PLAY";

var count =0;
var score =0;




function setup() {
  createCanvas(800,800);
  engine = Engine.create();
  world = engine.world;
  ground= new Ground(400,690,800,20);


  for (var i=0; i<=width; i= i+80) {
    divisions.push(new Divisions(i,height- divisionsHeight/2,10,divisionsHeight))
  }

  for (var j=75 ;j<=width; j=j+50)
  {
    plinkos.push(new Plinko(j,75));
  }

  for (var j=50 ;j<=width-10; j=j+50)
  {
    plinkos.push(new Plinko(j,175));
  }

  for (var j=75 ;j<=width; j=j+50)
  {
    plinkos.push(new Plinko(j,275));
  }

  for (var j=50 ;j<=width-10; j=j+50)
  {
    plinkos.push(new Plinko(j,375));
  }
   Engine.run(engine);
}

function draw() {
  rectMode(CENTER)
  background(0); 
 textSize(35)
 text("Score:"+ score,20,40)
 fill(255)
 
 textSize(35)
 text("500",5,550);
 text("500",80,550);
 text("500",160,550);
 text("500",240,550);
 text("500",320,550);
 text("500",400,550);
 text("500",480,550);
 text("500",560,550);
 text("500",640,550);
 text("500",720,550);

  Engine.update(engine);
  ground.display() ;
  if(gameState==="END"){
    background("black")
    fill("red");
    textSize(100);
    text("Game Over",200,400);

  }

  if(particle!=null)
  {
    particle.display();
    if(particle.body.position.y>700)
    {
      if(particle.body.position.x<300)
      {
        score=score+500;
        particle=null;
        if( count >=5) gameSate="END";
      }
      else if(particle.body.position.x<600 && particle.body.position.x>301 )
      {
        score=score+100;
        particle=null;
        if( count >=5) gameSate="END";
      }
      else if(particle.body.position.x<900 && particle.body.position.x>601 )
      {
        score=score+200;
        particle=null;
        if( count >=5) gameSate="END";
      }

    }
  }
  for (var n= 0; n< plinkos.length;n++){
    plinkos[n].display();

  }
  if(frameCount%60===0){
    particles.push(new Particle(random(width/2-10,width/2+10),10,10));

  }
  for (var j=0; j<particles.length; j++){
    particles[j].display();
  }

  for (var k=0; k < divisions.length; k++){
    divisions[k].display();
  }
  
  drawSprites();
}
 
function mousePressed() {
  if(gameState !=="END"){
    count++;
    particle=new Particle(mouseX, 50, 10, 10)
  }
}