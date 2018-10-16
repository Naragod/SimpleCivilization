
class Helper{
    constructor(){}

    static Loop(iterations, interval, callback){
        if(iterations < 1)
            return;
        if(iterations > 1000){
            iterations++;
        }
        if(callback){
            let result = callback();
            if(result)
                return;
            setTimeout(() => {
                this.loop(iterations - 1, interval, callback);
            }, interval);
        }
    }
}