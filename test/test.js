////////////////////////////////////////////////////////////////////////////////
// js-input-control
// A lightweight library to handle the mouse, keyboard and touch control.
//
// MIT License (C) 2015-2020 Jingwood, unvell.com, all rights reserved.
////////////////////////////////////////////////////////////////////////////////

import { InputController, EventDispatcher } from "../src/main.js";

import { Keys } from "../src/keyboard";

window.addEventListener("load", e => {
  const element = document.getElementById("testbox");
  element.tabIndex = 0;
  element.focus();

  const controller = new InputController(element);
  const logtext = document.getElementById("log");
  const logarg = document.getElementById("log-arg");

  let lastMsg = undefined;

  function log(msg, arg) {
    if (lastMsg !== msg) {
      logtext.innerText += "\n";
      logtext.innerText += msg;
      lastMsg = msg;
    } else {
      logtext.innerText += ".";
    }

    logtext.scrollTop = logtext.scrollHeight;
    logarg.innerText = JSON.stringify(arg);
  }

  function attachEventLog(eventName) {
    controller.on(eventName, e => {
      log(eventName, e);
      console.log(e);
      e.isProcessed = true;
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
  attachEventLog("hotkey");


  // event dispatcher test
  class A {
  }
  new EventDispatcher(A).registerEvents("a");

  class B extends A {
  }
  new EventDispatcher(B).registerEvents("b");

  class C extends B {
  }
  new EventDispatcher(C).registerEvents("c");
  
  const a = new A(), b = new B(), c = new C();
  a.on("a", n => console.log(n + " raised"));
  b.on("b", n => console.log(n + " raised"));
  c.on("c", n => console.log(n + " raised"));

  a.ona("a.a");
  b.onb("b.b");
  c.onc("c.c");

  b.on("a", n => console.log(n + " raised"));
  b.ona("b.a");

  c.on("a", n => console.log(n + " raised"));
  c.ona("c.a");
  c.ona("c.b");
  // event dispatcher test
});
