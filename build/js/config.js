console.log("****************CONFIG.JS***************");

// Configuration settings
const config = {
    COOP: 'same-origin-allow-popups',
    COEP: 'require-corp',
    CORS: 'https://manders-jones.eu'
};

// Apply configuration dynamically
function applyConfig() {
    console.log('Applying configuration:', config);
    // Additional logic to manipulate DOM or set conditions based on config
}

// Make applyConfig globally accessible
window.applyConfig = applyConfig;

// Initialize settings on load
window.onload = applyConfig;

console.log("****************END CONFIG.JS***************");
