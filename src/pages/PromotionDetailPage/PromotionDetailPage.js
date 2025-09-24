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
var imageUtils_1 = require("../../utils/imageUtils");
require("./PromotionDetailPage.css");
var PromotionDetailPage = function () {
    var id = (0, react_router_dom_1.useParams)().id;
    var navigate = (0, react_router_dom_1.useNavigate)();
    var _a = (0, react_1.useState)(null), promotion = _a[0], setPromotion = _a[1];
    var _b = (0, react_1.useState)(true), loading = _b[0], setLoading = _b[1];
    var _c = (0, react_1.useState)(null), error = _c[0], setError = _c[1];
    var addToCart = (0, CartContext_1.useCart)().addToCart;
    var user = (0, AuthContext_1.useAuth)().user;
    (0, react_1.useEffect)(function () {
        fetchPromotion();
    }, [id]);
    var fetchPromotion = function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, error_1;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, 3, 4]);
                    setLoading(true);
                    return [4 /*yield*/, axios_1.default.get("http://localhost:5000/api/promotions/".concat(id))];
                case 1:
                    response = _b.sent();
                    setPromotion(response.data);
                    return [3 /*break*/, 4];
                case 2:
                    error_1 = _b.sent();
                    console.error('Error fetching promotion:', error_1);
                    if (((_a = error_1.response) === null || _a === void 0 ? void 0 : _a.status) === 404) {
                        setError('Акция не найдена');
                    }
                    else {
                        setError('Ошибка загрузки акции');
                    }
                    return [3 /*break*/, 4];
                case 3:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var handleContactUs = function () {
        navigate('/contact');
    };
    var handleBackClick = function () {
        navigate('/promotions');
    };
    var isExpired = (promotion === null || promotion === void 0 ? void 0 : promotion.valid_until) ? new Date(promotion.valid_until) < new Date() : false;
    if (loading) {
        return ((0, jsx_runtime_1.jsx)("div", { className: "promotion-detail-page", children: (0, jsx_runtime_1.jsxs)("div", { className: "loading-container", children: [(0, jsx_runtime_1.jsx)("div", { className: "loading-spinner" }), (0, jsx_runtime_1.jsx)("p", { children: "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430 \u0430\u043A\u0446\u0438\u0438..." })] }) }));
    }
    if (error || !promotion) {
        return ((0, jsx_runtime_1.jsx)("div", { className: "promotion-detail-page", children: (0, jsx_runtime_1.jsxs)("div", { className: "error-container", children: [(0, jsx_runtime_1.jsx)("h2", { children: "\u041E\u0448\u0438\u0431\u043A\u0430" }), (0, jsx_runtime_1.jsx)("p", { children: error || 'Акция не найдена' }), (0, jsx_runtime_1.jsx)("button", { onClick: handleBackClick, className: "btn-primary", children: "\u0412\u0435\u0440\u043D\u0443\u0442\u044C\u0441\u044F \u043A \u0430\u043A\u0446\u0438\u044F\u043C" })] }) }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { className: "promotion-detail-page", children: [(0, jsx_runtime_1.jsxs)("div", { className: "promotion-hero", children: [(0, jsx_runtime_1.jsxs)("div", { className: "promotion-hero-content", children: [(0, jsx_runtime_1.jsx)(framer_motion_1.motion.button, { onClick: handleBackClick, className: "back-button", whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: "\u2190 \u041D\u0430\u0437\u0430\u0434 \u043A \u0430\u043A\u0446\u0438\u044F\u043C" }), (0, jsx_runtime_1.jsxs)(framer_motion_1.motion.div, { className: "promotion-hero-info", initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6 }, children: [(0, jsx_runtime_1.jsx)("div", { className: "promotion-category", children: promotion.category || 'Акция' }), (0, jsx_runtime_1.jsx)("h1", { className: "promotion-title", children: promotion.title }), (0, jsx_runtime_1.jsx)("p", { className: "promotion-description", children: promotion.description }), (0, jsx_runtime_1.jsxs)("div", { className: "promotion-discount-section", children: [(0, jsx_runtime_1.jsxs)("div", { className: "discount-badge", children: ["-", promotion.discount_percent, "%"] }), (0, jsx_runtime_1.jsx)("div", { className: "promotion-status", children: promotion.active && !isExpired ? ((0, jsx_runtime_1.jsx)("span", { className: "status-active", children: "\u2713 \u0410\u043A\u0442\u0438\u0432\u043D\u0430" })) : ((0, jsx_runtime_1.jsx)("span", { className: "status-inactive", children: "\u2717 \u041D\u0435\u0430\u043A\u0442\u0438\u0432\u043D\u0430" })) })] }), promotion.valid_until && ((0, jsx_runtime_1.jsxs)("div", { className: "validity-info", children: [(0, jsx_runtime_1.jsx)("span", { className: "validity-label", children: "\u0414\u0435\u0439\u0441\u0442\u0432\u0443\u0435\u0442 \u0434\u043E:" }), (0, jsx_runtime_1.jsx)("span", { className: "validity-date", children: new Date(promotion.valid_until).toLocaleDateString('ru-RU') })] })), promotion.active && !isExpired && ((0, jsx_runtime_1.jsx)(framer_motion_1.motion.button, { className: "btn-primary contact-btn", onClick: handleContactUs, whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: "\u0423\u0437\u043D\u0430\u0442\u044C \u043F\u043E\u0434\u0440\u043E\u0431\u043D\u043E\u0441\u0442\u0438" }))] })] }), promotion.image_url && ((0, jsx_runtime_1.jsx)("div", { className: "promotion-hero-image", children: (0, jsx_runtime_1.jsx)(framer_motion_1.motion.img, { src: (0, imageUtils_1.getImageUrl)(promotion.image_url), alt: promotion.title, initial: { opacity: 0, scale: 1.1 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.6 } }) }))] }), (0, jsx_runtime_1.jsx)("div", { className: "promotion-details", children: (0, jsx_runtime_1.jsx)("div", { className: "container", children: (0, jsx_runtime_1.jsxs)("div", { className: "promotion-details-grid", children: [(0, jsx_runtime_1.jsxs)("div", { className: "promotion-info-card", children: [(0, jsx_runtime_1.jsx)("h3", { children: "\u0418\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F \u043E\u0431 \u0430\u043A\u0446\u0438\u0438" }), (0, jsx_runtime_1.jsxs)("div", { className: "info-item", children: [(0, jsx_runtime_1.jsx)("strong", { children: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435:" }), (0, jsx_runtime_1.jsx)("span", { children: promotion.title })] }), (0, jsx_runtime_1.jsxs)("div", { className: "info-item", children: [(0, jsx_runtime_1.jsx)("strong", { children: "\u0421\u043A\u0438\u0434\u043A\u0430:" }), (0, jsx_runtime_1.jsxs)("span", { className: "discount-highlight", children: [promotion.discount_percent, "%"] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "info-item", children: [(0, jsx_runtime_1.jsx)("strong", { children: "\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F:" }), (0, jsx_runtime_1.jsx)("span", { children: promotion.category || 'Общие акции' })] }), promotion.valid_until && ((0, jsx_runtime_1.jsxs)("div", { className: "info-item", children: [(0, jsx_runtime_1.jsx)("strong", { children: "\u0414\u0435\u0439\u0441\u0442\u0432\u0443\u0435\u0442 \u0434\u043E:" }), (0, jsx_runtime_1.jsx)("span", { children: new Date(promotion.valid_until).toLocaleDateString('ru-RU') })] })), (0, jsx_runtime_1.jsxs)("div", { className: "info-item", children: [(0, jsx_runtime_1.jsx)("strong", { children: "\u0421\u0442\u0430\u0442\u0443\u0441:" }), (0, jsx_runtime_1.jsx)("span", { className: promotion.active && !isExpired ? 'status-active' : 'status-inactive', children: promotion.active && !isExpired ? 'Активна' : 'Неактивна' })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "promotion-description-card", children: [(0, jsx_runtime_1.jsx)("h3", { children: "\u041F\u043E\u0434\u0440\u043E\u0431\u043D\u043E\u0435 \u043E\u043F\u0438\u0441\u0430\u043D\u0438\u0435" }), (0, jsx_runtime_1.jsx)("p", { children: promotion.description }), (0, jsx_runtime_1.jsxs)("div", { className: "promotion-benefits", children: [(0, jsx_runtime_1.jsx)("h4", { children: "\u041F\u0440\u0435\u0438\u043C\u0443\u0449\u0435\u0441\u0442\u0432\u0430 \u0430\u043A\u0446\u0438\u0438:" }), (0, jsx_runtime_1.jsxs)("ul", { children: [(0, jsx_runtime_1.jsx)("li", { children: "\u0417\u043D\u0430\u0447\u0438\u0442\u0435\u043B\u044C\u043D\u0430\u044F \u044D\u043A\u043E\u043D\u043E\u043C\u0438\u044F \u0441\u0440\u0435\u0434\u0441\u0442\u0432" }), (0, jsx_runtime_1.jsx)("li", { children: "\u0412\u044B\u0441\u043E\u043A\u043E\u0435 \u043A\u0430\u0447\u0435\u0441\u0442\u0432\u043E \u0443\u0441\u043B\u0443\u0433" }), (0, jsx_runtime_1.jsx)("li", { children: "\u0413\u0438\u0431\u043A\u0438\u0435 \u0443\u0441\u043B\u043E\u0432\u0438\u044F \u0431\u0440\u043E\u043D\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F" }), (0, jsx_runtime_1.jsx)("li", { children: "\u041F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0439 \u043F\u043E\u0434\u0445\u043E\u0434 \u043A \u043A\u0430\u0436\u0434\u043E\u043C\u0443 \u043A\u043B\u0438\u0435\u043D\u0442\u0443" }), (0, jsx_runtime_1.jsx)("li", { children: "\u041A\u0440\u0443\u0433\u043B\u043E\u0441\u0443\u0442\u043E\u0447\u043D\u0430\u044F \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u043A\u0430" })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "contact-info", children: [(0, jsx_runtime_1.jsx)("h4", { children: "\u041A\u0430\u043A \u0432\u043E\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C\u0441\u044F \u0430\u043A\u0446\u0438\u0435\u0439?" }), (0, jsx_runtime_1.jsx)("p", { children: "\u0414\u043B\u044F \u0443\u0447\u0430\u0441\u0442\u0438\u044F \u0432 \u044D\u0442\u043E\u0439 \u0430\u043A\u0446\u0438\u0438 \u0432\u044B \u043C\u043E\u0436\u0435\u0442\u0435:" }), (0, jsx_runtime_1.jsxs)("ul", { children: [(0, jsx_runtime_1.jsx)("li", { children: "\u0421\u0432\u044F\u0437\u0430\u0442\u044C\u0441\u044F \u0441 \u043D\u0430\u043C\u0438 \u043F\u043E \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0443 \u0438\u043B\u0438 \u0447\u0435\u0440\u0435\u0437 \u0444\u043E\u0440\u043C\u0443 \u043E\u0431\u0440\u0430\u0442\u043D\u043E\u0439 \u0441\u0432\u044F\u0437\u0438" }), (0, jsx_runtime_1.jsx)("li", { children: "\u041F\u043E\u0441\u0435\u0442\u0438\u0442\u044C \u043D\u0430\u0448 \u043E\u0444\u0438\u0441 \u0434\u043B\u044F \u043B\u0438\u0447\u043D\u043E\u0439 \u043A\u043E\u043D\u0441\u0443\u043B\u044C\u0442\u0430\u0446\u0438\u0438" }), (0, jsx_runtime_1.jsx)("li", { children: "\u0417\u0430\u043A\u0430\u0437\u0430\u0442\u044C \u043E\u0431\u0440\u0430\u0442\u043D\u044B\u0439 \u0437\u0432\u043E\u043D\u043E\u043A" })] })] })] })] }) }) }), (0, jsx_runtime_1.jsx)("div", { className: "promotion-cta", children: (0, jsx_runtime_1.jsx)("div", { className: "container", children: (0, jsx_runtime_1.jsxs)(framer_motion_1.motion.div, { className: "cta-content", initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, transition: { duration: 0.6 }, viewport: { once: true }, children: [(0, jsx_runtime_1.jsx)("h3", { children: "\u0425\u043E\u0442\u0438\u0442\u0435 \u0432\u043E\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C\u0441\u044F \u044D\u0442\u043E\u0439 \u0430\u043A\u0446\u0438\u0435\u0439?" }), (0, jsx_runtime_1.jsx)("p", { children: "\u0421\u0432\u044F\u0436\u0438\u0442\u0435\u0441\u044C \u0441 \u043D\u0430\u043C\u0438 \u043F\u0440\u044F\u043C\u043E \u0441\u0435\u0439\u0447\u0430\u0441, \u0447\u0442\u043E\u0431\u044B \u0443\u0437\u043D\u0430\u0442\u044C \u043F\u043E\u0434\u0440\u043E\u0431\u043D\u043E\u0441\u0442\u0438 \u0438 \u0437\u0430\u0431\u0440\u043E\u043D\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0443\u0441\u043B\u0443\u0433\u0443 \u0441\u043E \u0441\u043A\u0438\u0434\u043A\u043E\u0439" }), (0, jsx_runtime_1.jsxs)("div", { className: "cta-buttons", children: [(0, jsx_runtime_1.jsx)(framer_motion_1.motion.button, { className: "btn-primary", onClick: handleContactUs, whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: "\u0421\u0432\u044F\u0437\u0430\u0442\u044C\u0441\u044F \u0441 \u043D\u0430\u043C\u0438" }), (0, jsx_runtime_1.jsx)(framer_motion_1.motion.button, { className: "btn-secondary", onClick: function () { return navigate('/'); }, whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: "\u041F\u043E\u0441\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u0434\u0440\u0443\u0433\u0438\u0435 \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u044F" })] })] }) }) })] }));
};
exports.default = PromotionDetailPage;
