

class BodySystemModule{

    constructor(){}

    static reproduce(mother, father){
        let healthThreshold = 4;
        let charmThreshold = 4;
        let offSpringProperties = [
            mother.x + Math.floor(random(10, 20)),
            mother.y + Math.floor(random(10, 20)),
            mother,
            father
        ];
        // can only reproduce if the parents have the minimum fertility required and both are above a certain age threshold
        if(mother.properties.fertility + father.properties.fertility < 5 || mother.age < 5 || father.age < 5)
            return false;
        
        if(mother.properties.health < healthThreshold || father.properties.charm < charmThreshold)
            return false;

        return new Lek(...offSpringProperties);
    }


}