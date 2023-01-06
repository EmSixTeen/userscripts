// ==UserScript==
// @name         Show profile info automatically
// @namespace    finndotno
// @version      0.1
// @updateURL    https://github.com/EmSixTeen/userscripts/raw/master/finn/finn-showContactInfo.user.js
// @description  Skip the annoying extra step of having to click the "Vis profilinfo" link
// @author       Aaron Gregg
// @match        *://*.finn.no/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=finn.no
// @grant        GM_addStyle
// ==/UserScript==

const contactInfoParam = "&showContactInfo=true";
const adBaseUrl = "https://www.finn.no/bap/forsale/ad.html?finnkode=";
const adLinkClass = ".ads__unit__link";
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
    // Function to check if a string is only consisting of numbers
    function containsOnlyNumbers(str) {
      return /^[0-9]+$/.test(str);
    }

    async function appendContactInfo() {
      // Use the delay in ms
      //   console.log("Delay timer: start");
      await delay(timerDelay);
      //   console.log("Delay timer: finish");

      // Find all the elements we want
      const adLinks = document.querySelectorAll(adLinkClass);

      // Loop through the links we got, and ammend the URL
      adLinks.forEach((adLink) => {
        let adLinkUrl = adLink.href;
        let adLinkPart = adLinkUrl.substring(adLinkUrl.lastIndexOf("/") + 1);

        // Check if the URL already contains the parameter we need, then add if not
        if (false == adLinkPart.includes(contactInfoParam)) {
          if (true == containsOnlyNumbers(adLinkPart)) {
            adLink.href = adBaseUrl + adLinkPart + contactInfoParam;
          } else {
            adLink.href = adLink.href + contactInfoParam;
          }
        }
      });
    }

    // Run the function to ammend the URL
    appendContactInfo();

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
          appendContactInfo();
        }, scrollDelay);
      },
      false
    );
  },
  false
);
