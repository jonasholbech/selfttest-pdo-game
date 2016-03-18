"use strict"
console.log("G loaded");
var Game = {
    stage:null,
    init:function(){
        Game.stage = new createjs.Stage("canvas");
        var context = Game.stage.canvas.getContext("2d");
        context.webkitImageSmoothingEnabled = context.mozImageSmoothingEnabled = CanvasRenderingContext2D.imageSmoothingEnabled = false;
        Preload.load();
    }
};
//Game.init();