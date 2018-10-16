class Population{
    constructor(size){
        this.size = size;
        this.populationArray = (() => {return getArray.call(this);})();
        this.populationObject = (() => {return getObject.call(this);})();
    }

    initialize(){
        setPopulationArray.call(this);
        setPopulationObject.call(this);
    }

    activity(callback){
        if(!callback)
            throw new Error("No callback function provided.");
        this.populationArray.forEach(lek => callback(lek));
    }

    add(member){
        this.size  += 1;
        this.populationArray.push(member);
        this.populationObject[member.id] = member;
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
        
        this.populationArray.slice(index, 1);
        delete this.populationObject[member.id];
    }
}

// private methods
function getArray(){
    // private variable of the Population class
    if(this._popArray === undefined)
        this._popArray = [];
    return this._popArray;
}

function getObject(){
    // private variable of the Population class
    if(this._popObject === undefined)
        this._popObject = {};
    return this._popObject;
}

function setPopulationArray(){
    let arr = Array.apply(null, new Array(this.size)).map(e => new Lek());
    arr.forEach((e, i) => getArray.call(this).push(e));
}

function setPopulationObject(){
    this._popArray.forEach(element => getObject.call(this)[element.id] = element);
}