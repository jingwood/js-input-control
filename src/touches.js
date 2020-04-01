////////////////////////////////////////////////////////////////////////////////
// js-input-control
// A lightweight library to handle the mouse, keyboard and touch control.
//
// MIT License (C) 2015-2020 Jingwood, unvell.com, all rights reserved.
////////////////////////////////////////////////////////////////////////////////

import { OperationModes } from "./defines";

export class TouchAgent {
  constructor(controller) {
    this.controller = controller;
    this.element = controller.element;
    
    this.fingers = 0;

    this.attach();
  }

  attach() {
    const controller = this.controller;
    const element = this.element;
    const mouseAgent = this.controller.mouseAgent;
    
    element.addEventListener("touchstart", (e) => {
      if (typeof e.touches === "object") {
        const t = e.touches[0];
        const clientRect = element.getBoundingClientRect();
        
        mouseAgent.position.x = t.clientX - clientRect.left;
        mouseAgent.position.y = t.clientY - clientRect.top;

        mouseAgent.movement.x = 0;
        mouseAgent.movement.y = 0;

        mouseAgent.dragstart.x = mouseAgent.position.x;
        mouseAgent.dragstart.y = mouseAgent.position.y;
        
        controller.operationMode = OperationModes.DragReady;
        this.fingers = e.touches.length;

        controller.raise("mousedown");
      }
    }, { passive: true });

    window.addEventListener("touchmove", (e) => {
			if (typeof e.touches === "object") {
				const t = e.touches[0];

				const clientRect = element.getBoundingClientRect();
				const client = {
					x: t.clientX - clientRect.left,
					y: t.clientY - clientRect.top
        }
        
				mouseAgent.movement.x = (client.x - mouseAgent.position.x);
				mouseAgent.movement.y = (client.y - mouseAgent.position.y);

				mouseAgent.position.x = client.x;
				mouseAgent.position.y = client.y;

				switch (controller.operationMode) {
					case OperationModes.DragReady:
            controller.raise("begindrag");
						e.preventDefault();
						controller.operationMode = OperationModes.Dragging;
						break;

					case OperationModes.Dragging:
  					controller.raise("drag");
						e.preventDefault();
						break;
				}
			}
		}, { passive: false });

		window.addEventListener("touchend", (e) => {
			if (e.touches) {
				this.fingers = e.length;
			} else {
				this.fingers = 0;
			}

			controller.raise("mouseup");
			controller.operationMode = OperationModes.None;
		});
	}
	
	createEventArgument(arg) {
		arg.touch = {
			fingers: this.fingers
		};
		return arg;
	}
}

