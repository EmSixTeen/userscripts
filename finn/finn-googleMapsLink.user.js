// ==UserScript==
// @name         Finn.no - Google Maps link
// @namespace    finndotno
// @version      1.0
// @description  Change the map link to Google Maps on Finn adverts and open it in a new tab
// @author       Aaron Gregg
// @match        *://*.finn.no/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=finn.no
// @grant        GM_addStyle
// @run-at       document-idle
// ==/UserScript==

(function () {
  "use strict";

  // Function to check if the aria-label attribute starts with the given text
  function startsWithAriaLabel(element, text) {
    const ariaLabel = element.getAttribute("aria-label");
    return ariaLabel && ariaLabel.startsWith(text);
  }

  // Function to add the style attribute to the element
  function addStyleToElement(element) {
    //element.style.outline = '2px solid red';
    element.style.display = "inline-flex";
  }

  // Function to extract postcode and location from aria-label
  function extractPostcodeAndLocation(element) {
    const ariaLabel = element.getAttribute("aria-label");
    const startIndex =
      ariaLabel.indexOf("Åpne kart for") + "Åpne kart for".length;
    const postcodeAndLocation = ariaLabel.substr(startIndex).trim();
    return postcodeAndLocation;
  }

  // Function to construct the Google Maps link
  function getGoogleMapsLink(postcodeAndLocation) {
    const baseUrl = "https://www.google.com/maps/search/?api=1&query=";
    const encodedAddress = encodeURIComponent(postcodeAndLocation);
    return baseUrl + encodedAddress;
  }

  // Get all <a> elements on the page
  const allLinks = document.getElementsByTagName("a");

  // Loop through the links to find the one with the specified aria-label
  for (const link of allLinks) {
    if (startsWithAriaLabel(link, "Åpne kart for")) {
      addStyleToElement(link);
      const postcodeAndLocation = extractPostcodeAndLocation(link);
      const googleMapsLink = getGoogleMapsLink(postcodeAndLocation);

      // Update the link href to open in a new tab
      link.setAttribute("href", googleMapsLink);
      link.setAttribute("target", "_blank");

      // Create a <span> element with the "(open in Google Maps)" text and add the "maps-label" class
      const openInGoogleMapsSpan = document.createElement("span");
      openInGoogleMapsSpan.textContent = " (open in Google Maps)";
      openInGoogleMapsSpan.classList.add("maps-label");

      // Append the <span> element after the <a> element
      link.parentNode.insertBefore(openInGoogleMapsSpan, link.nextSibling);

      break; // Stop after the first matching link
    }
  }
})();
