class CollisionModule{
    constructor(){}

    static identifyObject(...collidingBodies){
        let body = collidingBodies[0];
        let population = collidingBodies[1];
        let mine = collidingBodies[2];
        let walls = collidingBodies[3];
        let searchSpace = population.populationArray.concat(mine.resources).concat(walls);
        let objectType = null;

        for(let i = 0; i < searchSpace.length; i++){
            if(objectType !== null)
                return objectType;
            objectType = setObjectType(body, searchSpace[i]);
        }
        return false;
    }
}

// private methods
function setObjectType(body, member){
    if(body.id === member.id)
        return member.objectType;
    return null;
}