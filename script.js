function generateKey() {
    const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let key = "";
    for (let i = 0; i < 16; i++) {
        if (i > 0 && i % 4 === 0) key += "-";
        key += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return key;
}

function getStoredKey() {
    const saved = localStorage.getItem("dailyKeyData");
    if (!saved) return null;
    const { key, timestamp } = JSON.parse(saved);
    const now = Date.now();
    if (now - timestamp > 24 * 60 * 60 * 1000) return null;
    return key;
}

function saveKey(key) {
    localStorage.setItem("dailyKeyData", JSON.stringify({ key, timestamp: Date.now() }));
}

function copyKey() {
    const key = document.getElementById("key").innerText;
    navigator.clipboard.writeText(key).then(() => alert("Key copied to clipboard!"));
}

function copyInvite() {
    const invite = document.getElementById("invite").innerText;
    navigator.clipboard.writeText(invite).then(() => alert("Invite copied to clipboard!"));
}

function updateTimer() {
    const saved = localStorage.getItem("dailyKeyData");
    if (!saved) {
        document.getElementById("timer").innerText = "Next key reset in: 24:00:00";
        return;
    }
    const { timestamp } = JSON.parse(saved);
    const now = Date.now();
    const diff = 24 * 60 * 60 * 1000 - (now - timestamp);

    if (diff <= 0) {
        // Time to generate a new key
        const newKey = generateKey();
        saveKey(newKey);
        document.getElementById("key").innerText = newKey;
        document.getElementById("timer").innerText = "Next key reset in: 24:00:00";
    } else {
        // Calculate hours, minutes, seconds
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        // Format with leading zeros
        const hDisplay = hours.toString().padStart(2, "0");
        const mDisplay = minutes.toString().padStart(2, "0");
        const sDisplay = seconds.toString().padStart(2, "0");

        document.getElementById(
            "timer"
        ).innerText = `Next key reset in: ${hDisplay}:${mDisplay}:${sDisplay}`;
    }
}

window.onload = () => {
    let key = getStoredKey();
    if (!key) {
        key = generateKey();
        saveKey(key);
    }
    document.getElementById("key").innerText = key;
    updateTimer();
    setInterval(updateTimer, 1000);
};
