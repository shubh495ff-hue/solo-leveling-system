let currentPlayer = null;

// --- 1. LOGIN LOGIC ---
function login() {
    const name = document.getElementById('username-input').value;
    if (!name) return alert("Please enter a name to link with the System!");

    const savedData = localStorage.getItem(name);
    
    if (savedData) {
        currentPlayer = JSON.parse(savedData);
    } else {
        // New Hunter Initialization
        currentPlayer = {
            name: name,
            grindCount: 0,
            level: 1,
            rank: "E-Rank",
            class: "None (Reach Lvl 10)"
        };
        saveData();
    }

    showGame();
}

function saveData() {
    localStorage.setItem(currentPlayer.name, JSON.stringify(currentPlayer));
}

function showGame() {
    document.getElementById('login-screen').classList.add('hidden');
    document.getElementById('game-screen').classList.remove('hidden');
    updateUI();
}

// --- 2. GAME ACTION LOGIC (With Animation Support) ---
document.getElementById('grind-btn').addEventListener('click', () => {
    // TRIGGER SHAKE ANIMATION
    const container = document.querySelector('.container');
    container.classList.remove('shake-effect');
    void container.offsetWidth; // Magic line to reset the animation
    container.classList.add('shake-effect');

    currentPlayer.grindCount++;
    
    // Level up logic
    if (currentPlayer.grindCount >= 10) {
        currentPlayer.level++;
        currentPlayer.grindCount = 0;
        checkRankAndClass();
    }

    saveData();
    updateUI();
});

// --- 3. RANK & CLASS UPGRADE LOGIC ---
function checkRankAndClass() {
    if (currentPlayer.level >= 5 && currentPlayer.level < 10) {
        currentPlayer.rank = "D-Rank";
    } else if (currentPlayer.level >= 10) {
        currentPlayer.rank = "C-Rank";
    }

    if (currentPlayer.level >= 10 && currentPlayer.class.includes("None")) {
        currentPlayer.class = "Assassin";
        alert("CRITICAL UPDATE: You have awakened the Assassin Class!");
    }
}

// --- 4. UI & IMAGE UPDATER ---
function updateUI() {
    document.getElementById('display-name').innerText = currentPlayer.name;
    document.getElementById('grind-count').innerText = currentPlayer.grindCount;
    document.getElementById('level').innerText = currentPlayer.level;
    document.getElementById('rank').innerText = currentPlayer.rank;
    document.getElementById('player-class').innerText = "Class: " + currentPlayer.class;
    
    // Smooth Progress Bar
    let progress = (currentPlayer.grindCount / 10) * 100;
    document.getElementById('progress-fill').style.width = progress + "%";

    // Dynamic Image Swapping
    const imgElement = document.getElementById('rank-card-img');

    if (currentPlayer.class === "Assassin") {
        imgElement.src = "assasin.jpg"; 
    } 
    else if (currentPlayer.rank === "C-Rank") {
        imgElement.src = "rank-c.jpg";
    } 
    else if (currentPlayer.rank === "D-Rank") {
        imgElement.src = "rank-d.jpg";
    } 
    else {
        imgElement.src = "rank-e.jpg";
    }
}

// --- 5. LOGOUT ---
function logout() {
    location.reload(); 
}
