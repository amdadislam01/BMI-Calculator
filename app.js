document.addEventListener('DOMContentLoaded', function() {
    const calculateBtn = document.getElementById('calculate');
    const heightInput = document.getElementById('height');
    const weightInput = document.getElementById('weight');
    const resultDiv = document.getElementById('result');
    const bmiValue = document.getElementById('bmi-value');
    const bmiCategory = document.getElementById('bmi-category');
    const bmiRange = document.getElementById('bmi-range');

    // Add pulse animation to inputs when focused
    [heightInput, weightInput].forEach(input => {
        input.addEventListener('focus', () => {
            input.classList.add('animate-pulse');
        });
        input.addEventListener('blur', () => {
            input.classList.remove('animate-pulse');
        });
    });

    calculateBtn.addEventListener('click', function() {
        // Add click animation
        this.classList.add('animate-click');
        setTimeout(() => {
            this.classList.remove('animate-click');
        }, 300);
        
        // Get input values
        const height = parseFloat(heightInput.value);
        const weight = parseFloat(weightInput.value);
        
        // Validate inputs
        if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
            showError();
            return;
        }
        
        // Calculate BMI with loading animation
        resultDiv.classList.remove('animate__fadeIn');
        resultDiv.classList.add('animate__fadeOut', 'hidden');
        
        setTimeout(() => {
            const bmi = calculateBMI(height, weight);
            displayResult(bmi);
        }, 300);
    });
    
    function calculateBMI(height, weight) {
        const heightInMeters = height / 100;
        return (weight / (heightInMeters * heightInMeters)).toFixed(1);
    }
    
    function displayResult(bmi) {
        bmiValue.textContent = bmi;
        
        let category, color, range, animation;
        if (bmi < 18.5) {
            category = "Underweight";
            color = "text-cyan-600";
            range = "Suggested range for your height: 18.5 - 24.9";
            animation = "animate__pulse";
        } else if (bmi >= 18.5 && bmi <= 24.9) {
            category = "Healthy Weight";
            color = "text-emerald-600";
            range = "You're in the ideal weight range!";
            animation = "animate__tada";
        } else if (bmi >= 25 && bmi <= 29.9) {
            category = "Overweight";
            color = "text-amber-600";
            range = "Suggested range for your height: 18.5 - 24.9";
            animation = "animate__wobble";
        } else {
            category = "Obese";
            color = "text-rose-600";
            range = "Suggested range for your height: 18.5 - 24.9";
            animation = "animate__shakeX";
        }
        
        bmiCategory.textContent = category;
        bmiCategory.className = `text-lg font-medium ${color} animate__animated ${animation}`;
        bmiRange.textContent = range;
        
        // Show result with animation
        resultDiv.classList.remove('hidden', 'animate__fadeOut');
        resultDiv.classList.add('animate__fadeIn');
        
        // Remove animation classes after they complete
        setTimeout(() => {
            bmiCategory.classList.remove('animate__animated', animation);
        }, 1000);
    }
    
    function showError() {
        resultDiv.classList.remove('hidden');
        resultDiv.classList.remove('animate__fadeIn');
        resultDiv.classList.add('animate__shakeX');
        
        bmiValue.textContent = "Invalid";
        bmiCategory.textContent = "Please enter valid measurements";
        bmiCategory.className = "text-lg font-medium text-rose-600";
        bmiRange.textContent = "Height and weight must be positive numbers";
        
        setTimeout(() => {
            resultDiv.classList.remove('animate__shakeX');
        }, 1000);
    }
    
    // Input validation
    [heightInput, weightInput].forEach(input => {
        input.addEventListener('input', function() {
            if (this.value < 0) this.value = '';
            if (this.value.length > 5) this.value = this.value.slice(0, 5);
        });
    });
});