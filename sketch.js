
var population;
var mine;
var canvas;
var ww = 1200;
var hh = 900;
var thickness = 50;
let resource;
let currentCollisions = [];
var mouseConstraint;
var canvasMouse;
var bodiesOnMouse = [];
var _counter = 0;
var operationFrequency = 1;
var maximumWorldPopulation = 100;
var tOperations;
var collisionModule;
var _frameRate = 60;
var OBJECTYPES = {"Lek": false, "Resource": true, "Boundary": true};

// create boundaries
var walls = [
                new Boundary(0, hh/2, thickness, hh), // left wall
                new Boundary(ww/2, hh, ww, thickness), // bottom wall
                new Boundary(ww, hh/2, thickness, hh), // right wall
                new Boundary(ww/2, 0, ww, thickness) // top wall
            ];

function generateWorld(){
    let mineBounds = {
        minX: thickness / 2,
        minY: thickness / 2,
        maxX: ww,
        maxY: hh
    };

    population = new Population(3);
    mine = new Mine(mineBounds, 10);
    tOperations = new TimeOperations(_frameRate);
}
            
function setup(){
    canvas = createCanvas(ww, hh);
    generateWorld();
    
    // Mouse and mouse contraints
    canvasMouse = Mouse.create(canvas.elt);
    canvasMouse.pixelRation = pixelDensity();
    mouseConstraint = MouseConstraint.create(engine, {
        mouse: canvasMouse
    });

    // World
    World.add(world, mouseConstraint);
    
    // Events
    Events.on(engine, "beforeUpdate", timeOperations);
    Events.on(engine, "collisionStart", onCollision);
}

function draw(){
    background(80);
    
    walls.forEach(wall => {
        wall.show();
    });
    population.show();
    mine.show();
    bodiesOnMouse = Query.point(bodiesArray, canvasMouse.position);
}

    
// this function get called before every frame update
function timeOperations(){
    // game loop
    tOperations.Complete(1 / _frameRate, () => {
        // population
        population.wander();
        // seave resources
        mine.mine();
    });
    // timeOperation loop
    tOperations.Complete(1 / _frameRate, () => {
        population.activity((lek) => {
            if(!lek.isAlive()){
                population.remove(lek);
                return;
            }
            // lek.grow();
        });
        mine.seave((resource) => {
            resource.extract();
        });
    });
}

function onCollision(e){
    let pairs = e.pairs;
    for(let i = 0; i < pairs.length; i++){
        let pair = pairs[i];
        let idA = pair.bodyA.id;
        let idB = pair.bodyB.id;
        let objectTypeA = CollisionModule.identifyObject(pair.bodyA, population, mine, walls);
        let objectTypeB = CollisionModule.identifyObject(pair.bodyB, population, mine, walls);
        
        if(OBJECTYPES[objectTypeA] || OBJECTYPES[objectTypeB]){
            // wall or resource collision
            console.log(objectTypeA);
            console.log(objectTypeB);
            return;
        }

        let mother = population.populationArray[population.populationMap[idA]];
        let father = population.populationArray[population.populationMap[idB]];

        if(population.size >= maximumWorldPopulation){
            // clear memory
            idA = null;
            idB = null;
            pop = null;
            res = null;
            father = null;
            mother = null;
            return;
        }
        // reproduce(mother, father);
    }
 }

function reproduce(mother, father){
    if(mother === undefined || father === undefined)
        return;
        
    console.log("Kiss kiss between:", mother.id, father.id);
    console.log("population size:", population.size);
    if(mother.father == father || mother.mother == father || father.mother == mother || father.father == mother)
        return;
    let child = BodySystemModule.Reproduce(mother, father);
    // Was a child born?
    if(!child)
        return;
    population.add(child);
}