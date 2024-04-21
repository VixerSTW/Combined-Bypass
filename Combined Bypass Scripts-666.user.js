// ==UserScript==
// @name         Combined Bypass Scripts
// @version      666
// @author       Vixer
// @description  Bypass Valyse Ad, Fluxus Key System, and Trigon Evo Key System. Async#4226 and woah24 no more electron bypass
// @match        *://*.valyseteam.net/*
// @match        *://*.linkvertise.com/*
// @match        *://*.flux.li/*
// @match        *://*.fluxteam.net/*
// @match        *://adshnk.com/*
// @match        *://trigonevo.fun/*
// @grant        GM_setClipboard
// @icon         https://i.ibb.co/nMBgVNz/skull.png
// @namespace    https://greasyfork.org/users/1160145
// @license      MIT
// @downloadURL https://update.greasyfork.org/scripts/475051/Combined%20Bypass%20Scripts.user.js
// @updateURL https://update.greasyfork.org/scripts/475051/Combined%20Bypass%20Scripts.meta.js
// ==/UserScript==

(function () {
  'use strict';

  // Valyse Bypasser
  const valyseCompletedURL = 'https://valyseteam.net/completed';
  const valyseNiceURL = 'https://valyseteam.net/nice';

  // Fluxus Key System Bypasser
  const fluxusRedirectMap = {
    "https://linkvertise.com/152666/fluxus-windows-check-1/1": "fluxteam.net/windows/checkpoint/check1.php",
    "https://linkvertise.com/152666/fluxus-windows-check-2/1": "fluxteam.net/windows/checkpoint/check2.php",
    "https://linkvertise.com/152666/fluxus-windows-main/1": "fluxteam.net/windows/checkpoint/main.php",
    "https://fluxteam.net/windows/checkpoint/check1.php": "linkvertise.com/152666/fluxus-windows-check-2/1",
    "https://fluxteam.net/windows/checkpoint/check2.php": "linkvertise.com/152666/fluxus-windows-main/1",
  };

  const fluxusCurrentURL = window.location.href;

  if (fluxusCurrentURL in fluxusRedirectMap) {
    window.location.replace(`https://${fluxusRedirectMap[fluxusCurrentURL]}`);
  }

  if (fluxusCurrentURL === "https://fluxteam.net/windows/checkpoint/check1.php") {
    localStorage.setItem('startTime', Date.now());
  }

  if (fluxusCurrentURL.includes("flux.li/windows/start.php?HWID=")) {
    const HWID = fluxusCurrentURL.split("=")[1];
    showNotification({ r: 0, g: 128, b: 0 }, "Got HWID! Completing Key System...");
    window.location.href = `https://flux.li/windows/start.php?7b20bcc1dfe26db966bb84f159da392f=false&HWID=${HWID}`;
  }

  if (fluxusCurrentURL === "https://flux.li/windows/start.php") {
    showNotification({ r: 255, g: 0, b: 0 }, "No HWID has been entered into the URL! Please enter your HWID into the URL and try again.");
  }

  if (fluxusCurrentURL === "https://fluxteam.net/windows/checkpoint/main.php") {
    window.stop();
    const startTime = localStorage.getItem('startTime');
    if (startTime) {
      const endTime = Date.now();
      const elapsedSeconds = Math.floor((endTime - parseInt(startTime)) / 1000);
      showNotification(
        { r: 0, g: 128, b: 0 },
        `Successfully bypassed Fluxus Keysystem! It took ${elapsedSeconds} seconds to reach here. Please copy your key and paste it into Fluxus.`
      );
    } else {
      showNotification(
        { r: 0, g: 128, b: 0 },
        'Successfully bypassed Fluxus Keysystem!'
      );
    }
  }

  // Trigon Evo Key System Bypasser
  const trigonRedirects = {
    "adshnk.com/zehQDS": "https://trigonevo.fun/whitelist/24h_checkpoint2.php",
    "adshnk.com/VhRDEv": "https://trigonevo.fun/whitelist/24h_checkpoint3.php",
    "adshnk.com/OkmDDR": "https://trigonevo.fun/whitelist/24h_key.php",
    "linkvertise.com/377810/12hcheck1/1": "https://trigonevo.fun/whitelist/12h_checkpoint2.php",
    "linkvertise.com/377810/12check2/1": "https://trigonevo.fun/whitelist/12h_key.php",
    "adshnk.com/5PbeQo": "https://trigonevo.fun/whitelist/Main.php"
  };

  const trigonCurrentURL = `${window.location.hostname}${window.location.pathname}`;

  const trigonRedirectURL = trigonRedirects[trigonCurrentURL];

  if (trigonRedirectURL) {
    window.location.replace(trigonRedirectURL);
  }

  // Add the new code here
  if (location.href.includes(".nexus" && "start.php")) {
    showNotification( { r: 0, g: 128, b: 0 }, "Please wait for Nexus verification...");
  }

  // Valyse Bypasser
  function showNotification(color, message) {
    const notificationDiv = document.createElement('div');
    notificationDiv.style.backgroundColor = `rgb(${color.r}, ${color.g}, ${color.b})`;
    notificationDiv.style.color = 'white';
    notificationDiv.style.position = 'fixed';
    notificationDiv.style.top = '0';
    notificationDiv.style.left = '0';
    notificationDiv.style.width = '100%';
    notificationDiv.style.padding = '10px';
    notificationDiv.style.textAlign = 'center';
    notificationDiv.style.fontWeight = 'bold';
    notificationDiv.textContent = message;
    document.body.appendChild(notificationDiv);
    setTimeout(() => {
      document.body.removeChild(notificationDiv);
    }, 5000);
  }
})();