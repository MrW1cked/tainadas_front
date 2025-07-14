// Array of food image URLs
const foodImages = [
    "https://cdn-icons-png.flaticon.com/512/1046/1046784.png",
    "https://cdn-icons-png.flaticon.com/512/3075/3075977.png",
    "https://cdn-icons-png.flaticon.com/512/135/135620.png",
    "https://cdn-icons-png.flaticon.com/512/1046/1046784.png",
    "https://cdn-icons-png.flaticon.com/512/3075/3075977.png",
    "https://cdn-icons-png.flaticon.com/512/135/135620.png",
    "https://cdn-icons-png.flaticon.com/512/1046/1046784.png",
    "https://cdn-icons-png.flaticon.com/512/3075/3075977.png",
    "https://cdn-icons-png.flaticon.com/512/135/135620.png"
];

const NUM_FOOD = 20;
const foodAnim = document.getElementById('food-anim');
const foods = [];
let screenW = window.innerWidth;
let screenH = window.innerHeight;

function random(min, max) {
    return Math.random() * (max - min) + min;
}

for (let i = 0; i < NUM_FOOD; i++) {
    const img = document.createElement('img');
    img.src = foodImages[Math.floor(Math.random() * foodImages.length)];
    img.className = 'dish';
    img.style.position = 'absolute';
    img.style.width = '48px';
    img.style.height = '48px';
    // Each food starts with a different initial position and delay
    const startX = random(0, screenW - 48);
    const startY = random(0, screenH - 48);
    img.style.left = startX + 'px';
    img.style.top = startY + 'px';
    img.style.animationDelay = (i * 0.5) + 's';
    foodAnim.appendChild(img);
    foods.push({
        el: img,
        x: startX,
        y: startY,
        vx: random(-2, 2),
        vy: random(-2, 2)
    });
}

function animateFood() {
    for (const food of foods) {
        food.x += food.vx;
        food.y += food.vy;
        // Bounce off walls
        if (food.x < 0) { food.x = 0; food.vx *= -1; }
        if (food.x > screenW - 48) { food.x = screenW - 48; food.vx *= -1; }
        if (food.y < 0) { food.y = 0; food.vy *= -1; }
        if (food.y > screenH - 48) { food.y = screenH - 48; food.vy *= -1; }
        food.el.style.left = food.x + 'px';
        food.el.style.top = food.y + 'px';
    }
    requestAnimationFrame(animateFood);
}

animateFood();

window.addEventListener('resize', () => {
    screenW = window.innerWidth;
    screenH = window.innerHeight;
});
