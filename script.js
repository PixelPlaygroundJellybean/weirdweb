// script.js

// --- Get References to HTML Elements ---
const landingPage = document.getElementById('landing-page'); // Added back
const welcomePage = document.getElementById('welcome-page');
const quotesPage = document.getElementById('quotes-page');
const cakePage = document.getElementById('cake-page');
const finalPage = document.getElementById('final-page');
// Array of all pages for easy iteration
const allPages = [landingPage, welcomePage, quotesPage, cakePage, finalPage]; // Added landingPage

// Buttons
const enterButton = document.getElementById('enter-button'); // Added back
const startButton = document.getElementById('start-button');
const quotesBack = document.getElementById('quotes-back');
const quotesNext = document.getElementById('quotes-next');
const cakeBack = document.getElementById('cake-back');
const finalBack = document.getElementById('final-back');

// Content Elements
const finalVideo = document.getElementById('finalVideo');
const quoteTextElem = document.getElementById('quoteText');
const cakeOptions = document.querySelectorAll('.cake-option');

// --- Data ---
const quotes = [
  "Wishing you a day filled with happiness and a year filled with joy! Happy Birthday!",
  "May your birthday be filled with sunshine, smiles, laughter, love, and cheer!",
  "Happy Birthday! Here's to another year of wonderful adventures and accomplishments.",
  "Sending you the warmest wishes on your special day. Hope it's fantastic!",
  "Cheers to you for another trip around the sun! Happy Birthday!"
];

// --- Core Functions ---

/**
 * Hides all pages and shows the specified page.
 * @param {HTMLElement} pageToShow - The page element to make active.
 */
function showPage(pageToShow) {
  allPages.forEach(page => {
    if (page) {
        page.classList.remove('active');
    } else {
        console.error("Error: A page element defined in allPages is missing in the HTML!");
    }
  });

  if (pageToShow) {
    pageToShow.classList.add('active');
    if (pageToShow === quotesPage) {
      revealQuote();
    }
    if (pageToShow === finalPage && finalVideo && finalVideo.paused) {
        finalVideo.play().catch(e => console.warn("Final video autoplay prevented:", e));
    }
  } else {
    console.error("Error: Attempted to show a page that doesn't exist or is null!");
  }
}

/**
 * Displays a random quote with a typing animation.
 */
function revealQuote() {
    if (!quoteTextElem || !quotesNext) {
        console.error("Quote text element or next button not found.");
        return;
    }
    quotesNext.disabled = true;
    quoteTextElem.textContent = '';
    let currentQuote = quoteTextElem.dataset.currentQuote || "";
    let newQuote;
    if (quotes.length <= 1) {
        newQuote = quotes[0] || "Happy Birthday!";
    } else {
        do {
            newQuote = quotes[Math.floor(Math.random() * quotes.length)];
        } while (newQuote === currentQuote);
    }
    quoteTextElem.dataset.currentQuote = newQuote;
    let i = 0;
    function typeLetter() {
        if (i < newQuote.length) {
            quoteTextElem.textContent += newQuote.charAt(i);
            i++;
            setTimeout(typeLetter, 40);
        } else {
            quotesNext.disabled = false;
        }
    }
    typeLetter();
}

// --- Event Listeners Setup ---
function setupEventListeners() {
    // Landing Page
    if (enterButton) enterButton.addEventListener('click', () => showPage(welcomePage));
    else console.error("Button #enter-button not found.");

    // Welcome Page
    if (startButton) startButton.addEventListener('click', () => showPage(quotesPage));
    else console.error("Button #start-button not found.");

    // Quotes Page
    if (quotesBack) quotesBack.addEventListener('click', () => showPage(welcomePage)); // Back to Welcome
    else console.error("Button #quotes-back not found.");

    if (quotesNext) quotesNext.addEventListener('click', () => { if (!quotesNext.disabled) showPage(cakePage); });
    else console.error("Button #quotes-next not found.");

    // Cake Page
    if (cakeBack) cakeBack.addEventListener('click', () => showPage(quotesPage));
    else console.error("Button #cake-back not found.");

    if (cakeOptions.length > 0) {
        cakeOptions.forEach(option => {
            option.addEventListener('click', () => {
                const cakeId = option.getAttribute('data-cake');
                console.log(`Cake ${cakeId || 'unknown'} selected.`);
                showPage(finalPage);
            });
        });
    } else { console.warn("No elements with class '.cake-option' found."); }

    // Final Page
    if (finalBack) {
        finalBack.addEventListener('click', () => {
             if (finalVideo) finalVideo.pause();
             showPage(cakePage);
        });
    } else { console.error("Button #final-back not found."); }
}

// --- Initial Setup ---
function initializeApp() {
    if (finalVideo) {
        finalVideo.src = "videos/finalAnimation.mp4"; // Ensure this path is correct
        // finalVideo.autoplay = true; // 'autoplay' attribute in HTML is usually enough
        finalVideo.load();
    } else {
         console.error("Critical Error: Final video element (#finalVideo) not found.");
    }
    setupEventListeners();
    // The 'active' class in HTML now correctly determines the initial page (landing-page)
    console.log("Birthday Celebration Initialized. Current flow: Landing -> Welcome -> Quotes -> Cake -> Final.");
}

document.addEventListener('DOMContentLoaded', initializeApp);