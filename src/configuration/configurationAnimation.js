const AnimationsList =
[
    {
        order : [{
            spriteAnimate : 0,
            speed : 0.1,
            animation : 0,
            nextPos : [4,1]
        },{
            spriteAnimate : 1,
            speed : 0.12,
            animation : 0,
            nextPos : [7,1]
        },{
            spriteAnimate : 0,
            speed : 1,
            animation : 1,
            nextPos : [8,1]
        },{
            spriteAnimate : 1,
            speed : 0.55,
            animation : 0,
            nextPos : [5,4]
        },{
            spriteAnimate : 0,
            speed : 1.5,
            animation : 2,
            nextPos : [4,5]
        },{
            spriteAnimate : 1,
            speed : 0.5,
            animation : 0,
            nextPos : [5,1]
        }],
        sprites : [{
            idSprite : 0,
            animations : [
                {
                    idAnimation : 0,
                    countAnimation : 18,
                    frameSpeed : [0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.175, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4], // This is the frame speed for each frames
                },{
                    idAnimation : 1,
                    countAnimation : 5,
                    frameSpeed : [0.1,0.1,0.1,0.1,0.1], // This is the frame speed for each frames
                },{
                    idAnimation : 2,
                    countAnimation : 4,
                    frameSpeed : [0.1,0.1,0.1,0.1], // This is the frame speed for each frames
                }
            ],
            position : [1, 1],
            currentSpriteAssetsPosition : 0 
        },
        {
            idSprite : 2,
            animations : [
                {
                    idAnimation : 5,
                    countAnimation : 2,
                    frameSpeed : [0.1, 0.1], // This is the frame speed for each frames
                }
            ],
            position : [5, 1] ,
            currentSpriteAssetsPosition : [0, 0] 
        }]
    }
]

let cinematicUsed;

let fightCinematicViewState = FightCinematicViewStateEnum.NoAnim;
let indexAnimationRunned = 0;
let indexCurrentOrderOfAnimation = 0;