const API_URL = "https://solo-leveling-api-5aej.vercel.app"; 

let currentHunter = null;

async function login() {
    const name = document.getElementById('username-input').value;
    if (!name) return alert("NAME REQUIRED");

    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name })
        });
        
        // ADDED THIS: Check if the server actually answered
        if (!response.ok) throw new Error("Server Down");

        // FIXED THIS: Added 'await' here
        const data = await response.json();
        
        currentHunter = data;
        updateUI();
        
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('stats-screen').style.display = 'block';
    } catch (err) {
        console.error(err);
        alert("GATEWAY ERROR: BRAIN UNREACHABLE");
    }
}

function updateUI() {
    if (!currentHunter) return;
    document.getElementById('hunter-name').innerText = currentHunter.name;
    document.getElementById('level').innerText = currentHunter.level;
    document.getElementById('rank').innerText = currentHunter.rank;
    document.getElementById('grind').innerText = currentHunter.grindCount;
}

async function grind() {
    if (!currentHunter) return;
    
    currentHunter.grindCount++;
    
    if (currentHunter.grindCount > 10) currentHunter.rank = "D-Rank";
    if (currentHunter.grindCount > 20) currentHunter.level = 2;

    updateUI();

    try {
        await fetch(`${API_URL}/update`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(currentHunter)
        });
    } catch (err) {
        console.log("Sync failed, but progress kept locally.");
    }
}
