// ==UserScript==
// @name         Remove sold items
// @namespace    finndotno
// @version      0.2
// @description  Hide items that have been sold and given away
// @author       Aaron Gregg
// @match        *://*.finn.no/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=finn.no
// @grant        GM_addStyle
// @run-at       document-end
// ==/UserScript==

const adClass = ".ads__unit";
const textToFind = "Solgt";
const scrollDelay = 125;
let timerDelay = 1000;
let isScrolling;

// Set up function for delaying the script
function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

window.addEventListener(
  "load",
  function () {
    async function hideSoldItems() {
      // Use the delay in ms
      //   console.log("Delay timer: start");
      await delay(timerDelay);
      //   console.log("Delay timer: finish");

      // Find all the elements we want
      //const adLinks = document.querySelectorAll(adLinkClass);
      const ads = document.querySelectorAll(adClass);

      // Loop through the links we got, and ammend the URL
      ads.forEach((ad) => {
        if (ad.textContent.includes(textToFind)) {
          ad.setAttribute("style", "display: none;");
        }
      });
    }

    // Run the function to ammend the URL
    hideSoldItems();

    // Listen for scroll events and run function when stopped scrolling
    // @link https://vanillajstoolkit.com/helpers/scrollstop/
    window.addEventListener(
      "scroll",
      function (event) {
        // Clear our timeout throughout the scroll
        window.clearTimeout(isScrolling);

        // Set a timeout to run after scrolling ends
        isScrolling = setTimeout(function () {
          // Run the callback
          //   console.log("Scrolling has stopped.");
          // Reset the delay
          let timerDelay = 0;
          // Run the amend function
          hideSoldItems();
        }, scrollDelay);
      },
      false
    );
  },
  false
);
