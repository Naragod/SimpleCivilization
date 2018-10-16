

class Lek{
    constructor(x , y, ...args){
        this.setProperties(args);
        this.x = x || random(100, 900);
        this.y = y || random(100, 900);
        this.options = {
            friction: 4,
            restitution: Math.floor(8 / this.properties.strength) / 10                        
        };
        this.sizeGrowthRate = 1.005 + this.properties.growthFactor;
        this.body = addRectangularBody(this.x , this.y, this.size, this.options);
        this.id = this.body.id;
        this.objectType = this.constructor.name;
    }

    setProperties(args){
        this.properties = {
            strength : 0,
            speed : 0,
            health : 0,
            sight : 120,
            charm: 0,
            fertility : 0,
            altruism : 0,
            death : 0,
            growthFactor : 0
        };
        this.mother = args[0] || null;
        this.father = args[1] || null;
        // biology
        this.age = 0;  
        this.isAlive = amIAlive.bind(this);      
        this.initialSize = Math.floor(random(10, 20));
        this.size = this.initialSize;
        this.finalSize = 20;
        this.speedFactor = 0.0001;
        this.mutationRate = random(); 
        this.searchArea = addCircularBody(this.x, this.y, this.properties.sight);
        
        if(this.mother !== null && this.father !== null){
            Object.keys(this.properties).forEach(prop => {
                if(prop == 'speed'){
                    this.properties[prop] = ((this.mother.properties[prop] + this.father.properties[prop]) + this.mutationRate) * this.speedFactor / 2;
                    return;
                }
                this.properties[prop] = Math.floor(((this.mother.properties[prop] + this.father.properties[prop]) + this.mutationRate)/ 2);
            });
            this.color = this.mother.color.map((c, i) => {
                return Math.ceil(((c + this.father.color[i]) + this.mutationRate) / 2);
            });
            return;
        }
        // properties
        Object.keys(this.properties).forEach(prop => {
            this.properties[prop] = Math.floor(random(1, 9));
        });
        // Custom set
        this.color = [random(255), random(255), random(255)].map(c => Math.floor(c));
        this.properties.death *= 5;
        this.properties.speed *= this.speedFactor;
        this.properties.growthFactor /= 20;
    }

    show(){
        fill(150);
        ellipse(this.x, this.y, this.searchArea.circleRadius);
        fill(color.apply(null, this.color));
        rectMode(CENTER);
        rect(this.x, this.y, this.size, this.size);
        textSize(this.size);
        textAlign(CENTER, CENTER);
        fill(255);
        text(this.id.toString(), this.x, this.y);
    }

    grow(){
        // to grow, the lek consumes food
        let metabolism = 0.25;
        this.properties.health -= metabolism;
        this.age += 1;
        if(this.size >= this.finalSize)
            return;
        Body.scale(this.body, this.sizeGrowthRate, this.sizeGrowthRate);
        this.size = Math.floor(Math.sqrt(this.body.area));
    }

    move(x, y){
        Body.applyForce(this.body, {x:this.x, y:this.y}, {x: x, y: y});
        this.x = this.body.position.x;
        this.y = this.body.position.y;
    }

    wander(){
        var randX = random(-this.properties.speed, this.properties.speed);
        var randY = random(-this.properties.speed, this.properties.speed);
        this.move(randX, randY);
    }
    
    findResources(resources){
        let range = this.properties.sight * 20;
        Body.scale(this.searchArea, range, range);
        nearbyResources = Query.point(resources, this.searchArea.position);
        return nearbyResources.sort((a, b) => {
            return ((b.position.x + b.position.y)/2) - ((a.position.x + a.position.y)/2);
        }).filter((e, i) => i === 0); // return nearest resource;
    }

    onCollision(objectType, callback){

    }
}

// private methods
function addRectangularBody(x, y, size, options){
    let body = Bodies.rectangle(x , y, size, size, options);
    World.add(world, body);
    bodiesArray.push(body);
    return body;
}

function addCircularBody(x, y, radius, options = {}){
    let body = Bodies.circle(x, y, radius, options);
    World.add(world, body);
    return body;
}

function amIAlive(){
    if(this.age > this.properties.death || this.properties.health < 1)
        return false;
    return true;
}