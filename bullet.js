class Bullet{
    constructor(args){  //預設值，基本資料(包含有物件的顏色，位置，速度，大小...)
      this.r = this.r || 10
      this.p = args.p || createVector(width/2,height/2)  //一個物件開始的位置
      this.v = args.v || createVector(mouseX-width/2,mouseY-height/2).limit(5)  //速度，x，y移動的速度為亂數產生-1,1之間的數字
    //   this.size = random(10,20)  
      this.color = "red"  
    //   this.stroke = random(stroke_colors)  
    }
    draw()  //把物件畫出來的函數
    {
      push()
        translate(this.p.x,this.p.y)
        // scale((this.v.x<0?1:-1),-1)  //放大縮小的指令，this.v.x<0?1:-1 ==>this.v.x<0條件成立的話，則值為1，否則為-1
        fill(this.color)
        noStroke()
        ellipse(0,0,this.r)
      pop()
  
    }
    update(){  
      this.p.add(this.v)
    }
  
  }