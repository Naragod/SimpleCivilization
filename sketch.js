
var population;
var resources;
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

// static methods references

// create boundaries
var walls = [
                new Boundary(0, hh/2, thickness, hh), // left wall
                new Boundary(ww/2, hh, ww, thickness), // bottom wall
                new Boundary(ww, hh/2, thickness, hh), // right wall
                new Boundary(ww/2, 0, ww, thickness) // top wall
            ];

function setup(){
    canvas = createCanvas(ww, hh);
    generateWorld();
    tOperations = new TimeOperations(_counter, operationFrequency);

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
    
    population.populate();
    population.show();

    // // Resources
    // resources.extract();
    resources.show();
    bodiesOnMouse = Query.point(bodiesArray, canvasMouse.position);
}

// this function get called before every frame update
function timeOperations(){
    tOperations.complete(() => {
        // operations
        // growLeks();
        // lek.findResources();
    });
}

function growLeks(){
    population.activity(lek => {
        if(!lek.isAlive()){
            population.remove(lek);
            return;
        }
        // lek.findResources(resources);
        lek.grow();
        lek.show();
    });
}

function onCollision(e){
    let pairs = e.pairs;
    for(let i = 0; i < pairs.length; i++){
        let pair = pairs[i];
        let idA = pair.bodyA.id;
        let idB = pair.bodyB.id;
        let pop = population;
        let res = resources;

        let mother = pop.populationArray[pop.populationMap[idA]];
        let father = pop.populationArray[pop.populationMap[idB]];

        if(population.size >= maximumWorldPopulation){
            // clear memory
            father = null;
            mother = null;
            return;
        }
        // reproduce(mother, father);
    }
 }

function generateWorld(){
    let mineBounds = {
        minX: thickness / 2,
        minY: thickness / 2,
        maxX: ww,
        maxY: hh
    }
    population = new Population(3);
    resources = new Mine(mineBounds, 10);
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