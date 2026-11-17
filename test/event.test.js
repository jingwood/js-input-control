import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { EventDispatcher } from "../src/event.js";

describe("EventDispatcher", () => {
	test("on + raise", () => {
		class A {}
		new EventDispatcher(A).registerEvents("a");

		const a = new A();
		const received = [];
		a.on("a", (arg) => received.push(arg));
		a.ona("a.a");

		assert.deepEqual(received, ["a.a"]);
	});

	test("multiple event names separated by space", () => {
		class A {}
		new EventDispatcher(A).registerEvents("x", "y");

		const a = new A();
		const received = [];
		a.on("x y", (arg) => received.push(arg));
		a.onx(1);
		a.ony(2);

		assert.deepEqual(received, [1, 2]);
	});

	test("subclasses inherit events of the parent class", () => {
		class A {}
		new EventDispatcher(A).registerEvents("a");
		class B extends A {}
		new EventDispatcher(B).registerEvents("b");
		class C extends B {}
		new EventDispatcher(C).registerEvents("c");

		const c = new C();
		const received = [];
		c.on("a", (arg) => received.push(arg));
		c.on("c", (arg) => received.push(arg));
		c.ona("c.a");
		c.onc("c.c");

		assert.deepEqual(received, ["c.a", "c.c"]);
	});

	test("a listener returning true stops later listeners", () => {
		class A {}
		new EventDispatcher(A).registerEvents("a");

		const a = new A();
		const received = [];
		a.on("a", () => { received.push(1); return true; });
		a.on("a", () => { received.push(2); });

		assert.equal(a.ona(), true);
		assert.deepEqual(received, [1]);
	});

	test("removeEventListener", () => {
		class A {}
		new EventDispatcher(A).registerEvents("a");

		const a = new A();
		const received = [];
		const listener = (arg) => received.push(arg);
		a.on("a", listener);
		a.removeEventListener("a", listener);
		a.ona("ignored");

		assert.deepEqual(received, []);
	});
});
