class Population{
    constructor(size){
        this.size = size;
        let _popArray = setPopulationArray.call(this);
        let _popObject = setPopulationMap.call(this, _popArray);
        this.populationArray = (function (){return _popArray;})();
        this.populationMap = (function (){return _popObject;})();
    }

    activity(callback){
        if(!callback)
            throw new Error("No callback function provided.");
        this.populationArray.forEach(lek => callback(lek));
    }

    add(member){
        this.size  += 1;
        this.populationArray.push(member);
        this.populationMap[member.id] = member;
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
        delete this.populationMap[member.id];
        console.log("I lek id:", member.id, "have died at the age of", member.age);
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