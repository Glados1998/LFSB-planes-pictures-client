import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";

function flattenKeys(value, prefix = "") {
    return Object.entries(value).flatMap(([key, child]) => {
        const path = prefix ? `${prefix}.${key}` : key;
        return child && typeof child === "object" ? flattenKeys(child, path) : [path];
    });
}

test("all locales expose the same translation keys", async () => {
    const locales = await Promise.all(["fr", "en", "de"].map(async locale => {
        const file = await readFile(new URL(`../messages/${locale}.json`, import.meta.url), "utf8");
        return flattenKeys(JSON.parse(file)).sort();
    }));

    assert.deepEqual(locales[1], locales[0]);
    assert.deepEqual(locales[2], locales[0]);
});
