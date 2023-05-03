// let points = [
// [7,10],[12,6],[12,4],[9,1],[10,-2],[10,-7],[5,-10],[1,-11],[1,-13],[-3,-13],[-14,-4],[-13,4],
// [-11,9],[-12,13],[-10,16],[-8,17],[-5,13],[3,13],[7,16],[10,15],[10,13],[7,10],[7,10]
// ]


// let points =[[6, -3], [5, 0], [7, 2],[7,4],[6,5],[9,5],[9,6],[8,7],[7,8],[6,8],[5,10],[4,10],[4,9],[5,8],[4,5],[0,5],[-2,4],[-4,1],[-4,-6],[-5,-7],[-10,-6],[-9,-7],[-4,-8],[-3,-7],[-1,-5],[4,4],[3,2],[3,1],[5,-3],[4,-4],[5,-4],[6,-3],[4,1],[5,2],[1,-4],[2,-5],[2,-8],[8,-8],[7,-7],[3,-7],[3,-1],[4,-1],[3,-1],[2,-3],[0,-5],[-4,-2],[-3,-4],[-1,-5],[-1,-9],[5,-10],[6,-9],[0,-8],[0,-5],[1,0],[-1,3],[5,-4],[6,-4],[7,-3],[6,1]];

let points = [[-2, 0], [-1,-1], [0, -1],[1,0],[1,2],[0,3],[-1,3],[-2,2],[-3,2],[-4,1],[-4,-2],[-5,-4],[-4,-4],[-3,-2],[-2,-1],[-2,-3], [-2,-4], [-1, -4],[0,-4],[0,-2],[2,-2],[2,-4], [4, -4],[4,1],[3,2],[1,2],[1,2]]; //list資料，
var stroke_colors = "2d00f7-6a00f4-8900f2-a100f2-b100e8-bc00dd-d100d1-db00b6-e500a4-f20089".split("-").map(a=>"#"+a)
var fill_colors = "ffd6ff-e7c6ff-c8b6ff-b8c0ff-bbd0ff".split("-").map(a=>"#"+a)

//粒子，類別
class Obj{
  constructor(args){  //預設值，基本資料(包含有物件的顏色，位置，速度，大小...)
    // this.p = {x: random(width), y:random(height) }  //一個物件開始的位置
    this.p = args.p || createVector(random(width),random(height))
    this.v = createVector(random(-1,1), random(-1,1))   //速度，x，y移動的速度為亂數產生-1,1之間的數字
    // this.v = p5.Vector.random2D()
    this.size = random(3,8)  
    this.color = random(fill_colors)  
    this.stroke = random(stroke_colors)  
  }
  draw()  //把物件畫出來的函數
  {
    push()
      translate(this.p.x,this.p.y)
      scale((this.v.x<0?1:-1),-1)  //放大縮小的指令，this.v.x<0?1:-1 ==>this.v.x<0條件成立的話，則值為1，否則為-1
      fill(this.color)
      stroke(this.stroke)
      strokeWeight(3)
      beginShape()
        for(var i =0;i<points.length;i=i+1){
          // line(points[i][0]*this.size,points[i][1]*this.size,points[i+1][0]*this.size,points[i+1][1]*this.size)
          // vertex(points[i][0]*this.size,points[i][1]*this.size)
          curveVertex(points[i][0]*this.size,points[i][1]*this.size)
        }
      endShape()
    pop()

  }
  update(){  
    // this.p.x = this.p.x + this.v.x
    // this.p.y = this.p.y + this.v.y
    
    this.p.add(this.v)
    if(this.p.x<=0 || this.p.x>=width)
      {
        this.v.x = -this.v.x
      }
    if(this.p.y<=0 || this.p.y>=height)
      {
        this.v.y = -this.v.y
      }
    let mouseV = createVector(mouseX,mouseY)
    let delta = mouseV.sub(this.p).limit(this.v.mag()*1.5)
    this.p.add(delta)
    
  }

  isBallInRange(x,y){
		let d=dist(x,y,this.p.x,this.p.y) 
    // print(d )   
		if(d/this.size<4){
			return true
		}else{
			return false
		}
	}

}

var ball  //代表單一個物件，利用這個變數來做正在處理的物件
var balls =[]  //陣列，放所有的物件資料
var bullet
var bullets=[]
function setup() {
  createCanvas(windowWidth, windowHeight);
  //產生幾個物件
  for(var j=0;j<20;j=j+1)
  {
    ball = new Obj({})  //產生一個新的物件，暫時放入到ball變數中
    balls.push(ball)  //把ball物件放入到balls物件群(陣列)中
  }


}

function draw() {
  background(220);
  for(var k=0;k<balls.length;k=k+1){
    ball = balls[k]
    ball.draw()
    ball.update()
    for(let bullet of bullets){
      if(ball.isBallInRange(bullet.p.x,bullet.p.y)){
        balls.splice(balls.indexOf(ball),1);
        bullets.splice(bullets.indexOf(bullet),1);
      }
    }
  }
  
  for(let bullet of bullets){
    
    bullet.draw()  
    bullet.update()
      
  }
  rectMode(CENTER)
  fill("#ffc03a")
  // rect(width/2,height/2,50)


  // 繪製三角形
  push()
    let dx = mouseX - width/2;
    let dy = mouseY - height/2;
    let angle = atan2(dy, dx);
    // let defaultAngle = radians(0);
    // let rotationAngle = angle - defaultAngle;
    translate(width/2, height/2);
    rotate(angle);
    triangle(50, 0, -25, -25, -25, 25);
  pop()

  
}
function mousePressed(){

  // push()
  // ball = new Obj({
  //   p:createVector(mouseX,mouseY)
  // })  //產生一個新的物件，暫時放入到ball變數中
  // balls.push(ball)
  // pop()
  //---------------------------------------------


  
    bullet = new Bullet({})  //產生一個新的物件，暫時放入到ball變數中
    bullets.push(bullet)
  
  //---------------------------------------------
  // for(let ball of balls){
    
  //   if(ball.isBallInRange(mouseX,mouseY))
  //   {			
  //     balls.splice(balls.indexOf(ball),1); //第一个参数定义该修改的数组，而第二个参数定义该添加的资料。
  //     //https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
      
  //   }
  // }
}