
class TimeOperations{
    constructor(frameCounter, operationFrequency){
        this.frameCounter = frameCounter;
        this.operationFrequency = operationFrequency;
        this.framesPerSecond = 60;
    }

    complete(action){
        if(!action)
            throw new Error("No callback function provided.");
        if(this.frameCounter > this.framesPerSecond * this.operationFrequency){
            this.frameCounter += 1;
            return;
        }

        action();
        this.frameCounter = 0;
    }
}