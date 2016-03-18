'use strict';
console.log("Ticker loaded");
var Ticker = {
    start:function(){
        createjs.Ticker.setFPS(30);
        console.log("ticker started");
        createjs.Ticker.on("tick", this.tock)
    },
    tock:function(e){
        if(!createjs.Ticker.getPaused()){
            Game.stage.update(e);
            //console.log("tick");
        }
    },
    pause:function(){
        createjs.Ticker.setPaused(true);

    },
    unpause:function(){
        createjs.Ticker.setPaused(false);
    }
}