function generateKey() {
  const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let key = "";
  for (let i = 0; i < 16; i++) {
    if (i > 0 && i % 4 === 0) key += "-";
    key += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return key;
}

function getStoredKeyData() {
  const saved = localStorage.getItem("dailyKeyData");
  if (!saved) return null;
  try {
    return JSON.parse(saved);
  } catch {
    localStorage.removeItem("dailyKeyData");
    return null;
  }
}

function saveKeyData(key) {
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
  const data = getStoredKeyData();
  if (!data) {
    document.getElementById("timer").innerText = "Next key reset in: 24:00:00";
    return;
  }

  const now = Date.now();
  const elapsed = now - data.timestamp;
  const resetInterval = 24 * 60 * 60 * 1000; // 24 hours in ms
  let remaining = resetInterval - elapsed;

  if (remaining <= 0) {
    // Time to generate new key
    const newKey = generateKey();
    saveKeyData(newKey);
    document.getElementById("key").innerText = newKey;
    remaining = resetInterval;
  }

  // Calculate hours, minutes, seconds remaining
  const hours = Math.floor(remaining / (1000 * 60 * 60));
  const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

  const hDisplay = hours.toString().padStart(2, "0");
  const mDisplay = minutes.toString().padStart(2, "0");
  const sDisplay = seconds.toString().padStart(2, "0");

  document.getElementById(
    "timer"
  ).innerText = `Next key reset in: ${hDisplay}:${mDisplay}:${sDisplay}`;
}

window.onload = () => {
  const data = getStoredKeyData();

  if (!data) {
    const key = generateKey();
    saveKeyData(key);
    document.getElementById("key").innerText = key;
  } else {
    document.getElementById("key").innerText = data.key;
  }

  updateTimer();
  setInterval(updateTimer, 1000);
};
