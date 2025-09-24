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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var framer_motion_1 = require("framer-motion");
var CartContext_1 = require("../../contexts/CartContext");
var AuthContext_1 = require("../../contexts/AuthContext");
var react_router_dom_1 = require("react-router-dom");
var axios_1 = __importDefault(require("axios"));
var react_hot_toast_1 = __importDefault(require("react-hot-toast"));
var imageUtils_1 = require("../../utils/imageUtils");
var useAutoRefresh_1 = require("../../hooks/useAutoRefresh");
var UniversalHeroSection_1 = __importDefault(require("../../components/UniversalHeroSection/UniversalHeroSection"));
require("./PromotionsPage.css");
var PromotionsPage = function () {
    var _a = (0, react_1.useState)('Все'), selectedCategory = _a[0], setSelectedCategory = _a[1];
    var _b = (0, react_1.useState)([]), promotions = _b[0], setPromotions = _b[1];
    var _c = (0, react_1.useState)(true), loading = _c[0], setLoading = _c[1];
    var addToCart = (0, CartContext_1.useCart)().addToCart;
    var user = (0, AuthContext_1.useAuth)().user;
    var navigate = (0, react_router_dom_1.useNavigate)();
    var fetchPromotions = (0, react_1.useCallback)(function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, 3, 4]);
                    return [4 /*yield*/, axios_1.default.get('http://localhost:5000/api/promotions')];
                case 1:
                    response = _a.sent();
                    setPromotions(response.data);
                    return [3 /*break*/, 4];
                case 2:
                    error_1 = _a.sent();
                    console.error('Error fetching promotions:', error_1);
                    react_hot_toast_1.default.error('Ошибка загрузки горячих предложений');
                    return [3 /*break*/, 4];
                case 3:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    }); }, []);
    // Автоматическое обновление данных каждые 30 секунд
    (0, useAutoRefresh_1.useAutoRefresh)(fetchPromotions, { interval: 30000 });
    // Первоначальная загрузка
    (0, react_1.useEffect)(function () {
        fetchPromotions();
    }, [fetchPromotions]);
    // Получаем категории из базы данных
    var categories = __spreadArray(['Все'], Array.from(new Set(promotions.map(function (promotion) { return promotion.category || ''; }).filter(Boolean))), true);
    var filteredPromotions = selectedCategory === 'Все'
        ? promotions
        : promotions.filter(function (promotion) { return promotion.category === selectedCategory; });
    if (loading) {
        return ((0, jsx_runtime_1.jsx)("div", { className: "promotions-page", children: (0, jsx_runtime_1.jsx)(UniversalHeroSection_1.default, { pageName: "promotions", title: "\u0413\u043E\u0440\u044F\u0447\u0438\u0435 \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u044F", description: "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430 \u0433\u043E\u0440\u044F\u0447\u0438\u0445 \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u0439..." }) }));
    }
    var handleAddToCart = function (promotion) { return __awaiter(void 0, void 0, void 0, function () {
        var promotionItem, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!user) {
                        react_hot_toast_1.default.error('Необходимо войти в систему');
                        navigate('/login');
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    promotionItem = {
                        id: promotion.id,
                        name: promotion.title,
                        description: promotion.description,
                        price: 0, // Промоции бесплатны
                        type: 'promotion'
                    };
                    return [4 /*yield*/, addToCart(promotion.id, 'tour', promotionItem)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var formatDate = function (dateString) {
        return new Date(dateString).toLocaleDateString('ru-RU');
    };
    var isExpired = function (dateString) {
        return new Date(dateString) < new Date();
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "promotions-page", children: [(0, jsx_runtime_1.jsx)(UniversalHeroSection_1.default, { pageName: "promotions", title: "\u0413\u043E\u0440\u044F\u0447\u0438\u0435 \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u044F", description: "\u041D\u0435 \u0443\u043F\u0443\u0441\u0442\u0438\u0442\u0435 \u0432\u043E\u0437\u043C\u043E\u0436\u043D\u043E\u0441\u0442\u044C \u0441\u044D\u043A\u043E\u043D\u043E\u043C\u0438\u0442\u044C \u043D\u0430 \u043F\u0443\u0442\u0435\u0448\u0435\u0441\u0442\u0432\u0438\u044F\u0445" }), (0, jsx_runtime_1.jsxs)("div", { className: "promotions-container", children: [(0, jsx_runtime_1.jsxs)("aside", { className: "filters-sidebar", children: [(0, jsx_runtime_1.jsx)("h3", { children: "\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438 \u0441\u043A\u0438\u0434\u043E\u043A" }), (0, jsx_runtime_1.jsx)("div", { className: "filter-group", children: (0, jsx_runtime_1.jsx)("select", { className: "category-select", value: selectedCategory, onChange: function (e) { return setSelectedCategory(e.target.value); }, children: categories.map(function (category) { return ((0, jsx_runtime_1.jsx)("option", { value: category, children: category }, category)); }) }) })] }), (0, jsx_runtime_1.jsx)("main", { className: "promotions-content", children: (0, jsx_runtime_1.jsx)("div", { className: "promotions-grid", children: filteredPromotions.map(function (promotion, index) { return ((0, jsx_runtime_1.jsxs)(framer_motion_1.motion.article, { className: "promotion-card ".concat(isExpired(promotion.valid_until || '') ? 'expired' : ''), initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.5, delay: index * 0.1 }, whileHover: { y: -5 }, children: [(0, jsx_runtime_1.jsxs)("div", { className: "promotion-image", children: [promotion.image_url ? ((0, jsx_runtime_1.jsx)("img", { src: (0, imageUtils_1.getImageUrl)(promotion.image_url), alt: promotion.title })) : ((0, jsx_runtime_1.jsx)("div", { className: "promotion-image-placeholder", children: promotion.title.charAt(0) })), (0, jsx_runtime_1.jsxs)("div", { className: "promotion-discount", children: ["-", promotion.discount_percent, "%"] }), promotion.valid_until && ((0, jsx_runtime_1.jsx)("div", { className: "promotion-validity", children: isExpired(promotion.valid_until) ? 'Истекло' : "\u0414\u043E ".concat(formatDate(promotion.valid_until)) }))] }), (0, jsx_runtime_1.jsxs)("div", { className: "promotion-content", children: [(0, jsx_runtime_1.jsx)("h3", { children: promotion.title }), (0, jsx_runtime_1.jsx)("p", { className: "promotion-description", children: promotion.description }), promotion.category && ((0, jsx_runtime_1.jsxs)("div", { className: "promotion-category", children: ["\uD83C\uDFF7\uFE0F ", promotion.category] })), (0, jsx_runtime_1.jsx)("button", { className: "btn-primary", onClick: function () { return handleAddToCart(promotion); }, disabled: isExpired(promotion.valid_until || ''), children: isExpired(promotion.valid_until || '') ? 'Предложение истекло' : 'Получить скидку' })] })] }, promotion.id)); }) }) })] })] }));
};
exports.default = PromotionsPage;
