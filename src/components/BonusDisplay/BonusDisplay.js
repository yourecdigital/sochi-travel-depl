"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
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
var styled_components_1 = __importDefault(require("styled-components"));
var AuthContext_1 = require("../../contexts/AuthContext");
var axios_1 = __importDefault(require("axios"));
var BonusContainer = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 8px 16px;\n  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);\n  border-radius: 20px;\n  color: white;\n  font-weight: 600;\n  font-size: 14px;\n  box-shadow: 0 2px 8px rgba(245, 158, 11, 0.3);\n  transition: all 0.3s ease;\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: 0 4px 12px rgba(245, 158, 11, 0.4);\n  }\n"], ["\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 8px 16px;\n  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);\n  border-radius: 20px;\n  color: white;\n  font-weight: 600;\n  font-size: 14px;\n  box-shadow: 0 2px 8px rgba(245, 158, 11, 0.3);\n  transition: all 0.3s ease;\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: 0 4px 12px rgba(245, 158, 11, 0.4);\n  }\n"])));
var BonusIcon = styled_components_1.default.span(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  font-size: 16px;\n  animation: pulse 2s infinite;\n  \n  @keyframes pulse {\n    0% { transform: scale(1); }\n    50% { transform: scale(1.1); }\n    100% { transform: scale(1); }\n  }\n"], ["\n  font-size: 16px;\n  animation: pulse 2s infinite;\n  \n  @keyframes pulse {\n    0% { transform: scale(1); }\n    50% { transform: scale(1.1); }\n    100% { transform: scale(1); }\n  }\n"])));
var BonusAmount = styled_components_1.default.span(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  font-weight: 700;\n  font-size: 16px;\n"], ["\n  font-weight: 700;\n  font-size: 16px;\n"])));
var BonusDetails = styled_components_1.default.div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  position: relative;\n"], ["\n  position: relative;\n"])));
var Tooltip = styled_components_1.default.div(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  position: absolute;\n  top: 100%;\n  right: 0;\n  margin-top: 8px;\n  padding: 12px 16px;\n  background: rgba(0, 0, 0, 0.9);\n  color: white;\n  border-radius: 8px;\n  font-size: 12px;\n  font-weight: 400;\n  white-space: nowrap;\n  opacity: ", ";\n  visibility: ", ";\n  transition: all 0.3s ease;\n  z-index: 1000;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);\n\n  &::before {\n    content: '';\n    position: absolute;\n    bottom: 100%;\n    right: 16px;\n    border: 6px solid transparent;\n    border-bottom-color: rgba(0, 0, 0, 0.9);\n  }\n"], ["\n  position: absolute;\n  top: 100%;\n  right: 0;\n  margin-top: 8px;\n  padding: 12px 16px;\n  background: rgba(0, 0, 0, 0.9);\n  color: white;\n  border-radius: 8px;\n  font-size: 12px;\n  font-weight: 400;\n  white-space: nowrap;\n  opacity: ", ";\n  visibility: ", ";\n  transition: all 0.3s ease;\n  z-index: 1000;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);\n\n  &::before {\n    content: '';\n    position: absolute;\n    bottom: 100%;\n    right: 16px;\n    border: 6px solid transparent;\n    border-bottom-color: rgba(0, 0, 0, 0.9);\n  }\n"])), function (props) { return props.$show ? 1 : 0; }, function (props) { return props.$show ? 'visible' : 'hidden'; });
var BonusDisplay = function (_a) {
    var _b = _a.showTooltip, showTooltip = _b === void 0 ? true : _b, className = _a.className;
    var _c = (0, AuthContext_1.useAuth)(), user = _c.user, token = _c.token;
    var _d = (0, react_1.useState)(0), bonusPoints = _d[0], setBonusPoints = _d[1];
    var _e = (0, react_1.useState)(0), ordersCount = _e[0], setOrdersCount = _e[1];
    var _f = (0, react_1.useState)(false), loading = _f[0], setLoading = _f[1];
    var _g = (0, react_1.useState)(false), showBonusTooltip = _g[0], setShowBonusTooltip = _g[1];
    (0, react_1.useEffect)(function () {
        if (user) {
            setBonusPoints(user.bonusPoints || 0);
            fetchOrdersCount();
        }
    }, [user]);
    var fetchOrdersCount = function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!token)
                        return [2 /*return*/];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, axios_1.default.get('http://localhost:5000/api/orders', {
                            headers: {
                                'Authorization': "Bearer ".concat(token)
                            }
                        })];
                case 2:
                    response = _a.sent();
                    setOrdersCount(response.data.length);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error('Error fetching orders count:', error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var refreshBonusPoints = function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, bonusResponse, ordersResponse, error_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!token)
                        return [2 /*return*/];
                    setLoading(true);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, Promise.all([
                            axios_1.default.get('http://localhost:5000/api/bonus/points', {
                                headers: { 'Authorization': "Bearer ".concat(token) }
                            }),
                            axios_1.default.get('http://localhost:5000/api/orders', {
                                headers: { 'Authorization': "Bearer ".concat(token) }
                            })
                        ])];
                case 2:
                    _a = _b.sent(), bonusResponse = _a[0], ordersResponse = _a[1];
                    setBonusPoints(bonusResponse.data.bonus_points);
                    setOrdersCount(ordersResponse.data.length);
                    return [3 /*break*/, 5];
                case 3:
                    error_2 = _b.sent();
                    console.error('Error fetching data:', error_2);
                    return [3 /*break*/, 5];
                case 4:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var getBonusMessage = function () {
        // Определяем статус на основе заказов
        if (ordersCount >= 2) {
            return "\uD83D\uDC8E \u041F\u043E\u0441\u0442\u043E\u044F\u043D\u043D\u044B\u0439 \u043A\u043B\u0438\u0435\u043D\u0442! \u0423 \u0432\u0430\u0441 ".concat(ordersCount, " \u0437\u0430\u043A\u0430\u0437\u043E\u0432. \u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 \u0431\u043E\u043D\u0443\u0441\u044B \u0434\u043B\u044F \u0441\u043A\u0438\u0434\u043E\u043A!");
        }
        else if (ordersCount === 1) {
            return "\u2B50 \u041A\u043B\u0438\u0435\u043D\u0442! \u0412\u044B \u043E\u0444\u043E\u0440\u043C\u0438\u043B\u0438 ".concat(ordersCount, " \u0437\u0430\u043A\u0430\u0437. \u041E\u0444\u043E\u0440\u043C\u0438\u0442\u0435 \u0435\u0449\u0435 \u043E\u0434\u0438\u043D \u0434\u043B\u044F \u0441\u0442\u0430\u0442\u0443\u0441\u0430 \"\u041F\u043E\u0441\u0442\u043E\u044F\u043D\u043D\u044B\u0439 \u043A\u043B\u0438\u0435\u043D\u0442\"!");
        }
        else {
            return "\uD83C\uDF1F \u041D\u043E\u0432\u044B\u0439 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C! \u041E\u0444\u043E\u0440\u043C\u0438\u0442\u0435 \u043F\u0435\u0440\u0432\u044B\u0439 \u0437\u0430\u043A\u0430\u0437, \u0447\u0442\u043E\u0431\u044B \u0441\u0442\u0430\u0442\u044C \u043A\u043B\u0438\u0435\u043D\u0442\u043E\u043C!";
        }
    };
    if (!user) {
        return null;
    }
    return ((0, jsx_runtime_1.jsxs)(BonusDetails, { className: className, children: [(0, jsx_runtime_1.jsxs)(BonusContainer, { onClick: refreshBonusPoints, style: { cursor: 'pointer' }, onMouseEnter: function () { return setShowBonusTooltip(true); }, onMouseLeave: function () { return setShowBonusTooltip(false); }, children: [(0, jsx_runtime_1.jsx)(BonusIcon, { children: "\uD83C\uDF81" }), (0, jsx_runtime_1.jsx)(BonusAmount, { children: loading ? '...' : (bonusPoints || 0).toLocaleString() }), (0, jsx_runtime_1.jsx)("span", { children: "\u0431\u043E\u043D\u0443\u0441\u043E\u0432" })] }), showTooltip && ((0, jsx_runtime_1.jsx)(Tooltip, { "$show": showBonusTooltip, children: getBonusMessage() }))] }));
};
exports.default = BonusDisplay;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
