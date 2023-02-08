// ==UserScript==
// @name         Show entire description automatically
// @namespace    finndotno
// @version      1.1
// @description  Skip the annoying extra step of having to click the "Vis hele beskrivelsen" button
// @author       Aaron Gregg
// @match        *://*.finn.no/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=finn.no
// @grant        GM_addStyle
// @run-at       document-idle
// ==/UserScript==

const showEntireDescriptionButton =
  "button[data-testid='show-entire-description']";

(function () {
  "use strict";
  document.querySelector(showEntireDescriptionButton).click();
})();
