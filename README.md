
# @jingwood/input-control

A lightweight Javascript library used to handle the input events of mouse, keyboard and touch control from end-user.

# Features

- Event registeriton and dispatching
- Receives and dispatches mouse, keyboard and touch events
- Provides and dispatches dragging events based on mouse and touch events
- Provides functions to check whether specified key is pressed
- Provides hotkey define feature (todo)

# Installation

```shell
npm install @jingwood/input-control
```

The package is published as native ES modules with no dependencies. It works as-is in modern browsers and bundlers.

# Hello-World

```js
import { InputController, Keys } from "@jingwood/input-control";

// get the element to receive mouse, keyboard and touch events
const element = document.getElementById(myTargetElement);

// make sure the element can receive keyboard events
element.tabIndex = 0;
element.focus();

// create controller and use 'on' method to receive input events
const controller = new InputController(element);

// keyup event
controller.on("keyup", e => {
  if (e.keyCode === Keys.Space) {
    alert("Space key was pressed");
  }
});

// drag event
controller.on("drag", e => {
  console.log("mouse moving " + e.movement.x + ", " + e.movement.y);
});
```

## Migrating from 1.x

- The source is no longer transpiled by Babel, and `@babel/runtime` / `@babel/preset-env` are no longer dependencies. If you need to support legacy browsers, transpile the package in your own build.
- Only the package root (`@jingwood/input-control`) can be imported. Replace deep imports such as `@jingwood/input-control/dist/keyboard` with the root: `Keys`, `FunctionKeys`, `MouseButtons`, `InputController` and `EventDispatcher` are all exported from it.

# Development

No install step is needed.

```shell
npm test     # unit tests (Node.js 22 or later)
npm start    # serve html/test.html to try the controller in a browser
```

# License

Released under MIT License

Copyright (C) 2015-2020 Jingwood, unvell.com, all rights reserved.
