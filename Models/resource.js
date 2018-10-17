
class Resource{
    constructor(x, y, type){
        let options = { angle : Math.PI / 2, friction: 100, restitution: 0, isStatic: true};
        let resourceType = new ResourceType(type);

        this.x = x;
        this.y = y;
        this.properties = resourceType.properties;
        this.body = Bodies.polygon(this.x, this.y, 3, 10, options);
        World.add(world, this.body);
        this.id = this.body.id;
        this.objectType = this.constructor.name;
    }

    show(){
        let v1 = this.body.vertices[0];
        let v2 = this.body.vertices[1];
        let v3 = this.body.vertices[2];

        triangle(v1.x, v1.y, v2.x, v2.y, v3.x, v3.y);
        fill(this.properties.color);
    }

    extract(){
        
    }

}