const stats = {
    characterClass: 'Class: Lizard Creature Dipolomat',
    levelName: "Level:",
    level: 5,
    healthName: "Health:",
    health: 20,

    attack: function(){
        this.health -= 5;
        document.querySelector('#health').textContent = stats.health;
        if (this.health == 0){
            alert(`${document.querySelector('.name').textContent} is dead!`);
        }
    },
    levelUp: function(){
        this.level += 1;
        this.health += 5;
        document.querySelector('#level').textContent = stats.level;
        document.querySelector('#health').textContent = stats.health;
    }
};

function renderStats(){
    document.querySelector('#class').textContent = stats.characterClass;
    document.querySelector('#level').textContent = 'Level: ' + stats.level;
    document.querySelector('#health').textContent = 'Health: ' + stats.health;
}

renderStats();

document.querySelector('.attackButton').addEventListener("click", () => {
    stats.attack();
    renderStats();
});

document.querySelector('.levelUpButton').addEventListener("click", () => {
    stats.levelUp();
    renderStats();
});