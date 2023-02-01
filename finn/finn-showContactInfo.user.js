// ==UserScript==
// @name         Show profile info automatically
// @namespace    finndotno
// @version      1.1
// @description  Skip the annoying extra step of having to click the "Vis profilinfo" link
// @author       Aaron Gregg
// @match        *://*.finn.no/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=finn.no
// @grant        GM_addStyle
// @run-at       document-end
// ==/UserScript==

const profileInfoButton = "#trust-object-profile-podlet .button--link";

(function () {
  "use strict";
  document.querySelector(profileInfoButton).click();
})();
