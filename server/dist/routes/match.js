"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.matchRouter = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
const router = (0, express_1.Router)();
exports.matchRouter = router;
router.post('/register-match', controllers_1.registerMatch);
//# sourceMappingURL=match.js.map