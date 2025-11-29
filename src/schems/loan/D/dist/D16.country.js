"use strict";
exports.__esModule = true;
var z = require("zod");
var schema = z.object({
    _id: z.string(),
    id: z.string(),
    en_short: z.string(),
    en_formal: z.string(),
    country_id: z.string(),
    status: z.string()
});
exports["default"] = schema;
