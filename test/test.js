////////////////////////////////////////////////////////////////////////////////
// js-input-control
// A lightweight library to handle the mouse, keyboard and touch control.
//
// MIT License (C) 2015-2020 Jingwood, unvell.com, all rights reserved.
////////////////////////////////////////////////////////////////////////////////

import { InputController } from "../src/main.js";

window.addEventListener("load", e => {
  const element = document.getElementById("testbox");
  element.tabIndex = 0;
  element.focus();

  const controller = new InputController(element);
  const logtext = document.getElementById("logtext");

  let lastMsg = undefined;

  function log(msg) {
    if (lastMsg !== msg) {
      logtext.innerText += "\n";
      logtext.innerText += msg;
      lastMsg = msg;
    } else {
      logtext.innerText += ".";
    }

    logtext.scrollTop = logtext.scrollHeight;
  }

  function attachEventLog(eventName) {
    controller.on(eventName, e => {
      log(eventName);
      console.log(e);
    });
  }

  attachEventLog("mouseup");
  attachEventLog("mousedown");
  attachEventLog("mousemove");
  attachEventLog("mouseenter");
  attachEventLog("mouseout");
  attachEventLog("mousewheel");

  attachEventLog("drag");
  attachEventLog("begindrag");
  attachEventLog("enddrag");
  
  attachEventLog("keydown");
  attachEventLog("keyup");
  
});
