

class Mine{
    /**
     * Produces endless resources at a specified location
     * and at certain inteverals/
    */

    constructor(bounds, quantity){
        this.bounds = bounds;
        this.quantity = quantity;
        let _resources = getResources.call(this);
        let _resourcesMap = getResourcesMap.call(this, _resources);
        this.resources = (function (){return _resources;})();
        this.resourcesMap = (function (){return _resourcesMap;})();
    }

    show(){
        this.seave(resource => {
            resource.show();
        });
    }

    seave(callback){
        if(!callback)
            throw new Error("No callback function provided.");
        this.resources.forEach(lek => callback(lek));
    }


}
// private methods
function getResources(){
    return Array.apply(null, new Array(this.quantity)).map(e => {
        let x = random(this.bounds.minX, this.bounds.maxX);
        let y = random(this.bounds.minY, this.bounds.maxY);
        let rarity = Math.floor(random(1, 20));
        let type = rarity > 16 ? "gold" : rarity > 10 ? "silver" : "wood";
        return new Resource(x, y, type);
    });
}

function getResourcesMap(array){
    let obj = {};
    array.forEach((element, index) => obj[element.id] = index);
    return obj;
}