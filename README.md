
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
yarn add @jingwood/input-control
```

# Hello-World

```js

// get the element to receive mouse, keyboard and touch events
const element = document.getElementById(myTargetElement);

// make sure the element can receive keyboard events
element.tabIndex = 0;
element.focus();

// create controller and use 'on' method to receive input events
const controller = new InputController(element);

// keyup event
controller.on("keyup" e => {
  if (e.keyCode === 32) {
    alert("Space key was pressed");
  }
});

// drag event
controller.on("drag", e => {
  console.log("mouse moving " + e.movement.x + ", " + e.movement.y);
});
```

# License

Released under MIT License

Copyright (C) 2015-2020 Jingwood, unvell.com, all rights reserved.
