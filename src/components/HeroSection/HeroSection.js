"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
require("./HeroSection.css");
var react_router_dom_1 = require("react-router-dom");
var AuthContext_1 = require("../../contexts/AuthContext");
var axios_1 = __importDefault(require("axios"));
var react_hot_toast_1 = __importDefault(require("react-hot-toast"));
var HeroSection = function () {
    var user = (0, AuthContext_1.useAuth)().user;
    var navigate = (0, react_router_dom_1.useNavigate)();
    var _a = (0, react_1.useState)({
        hours: 23,
        minutes: 59,
        seconds: 59
    }), timeLeft = _a[0], setTimeLeft = _a[1];
    // Таймер обратного отсчета для создания срочности
    (0, react_1.useEffect)(function () {
        var timer = setInterval(function () {
            setTimeLeft(function (prev) {
                if (prev.seconds > 0) {
                    return __assign(__assign({}, prev), { seconds: prev.seconds - 1 });
                }
                else if (prev.minutes > 0) {
                    return __assign(__assign({}, prev), { minutes: prev.minutes - 1, seconds: 59 });
                }
                else if (prev.hours > 0) {
                    return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
                }
                return prev;
            });
        }, 1000);
        return function () { return clearInterval(timer); };
    }, []);
    var handleBookTour = function () {
        navigate('/tours');
    };
    var handleGetBonus = function () { return __awaiter(void 0, void 0, void 0, function () {
        var error_1, message;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!user) {
                        react_hot_toast_1.default.error('Необходимо войти в систему для получения бонусов');
                        navigate('/login');
                        return [2 /*return*/];
                    }
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, axios_1.default.post('http://localhost:5000/api/bonus/add', { points: 500 })];
                case 2:
                    _c.sent();
                    react_hot_toast_1.default.success('Получено 500 бонусных баллов!');
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _c.sent();
                    message = ((_b = (_a = error_1.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.error) || 'Ошибка получения бонусов';
                    react_hot_toast_1.default.error(message);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var handleQuickContact = function () {
        // Прокрутка к форме контактов
        var contactSection = document.querySelector('.contact-form-section');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    };
    return ((0, jsx_runtime_1.jsx)("section", { className: "hero-section", children: (0, jsx_runtime_1.jsxs)("div", { className: "hero-background", children: [(0, jsx_runtime_1.jsx)("div", { className: "hero-overlay" }), (0, jsx_runtime_1.jsx)("div", { className: "urgency-banner", children: (0, jsx_runtime_1.jsxs)("div", { className: "urgency-content", children: [(0, jsx_runtime_1.jsx)("span", { className: "urgency-icon", children: "\u26A1" }), (0, jsx_runtime_1.jsxs)("span", { className: "urgency-text", children: [(0, jsx_runtime_1.jsx)("strong", { children: "\u041E\u0413\u0420\u0410\u041D\u0418\u0427\u0415\u041D\u041D\u041E\u0415 \u0412\u0420\u0415\u041C\u042F!" }), " \u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u0443\u0439\u0442\u0435\u0441\u044C \u0441\u0435\u0439\u0447\u0430\u0441 \u0438 \u043F\u043E\u043B\u0443\u0447\u0438\u0442\u0435 500 \u0431\u043E\u043D\u0443\u0441\u043E\u0432 + \u0441\u043A\u0438\u0434\u043A\u0443 15% \u043D\u0430 \u043F\u0435\u0440\u0432\u044B\u0439 \u0442\u0443\u0440"] }), (0, jsx_runtime_1.jsxs)("div", { className: "countdown", children: [(0, jsx_runtime_1.jsxs)("span", { className: "countdown-item", children: [(0, jsx_runtime_1.jsx)("span", { className: "countdown-number", children: timeLeft.hours.toString().padStart(2, '0') }), (0, jsx_runtime_1.jsx)("span", { className: "countdown-label", children: "\u0447\u0430\u0441\u043E\u0432" })] }), (0, jsx_runtime_1.jsx)("span", { className: "countdown-separator", children: ":" }), (0, jsx_runtime_1.jsxs)("span", { className: "countdown-item", children: [(0, jsx_runtime_1.jsx)("span", { className: "countdown-number", children: timeLeft.minutes.toString().padStart(2, '0') }), (0, jsx_runtime_1.jsx)("span", { className: "countdown-label", children: "\u043C\u0438\u043D" })] }), (0, jsx_runtime_1.jsx)("span", { className: "countdown-separator", children: ":" }), (0, jsx_runtime_1.jsxs)("span", { className: "countdown-item", children: [(0, jsx_runtime_1.jsx)("span", { className: "countdown-number", children: timeLeft.seconds.toString().padStart(2, '0') }), (0, jsx_runtime_1.jsx)("span", { className: "countdown-label", children: "\u0441\u0435\u043A" })] })] })] }) }), (0, jsx_runtime_1.jsxs)("div", { className: "hero-content", children: [(0, jsx_runtime_1.jsxs)("div", { className: "hero-text", children: [(0, jsx_runtime_1.jsxs)("div", { className: "bonus-badge", children: [(0, jsx_runtime_1.jsx)("span", { className: "bonus-icon", children: "\uD83C\uDF81" }), (0, jsx_runtime_1.jsx)("span", { className: "bonus-text", children: "500 \u0411\u041E\u041D\u0423\u0421\u041E\u0412 \u041F\u0420\u0418 \u0420\u0415\u0413\u0418\u0421\u0422\u0420\u0410\u0426\u0418\u0418" })] }), (0, jsx_runtime_1.jsxs)("h1", { className: "hero-title", children: ["\u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0434\u043B\u044F \u0441\u0435\u0431\u044F ", (0, jsx_runtime_1.jsx)("span", { className: "highlight", children: "\u043C\u0430\u0433\u0438\u044E \u0421\u043E\u0447\u0438" }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("span", { className: "subtitle-highlight", children: "\u0438 \u043F\u043E\u043B\u0443\u0447\u0438\u0442\u0435 500 \u0431\u043E\u043D\u0443\u0441\u043E\u0432 \u0441\u0440\u0430\u0437\u0443!" })] }), (0, jsx_runtime_1.jsxs)("p", { className: "hero-subtitle", children: ["\u041B\u0443\u0447\u0448\u0438\u0435 \u0442\u0443\u0440\u044B, \u044D\u043A\u0441\u043A\u0443\u0440\u0441\u0438\u0438 \u0438 \u043D\u0435\u0437\u0430\u0431\u044B\u0432\u0430\u0435\u043C\u044B\u0435 \u0432\u043F\u0435\u0447\u0430\u0442\u043B\u0435\u043D\u0438\u044F \u043D\u0430 \u0427\u0435\u0440\u043D\u043E\u043C\u043E\u0440\u0441\u043A\u043E\u043C \u043F\u043E\u0431\u0435\u0440\u0435\u0436\u044C\u0435.", (0, jsx_runtime_1.jsx)("strong", { children: "\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u0443\u0439\u0442\u0435\u0441\u044C \u0441\u0435\u0439\u0447\u0430\u0441 \u0438 \u043F\u043E\u043B\u0443\u0447\u0438\u0442\u0435 500 \u0431\u043E\u043D\u0443\u0441\u043E\u0432 + \u0441\u043A\u0438\u0434\u043A\u0443 15% \u043D\u0430 \u043F\u0435\u0440\u0432\u044B\u0439 \u0442\u0443\u0440!" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "social-proof", children: [(0, jsx_runtime_1.jsxs)("div", { className: "proof-stats", children: [(0, jsx_runtime_1.jsxs)("div", { className: "stat-item", children: [(0, jsx_runtime_1.jsx)("span", { className: "stat-number", children: "15,847" }), (0, jsx_runtime_1.jsx)("span", { className: "stat-label", children: "\u0434\u043E\u0432\u043E\u043B\u044C\u043D\u044B\u0445 \u043A\u043B\u0438\u0435\u043D\u0442\u043E\u0432" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "stat-item", children: [(0, jsx_runtime_1.jsx)("span", { className: "stat-number", children: "4.9" }), (0, jsx_runtime_1.jsx)("span", { className: "stat-label", children: "\u0440\u0435\u0439\u0442\u0438\u043D\u0433 \u0438\u0437 5" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "stat-item", children: [(0, jsx_runtime_1.jsx)("span", { className: "stat-number", children: "98%" }), (0, jsx_runtime_1.jsx)("span", { className: "stat-label", children: "\u0440\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u0443\u044E\u0442 \u043D\u0430\u0441" })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "recent-bookings", children: [(0, jsx_runtime_1.jsxs)("div", { className: "booking-notification", children: [(0, jsx_runtime_1.jsx)("span", { className: "user-avatar", children: "\uD83D\uDC64" }), (0, jsx_runtime_1.jsx)("span", { className: "booking-text", children: "\u041C\u0430\u0440\u0438\u044F \u0438\u0437 \u041C\u043E\u0441\u043A\u0432\u044B \u0437\u0430\u0431\u0440\u043E\u043D\u0438\u0440\u043E\u0432\u0430\u043B\u0430 \u0442\u0443\u0440 \"\u0421\u043E\u0447\u0438 + \u041A\u0440\u0430\u0441\u043D\u0430\u044F \u041F\u043E\u043B\u044F\u043D\u0430\" 2 \u043C\u0438\u043D\u0443\u0442\u044B \u043D\u0430\u0437\u0430\u0434" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "booking-notification", children: [(0, jsx_runtime_1.jsx)("span", { className: "user-avatar", children: "\uD83D\uDC64" }), (0, jsx_runtime_1.jsx)("span", { className: "booking-text", children: "\u0410\u043B\u0435\u043A\u0441\u0435\u0439 \u0438\u0437 \u0421\u041F\u0431 \u043F\u043E\u043B\u0443\u0447\u0438\u043B 500 \u0431\u043E\u043D\u0443\u0441\u043E\u0432 \u0438 \u0437\u0430\u0431\u0440\u043E\u043D\u0438\u0440\u043E\u0432\u0430\u043B \u043E\u0442\u0435\u043B\u044C 5 \u043C\u0438\u043D\u0443\u0442 \u043D\u0430\u0437\u0430\u0434" })] })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "hero-actions", children: [(0, jsx_runtime_1.jsxs)("button", { className: "btn btn-primary btn-large", onClick: handleGetBonus, children: [(0, jsx_runtime_1.jsx)("span", { className: "btn-icon", children: "\uD83C\uDF81" }), (0, jsx_runtime_1.jsxs)("span", { className: "btn-text", children: [(0, jsx_runtime_1.jsx)("span", { className: "btn-main", children: "\u041F\u043E\u043B\u0443\u0447\u0438\u0442\u044C 500 \u0431\u043E\u043D\u0443\u0441\u043E\u0432" }), (0, jsx_runtime_1.jsx)("span", { className: "btn-sub", children: "+ \u0441\u043A\u0438\u0434\u043A\u0430 15% \u043D\u0430 \u043F\u0435\u0440\u0432\u044B\u0439 \u0442\u0443\u0440" })] })] }), (0, jsx_runtime_1.jsxs)("button", { className: "btn btn-secondary btn-large", onClick: handleQuickContact, children: [(0, jsx_runtime_1.jsx)("span", { className: "btn-icon", children: "\uD83D\uDCDE" }), (0, jsx_runtime_1.jsxs)("span", { className: "btn-text", children: [(0, jsx_runtime_1.jsx)("span", { className: "btn-main", children: "\u0411\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u0430\u044F \u043A\u043E\u043D\u0441\u0443\u043B\u044C\u0442\u0430\u0446\u0438\u044F" }), (0, jsx_runtime_1.jsx)("span", { className: "btn-sub", children: "\u043E\u0442\u0432\u0435\u0442\u0438\u043C \u0437\u0430 30 \u0441\u0435\u043A\u0443\u043D\u0434" })] })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "hero-features", children: [(0, jsx_runtime_1.jsxs)("div", { className: "feature", children: [(0, jsx_runtime_1.jsx)("span", { className: "feature-icon", children: "\u2705" }), (0, jsx_runtime_1.jsx)("span", { children: "\u0413\u0430\u0440\u0430\u043D\u0442\u0438\u044F \u043B\u0443\u0447\u0448\u0435\u0439 \u0446\u0435\u043D\u044B" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "feature", children: [(0, jsx_runtime_1.jsx)("span", { className: "feature-icon", children: "\uD83D\uDEE1\uFE0F" }), (0, jsx_runtime_1.jsx)("span", { children: "\u0411\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u0430\u044F \u043E\u043F\u043B\u0430\u0442\u0430" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "feature", children: [(0, jsx_runtime_1.jsx)("span", { className: "feature-icon", children: "\uD83D\uDCF1" }), (0, jsx_runtime_1.jsx)("span", { children: "\u041C\u043E\u0431\u0438\u043B\u044C\u043D\u043E\u0435 \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0435" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "feature", children: [(0, jsx_runtime_1.jsx)("span", { className: "feature-icon", children: "\uD83C\uDFAF" }), (0, jsx_runtime_1.jsx)("span", { children: "\u041F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0439 \u043C\u0435\u043D\u0435\u0434\u0436\u0435\u0440" })] })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "hero-image", children: [(0, jsx_runtime_1.jsxs)("div", { className: "floating-card", children: [(0, jsx_runtime_1.jsxs)("div", { className: "card-header", children: [(0, jsx_runtime_1.jsx)("h3", { children: "\uD83D\uDD25 \u0413\u041E\u0420\u042F\u0427\u0415\u0415 \u041F\u0420\u0415\u0414\u041B\u041E\u0416\u0415\u041D\u0418\u0415" }), (0, jsx_runtime_1.jsx)("span", { className: "discount", children: "-30%" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "card-content", children: [(0, jsx_runtime_1.jsxs)("div", { className: "tour-info", children: [(0, jsx_runtime_1.jsx)("h4", { children: "\u0422\u0443\u0440 \"\u0421\u043E\u0447\u0438 + \u041A\u0440\u0430\u0441\u043D\u0430\u044F \u041F\u043E\u043B\u044F\u043D\u0430\"" }), (0, jsx_runtime_1.jsxs)("div", { className: "tour-details", children: [(0, jsx_runtime_1.jsx)("span", { children: "\uD83C\uDFE8 4* \u043E\u0442\u0435\u043B\u044C" }), (0, jsx_runtime_1.jsx)("span", { children: "\uD83C\uDF7D\uFE0F \u041F\u0438\u0442\u0430\u043D\u0438\u0435 \u0432\u043A\u043B\u044E\u0447\u0435\u043D\u043E" }), (0, jsx_runtime_1.jsx)("span", { children: "\uD83D\uDE97 \u0422\u0440\u0430\u043D\u0441\u0444\u0435\u0440" })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "price", children: [(0, jsx_runtime_1.jsx)("span", { className: "old-price", children: "45 000 \u20BD" }), (0, jsx_runtime_1.jsx)("span", { className: "new-price", children: "31 500 \u20BD" })] }), (0, jsx_runtime_1.jsx)("div", { className: "bonus-info", children: (0, jsx_runtime_1.jsx)("span", { className: "bonus-label", children: "+ 500 \u0431\u043E\u043D\u0443\u0441\u043E\u0432 \u043F\u0440\u0438 \u0431\u0440\u043E\u043D\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0438" }) }), (0, jsx_runtime_1.jsx)("button", { className: "btn btn-small btn-urgent", onClick: handleBookTour, children: "\u0417\u0430\u0431\u0440\u043E\u043D\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0441\u0435\u0439\u0447\u0430\u0441" }), (0, jsx_runtime_1.jsx)("div", { className: "stock-info", children: (0, jsx_runtime_1.jsx)("span", { className: "stock-text", children: "\u041E\u0441\u0442\u0430\u043B\u043E\u0441\u044C \u043C\u0435\u0441\u0442: 3" }) })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "review-card", children: [(0, jsx_runtime_1.jsx)("div", { className: "review-header", children: (0, jsx_runtime_1.jsxs)("div", { className: "reviewer-info", children: [(0, jsx_runtime_1.jsx)("span", { className: "reviewer-avatar", children: "\uD83D\uDC69\u200D\uD83D\uDCBC" }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("span", { className: "reviewer-name", children: "\u0410\u043D\u043D\u0430 \u041F\u0435\u0442\u0440\u043E\u0432\u0430" }), (0, jsx_runtime_1.jsx)("div", { className: "stars", children: "\u2B50\u2B50\u2B50\u2B50\u2B50" })] })] }) }), (0, jsx_runtime_1.jsx)("p", { className: "review-text", children: "\"\u041F\u043E\u043B\u0443\u0447\u0438\u043B\u0430 500 \u0431\u043E\u043D\u0443\u0441\u043E\u0432 \u043F\u0440\u0438 \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u0438 \u0438 \u0437\u0430\u0431\u0440\u043E\u043D\u0438\u0440\u043E\u0432\u0430\u043B\u0430 \u0442\u0443\u0440 \u0441\u043E \u0441\u043A\u0438\u0434\u043A\u043E\u0439 15%. \u041E\u0442\u0434\u044B\u0445 \u0431\u044B\u043B \u043F\u0440\u043E\u0441\u0442\u043E \u043F\u043E\u0442\u0440\u044F\u0441\u0430\u044E\u0449\u0438\u0439! \u041E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E \u043F\u043E\u0435\u0434\u0443 \u0435\u0449\u0435 \u0440\u0430\u0437.\"" })] })] })] })] }) }));
};
exports.default = HeroSection;
