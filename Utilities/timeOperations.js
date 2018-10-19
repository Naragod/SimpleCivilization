
class TimeOperations{
    constructor(_frameRate_, operationFrequency){
        this.frameCounter = 0;
        this._frameRate_ = _frameRate_;
        this.operationFrequency = operationFrequency;
    }
    Complete(action){
        if(!action)
            throw new Error("No callback funciton provided.");

        if(this.frameCounter < this._frameRate_ * this.operationFrequency){
            this.frameCounter += 1;
            return;
        }

        action();
        this.frameCounter = 0;
    }
}



