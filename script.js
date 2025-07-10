function generateKeyFromDate(dateString) {
  const charset = "abcdefghijklmnopqrstuwvxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let seed = 0;

  for (let i = 0; i < dateString.length; i++) {
    seed += dateString.charCodeAt(i) * (i + 1);
  }

  let key = "";
  for (let i = 0; i < 10; i++) {
    const index = (seed + i * 17) % charset.length;
    key += charset.charAt(index);
  }

  return key;
}

function getTodayKey() {
  const today = new Date().toISOString().split("T")[0];
  return generateKeyFromDate(today);
}

function updateTimer() {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setUTCHours(24, 0, 0, 0);

  const remaining = tomorrow - now;

  const hours = Math.floor(remaining / (1000 * 60 * 60));
  const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

  const hDisplay = hours.toString().padStart(2, "0");
  const mDisplay = minutes.toString().padStart(2, "0");
  const sDisplay = seconds.toString().padStart(2, "0");

  document.getElementById(
    "timer"
  ).innerText = Next key reset in: ${hDisplay}:${mDisplay}:${sDisplay};
}

function copyKey() {
  const key = document.getElementById("key").innerText;
  navigator.clipboard.writeText(key).then(() => alert("Key copied to clipboard!"));
}

function copyInvite() {
  const invite = document.getElementById("invite").innerText;
  navigator.clipboard.writeText(invite).then(() => alert("Invite copied to clipboard!"));
}

window.onload = () => {
  const key = getTodayKey();
  document.getElementById("key").innerText = key;

  updateTimer();
  setInterval(updateTimer, 1000);
};
