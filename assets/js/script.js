
// Install Button Javascipt

let deferredPrompt;
const installBtnContainer = document.querySelector(".install-btn-container");
const installBtn = document.querySelector('#install');

window.addEventListener('DOMContentLoaded', (event) => {    
    window.matchMedia('(display-mode: standalone)').addEventListener('change', ({ matches }) => {
        if (matches) {
            installBtnContainer.style.display = "none";
        } else {
            installBtnContainer.style.display = "block";
        }
    });
});

window.addEventListener('beforeinstallprompt', (e) => {
    installBtnContainer.style.display = "block";
    deferredPrompt = e;
});

installBtn.addEventListener('click', async () => {
    if (deferredPrompt !== null) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            deferredPrompt = null;
        }
    } else {
        alert('App is already installed!');
    }
});

// Register service worker

window.addEventListener('load', () => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js');
    }
});
