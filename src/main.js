////////////////////////////////////////////////////////////////////////////////
// js-input-control
// A lightweight library to handle the mouse, keyboard and touch control.
//
// MIT License (C) 2015-2020 Jingwood, unvell.com, all rights reserved.
////////////////////////////////////////////////////////////////////////////////

import { MouseAgent, MouseButtons } from "./mouse";
import { EventDispatcher } from "./event.js";
import { OperationModes } from "./defines";
import { KeyboardAgent, Keys } from "./keyboard";
import { TouchAgent } from "./touches";

const defaultOptions = {
  elementId: undefined,
  elementInstance: undefined,
  disableContextMenu: true,
};

class InputController {
  constructor(element, options) {
    
    this.options = { ...defaultOptions, ...options };
    this.operationMode = OperationModes.None;
    this.element = element;

    if (!this.element && this.options.elementId) {
      this.element = document.getElementById(this.options.elementId);
    }

    if (!this.element) {
      throw "Must specify an element to receive user input.";
    }

    this.mouseAgent = new MouseAgent(this);
    this.keyboardAgent = new KeyboardAgent(this);
    this.touchAgent = new TouchAgent(this);

    if (this.options.disableContextMenu) {
      window.oncontextmenu = (e) => {
        e.preventDefault();
        return false;
      };
    }
  }

  raise(eventName) {
    if (eventName == "mousemove") {
      this.onmousemove(this.createEventArgument());
    } else {
      this.raiseEvent(eventName, this.createEventArgument());
    }
  }

  createEventArgument() {
    const arg = {};
    this.mouseAgent.createEventArgument(arg);
    this.keyboardAgent.createEventArgument(arg);
    this.touchAgent.createEventArgument(arg);
    arg.isButtonPressed = button => this.isButtonPressed(button);
    arg.isKeyPressed = key => this.isKeyPressed(key);
    return arg;
  }

  isButtonPressed(button) {
    return this.mouseAgent.isButtonPressed(button);
  }
  
  isKeyPressed(key) {
    return this.keyboardAgent.isKeyPressed(key);
  }

  setCursor(type) {
    this.mouseAgent.setCursor(type);
  }
}

new EventDispatcher(InputController).registerEvents(
  "mousedown", "mouseup", "mousemove", "mouseenter", "mouseout", "mousewheel",
  "keyup", "keydown",
  "drag", "begindrag", "enddrag"
);

export { InputController, EventDispatcher, MouseButtons, Keys };