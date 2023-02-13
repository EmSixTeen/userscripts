// ==UserScript==
// @name         Highlight ads in search results
// @namespace    aliexpress
// @version      0.1
// @description  Checks for the ad label then highlights those results.
// @author       Aaron Gregg
// @match        *://*.aliexpress.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=aliexpress.ocom
// @grant        GM_addStyle
// @run-at       document-end
// ==/UserScript==

const adParentClass = "[class^='manhattan--container']";
const adLabelClass = "[class^='manhattan--ad']";
const adContentClass = "[class^='manhattan--content']";
const adLabelStyling = "background-color: #f87171;";
const adContentStyling =
  "background-color: #fecaca; outline: 2px solid #f87171; outline-offset: -2px;";
const scrollDelay = 125;
let timerDelay = 750;
let isScrolling;

// Set up function for delaying the script
function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

window.addEventListener(
  "load",
  function () {
    async function hideAds() {
      // Use the delay in ms
      await delay(timerDelay);

      // Find all the elements we want
      const ads = document.querySelectorAll(adParentClass);

      // Loop through the links we got
      ads.forEach((ad) => {
        const adLabelCheck = ad.querySelectorAll(adLabelClass);
        const adContent = ad.querySelectorAll(adContentClass);

        if (adLabelCheck.length == 1) {
          adContent[0].setAttribute("style", adContentStyling);
          adLabelCheck[0].setAttribute("style", adLabelStyling);
        }
      });
    }

    hideAds();

    // Listen for scroll events and run function when stopped scrolling
    // @link https://vanillajstoolkit.com/helpers/scrollstop/
    window.addEventListener(
      "scroll",
      function (event) {
        // Clear our timeout throughout the scroll
        window.clearTimeout(isScrolling);

        // Set a timeout to run after scrolling ends
        isScrolling = setTimeout(function () {
          // Reset the delay
          let timerDelay = 0;
          // Run the function
          hideAds();
        }, scrollDelay);
      },
      false
    );
  },
  false
);
