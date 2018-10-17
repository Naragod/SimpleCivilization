
class TimeOperations{
    constructor(frameRate){
        this.frameCounter = 0;
        this.frameRate = frameRate;
        this.lock = false;
    }

    Complete(operationFrequency, action){
        if(this.lock)
            return;

        if(typeof operationFrequency !== 'number'){
            throw new Error("Enter a valid operationFrequency:", operationFrequency.toString());
        }

        if(!action)
            throw new Error("No callback funciton provided.");

        if(this.frameCounter < this.frameRate * operationFrequency){
            this.frameCounter += 1;
        }

        action();
        this.frameCounter = 0;
        this.lock = !this.lock;
    }

    Locked(){
        return this.lock;
    }

    Lock_Unlock(){
        this.lock = !this.lock;
        return this.lock;
    }
}



