
class PopulationFactory{
    constructor(){
    }

    createRandomPopulation(size){
        return new Population(size).initialize();
    }

}
// private methods
