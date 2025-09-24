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
var react_router_dom_1 = require("react-router-dom");
var framer_motion_1 = require("framer-motion");
var axios_1 = __importDefault(require("axios"));
var CartContext_1 = require("../../contexts/CartContext");
var AuthContext_1 = require("../../contexts/AuthContext");
var react_hot_toast_1 = __importDefault(require("react-hot-toast"));
var imageUtils_1 = require("../../utils/imageUtils");
require("./CruiseDetailPage.css");
var CruiseDetailPage = function () {
    var id = (0, react_router_dom_1.useParams)().id;
    var navigate = (0, react_router_dom_1.useNavigate)();
    var _a = (0, react_1.useState)(null), cruise = _a[0], setCruise = _a[1];
    var _b = (0, react_1.useState)(true), loading = _b[0], setLoading = _b[1];
    var _c = (0, react_1.useState)(null), error = _c[0], setError = _c[1];
    var addToCart = (0, CartContext_1.useCart)().addToCart;
    var user = (0, AuthContext_1.useAuth)().user;
    (0, react_1.useEffect)(function () {
        fetchCruise();
    }, [id]);
    var fetchCruise = function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, error_1;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, 3, 4]);
                    setLoading(true);
                    return [4 /*yield*/, axios_1.default.get("http://localhost:5000/api/cruises/".concat(id))];
                case 1:
                    response = _b.sent();
                    setCruise(response.data);
                    return [3 /*break*/, 4];
                case 2:
                    error_1 = _b.sent();
                    console.error('Error fetching cruise:', error_1);
                    if (((_a = error_1.response) === null || _a === void 0 ? void 0 : _a.status) === 404) {
                        setError('Круиз не найден');
                    }
                    else {
                        setError('Ошибка загрузки круиза');
                    }
                    return [3 /*break*/, 4];
                case 3:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var handleAddToCart = function () { return __awaiter(void 0, void 0, void 0, function () {
        var error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!cruise)
                        return [2 /*return*/];
                    if (!user) {
                        react_hot_toast_1.default.error('Необходимо войти в систему');
                        navigate('/login');
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, addToCart(cruise.id, 'cruise', cruise)];
                case 2:
                    _a.sent();
                    react_hot_toast_1.default.success('Круиз добавлен в корзину');
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    console.error('Error adding to cart:', error_2);
                    react_hot_toast_1.default.error('Ошибка добавления в корзину');
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var handleBackClick = function () {
        navigate('/cruises');
    };
    if (loading) {
        return ((0, jsx_runtime_1.jsx)("div", { className: "cruise-detail-page", children: (0, jsx_runtime_1.jsxs)("div", { className: "loading-container", children: [(0, jsx_runtime_1.jsx)("div", { className: "loading-spinner" }), (0, jsx_runtime_1.jsx)("p", { children: "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430 \u043A\u0440\u0443\u0438\u0437\u0430..." })] }) }));
    }
    if (error || !cruise) {
        return ((0, jsx_runtime_1.jsx)("div", { className: "cruise-detail-page", children: (0, jsx_runtime_1.jsxs)("div", { className: "error-container", children: [(0, jsx_runtime_1.jsx)("h2", { children: "\u041E\u0448\u0438\u0431\u043A\u0430" }), (0, jsx_runtime_1.jsx)("p", { children: error || 'Круиз не найден' }), (0, jsx_runtime_1.jsx)("button", { onClick: handleBackClick, className: "btn-primary", children: "\u0412\u0435\u0440\u043D\u0443\u0442\u044C\u0441\u044F \u043A \u043A\u0440\u0443\u0438\u0437\u0430\u043C" })] }) }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { className: "cruise-detail-page", children: [(0, jsx_runtime_1.jsxs)("div", { className: "cruise-hero", children: [(0, jsx_runtime_1.jsxs)("div", { className: "cruise-hero-content", children: [(0, jsx_runtime_1.jsx)(framer_motion_1.motion.button, { onClick: handleBackClick, className: "back-button", whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: "\u2190 \u041D\u0430\u0437\u0430\u0434 \u043A \u043A\u0440\u0443\u0438\u0437\u0430\u043C" }), (0, jsx_runtime_1.jsxs)(framer_motion_1.motion.div, { className: "cruise-hero-info", initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6 }, children: [(0, jsx_runtime_1.jsx)("div", { className: "cruise-category", children: cruise.category || 'Круиз' }), (0, jsx_runtime_1.jsx)("h1", { className: "cruise-title", children: cruise.name }), (0, jsx_runtime_1.jsx)("p", { className: "cruise-description", children: cruise.description }), (0, jsx_runtime_1.jsxs)("div", { className: "cruise-price-section", children: [(0, jsx_runtime_1.jsxs)("div", { className: "cruise-price", children: [new Intl.NumberFormat('ru-RU').format(cruise.price), " \u20BD"] }), (0, jsx_runtime_1.jsx)("div", { className: "cruise-status", children: cruise.available ? ((0, jsx_runtime_1.jsx)("span", { className: "status-available", children: "\u2713 \u0414\u043E\u0441\u0442\u0443\u043F\u0435\u043D" })) : ((0, jsx_runtime_1.jsx)("span", { className: "status-unavailable", children: "\u2717 \u041D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u0435\u043D" })) })] }), cruise.available && ((0, jsx_runtime_1.jsx)(framer_motion_1.motion.button, { className: "btn-primary book-cruise-btn", onClick: handleAddToCart, whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: "\u0417\u0430\u0431\u0440\u043E\u043D\u0438\u0440\u043E\u0432\u0430\u0442\u044C" }))] })] }), cruise.image_url && ((0, jsx_runtime_1.jsx)("div", { className: "cruise-hero-image", children: (0, jsx_runtime_1.jsx)(framer_motion_1.motion.img, { src: (0, imageUtils_1.getImageUrl)(cruise.image_url), alt: cruise.name, initial: { opacity: 0, scale: 1.1 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.6 } }) }))] }), (0, jsx_runtime_1.jsx)("div", { className: "cruise-details", children: (0, jsx_runtime_1.jsx)("div", { className: "container", children: (0, jsx_runtime_1.jsxs)("div", { className: "cruise-details-grid", children: [(0, jsx_runtime_1.jsxs)("div", { className: "cruise-info-card", children: [(0, jsx_runtime_1.jsx)("h3", { children: "\u0418\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F \u043E \u043A\u0440\u0443\u0438\u0437\u0435" }), (0, jsx_runtime_1.jsxs)("div", { className: "info-item", children: [(0, jsx_runtime_1.jsx)("strong", { children: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435:" }), (0, jsx_runtime_1.jsx)("span", { children: cruise.name })] }), (0, jsx_runtime_1.jsxs)("div", { className: "info-item", children: [(0, jsx_runtime_1.jsx)("strong", { children: "\u041E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435:" }), (0, jsx_runtime_1.jsx)("span", { children: cruise.departure })] }), (0, jsx_runtime_1.jsxs)("div", { className: "info-item", children: [(0, jsx_runtime_1.jsx)("strong", { children: "\u0414\u043B\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u044C:" }), (0, jsx_runtime_1.jsx)("span", { children: cruise.duration || 'Не указана' })] }), (0, jsx_runtime_1.jsxs)("div", { className: "info-item", children: [(0, jsx_runtime_1.jsx)("strong", { children: "\u041D\u0430\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435:" }), (0, jsx_runtime_1.jsx)("span", { children: cruise.destination || 'Не указано' })] }), (0, jsx_runtime_1.jsxs)("div", { className: "info-item", children: [(0, jsx_runtime_1.jsx)("strong", { children: "\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F:" }), (0, jsx_runtime_1.jsx)("span", { children: cruise.category || 'Общие круизы' })] }), (0, jsx_runtime_1.jsxs)("div", { className: "info-item", children: [(0, jsx_runtime_1.jsx)("strong", { children: "\u0426\u0435\u043D\u0430:" }), (0, jsx_runtime_1.jsxs)("span", { className: "price-highlight", children: [new Intl.NumberFormat('ru-RU').format(cruise.price), " \u20BD"] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "info-item", children: [(0, jsx_runtime_1.jsx)("strong", { children: "\u0421\u0442\u0430\u0442\u0443\u0441:" }), (0, jsx_runtime_1.jsx)("span", { className: cruise.available ? 'status-available' : 'status-unavailable', children: cruise.available ? 'Доступен для бронирования' : 'Временно недоступен' })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "cruise-description-card", children: [(0, jsx_runtime_1.jsx)("h3", { children: "\u041F\u043E\u0434\u0440\u043E\u0431\u043D\u043E\u0435 \u043E\u043F\u0438\u0441\u0430\u043D\u0438\u0435" }), (0, jsx_runtime_1.jsx)("p", { children: cruise.description }), (0, jsx_runtime_1.jsxs)("div", { className: "cruise-features", children: [(0, jsx_runtime_1.jsx)("h4", { children: "\u041E\u0441\u043E\u0431\u0435\u043D\u043D\u043E\u0441\u0442\u0438 \u043A\u0440\u0443\u0438\u0437\u0430:" }), (0, jsx_runtime_1.jsxs)("ul", { children: [(0, jsx_runtime_1.jsx)("li", { children: "\u041A\u043E\u043C\u0444\u043E\u0440\u0442\u0430\u0431\u0435\u043B\u044C\u043D\u044B\u0435 \u043A\u0430\u044E\u0442\u044B" }), (0, jsx_runtime_1.jsx)("li", { children: "\u041F\u043E\u043B\u043D\u044B\u0439 \u043F\u0430\u043D\u0441\u0438\u043E\u043D" }), (0, jsx_runtime_1.jsx)("li", { children: "\u0420\u0430\u0437\u0432\u043B\u0435\u043A\u0430\u0442\u0435\u043B\u044C\u043D\u0430\u044F \u043F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u0430" }), (0, jsx_runtime_1.jsx)("li", { children: "\u042D\u043A\u0441\u043A\u0443\u0440\u0441\u0438\u0438 \u0432 \u043F\u043E\u0440\u0442\u0430\u0445" }), (0, jsx_runtime_1.jsx)("li", { children: "\u0421\u043F\u0430 \u0438 \u0444\u0438\u0442\u043D\u0435\u0441 \u0446\u0435\u043D\u0442\u0440\u044B" })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "contact-info", children: [(0, jsx_runtime_1.jsx)("h4", { children: "\u041A\u0430\u043A \u0437\u0430\u0431\u0440\u043E\u043D\u0438\u0440\u043E\u0432\u0430\u0442\u044C?" }), (0, jsx_runtime_1.jsx)("p", { children: "\u0414\u043B\u044F \u0431\u0440\u043E\u043D\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F \u044D\u0442\u043E\u0433\u043E \u043A\u0440\u0443\u0438\u0437\u0430 \u0432\u044B \u043C\u043E\u0436\u0435\u0442\u0435:" }), (0, jsx_runtime_1.jsxs)("ul", { children: [(0, jsx_runtime_1.jsx)("li", { children: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043A\u0440\u0443\u0438\u0437 \u0432 \u043A\u043E\u0440\u0437\u0438\u043D\u0443 \u0438 \u043E\u0444\u043E\u0440\u043C\u0438\u0442\u044C \u0437\u0430\u043A\u0430\u0437" }), (0, jsx_runtime_1.jsx)("li", { children: "\u0421\u0432\u044F\u0437\u0430\u0442\u044C\u0441\u044F \u0441 \u043D\u0430\u043C\u0438 \u043F\u043E \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0443 \u0438\u043B\u0438 \u0447\u0435\u0440\u0435\u0437 \u0444\u043E\u0440\u043C\u0443 \u043E\u0431\u0440\u0430\u0442\u043D\u043E\u0439 \u0441\u0432\u044F\u0437\u0438" }), (0, jsx_runtime_1.jsx)("li", { children: "\u041F\u043E\u0441\u0435\u0442\u0438\u0442\u044C \u043D\u0430\u0448 \u043E\u0444\u0438\u0441 \u0434\u043B\u044F \u043B\u0438\u0447\u043D\u043E\u0439 \u043A\u043E\u043D\u0441\u0443\u043B\u044C\u0442\u0430\u0446\u0438\u0438" })] })] })] })] }) }) }), (0, jsx_runtime_1.jsx)("div", { className: "cruise-cta", children: (0, jsx_runtime_1.jsx)("div", { className: "container", children: (0, jsx_runtime_1.jsxs)(framer_motion_1.motion.div, { className: "cta-content", initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, transition: { duration: 0.6 }, viewport: { once: true }, children: [(0, jsx_runtime_1.jsx)("h3", { children: "\u0413\u043E\u0442\u043E\u0432\u044B \u0437\u0430\u0431\u0440\u043E\u043D\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u044D\u0442\u043E\u0442 \u043A\u0440\u0443\u0438\u0437?" }), (0, jsx_runtime_1.jsx)("p", { children: "\u0421\u0432\u044F\u0436\u0438\u0442\u0435\u0441\u044C \u0441 \u043D\u0430\u043C\u0438 \u0434\u043B\u044F \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u044F \u0434\u043E\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0439 \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u0438 \u0438 \u043E\u0444\u043E\u0440\u043C\u043B\u0435\u043D\u0438\u044F \u0431\u0440\u043E\u043D\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F" }), (0, jsx_runtime_1.jsxs)("div", { className: "cta-buttons", children: [cruise.available && ((0, jsx_runtime_1.jsx)(framer_motion_1.motion.button, { className: "btn-primary", onClick: handleAddToCart, whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: "\u0417\u0430\u0431\u0440\u043E\u043D\u0438\u0440\u043E\u0432\u0430\u0442\u044C" })), (0, jsx_runtime_1.jsx)(framer_motion_1.motion.button, { className: "btn-secondary", onClick: function () { return navigate('/contact'); }, whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: "\u0421\u0432\u044F\u0437\u0430\u0442\u044C\u0441\u044F \u0441 \u043D\u0430\u043C\u0438" })] })] }) }) })] }));
};
exports.default = CruiseDetailPage;
