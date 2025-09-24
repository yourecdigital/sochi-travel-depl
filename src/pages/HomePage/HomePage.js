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
var AuthContext_1 = require("../../contexts/AuthContext");
var CartContext_1 = require("../../contexts/CartContext");
var axios_1 = __importDefault(require("axios"));
var UniversalHeroSection_1 = __importDefault(require("../../components/UniversalHeroSection/UniversalHeroSection"));
require("./HomePage.css");
var HomePage = function () {
    var navigate = (0, react_router_dom_1.useNavigate)();
    var user = (0, AuthContext_1.useAuth)().user;
    var addToCart = (0, CartContext_1.useCart)().addToCart;
    var _a = (0, react_1.useState)([]), promotions = _a[0], setPromotions = _a[1];
    var _b = (0, react_1.useState)([]), hotels = _b[0], setHotels = _b[1];
    var _c = (0, react_1.useState)([]), services = _c[0], setServices = _c[1];
    var handleQuickContact = function () {
        var contactSection = document.querySelector('.contact-section');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    };
    var handleBookNow = function (type) {
        navigate("/".concat(type));
    };
    var handleAddToCart = function (item) { return __awaiter(void 0, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!user) {
                        navigate('/login');
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, addToCart(item.id, 'room', item)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error('Error adding to cart:', error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var fetchRandomPromotion = function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1.default.get('http://localhost:5000/api/promotions/random?limit=1')];
                case 1:
                    response = _a.sent();
                    if (response.data && response.data.length > 0) {
                        setPromotions(response.data);
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    console.error('Error fetching random promotion:', error_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    (0, react_1.useEffect)(function () {
        var fetchData = function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, promotionsRes, hotelsRes, servicesRes, error_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, Promise.all([
                                axios_1.default.get('http://localhost:5000/api/promotions/random?limit=1'),
                                axios_1.default.get('http://localhost:5000/api/hotels'),
                                axios_1.default.get('http://localhost:5000/api/services')
                            ])];
                    case 1:
                        _a = _b.sent(), promotionsRes = _a[0], hotelsRes = _a[1], servicesRes = _a[2];
                        setPromotions(promotionsRes.data);
                        setHotels(hotelsRes.data);
                        setServices(servicesRes.data);
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _b.sent();
                        console.error('Error fetching data:', error_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        fetchData();
    }, []);
    return ((0, jsx_runtime_1.jsxs)("div", { className: "homepage", children: [(0, jsx_runtime_1.jsx)(UniversalHeroSection_1.default, { pageName: "home", title: "\u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0434\u043B\u044F \u0441\u0435\u0431\u044F<br><span class='highlight'>\u043C\u0430\u0433\u0438\u044E \u0421\u043E\u0447\u0438</span>", description: "\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u0443\u0439\u0442\u0435\u0441\u044C \u0441\u0435\u0439\u0447\u0430\u0441 \u0438 \u043F\u043E\u043B\u0443\u0447\u0438\u0442\u0435 500 \u0431\u043E\u043D\u0443\u0441\u043E\u0432 + \u0441\u043A\u0438\u0434\u043A\u0443 15% \u043D\u0430 \u043F\u0435\u0440\u0432\u044B\u0439 \u0442\u0443\u0440.", className: "hero-section", children: (0, jsx_runtime_1.jsx)("div", { className: "hero-content", children: (0, jsx_runtime_1.jsxs)("div", { className: "hero-actions-container", children: [(0, jsx_runtime_1.jsxs)("div", { className: "hero-left", children: [(0, jsx_runtime_1.jsxs)("div", { className: "hero-actions", children: [(0, jsx_runtime_1.jsxs)("div", { className: "hero-actions-row", children: [(0, jsx_runtime_1.jsxs)("button", { className: "btn btn-primary btn-large", onClick: function () { return handleBookNow('tours'); }, children: [(0, jsx_runtime_1.jsx)("span", { className: "btn-icon", children: "\uD83C\uDFD4\uFE0F" }), (0, jsx_runtime_1.jsxs)("div", { className: "btn-text", children: [(0, jsx_runtime_1.jsx)("span", { className: "btn-main", children: "\u0421\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u0442\u0443\u0440\u044B" }), (0, jsx_runtime_1.jsx)("span", { className: "btn-sub", children: "\u041E\u0442 1 800 \u20BD" })] })] }), (0, jsx_runtime_1.jsxs)("button", { className: "btn btn-primary btn-large", onClick: function () { return handleBookNow('hotels'); }, children: [(0, jsx_runtime_1.jsx)("span", { className: "btn-icon", children: "\uD83C\uDFE8" }), (0, jsx_runtime_1.jsxs)("div", { className: "btn-text", children: [(0, jsx_runtime_1.jsx)("span", { className: "btn-main", children: "\u0417\u0430\u0431\u0440\u043E\u043D\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043E\u0442\u0435\u043B\u044C" }), (0, jsx_runtime_1.jsx)("span", { className: "btn-sub", children: "\u041E\u0442 12 000 \u20BD" })] })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "hero-actions-row", children: [(0, jsx_runtime_1.jsxs)("button", { className: "btn btn-primary", onClick: handleQuickContact, children: [(0, jsx_runtime_1.jsx)("span", { className: "btn-icon", children: "\uD83D\uDCDE" }), (0, jsx_runtime_1.jsx)("span", { children: "\u0411\u044B\u0441\u0442\u0440\u0430\u044F \u043A\u043E\u043D\u0441\u0443\u043B\u044C\u0442\u0430\u0446\u0438\u044F" })] }), (0, jsx_runtime_1.jsxs)("button", { className: "btn btn-primary", onClick: function () { return navigate('/register'); }, children: [(0, jsx_runtime_1.jsx)("span", { className: "btn-icon", children: "\uD83C\uDF81" }), (0, jsx_runtime_1.jsx)("span", { children: "500 \u0431\u043E\u043D\u0443\u0441\u043E\u0432 \u043F\u0440\u0438 \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u0438" })] })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "hero-features", children: [(0, jsx_runtime_1.jsxs)("div", { className: "feature", children: [(0, jsx_runtime_1.jsx)("span", { className: "feature-icon", children: "\u2705" }), (0, jsx_runtime_1.jsx)("span", { children: "\u0413\u0430\u0440\u0430\u043D\u0442\u0438\u044F \u043B\u0443\u0447\u0448\u0435\u0439 \u0446\u0435\u043D\u044B" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "feature", children: [(0, jsx_runtime_1.jsx)("span", { className: "feature-icon", children: "\uD83D\uDEE1\uFE0F" }), (0, jsx_runtime_1.jsx)("span", { children: "\u0411\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u0430\u044F \u043E\u043F\u043B\u0430\u0442\u0430" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "feature", children: [(0, jsx_runtime_1.jsx)("span", { className: "feature-icon", children: "\uD83C\uDFAF" }), (0, jsx_runtime_1.jsx)("span", { children: "\u0418\u043D\u0434\u0438\u0432\u0438\u0434\u0443\u0430\u043B\u044C\u043D\u044B\u0439 \u043F\u043E\u0434\u0445\u043E\u0434" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "feature", children: [(0, jsx_runtime_1.jsx)("span", { className: "feature-icon", children: "\u2B50" }), (0, jsx_runtime_1.jsx)("span", { children: "4.9/5 \u0440\u0435\u0439\u0442\u0438\u043D\u0433 \u043A\u043B\u0438\u0435\u043D\u0442\u043E\u0432" })] })] })] }), (0, jsx_runtime_1.jsx)("div", { className: "hero-right", children: promotions.length > 0 ? ((0, jsx_runtime_1.jsxs)("div", { className: "hot-offer-card", children: [(0, jsx_runtime_1.jsxs)("div", { className: "card-header", children: [(0, jsx_runtime_1.jsx)("h3", { children: "\uD83D\uDD25 \u0413\u041E\u0420\u042F\u0427\u0415\u0415 \u041F\u0420\u0415\u0414\u041B\u041E\u0416\u0415\u041D\u0418\u0415" }), (0, jsx_runtime_1.jsxs)("span", { className: "discount", children: ["-", promotions[0].discount_percent, "%"] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "tour-info", children: [(0, jsx_runtime_1.jsx)("h4", { children: promotions[0].title }), (0, jsx_runtime_1.jsx)("div", { className: "tour-details", children: (0, jsx_runtime_1.jsx)("span", { children: promotions[0].description }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "price", children: [(0, jsx_runtime_1.jsx)("span", { className: "old-price", children: "45 000 \u20BD" }), (0, jsx_runtime_1.jsxs)("span", { className: "new-price", children: [Math.round(45000 * (1 - promotions[0].discount_percent / 100)).toLocaleString(), " \u20BD"] })] }), (0, jsx_runtime_1.jsx)("div", { className: "bonus-info", children: (0, jsx_runtime_1.jsx)("span", { className: "bonus-label", children: "+ 500 \u0431\u043E\u043D\u0443\u0441\u043E\u0432 \u043F\u0440\u0438 \u0431\u0440\u043E\u043D\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0438" }) }), (0, jsx_runtime_1.jsx)("button", { className: "btn btn-small btn-urgent", onClick: function () { return handleBookNow('promotions'); }, children: "\u041F\u043E\u0434\u0440\u043E\u0431\u043D\u0435\u0435" }), (0, jsx_runtime_1.jsx)("button", { className: "btn btn-small btn-secondary", onClick: fetchRandomPromotion, style: { marginTop: '8px', fontSize: '12px', padding: '6px 12px' }, children: "\uD83D\uDD04 \u0414\u0440\u0443\u0433\u043E\u0435 \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u0435" }), (0, jsx_runtime_1.jsx)("div", { className: "stock-info", children: (0, jsx_runtime_1.jsx)("span", { className: "stock-text", children: promotions[0].valid_until
                                                    ? "\u0414\u0435\u0439\u0441\u0442\u0432\u0443\u0435\u0442 \u0434\u043E: ".concat(new Date(promotions[0].valid_until).toLocaleDateString('ru-RU'))
                                                    : 'Акция действует' }) })] })) : ((0, jsx_runtime_1.jsxs)("div", { className: "hot-offer-card", children: [(0, jsx_runtime_1.jsxs)("div", { className: "card-header", children: [(0, jsx_runtime_1.jsx)("h3", { children: "\uD83D\uDD25 \u0413\u041E\u0420\u042F\u0427\u0415\u0415 \u041F\u0420\u0415\u0414\u041B\u041E\u0416\u0415\u041D\u0418\u0415" }), (0, jsx_runtime_1.jsx)("span", { className: "discount", children: "-20%" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "tour-info", children: [(0, jsx_runtime_1.jsx)("h4", { children: "\u0417\u0430\u0433\u0440\u0443\u0436\u0430\u0435\u043C \u0430\u043A\u0446\u0438\u0438..." }), (0, jsx_runtime_1.jsx)("div", { className: "tour-details", children: (0, jsx_runtime_1.jsx)("span", { children: "\u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u043F\u043E\u0434\u043E\u0436\u0434\u0438\u0442\u0435" }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "price", children: [(0, jsx_runtime_1.jsx)("span", { className: "old-price", children: "-- \u20BD" }), (0, jsx_runtime_1.jsx)("span", { className: "new-price", children: "-- \u20BD" })] }), (0, jsx_runtime_1.jsx)("div", { className: "bonus-info", children: (0, jsx_runtime_1.jsx)("span", { className: "bonus-label", children: "+ 500 \u0431\u043E\u043D\u0443\u0441\u043E\u0432 \u043F\u0440\u0438 \u0431\u0440\u043E\u043D\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0438" }) }), (0, jsx_runtime_1.jsx)("button", { className: "btn btn-small btn-urgent", disabled: true, children: "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430..." }), (0, jsx_runtime_1.jsx)("div", { className: "stock-info", children: (0, jsx_runtime_1.jsx)("span", { className: "stock-text", children: "\u0417\u0430\u0433\u0440\u0443\u0436\u0430\u0435\u043C \u0430\u043A\u0446\u0438\u0438" }) })] })) })] }) }) }), (0, jsx_runtime_1.jsx)("section", { className: "services-section", children: (0, jsx_runtime_1.jsxs)("div", { className: "container", children: [(0, jsx_runtime_1.jsxs)("div", { className: "section-header", children: [(0, jsx_runtime_1.jsx)("h2", { children: "\u041D\u0430\u0448\u0438 \u0443\u0441\u043B\u0443\u0433\u0438" }), (0, jsx_runtime_1.jsx)("p", { children: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0438\u0434\u0435\u0430\u043B\u044C\u043D\u044B\u0439 \u0432\u0430\u0440\u0438\u0430\u043D\u0442 \u0434\u043B\u044F \u0432\u0430\u0448\u0435\u0433\u043E \u043E\u0442\u0434\u044B\u0445\u0430" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "services-grid", children: [services.slice(0, 3).map(function (service) { return ((0, jsx_runtime_1.jsxs)("div", { className: "service-card", onClick: function () { return handleBookNow('services'); }, children: [(0, jsx_runtime_1.jsx)("div", { className: "service-icon", children: "\uD83D\uDEE0\uFE0F" }), (0, jsx_runtime_1.jsx)("h3", { children: service.name }), (0, jsx_runtime_1.jsx)("p", { children: service.description }), (0, jsx_runtime_1.jsxs)("div", { className: "service-price", children: [service.price, " \u20BD"] }), (0, jsx_runtime_1.jsx)("div", { className: "service-bonus", children: "+ 500 \u0431\u043E\u043D\u0443\u0441\u043E\u0432" })] }, service.id)); }), services.length === 0 && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: "service-card", onClick: function () { return handleBookNow('tours'); }, children: [(0, jsx_runtime_1.jsx)("div", { className: "service-icon", children: "\uD83C\uDFD4\uFE0F" }), (0, jsx_runtime_1.jsx)("h3", { children: "\u0422\u0443\u0440\u044B \u043F\u043E \u0421\u043E\u0447\u0438" }), (0, jsx_runtime_1.jsx)("p", { children: "\u042D\u043A\u0441\u043A\u0443\u0440\u0441\u0438\u0438 \u043F\u043E \u041A\u0440\u0430\u0441\u043D\u043E\u0439 \u041F\u043E\u043B\u044F\u043D\u0435, \u043C\u043E\u0440\u0441\u043A\u0438\u0435 \u043F\u0440\u043E\u0433\u0443\u043B\u043A\u0438, \u043F\u043E\u0441\u0435\u0449\u0435\u043D\u0438\u0435 \u041E\u043B\u0438\u043C\u043F\u0438\u0439\u0441\u043A\u043E\u0433\u043E \u043F\u0430\u0440\u043A\u0430 \u0438 \u043C\u043D\u043E\u0433\u043E\u0435 \u0434\u0440\u0443\u0433\u043E\u0435" }), (0, jsx_runtime_1.jsx)("div", { className: "service-bonus", children: "+ 500 \u0431\u043E\u043D\u0443\u0441\u043E\u0432" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "service-card", onClick: function () { return handleBookNow('hotels'); }, children: [(0, jsx_runtime_1.jsx)("div", { className: "service-icon", children: "\uD83C\uDFE8" }), (0, jsx_runtime_1.jsx)("h3", { children: "\u041E\u0442\u0435\u043B\u0438 \u0438 \u0433\u043E\u0441\u0442\u0438\u043D\u0438\u0446\u044B" }), (0, jsx_runtime_1.jsx)("p", { children: "\u041F\u0440\u0435\u043C\u0438\u0430\u043B\u044C\u043D\u044B\u0435 \u043E\u0442\u0435\u043B\u0438 \u0432 \u0446\u0435\u043D\u0442\u0440\u0435 \u0421\u043E\u0447\u0438 \u0438 \u041A\u0440\u0430\u0441\u043D\u043E\u0439 \u041F\u043E\u043B\u044F\u043D\u0435 \u0441 \u043B\u0443\u0447\u0448\u0438\u043C\u0438 \u0432\u0438\u0434\u0430\u043C\u0438 \u0438 \u0441\u0435\u0440\u0432\u0438\u0441\u043E\u043C" }), (0, jsx_runtime_1.jsx)("div", { className: "service-bonus", children: "+ 500 \u0431\u043E\u043D\u0443\u0441\u043E\u0432" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "service-card", onClick: function () { return handleBookNow('foreign'); }, children: [(0, jsx_runtime_1.jsx)("div", { className: "service-icon", children: "\u2708\uFE0F" }), (0, jsx_runtime_1.jsx)("h3", { children: "\u0417\u0430\u0440\u0443\u0431\u0435\u0436\u043D\u044B\u0435 \u0442\u0443\u0440\u044B" }), (0, jsx_runtime_1.jsx)("p", { children: "\u041F\u0443\u0442\u0435\u0448\u0435\u0441\u0442\u0432\u0438\u044F \u043F\u043E \u0432\u0441\u0435\u043C\u0443 \u043C\u0438\u0440\u0443 \u0441 \u043F\u0440\u043E\u0444\u0435\u0441\u0441\u0438\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u043C\u0438 \u0433\u0438\u0434\u0430\u043C\u0438 \u0438 \u043B\u0443\u0447\u0448\u0438\u043C\u0438 \u043C\u0430\u0440\u0448\u0440\u0443\u0442\u0430\u043C\u0438" }), (0, jsx_runtime_1.jsx)("div", { className: "service-bonus", children: "+ 500 \u0431\u043E\u043D\u0443\u0441\u043E\u0432" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "service-card", onClick: function () { return handleBookNow('cruises'); }, children: [(0, jsx_runtime_1.jsx)("div", { className: "service-icon", children: "\uD83D\uDEA2" }), (0, jsx_runtime_1.jsx)("h3", { children: "\u041A\u0440\u0443\u0438\u0437\u044B" }), (0, jsx_runtime_1.jsx)("p", { children: "\u041C\u043E\u0440\u0441\u043A\u0438\u0435 \u043A\u0440\u0443\u0438\u0437\u044B \u043F\u043E \u0441\u0430\u043C\u044B\u043C \u043A\u0440\u0430\u0441\u0438\u0432\u044B\u043C \u043C\u0430\u0440\u0448\u0440\u0443\u0442\u0430\u043C \u0441 \u043A\u043E\u043C\u0444\u043E\u0440\u0442\u043D\u044B\u043C\u0438 \u043B\u0430\u0439\u043D\u0435\u0440\u0430\u043C\u0438" }), (0, jsx_runtime_1.jsx)("div", { className: "service-bonus", children: "+ 500 \u0431\u043E\u043D\u0443\u0441\u043E\u0432" })] })] }))] })] }) }), (0, jsx_runtime_1.jsx)("section", { className: "benefits-section", children: (0, jsx_runtime_1.jsxs)("div", { className: "container", children: [(0, jsx_runtime_1.jsxs)("div", { className: "section-header", children: [(0, jsx_runtime_1.jsx)("h2", { children: "\u041F\u043E\u0447\u0435\u043C\u0443 \u0432\u044B\u0431\u0438\u0440\u0430\u044E\u0442 \u043D\u0430\u0441" }), (0, jsx_runtime_1.jsx)("p", { children: "\u041C\u044B \u0434\u0435\u043B\u0430\u0435\u043C \u0432\u0430\u0448 \u043E\u0442\u0434\u044B\u0445 \u043D\u0435\u0437\u0430\u0431\u044B\u0432\u0430\u0435\u043C\u044B\u043C" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "benefits-grid", children: [(0, jsx_runtime_1.jsxs)("div", { className: "benefit-item", children: [(0, jsx_runtime_1.jsx)("div", { className: "benefit-icon", children: "\uD83C\uDFAF" }), (0, jsx_runtime_1.jsx)("h3", { children: "\u0418\u043D\u0434\u0438\u0432\u0438\u0434\u0443\u0430\u043B\u044C\u043D\u044B\u0439 \u043F\u043E\u0434\u0445\u043E\u0434" }), (0, jsx_runtime_1.jsx)("p", { children: "\u041A\u0430\u0436\u0434\u044B\u0439 \u043A\u043B\u0438\u0435\u043D\u0442 \u043F\u043E\u043B\u0443\u0447\u0430\u0435\u0442 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u043E\u0435 \u0432\u043D\u0438\u043C\u0430\u043D\u0438\u0435 \u0438 \u0440\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u0430\u0446\u0438\u0438 \u043E\u0442 \u043D\u0430\u0448\u0438\u0445 \u044D\u043A\u0441\u043F\u0435\u0440\u0442\u043E\u0432" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "benefit-item", children: [(0, jsx_runtime_1.jsx)("div", { className: "benefit-icon", children: "\uD83D\uDCB0" }), (0, jsx_runtime_1.jsx)("h3", { children: "\u041B\u0443\u0447\u0448\u0438\u0435 \u0446\u0435\u043D\u044B" }), (0, jsx_runtime_1.jsx)("p", { children: "\u0413\u0430\u0440\u0430\u043D\u0442\u0438\u0440\u0443\u0435\u043C \u0441\u0430\u043C\u044B\u0435 \u0432\u044B\u0433\u043E\u0434\u043D\u044B\u0435 \u0442\u0430\u0440\u0438\u0444\u044B \u0438 \u0441\u043F\u0435\u0446\u0438\u0430\u043B\u044C\u043D\u044B\u0435 \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u044F \u0434\u043B\u044F \u043D\u0430\u0448\u0438\u0445 \u043A\u043B\u0438\u0435\u043D\u0442\u043E\u0432" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "benefit-item", children: [(0, jsx_runtime_1.jsx)("div", { className: "benefit-icon", children: "\uD83D\uDEE1\uFE0F" }), (0, jsx_runtime_1.jsx)("h3", { children: "\u0411\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0441\u0442\u044C" }), (0, jsx_runtime_1.jsx)("p", { children: "\u0412\u0441\u0435 \u0442\u0443\u0440\u044B \u0437\u0430\u0441\u0442\u0440\u0430\u0445\u043E\u0432\u0430\u043D\u044B, \u0430 \u043F\u043B\u0430\u0442\u0435\u0436\u0438 \u0437\u0430\u0449\u0438\u0449\u0435\u043D\u044B \u0441\u043E\u0432\u0440\u0435\u043C\u0435\u043D\u043D\u044B\u043C\u0438 \u0442\u0435\u0445\u043D\u043E\u043B\u043E\u0433\u0438\u044F\u043C\u0438" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "benefit-item", children: [(0, jsx_runtime_1.jsx)("div", { className: "benefit-icon", children: "\uD83D\uDCDE" }), (0, jsx_runtime_1.jsx)("h3", { children: "\u041F\u043E\u0434\u0434\u0435\u0440\u0436\u043A\u0430 24/7" }), (0, jsx_runtime_1.jsx)("p", { children: "\u041D\u0430\u0448\u0430 \u043A\u043E\u043C\u0430\u043D\u0434\u0430 \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u043A\u0438 \u0432\u0441\u0435\u0433\u0434\u0430 \u0433\u043E\u0442\u043E\u0432\u0430 \u043F\u043E\u043C\u043E\u0447\u044C \u0432\u0430\u043C \u0432 \u043B\u044E\u0431\u043E\u0435 \u0432\u0440\u0435\u043C\u044F" })] })] })] }) }), (0, jsx_runtime_1.jsx)("section", { className: "journey-section", children: (0, jsx_runtime_1.jsx)("div", { className: "container", children: (0, jsx_runtime_1.jsxs)("div", { className: "journey-content", children: [(0, jsx_runtime_1.jsxs)("div", { className: "journey-header", children: [(0, jsx_runtime_1.jsx)("h2", { children: "\u0413\u043E\u0442\u043E\u0432\u044B \u043A \u043D\u0435\u0437\u0430\u0431\u044B\u0432\u0430\u0435\u043C\u043E\u043C\u0443 \u043F\u0443\u0442\u0435\u0448\u0435\u0441\u0442\u0432\u0438\u044E?" }), (0, jsx_runtime_1.jsx)("p", { children: "\u0421\u0432\u044F\u0436\u0438\u0442\u0435\u0441\u044C \u0441 \u043D\u0430\u043C\u0438 \u0434\u043B\u044F \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u044F \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u043E\u0439 \u043A\u043E\u043D\u0441\u0443\u043B\u044C\u0442\u0430\u0446\u0438\u0438 \u0438 \u043B\u0443\u0447\u0448\u0438\u0445 \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u0439" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "journey-grid", children: [(0, jsx_runtime_1.jsx)("div", { className: "journey-info", children: (0, jsx_runtime_1.jsxs)("div", { className: "contact-info", children: [(0, jsx_runtime_1.jsxs)("div", { className: "contact-item", children: [(0, jsx_runtime_1.jsx)("div", { className: "contact-icon", children: "\uD83D\uDCDE" }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h4", { children: "\u0422\u0435\u043B\u0435\u0444\u043E\u043D" }), (0, jsx_runtime_1.jsx)("p", { children: "+7 (862) 123-45-67" })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "contact-item", children: [(0, jsx_runtime_1.jsx)("div", { className: "contact-icon", children: "\u2709\uFE0F" }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h4", { children: "Email" }), (0, jsx_runtime_1.jsx)("p", { children: "info@sochi-travel.ru" })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "contact-item", children: [(0, jsx_runtime_1.jsx)("div", { className: "contact-icon", children: "\uD83D\uDCCD" }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h4", { children: "\u0410\u0434\u0440\u0435\u0441" }), (0, jsx_runtime_1.jsx)("p", { children: "\u0433. \u0421\u043E\u0447\u0438, \u0443\u043B. \u041A\u0443\u0440\u043E\u0440\u0442\u043D\u0430\u044F, 123" })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "contact-item", children: [(0, jsx_runtime_1.jsx)("div", { className: "contact-icon", children: "\uD83D\uDD52" }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h4", { children: "\u0412\u0440\u0435\u043C\u044F \u0440\u0430\u0431\u043E\u0442\u044B" }), (0, jsx_runtime_1.jsx)("p", { children: "\u041F\u043D-\u0412\u0441: 9:00 - 21:00" })] })] })] }) }), (0, jsx_runtime_1.jsxs)("div", { className: "journey-form", children: [(0, jsx_runtime_1.jsx)("h3", { children: "\u041E\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u0437\u0430\u044F\u0432\u043A\u0443" }), (0, jsx_runtime_1.jsxs)("form", { children: [(0, jsx_runtime_1.jsx)("input", { type: "text", placeholder: "\u0412\u0430\u0448\u0435 \u0438\u043C\u044F", required: true }), (0, jsx_runtime_1.jsx)("input", { type: "tel", placeholder: "\u0422\u0435\u043B\u0435\u0444\u043E\u043D", required: true }), (0, jsx_runtime_1.jsx)("input", { type: "email", placeholder: "Email", required: true }), (0, jsx_runtime_1.jsx)("textarea", { placeholder: "\u0421\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435", rows: 4 }), (0, jsx_runtime_1.jsx)("button", { type: "submit", className: "btn btn-primary", children: "\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u0437\u0430\u044F\u0432\u043A\u0443" })] })] })] })] }) }) })] }));
};
exports.default = HomePage;
