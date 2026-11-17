import { test } from "node:test";
import assert from "node:assert/strict";
import * as inputControl from "../src/controller.js";

test("package entry exports the public API", () => {
	for (const name of ["InputController", "EventDispatcher", "MouseButtons", "Keys", "FunctionKeys"]) {
		assert.ok(inputControl[name], `${name} is exported`);
	}
});

test("InputController registers its input events", () => {
	const proto = inputControl.InputController.prototype;
	for (const name of ["mousedown", "mouseup", "mousemove", "keydown", "keyup", "drag", "begindrag", "enddrag"]) {
		assert.ok(Object.getOwnPropertyDescriptor(proto, "on" + name), `on${name} is defined`);
	}
});
