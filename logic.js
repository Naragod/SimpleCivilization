
// module aliases
var Engine = Matter.Engine,
    Events = Matter.Events,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Body = Matter.Body;
    Mouse = Matter.Mouse;
    MouseConstraint = Matter.MouseConstraint;
    Query = Matter.Query;

// create an engine
var engine = Engine.create();
var world = engine.world;


// engine options
// world.gravity.x = -1;
world.gravity.y = 0;

// run the engine
Engine.run(engine);

// global variables
var bodiesArray = [];
