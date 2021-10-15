"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const User_1 = __importDefault(require("../../entities/User"));
router.post('/friends', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { spotifyId } = body;
    try {
        const user = yield User_1.default.findOne({ where: { spotifyId }, relations: ['friends'] });
        if (user) {
            console.log(user);
            res.json({ success: true, friends: user.friends }).status(200);
        }
        else {
            res.json({ success: false, error: 'User not found', type: 'newAccount' }).status(404);
        }
    }
    catch (e) {
        console.log(e);
        res.json({ success: false, error: 'An error has occurred' }).status(400);
    }
}));
router.post('/me', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { spotifyId } = body;
    try {
        const user = yield User_1.default.findOne({ where: { spotifyId } });
        if (user) {
            res.json({ success: true, user }).status(200);
        }
        else {
            res.json({ success: false, error: 'User not found' }).status(404);
        }
    }
    catch (e) {
    }
}));
router.post('/check-account', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { spotifyId } = body;
    try {
        const user = yield User_1.default.findOne({ where: { spotifyId } });
        console.log(spotifyId);
        if (user) {
            console.log({ user });
            res.json({ success: true }).status(200);
        }
        else {
            res.json({ success: false, error: 'Create account' }).status(200);
        }
    }
    catch (e) {
        console.log(e);
        res.json({ error: e }).status(400);
    }
}));
module.exports = router;
//# sourceMappingURL=get.js.map