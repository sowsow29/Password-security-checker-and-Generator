document.addEventListener("DOMContentLoaded", () => {
    const strengthMeter = document.getElementById("strength-meter");
    const inputPassword = document.getElementById("password");
    const reasons = document.getElementById("reasons");
    const strengthText = document.getElementById("strength-text");

    inputPassword.addEventListener("input", updateStrength);

    function updateStrength() {
        const weaknesses = getWeaknesses(inputPassword.value);
        let strength = 100;
        reasons.innerHTML = '';

        weaknesses.forEach(weakness => {
            if (!weakness) return;
            strength -= weakness.deduction;
            const messageElement = document.createElement('div');
            messageElement.innerText = weakness.message;
            reasons.appendChild(messageElement);
        });

        strength = Math.max(strength, 0);
        strengthMeter.style.setProperty("--strength", strength + "%");
        updateStrengthText(strength);
    }

    function updateStrengthText(strength) {
        if (strength >= 80) {
            strengthText.innerHTML = "💪 Super Strong! 🚀";
            strengthText.style.color = "#00ff00";
            strengthMeter.style.setProperty("--strength", "100%");
            strengthMeter.style.setProperty("background", "#00ff00");
        } else if (strength >= 60) {
            strengthText.innerHTML = "👌 Pretty Strong! 🔥";
            strengthText.style.color = "#0077ff";
            strengthMeter.style.setProperty("--strength", "75%");
            strengthMeter.style.setProperty("background", "#0077ff");
        } else if (strength >= 40) {
            strengthText.innerHTML = "😐 Moderate! Try Adding More 🔑";
            strengthText.style.color = "#ffa500";
            strengthMeter.style.setProperty("--strength", "50%");
            strengthMeter.style.setProperty("background", "#ffa500");
        } else {
            strengthText.innerHTML = "😞 Weak! Make it Stronger 💀";
            strengthText.style.color = "#ff3333";
            strengthMeter.style.setProperty("--strength", "25%");
            strengthMeter.style.setProperty("background", "#ff3333");
        }
    }

    function getWeaknesses(password) {
        return [
            checkLength(password),
            checkLowerCase(password),
            checkUpperCase(password),
            checkNumbers(password),
            checkSpecialSymbols(password),
            checkRepetitions(password),
            checkSequences(password),
            checkCommonPasswords(password)
        ].filter(Boolean);
    }

    function checkLength(password) {
        if (password.length < 12) {
            return { message: "🔢 Password should be at least 12 characters long.", deduction: 30 };
        }
        return null;
    }

    function checkCases(password, regex, type) {
        const matches = password.match(regex);
        if (!matches) {
            return { message: `🔡 Add ${type} characters!`, deduction: 15 };
        } else if (matches.length <= 2) {
            return { message: `🔠 Use more ${type} characters!`, deduction: 10 };
        }
        return null;
    }

    function checkLowerCase(password) { return checkCases(password, /[a-z]/g, "lowercase"); }
    function checkUpperCase(password) { return checkCases(password, /[A-Z]/g, "uppercase"); }
    function checkNumbers(password) { return checkCases(password, /[0-9]/g, "numbers"); }
    function checkSpecialSymbols(password) { return checkCases(password, /[^a-zA-Z0-9]/g, "special characters"); }

    function checkRepetitions(password) {
        if (/([a-zA-Z0-9])\1{2,}/.test(password)) {
            return { message: "❌ Avoid repeating characters (e.g., aaa, 111).", deduction: 15 };
        }
        return null;
    }

    function checkSequences(password) {
        if (/123|abc|qwe|password|987/.test(password.toLowerCase())) {
            return { message: "🚫 Avoid common sequences (e.g., 123, abc, qwe).", deduction: 20 };
        }
        return null;
    }

    function checkCommonPasswords(password) {
        const commonPasswords = ["password", "123456", "qwerty", "letmein", "123123", "admin", "welcome"];
        if (commonPasswords.includes(password.toLowerCase())) {
            return { message: "⚠️ Your password is too common! Choose a unique one.", deduction: 50 };
        }
        return null;
    }
});

// Toggle Password Visibility
function togglePassword() {
    const passwordInput = document.getElementById("password");
    passwordInput.type = passwordInput.type === "password" ? "text" : "password";
}
