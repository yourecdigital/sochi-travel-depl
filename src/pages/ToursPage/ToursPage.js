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
require("./ToursPage.css");
var ToursPage = function () {
    var _a = (0, react_1.useState)('Все'), selectedCategory = _a[0], setSelectedCategory = _a[1];
    var _b = (0, react_1.useState)('Все'), selectedCity = _b[0], setSelectedCity = _b[1];
    var _c = (0, react_1.useState)('Все'), selectedType = _c[0], setSelectedType = _c[1];
    var _d = (0, react_1.useState)([]), tours = _d[0], setTours = _d[1];
    var _e = (0, react_1.useState)(true), loading = _e[0], setLoading = _e[1];
    var addToCart = (0, CartContext_1.useCart)().addToCart;
    var user = (0, AuthContext_1.useAuth)().user;
    var navigate = (0, react_router_dom_1.useNavigate)();
    var fetchData = (0, react_1.useCallback)(function () { return __awaiter(void 0, void 0, void 0, function () {
        var toursResponse, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, 3, 4]);
                    return [4 /*yield*/, axios_1.default.get('http://localhost:5000/api/tours')];
                case 1:
                    toursResponse = _a.sent();
                    setTours(toursResponse.data);
                    return [3 /*break*/, 4];
                case 2:
                    error_1 = _a.sent();
                    console.error('Error fetching data:', error_1);
                    react_hot_toast_1.default.error('Ошибка загрузки данных');
                    return [3 /*break*/, 4];
                case 3:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    }); }, []);
    // Автоматическое обновление данных каждые 30 секунд
    var refresh = (0, useAutoRefresh_1.useAutoRefresh)(fetchData, { interval: 30000 }).refresh;
    // Первоначальная загрузка
    (0, react_1.useEffect)(function () {
        fetchData();
    }, [fetchData]);
    // Получаем уникальные категории, города и типы из данных
    var tourCategories = __spreadArray(['Все'], Array.from(new Set(tours.map(function (tour) { return tour.category || ''; }).filter(Boolean))), true);
    var tourCities = __spreadArray(['Все'], Array.from(new Set(tours.map(function (tour) { return tour.city || tour.destination || ''; }).filter(Boolean))), true);
    var tourTypes = __spreadArray(['Все'], Array.from(new Set(tours.map(function (tour) { return tour.tour_type || ''; }).filter(Boolean))), true);
    var filteredTours = tours.filter(function (tour) {
        var categoryMatch = selectedCategory === 'Все' || tour.category === selectedCategory;
        var cityMatch = selectedCity === 'Все' || tour.city === selectedCity || tour.destination === selectedCity;
        var typeMatch = selectedType === 'Все' || tour.tour_type === selectedType;
        return categoryMatch && cityMatch && typeMatch;
    });
    if (loading) {
        return ((0, jsx_runtime_1.jsx)("div", { className: "tours-page", children: (0, jsx_runtime_1.jsx)("div", { className: "tours-hero", children: (0, jsx_runtime_1.jsx)("h1", { children: "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430 \u0442\u0443\u0440\u043E\u0432..." }) }) }));
    }
    var handleAddToCart = function (tour) { return __awaiter(void 0, void 0, void 0, function () {
        var error_2;
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
                    return [4 /*yield*/, addToCart(tour.id, 'tour', tour)];
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
    var formatPrice = function (price) {
        return new Intl.NumberFormat('ru-RU').format(price);
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "tours-page", children: [(0, jsx_runtime_1.jsx)(UniversalHeroSection_1.default, { pageName: "tours", title: "\u0422\u0443\u0440\u044B \u043F\u043E \u0420\u043E\u0441\u0441\u0438\u0438", description: "\u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0434\u043B\u044F \u0441\u0435\u0431\u044F \u043A\u0440\u0430\u0441\u043E\u0442\u044B \u0420\u043E\u0441\u0441\u0438\u0438 - \u043E\u0442 \u0421\u043E\u0447\u0438 \u0434\u043E \u0421\u0430\u043D\u043A\u0442-\u041F\u0435\u0442\u0435\u0440\u0431\u0443\u0440\u0433\u0430" }), (0, jsx_runtime_1.jsxs)("div", { className: "tours-container", children: [(0, jsx_runtime_1.jsxs)("aside", { className: "filters-sidebar", children: [(0, jsx_runtime_1.jsx)("h3", { children: "\u0424\u0438\u043B\u044C\u0442\u0440\u044B" }), (0, jsx_runtime_1.jsxs)("div", { className: "filter-group", children: [(0, jsx_runtime_1.jsx)("h4", { children: "\u0413\u043E\u0440\u043E\u0434\u0430" }), (0, jsx_runtime_1.jsxs)("select", { className: "filter-select", value: selectedCity, onChange: function (e) { return setSelectedCity(e.target.value); }, children: [(0, jsx_runtime_1.jsx)("option", { value: "\u0412\u0441\u0435", children: "\u0412\u0441\u0435 \u0433\u043E\u0440\u043E\u0434\u0430" }), tourCities.filter(function (city) { return city !== 'Все'; }).map(function (city) { return ((0, jsx_runtime_1.jsx)("option", { value: city, children: city }, city)); })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "filter-group", children: [(0, jsx_runtime_1.jsx)("h4", { children: "\u0422\u0438\u043F\u044B \u0442\u0443\u0440\u043E\u0432" }), (0, jsx_runtime_1.jsxs)("select", { className: "filter-select", value: selectedType, onChange: function (e) { return setSelectedType(e.target.value); }, children: [(0, jsx_runtime_1.jsx)("option", { value: "\u0412\u0441\u0435", children: "\u0412\u0441\u0435 \u0442\u0438\u043F\u044B" }), tourTypes.filter(function (type) { return type !== 'Все'; }).map(function (type) { return ((0, jsx_runtime_1.jsx)("option", { value: type, children: type }, type)); })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "filter-group", children: [(0, jsx_runtime_1.jsx)("h4", { children: "\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438" }), (0, jsx_runtime_1.jsxs)("select", { className: "filter-select", value: selectedCategory, onChange: function (e) { return setSelectedCategory(e.target.value); }, children: [(0, jsx_runtime_1.jsx)("option", { value: "\u0412\u0441\u0435", children: "\u0412\u0441\u0435 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438" }), tourCategories.filter(function (cat) { return cat !== 'Все'; }).map(function (category) { return ((0, jsx_runtime_1.jsx)("option", { value: category, children: category }, category)); })] })] })] }), (0, jsx_runtime_1.jsx)("main", { className: "tours-content", children: (0, jsx_runtime_1.jsx)("div", { className: "tours-grid", children: filteredTours.map(function (tour, index) { return ((0, jsx_runtime_1.jsxs)(framer_motion_1.motion.article, { className: "tour-card", initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.5, delay: index * 0.1 }, whileHover: { y: -5 }, children: [(0, jsx_runtime_1.jsxs)("div", { className: "tour-image", onClick: function () { return navigate("/tour/".concat(tour.id)); }, style: { cursor: 'pointer' }, children: [tour.image_url ? ((0, jsx_runtime_1.jsx)("img", { src: (0, imageUtils_1.getImageUrl)(tour.image_url), alt: tour.name })) : ((0, jsx_runtime_1.jsx)("div", { className: "tour-image-placeholder", children: tour.name.charAt(0) })), (0, jsx_runtime_1.jsxs)("div", { className: "tour-price", children: [formatPrice(tour.price), " \u20BD"] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "tour-content", children: [(0, jsx_runtime_1.jsx)("h3", { onClick: function () { return navigate("/tour/".concat(tour.id)); }, style: { cursor: 'pointer', textDecoration: 'underline' }, children: tour.name }), (0, jsx_runtime_1.jsx)("p", { className: "tour-description", children: tour.description }), tour.duration && ((0, jsx_runtime_1.jsxs)("p", { className: "tour-duration", children: ["\u23F1 ", tour.duration] })), tour.city && ((0, jsx_runtime_1.jsxs)("p", { className: "tour-destination", children: ["\uD83C\uDFD9\uFE0F ", tour.city] })), tour.destination && !tour.city && ((0, jsx_runtime_1.jsxs)("p", { className: "tour-destination", children: ["\uD83D\uDCCD ", tour.destination] })), tour.category && ((0, jsx_runtime_1.jsxs)("p", { className: "tour-category", children: ["\uD83C\uDFF7\uFE0F ", tour.category] })), tour.tour_type && ((0, jsx_runtime_1.jsxs)("p", { className: "tour-type", children: ["\uD83C\uDFAF ", tour.tour_type] })), (0, jsx_runtime_1.jsxs)("div", { className: "tour-buttons", children: [(0, jsx_runtime_1.jsx)("button", { className: "btn-secondary", onClick: function () { return navigate("/tour/".concat(tour.id)); }, children: "\u041F\u043E\u0434\u0440\u043E\u0431\u043D\u0435\u0435" }), (0, jsx_runtime_1.jsx)("button", { className: "btn-primary", onClick: function () { return handleAddToCart(tour); }, children: "\u0417\u0430\u0431\u0440\u043E\u043D\u0438\u0440\u043E\u0432\u0430\u0442\u044C" })] })] })] }, tour.id)); }) }) })] })] }));
};
exports.default = ToursPage;
