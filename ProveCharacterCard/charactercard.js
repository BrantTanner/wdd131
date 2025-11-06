const stats = {
    class: 'Class: Lizard Creature Dipolomat',
    level: 5,
    health: 20,

    attack: function(health){
        health =- 5;

        return health
    },
    levelUp: function(level, health){
        level =+ 1;
        health =+ 5;
        return  level, health
    }
};

document.querySelector('#class').textContent = stats.class;
document.querySelector('#level').textContent = stats.level;
document.querySelector('#health').textContent = stats.health;

document.querySelector('#attackButton').addEventListener("click", attack())
document.querySelector('#levelUpButton').addEventListener("click", levelUp())