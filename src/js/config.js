
// Configuration settings
const config = {
    COOP: 'same-origin-allow-popups',
    COEP: 'require-corp',
    CORS: 'https://honeycomintranets.co.uk'
};

// Apply configuration dynamically
export function applyConfig() {
    console.log('config.js loaded:', config);
    // Additional logic to manipulate DOM or set conditions based on config
}