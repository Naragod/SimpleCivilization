

class Boundary{
    constructor(x, y, width, height){
        var options = {
            restitution: 0,
            isStatic: true
        };
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.body = Bodies.rectangle(this.x, this.y, this.width, this.height, options);
        World.add(world, this.body);
    }

    show(){
        fill(23);
        rect(this.x, this.y, this.width, this.height);
    }
}