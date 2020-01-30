////////////////////////////////////////////////////////////////////////////////
// js-input-control
// A lightweight library to handle the mouse, keyboard and touch control.
//
// MIT License (C) 2015-2020 Jingwood, unvell.com, all rights reserved.
////////////////////////////////////////////////////////////////////////////////

const Keys = {
  Backspace: 8, Tab: 9, Enter: 13,
  Shift: 16, Control: 17, Alt: 18,

  Escape: 27, Space: 32, PageUp: 33, PageDown: 34,
  End: 35, Home: 36,
  Left: 37, Up: 38, Right: 39, Down: 40,
  Insert: 45, Delete: 46,

  D0: 48, D1: 49, D2: 50, D3: 51, D4: 52,
  D5: 53, D6: 54, D7: 55, D8: 56, D9: 57,

  A: 65, B: 66, C: 67, D: 68, E: 69, F: 70, G: 71,
  H: 72, I: 73, J: 74, K: 75, L: 76, M: 77, N: 78,
  O: 79, P: 80, Q: 81, R: 82, S: 83, T: 84,
  U: 85, V: 86, W: 87, X: 88, Y: 89, Z: 90,

  MacCommand_Firefox: 224, MacCommand_Opera: 17,
  MacCommand_Left: 91, MacCommand_Right: 93,
  
  Multiply: 106, Add: 107, Subtract: 108, Divide: 111,

  Backquote: 192,
};

export class KeyboardAgent {
  constructor(controller) {
    this.controller = controller;
    this.element = controller.element;

    this.pressedKeys = [];

    this.attach();
  }

  attach() {
    const controller = this.controller;
    const element = this.element;

    element.addEventListener("keydown", (e) => {
      this.pressedKeys._t_pushIfNotExist(e.keyCode);

      const isProcessed = controller.onkeydown(e.keyCode);

      if (isProcessed) {
        e.preventDefault();
        return false;
      }
    });

    window.addEventListener("keyup", (e) => {
      this.pressedKeys._t_remove(e.keyCode);
      controller.onkeyup(e.keyCode);
    });

    // element.addEventListener("blur", (e) => {
    //   this.pressedKeys._t_clear();
    // });

    window.addEventListener("blur", (e) => {
      this.pressedKeys._t_clear();
    });
  }
}

export { Keys }