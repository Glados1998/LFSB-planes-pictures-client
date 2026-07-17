import test from "node:test";
import assert from "node:assert/strict";
import {buildAircraftQuery} from "../src/lib/aircraftQuery.js";

test("buildAircraftQuery creates relation, text, sort, and pagination filters", () => {
    const query = buildAircraftQuery({
        operator: 4,
        type: 7,
        registration: "  hb-j  ",
    }, 3);

    assert.match(query, /filters\[operator]\[id]\[\$eq]=4/);
    assert.match(query, /filters\[type]\[id]\[\$eq]=7/);
    assert.match(query, /filters\[registration]\[\$containsi]=hb-j/);
    assert.match(query, /sort\[0]=DateOfPictureShoot%3Adesc/);
    assert.match(query, /pagination\[page]=3/);
    assert.match(query, /pagination\[pageSize]=12/);
});

test("buildAircraftQuery omits empty filters", () => {
    const query = buildAircraftQuery({operator: "", type: "", registration: "  "}, 1);
    assert.doesNotMatch(query, /filters/);
});
