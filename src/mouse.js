////////////////////////////////////////////////////////////////////////////////
// js-input-control
// A lightweight library to handle the mouse, keyboard and touch control.
//
// MIT License (C) 2015-2020 Jingwood, unvell.com, all rights reserved.
////////////////////////////////////////////////////////////////////////////////

import { OperationModes } from "./defines";

const MouseButtons = {
  None: 0,
  Left: 1,
  Middle: 2,
  Right: 3,
  Touch0: 10,
  Touch1: 11,
  Touch2: 12,
  Touch3: 13,
  Touch4: 14,
  Touch5: 15,
};

export class MouseAgent {
  constructor(controller) {
    this.controller = controller;
    this.element = controller.element;

    // current mouse position
    this.position = { x: 0, y: 0 };

    // amount of mouse movement difference
    this.movement = { x: 0, y: 0 };
    this.firstMovementUpdate = true;

    // draging start and end position
    this.dragstart = { x: 0, y: 0 };
    this.dragend = { x: 0, y: 0 };
    this.dragCheckThreshold = 3;

    // mouse wheel
    this.wheeldelta = 0;

    // current pressed mouse buttons
    this.pressedButtons = [];

    this.attach();
  }

  attach() {
    const element = this.element;
    const controller = this.controller;

    element.addEventListener("mousedown", (e) => {

      const clientRect = element.getBoundingClientRect();

      this.position.x = e.clientX - clientRect.left;
      this.position.y = e.clientY - clientRect.top;

      this.movement.x = 0;
      this.movement.y = 0;

      this.dragstart.x = this.position.x;
      this.dragstart.y = this.position.y;

      switch (e.button) {
        case 0: this.pressedButtons._t_pushIfNotExist(MouseButtons.Left); break;
        case 1: this.pressedButtons._t_pushIfNotExist(MouseButtons.Middle); break;
        case 2: this.pressedButtons._t_pushIfNotExist(MouseButtons.Right); break;
      }

      this.controller.operationMode = OperationModes.DragReady;
      
      controller.onmousedown(this);
    });
 
    element.addEventListener("mousemove", e => {

      if (controller.operationMode == OperationModes.DragReady) {
        if (Math.abs(this.position.x - this.dragstart.x) > this.dragCheckThreshold
          || Math.abs(this.position.y - this.dragstart.y) > this.dragCheckThreshold) {
          
          controller.onbegindrag(this);
          controller.operationMode = OperationModes.Dragging;
        }
      }

      if (controller.operationMode === OperationModes.None) {
        const clientRect = element.getBoundingClientRect();
        const client = {
          x: e.clientX - clientRect.left,
          y: e.clientY - clientRect.top
        }

        if (this.firstMovementUpdate) {
          this.movement.x = 0;
          this.movement.y = 0;
          this.firstMovementUpdate = false;
        } else {
          this.movement.x = client.x - this.position.x;
          this.movement.y = client.y - this.position.y;
        }

        this.position.x = client.x;
        this.position.y = client.y;

        if (Math.abs(this.movement.x) > 0 || Math.abs(this.movement.y) > 0) {
          controller.onmousemove(this);
        }
      }
    });
  
    element.addEventListener("mousewheel", (e) => {
      this.wheeldelta = e.wheelDelta;

      const ret = controller.onmousewheel(this);
      
      if (ret) {
        e.preventDefault();
        return false;
      }
    }, { passive: false });

    element.addEventListener("mouseenter", (e) => {
      controller.onmouseenter(this);
    });

    element.addEventListener("mouseout", (e) => {
      controller.onmouseout(this);
    });

    // surface.addEventListener("blur", (e) => {
    //   this.pressedButtons._t_clear();
    // });

    window.addEventListener("blur", (e) => {
      this.pressedButtons._t_clear();
    });

    window.addEventListener("mousemove", (e) => {

      const clientRect = element.getBoundingClientRect();
      
      const client = {
        x: e.clientX - clientRect.left,
        y: e.clientY - clientRect.top
      };

      if (this.firstMovementUpdate) {
        this.movement.x = 0;
        this.movement.y = 0;
        this.firstMovementUpdate = false;
      } else {
        this.movement.x = client.x - this.position.x;
        this.movement.y = client.y - this.position.y;
      }
  
      this.position.x = client.x;
      this.position.y = client.y;
  
      switch (controller.operationMode) {
        case OperationModes.Dragging:
          controller.ondrag(this);
          break;
      }
    });
  
    window.addEventListener("mouseup", (e) => {
      if (controller.operationMode === OperationModes.Dragging) {
        controller.onenddrag(this);
      } else {
        controller.onmouseup(this);
      }
  
      switch (e.button) {
        case 0: this.pressedButtons._t_remove(MouseButtons.Left); break;
        case 1: this.pressedButtons._t_remove(MouseButtons.Middle); break;
        case 2: this.pressedButtons._t_remove(MouseButtons.Right); break;
      }
  
      controller.operationMode = OperationModes.None;
    });
  }

  // TODO: use stack
  setCursor(type) {
		this.element.style.cursor = type;
	}
}