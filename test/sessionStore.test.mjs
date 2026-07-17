import test, {afterEach, beforeEach} from "node:test";
import assert from "node:assert/strict";
import {getSessionJson, hasSessionFlag, setSessionFlag, setSessionJson,} from "../src/lib/sessionStore.js";

let values;

beforeEach(() => {
    values = new Map();
    globalThis.window = {
        sessionStorage: {
            getItem: key => values.get(key) ?? null,
            setItem: (key, value) => values.set(key, value),
        },
    };
});

afterEach(() => {
    delete globalThis.window;
});

test("session JSON helpers persist and restore values", () => {
    setSessionJson("aircraft", [{id: 1}]);
    assert.deepEqual(getSessionJson("aircraft", []), [{id: 1}]);
});

test("session JSON helper returns its fallback for malformed data", () => {
    values.set("aircraft", "not-json");
    assert.deepEqual(getSessionJson("aircraft", []), []);
});

test("session flag helpers store an explicit boolean flag", () => {
    assert.equal(hasSessionFlag("visited"), false);
    setSessionFlag("visited");
    assert.equal(hasSessionFlag("visited"), true);
});
