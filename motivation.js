const container = document.querySelector('.card-container');
let allCards = document.querySelectorAll('.card');

// Array of unique exit animation classes defined in CSS
const exitAnimations = [
    'exit-swipe-right', 
    'exit-fly-up', 
    'exit-swipe-left', 
    'exit-fall-down', 
    'exit-shrink-out'
];
let animationIndex = 0; // To cycle through the animations

function initializeCards() {
    allCards.forEach((card, index) => {
        card.style.zIndex = allCards.length - index;
        // Apply stacking effect without interfering with exit animations
        if (!card.classList.contains('exit-animation')) {
             card.style.transform = `scale(${1 - index * 0.05}) translateY(${index * 12}px)`;
             card.style.opacity = '1';
        }
    });
}

initializeCards();

allCards.forEach(card => {
    let isMouseDown = false;
    let startX, currentX;

    card.addEventListener('mousedown', e => {
        if (card.style.zIndex != allCards.length) return;
        isMouseDown = true;
        startX = e.pageX;
        card.classList.add('dragging');
    });

    document.addEventListener('mousemove', e => {
        if (!isMouseDown || !card.classList.contains('dragging')) return;
        currentX = e.pageX;
        const diffX = currentX - startX;
        const rotate = diffX * 0.05;
        card.style.transform = `translateX(${diffX}px) rotate(${rotate}deg)`;
    });

    document.addEventListener('mouseup', () => {
        if (!isMouseDown || !card.classList.contains('dragging')) return;
        isMouseDown = false;
        
        const diffX = currentX - startX;
        const threshold = card.offsetWidth * 0.35;

        if (Math.abs(diffX) > threshold) {
            // --- NEW: Apply a different animation on swipe ---
            const animationClass = exitAnimations[animationIndex];
            card.classList.add(animationClass);
            
            // Cycle to the next animation for the next card
            animationIndex = (animationIndex + 1) % exitAnimations.length;

            setTimeout(() => {
                container.appendChild(card); // Move card to the back of the deck
                card.classList.remove(animationClass); // Clean up class
                allCards = document.querySelectorAll('.card'); // Update card list
                initializeCards(); // Re-stack the cards
            }, 500); // Wait for CSS transition to finish
        } else {
            // Snap back to original position
            card.style.transform = `scale(1) translateY(0)`;
        }
        
        card.classList.remove('dragging');
        startX = 0; currentX = 0;
    });

    card.addEventListener('dragstart', e => {
        e.preventDefault();
    });
});