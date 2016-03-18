"use strict"
console.log("Game loaded");

Game.cleanUp = function () {
    Game.stage.removeAllChildren();
};

Game.checkDistance=function(dropped){
    var i= 0, min=99999, distance, currentlyClosest=null;
    for(;i<Game.fillers.length; i++){
        distance=Utils.distance(dropped, Game.fillers[i]);
        if(distance<min){
            min=distance;
            currentlyClosest=Game.fillers[i];
        }
    }
    if(min<20){
        Ticker.unpause();
        createjs.Tween.get(dropped).to({x:currentlyClosest.x, y:currentlyClosest.y}, 100).call(function(e){
            dropped.placedOn=currentlyClosest;
            if(Game.checkSolution()){
                Game.stage.removeAllChildren();
                var t=new createjs.Text('CONGRATULATIONS!\n\nClick to play again', '80px Ubuntu');
                Game.stage.addChild(t);
                t.on("click",function(e){
                    Game.setupGame();
                });
            } else {
                setTimeout(function(){Ticker.pause();},200);
            }
        });
    } else {
        Ticker.unpause();
        createjs.Tween.get(dropped).to({x:dropped.startX, y:dropped.startY}, 500).call(function(e){
            dropped.placedOn=null;
            setTimeout(function(){Ticker.pause();},200);
        });
    }
};

Game.createVar = function(gfx, name, x,y){
    var t = new createjs.Bitmap(Preload.queue.getResult(gfx));
    t.regX=33;
    t.regY=16;
    t.name=name;
    t.placedOn=null;
    Game.stage.addChild(t);
    //t.scaleX= t.scaleY=0.5;
    t.x=t.startX=x;
    t.y=t.startY=y;
    t.on("pressmove",function(evt) {
        // currentTarget will be the container that the event listener was added to:
        evt.currentTarget.x = evt.stageX;
        evt.currentTarget.y = evt.stageY;
        // make sure to redraw the stage to show the change:
        Game.stage.update();
    });
    t.on("pressup", function(evt){
        Game.checkDistance(evt.target);
        //console.log(evt);

    });
    return t;
};
Game.setUpVar = function(){

    var i= 0, t;
    for(;i<6; i++){
        Game.vars.push(Game.createVar("gfx/va1.png", "v1", 1413, 116));
    }
    i=0;
    for(;i<6; i++){
        Game.vars.push(Game.createVar("gfx/va2.png", "v2", 1413, 216));
    }
    i=0;
    for(;i<6; i++){
        Game.vars.push(Game.createVar("gfx/va3.png", "v3", 1413, 316));
    }
};

Game.checkSolution = function(){
    var i=0;
    var placed=[];

    for(; i<Game.vars.length; i++){
        if(Game.vars[i].placedOn!=null){
            placed.push(Game.vars[i]);
        }
    }

    if(placed.length!=Game.positions.length){
        return false;
    }

    //variables placed on:
    var set1 = [0,1,3];// should be the same
    var set2 = [1,5];// should be the same
    var set3 = [4,6,7,8,9,10]; //should be the same

    //console.log(placed)

    var o={
        'v1':[],
        'v2':[],
        'v3':[]
    };

    for(i=0; i<placed.length; i++){
        o[placed[i].placedOn.type].push(placed[i].name);
    }
    if(o.v1.length!=set1.length || o.v2.length!=set2.length || o.v3.length!=set3.length){
        return false;
    }
    //alle names i hvert array skal være de samme
    var cur = o.v1[0];
    for(i=1;i< o.v1.length; i++){
        if(o.v1[i]!=cur){
            return false;
        }
    }
    cur = o.v2[0];
    for(i=1;i< o.v2.length; i++){
        if(o.v2[i]!=cur){
            return false;
        }
    }
    cur = o.v3[0];
    for(i=1;i< o.v3.length; i++){
        if(o.v3[i]!=cur){
            return false;
        }
    }
    return true;
};
Game.setupFillers = function(){
    var i=0,t;
    Game.fillers=[];
    Game.positions=[[80,54, 'v1'], [80, 111, 'v1'],[80, 143, 'v2'],[180, 143, 'v1'], [276, 385, 'v3'],[376, 385, 'v2'],[330, 475, 'v3']
        ,[570, 505, 'v3'],[670, 535, 'v3'],[850, 535, 'v3'],[680, 565, 'v3']];
    var length=Game.positions.length;
    for(;i<length; i++){
        t= new createjs.Shape();
        t.graphics.beginFill("red").drawRect(0,0, 60, 30);
        t.x=Game.positions[i][0]+30;
        t.y=Game.positions[i][1]+15;
        t.regX=30;
        t.regY=15;
        Game.stage.addChild(t);
        t.type=Game.positions[i][2];
        Game.fillers.push(t);
        //console.log(t);
    }
};
Game.splash=function(){
    var splash = new createjs.Shape();
    splash.graphics.beginFill("#1c70be").drawRect(0,0, Game.stage.canvas.width, Game.stage.canvas.height);
    Game.stage.addChild(splash);
    var txt = new createjs.Text("Drag the variables (to the right)\n unto the right squares\nCombine the variables correctly", "60px Ubuntu");
    Game.stage.addChild(txt);
    var click = new createjs.Text("Click to start", "80px 'Ubuntu'");
    click.textAlign="center";
    click.textBaseline="middle";
    click.x=Game.stage.canvas.width/2;
    click.y=Game.stage.canvas.height/2;

    Game.stage.addChild(click);

    var tinyPrint = new createjs.Text("This has only been tested in chrome! Bugs: jofh[at].kea.dk","20px Ubuntu");
    tinyPrint.y=Game.stage.canvas.height - 50;
    Game.stage.addChild(tinyPrint);
    splash.on("click", function(e){
        Game.start();
    });
};
Game.start=function(){
    Game.stage.removeAllChildren();
    Game.code=new createjs.Bitmap(Preload.queue.getResult('gfx/code.png'));
    Game.stage.mouseMoveOutside = true;
    //Game.code.scaleX=Game.code.scaleY=0.5;
    Game.stage.addChild(Game.code);
    Game.vars=[];
    Game.setupFillers();
    Game.setUpVar();
    Ticker.start();
    Ticker.pause();//tror ikke tænd sluker er nødvendigt længere, fik ikke ticker init til at virke
    Game.stage.update();
};
Game.setupGame = function () {
    Game.cleanUp();
    Game.splash();
    /*

    */
    Game.stage.update();
};