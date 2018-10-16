
class ResourceType{
    constructor(type){
        this.type = type;
        this.properties = this.setProperties(type);
    }

    setProperties(type){
        // wood
        let hardness = 1;
        let rarity = 1;
        let value = 1;
        let color = "#9b6114";

        if (type == "silver"){
            hardness = 3;
            rarity = 5;
            value = 4;
            color = "#d1cbc4";
        }

        else if(type == "gold"){
            hardness = 5;
            rarity = 7;
            value = 5;
            color = "#c4be0f";
        }

        return {
            hardness : hardness,
            rarity : rarity,
            value : value,
            color : color
        };
    }
}