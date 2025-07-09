
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

window.onload = () => {
    let key = getStoredKey();
    if (!key) {
        key = generateKey();
        saveKey(key);
    }
    document.getElementById("key").innerText = key;
};
