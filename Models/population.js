class Population{
    constructor(size){
        this.size = size;
        let _popArray = setPopulationArray.call(this);
        this.populationArray = (function (){return _popArray;})();
        this.populationMap = setPopulationMap.call(this, _popArray);
    }

    show(){
        this.activity(member => {
            member.show();
            member.wander();
        });
    }

    activity(callback){
        if(!callback)
            throw new Error("No callback function provided.");
        this.populationArray.forEach(lek => callback(lek));
    }

    add(member){
        this.size  += 1;
        this.populationArray.push(member);
        this.populationMap = setPopulationMap.call(this, this.populationArray);
        member.show();
    }

    remove(member){
        let index = -1;
        this.size -= 1;
        this.populationArray.some((lek, i) => {
            if(lek.id == member.id)
                index = i;
        });
        if(index < 0)
            throw new Error("Element is not in list.");
        
        World.remove(world, member.body);
        World.remove(world, member.searchArea);
        this.populationArray.splice(index, 1);
        this.populationMap = setPopulationMap.call(this, this.populationArray);
        console.log("I lek id:", member.id, "have died at the age of", member.age);
    }

    wander(){
        this.activity(member => {
            // action
            member.wander();
        });
    }
}

// private methods
function setPopulationArray(){
    return Array.apply(null, new Array(this.size)).map(e => new Lek());
}

function setPopulationMap(array){
    let obj = {};
    array.forEach((element, index) => obj[element.id] = index);
    return obj;
}