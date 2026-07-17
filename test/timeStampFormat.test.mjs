import test from "node:test";
import assert from "node:assert/strict";
import formatDate from "../utils/timeStampFormat.js";

test("formatDate formats a valid date with the requested locale", () => {
    assert.equal(formatDate("2025-01-02T12:00:00Z", "en-GB"), "02/01/2025");
});

test("formatDate returns the fallback for missing or invalid values", () => {
    assert.equal(formatDate(undefined), "N/A");
    assert.equal(formatDate("N/A"), "N/A");
    assert.equal(formatDate("", "en-GB", "Unknown"), "Unknown");
});
