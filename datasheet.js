document.addEventListener('DOMContentLoaded', () => {
    // --- Elements ---
    const calculateBtn = document.getElementById('calculate-btn');
    const resultContainer = document.getElementById('result-container');
    const bmiValueEl = document.getElementById('bmi-value');
    const bmiCategoryEl = document.getElementById('bmi-category');
    const weightInput = document.getElementById('weight');
    const heightInput = document.getElementById('height');
    const formGroups = document.querySelectorAll('.form-group');

    // --- Staggered Animation for Form Fields ---
    formGroups.forEach((group, index) => {
        setTimeout(() => {
            group.style.animationPlayState = 'running';
        }, index * 80); // 80ms delay between each field appearing
    });

    // --- Event Listener ---
    calculateBtn.addEventListener('click', () => {
        const weight = parseFloat(weightInput.value);
        const height = parseFloat(heightInput.value);

        // --- Validation ---
        if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
            alert("Please enter valid positive numbers for weight and height.");
            return;
        }

        // --- BMI Calculation ---
        const bmi = weight / (height * height);
        const { category, className } = getBmiCategory(bmi);
        
        // --- Display Results ---
        bmiValueEl.textContent = bmi.toFixed(2);
        bmiCategoryEl.textContent = category;

        // Apply color-coded class
        bmiCategoryEl.className = className;
        bmiValueEl.className = className;

        // Show the result container with animation
        resultContainer.classList.remove('hidden');
        resultContainer.classList.add('visible');
    });

    // --- Helper Function ---
    function getBmiCategory(bmi) {
        if (bmi < 18.5) {
            return { category: "Underweight", className: "underweight" };
        } else if (bmi >= 18.5 && bmi < 24.9) {
            return { category: "Normal weight", className: "normal" };
        } else if (bmi >= 25 && bmi < 29.9) {
            return { category: "Overweight", className: "overweight" };
        } else {
            return { category: "Obese", className: "obese" };
        }
    }
});