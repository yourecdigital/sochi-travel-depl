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
var react_router_dom_1 = require("react-router-dom");
var CartContext_1 = require("../../contexts/CartContext");
var AuthContext_1 = require("../../contexts/AuthContext");
var axios_1 = __importDefault(require("axios"));
var react_hot_toast_1 = __importDefault(require("react-hot-toast"));
var styled_components_1 = __importDefault(require("styled-components"));
var CartContainer = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  min-height: 80vh;\n  padding: 40px 20px;\n  background: #f8f9fa;\n"], ["\n  min-height: 80vh;\n  padding: 40px 20px;\n  background: #f8f9fa;\n"])));
var CartContent = styled_components_1.default.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  max-width: 1200px;\n  margin: 0 auto;\n"], ["\n  max-width: 1200px;\n  margin: 0 auto;\n"])));
var Title = styled_components_1.default.h1(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  text-align: center;\n  color: #333;\n  margin-bottom: 40px;\n  font-size: 32px;\n"], ["\n  text-align: center;\n  color: #333;\n  margin-bottom: 40px;\n  font-size: 32px;\n"])));
var EmptyCart = styled_components_1.default.div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  text-align: center;\n  padding: 60px 20px;\n  background: white;\n  border-radius: 15px;\n  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);\n\n  h3 {\n    color: #666;\n    margin-bottom: 20px;\n  }\n\n  p {\n    color: #999;\n    margin-bottom: 30px;\n  }\n"], ["\n  text-align: center;\n  padding: 60px 20px;\n  background: white;\n  border-radius: 15px;\n  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);\n\n  h3 {\n    color: #666;\n    margin-bottom: 20px;\n  }\n\n  p {\n    color: #999;\n    margin-bottom: 30px;\n  }\n"])));
var CartItem = styled_components_1.default.div(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  background: white;\n  border-radius: 15px;\n  padding: 20px;\n  margin-bottom: 20px;\n  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);\n  display: flex;\n  align-items: center;\n  gap: 20px;\n\n  @media (max-width: 768px) {\n    flex-direction: column;\n    text-align: center;\n  }\n"], ["\n  background: white;\n  border-radius: 15px;\n  padding: 20px;\n  margin-bottom: 20px;\n  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);\n  display: flex;\n  align-items: center;\n  gap: 20px;\n\n  @media (max-width: 768px) {\n    flex-direction: column;\n    text-align: center;\n  }\n"])));
var ItemImage = styled_components_1.default.div(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  width: 120px;\n  height: 80px;\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  border-radius: 10px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: white;\n  font-weight: bold;\n  flex-shrink: 0;\n"], ["\n  width: 120px;\n  height: 80px;\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  border-radius: 10px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: white;\n  font-weight: bold;\n  flex-shrink: 0;\n"])));
var ItemInfo = styled_components_1.default.div(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  flex: 1;\n\n  h3 {\n    color: #333;\n    margin-bottom: 8px;\n    font-size: 18px;\n  }\n\n  p {\n    color: #666;\n    margin-bottom: 5px;\n    font-size: 14px;\n  }\n"], ["\n  flex: 1;\n\n  h3 {\n    color: #333;\n    margin-bottom: 8px;\n    font-size: 18px;\n  }\n\n  p {\n    color: #666;\n    margin-bottom: 5px;\n    font-size: 14px;\n  }\n"])));
var ItemPrice = styled_components_1.default.div(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n  font-size: 20px;\n  font-weight: bold;\n  color: #667eea;\n  margin-bottom: 10px;\n"], ["\n  font-size: 20px;\n  font-weight: bold;\n  color: #667eea;\n  margin-bottom: 10px;\n"])));
var QuantityControl = styled_components_1.default.div(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  margin-bottom: 15px;\n"], ["\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  margin-bottom: 15px;\n"])));
var RemoveButton = styled_components_1.default.button(templateObject_10 || (templateObject_10 = __makeTemplateObject(["\n  background: #e74c3c;\n  color: white;\n  border: none;\n  border-radius: 8px;\n  padding: 8px 16px;\n  cursor: pointer;\n  font-size: 14px;\n  transition: background 0.3s ease;\n\n  &:hover {\n    background: #c0392b;\n  }\n"], ["\n  background: #e74c3c;\n  color: white;\n  border: none;\n  border-radius: 8px;\n  padding: 8px 16px;\n  cursor: pointer;\n  font-size: 14px;\n  transition: background 0.3s ease;\n\n  &:hover {\n    background: #c0392b;\n  }\n"])));
var CartSummary = styled_components_1.default.div(templateObject_11 || (templateObject_11 = __makeTemplateObject(["\n  background: white;\n  border-radius: 15px;\n  padding: 30px;\n  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);\n  margin-top: 30px;\n"], ["\n  background: white;\n  border-radius: 15px;\n  padding: 30px;\n  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);\n  margin-top: 30px;\n"])));
var SummaryRow = styled_components_1.default.div(templateObject_12 || (templateObject_12 = __makeTemplateObject(["\n  display: flex;\n  justify-content: space-between;\n  margin-bottom: 15px;\n  font-size: 16px;\n\n  &.total {\n    font-size: 20px;\n    font-weight: bold;\n    color: #667eea;\n    border-top: 2px solid #eee;\n    padding-top: 15px;\n    margin-top: 15px;\n  }\n"], ["\n  display: flex;\n  justify-content: space-between;\n  margin-bottom: 15px;\n  font-size: 16px;\n\n  &.total {\n    font-size: 20px;\n    font-weight: bold;\n    color: #667eea;\n    border-top: 2px solid #eee;\n    padding-top: 15px;\n    margin-top: 15px;\n  }\n"])));
var CheckoutButton = styled_components_1.default.button(templateObject_13 || (templateObject_13 = __makeTemplateObject(["\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  color: white;\n  border: none;\n  border-radius: 10px;\n  padding: 15px 30px;\n  font-size: 18px;\n  font-weight: bold;\n  cursor: pointer;\n  width: 100%;\n  margin-top: 20px;\n  transition: transform 0.2s ease;\n\n  &:hover {\n    transform: translateY(-2px);\n  }\n\n  &:disabled {\n    opacity: 0.7;\n    cursor: not-allowed;\n    transform: none;\n  }\n"], ["\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  color: white;\n  border: none;\n  border-radius: 10px;\n  padding: 15px 30px;\n  font-size: 18px;\n  font-weight: bold;\n  cursor: pointer;\n  width: 100%;\n  margin-top: 20px;\n  transition: transform 0.2s ease;\n\n  &:hover {\n    transform: translateY(-2px);\n  }\n\n  &:disabled {\n    opacity: 0.7;\n    cursor: not-allowed;\n    transform: none;\n  }\n"])));
var LoginPrompt = styled_components_1.default.div(templateObject_14 || (templateObject_14 = __makeTemplateObject(["\n  text-align: center;\n  padding: 40px;\n  background: white;\n  border-radius: 15px;\n  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);\n\n  h3 {\n    color: #333;\n    margin-bottom: 20px;\n  }\n\n  p {\n    color: #666;\n    margin-bottom: 30px;\n  }\n"], ["\n  text-align: center;\n  padding: 40px;\n  background: white;\n  border-radius: 15px;\n  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);\n\n  h3 {\n    color: #333;\n    margin-bottom: 20px;\n  }\n\n  p {\n    color: #666;\n    margin-bottom: 30px;\n  }\n"])));
var LoginButton = styled_components_1.default.button(templateObject_15 || (templateObject_15 = __makeTemplateObject(["\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  color: white;\n  border: none;\n  border-radius: 8px;\n  padding: 12px 24px;\n  font-size: 16px;\n  font-weight: bold;\n  cursor: pointer;\n  margin-right: 15px;\n"], ["\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  color: white;\n  border: none;\n  border-radius: 8px;\n  padding: 12px 24px;\n  font-size: 16px;\n  font-weight: bold;\n  cursor: pointer;\n  margin-right: 15px;\n"])));
var RegisterButton = styled_components_1.default.button(templateObject_16 || (templateObject_16 = __makeTemplateObject(["\n  background: transparent;\n  color: #667eea;\n  border: 2px solid #667eea;\n  border-radius: 8px;\n  padding: 12px 24px;\n  font-size: 16px;\n  font-weight: bold;\n  cursor: pointer;\n\n  &:hover {\n    background: #667eea;\n    color: white;\n  }\n"], ["\n  background: transparent;\n  color: #667eea;\n  border: 2px solid #667eea;\n  border-radius: 8px;\n  padding: 12px 24px;\n  font-size: 16px;\n  font-weight: bold;\n  cursor: pointer;\n\n  &:hover {\n    background: #667eea;\n    color: white;\n  }\n"])));
var Cart = function () {
    var _a = (0, CartContext_1.useCart)(), cartItems = _a.cartItems, removeFromCart = _a.removeFromCart, getCartTotal = _a.getCartTotal, loading = _a.loading;
    var user = (0, AuthContext_1.useAuth)().user;
    var navigate = (0, react_router_dom_1.useNavigate)();
    var _b = (0, react_1.useState)(false), isCheckingOut = _b[0], setIsCheckingOut = _b[1];
    var handleCheckout = function () { return __awaiter(void 0, void 0, void 0, function () {
        var error_1, message;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!user) {
                        react_hot_toast_1.default.error('Необходимо войти в систему');
                        return [2 /*return*/];
                    }
                    if (cartItems.length === 0) {
                        react_hot_toast_1.default.error('Корзина пуста');
                        return [2 /*return*/];
                    }
                    setIsCheckingOut(true);
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, axios_1.default.post('http://localhost:5000/api/orders')];
                case 2:
                    _c.sent();
                    react_hot_toast_1.default.success('Заказ успешно создан!');
                    navigate('/orders');
                    return [3 /*break*/, 5];
                case 3:
                    error_1 = _c.sent();
                    message = ((_b = (_a = error_1.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.error) || 'Ошибка создания заказа';
                    react_hot_toast_1.default.error(message);
                    return [3 /*break*/, 5];
                case 4:
                    setIsCheckingOut(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    if (!user) {
        return ((0, jsx_runtime_1.jsx)(CartContainer, { children: (0, jsx_runtime_1.jsx)(CartContent, { children: (0, jsx_runtime_1.jsxs)(LoginPrompt, { children: [(0, jsx_runtime_1.jsx)("h3", { children: "\u0412\u043E\u0439\u0434\u0438\u0442\u0435 \u0432 \u0441\u0438\u0441\u0442\u0435\u043C\u0443" }), (0, jsx_runtime_1.jsx)("p", { children: "\u0414\u043B\u044F \u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440\u0430 \u043A\u043E\u0440\u0437\u0438\u043D\u044B \u043D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u043E \u0432\u043E\u0439\u0442\u0438 \u0432 \u0441\u0438\u0441\u0442\u0435\u043C\u0443" }), (0, jsx_runtime_1.jsx)(LoginButton, { onClick: function () { return navigate('/login'); }, children: "\u0412\u043E\u0439\u0442\u0438" }), (0, jsx_runtime_1.jsx)(RegisterButton, { onClick: function () { return navigate('/register'); }, children: "\u0417\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u0442\u044C\u0441\u044F" })] }) }) }));
    }
    if (loading) {
        return ((0, jsx_runtime_1.jsx)(CartContainer, { children: (0, jsx_runtime_1.jsx)(CartContent, { children: (0, jsx_runtime_1.jsx)(Title, { children: "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430 \u043A\u043E\u0440\u0437\u0438\u043D\u044B..." }) }) }));
    }
    if (cartItems.length === 0) {
        return ((0, jsx_runtime_1.jsx)(CartContainer, { children: (0, jsx_runtime_1.jsx)(CartContent, { children: (0, jsx_runtime_1.jsxs)(EmptyCart, { children: [(0, jsx_runtime_1.jsx)("h3", { children: "\u041A\u043E\u0440\u0437\u0438\u043D\u0430 \u043F\u0443\u0441\u0442\u0430" }), (0, jsx_runtime_1.jsx)("p", { children: "\u0414\u043E\u0431\u0430\u0432\u044C\u0442\u0435 \u0442\u0443\u0440\u044B \u0438\u043B\u0438 \u043D\u043E\u043C\u0435\u0440\u0430 \u043E\u0442\u0435\u043B\u0435\u0439 \u0432 \u043A\u043E\u0440\u0437\u0438\u043D\u0443 \u0434\u043B\u044F \u043E\u0444\u043E\u0440\u043C\u043B\u0435\u043D\u0438\u044F \u0437\u0430\u043A\u0430\u0437\u0430" }), (0, jsx_runtime_1.jsx)(LoginButton, { onClick: function () { return navigate('/tours'); }, children: "\u041F\u0435\u0440\u0435\u0439\u0442\u0438 \u043A \u0442\u0443\u0440\u0430\u043C" })] }) }) }));
    }
    return ((0, jsx_runtime_1.jsx)(CartContainer, { children: (0, jsx_runtime_1.jsxs)(CartContent, { children: [(0, jsx_runtime_1.jsx)(Title, { children: "\u041A\u043E\u0440\u0437\u0438\u043D\u0430" }), cartItems.map(function (item) { return ((0, jsx_runtime_1.jsxs)(CartItem, { children: [(0, jsx_runtime_1.jsx)(ItemImage, { children: item.name.charAt(0) }), (0, jsx_runtime_1.jsxs)(ItemInfo, { children: [(0, jsx_runtime_1.jsx)("h3", { children: item.name }), (0, jsx_runtime_1.jsx)("p", { children: item.description }), item.type === 'tour' && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("p", { children: ["\u0414\u043B\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u044C: ", item.duration] }), (0, jsx_runtime_1.jsxs)("p", { children: ["\u041D\u0430\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435: ", item.destination] })] })), item.type === 'room' && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("p", { children: ["\u0412\u043C\u0435\u0441\u0442\u0438\u043C\u043E\u0441\u0442\u044C: ", item.capacity] }), item.features && item.features.length > 0 && ((0, jsx_runtime_1.jsxs)("p", { children: ["\u041E\u0441\u043E\u0431\u0435\u043D\u043D\u043E\u0441\u0442\u0438: ", item.features.slice(0, 3).join(', ')] }))] })), item.type === 'foreign' && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("p", { children: ["\u0421\u0442\u0440\u0430\u043D\u0430: ", item.country] }), (0, jsx_runtime_1.jsxs)("p", { children: ["\u0414\u043B\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u044C: ", item.duration] }), (0, jsx_runtime_1.jsxs)("p", { children: ["\u041D\u0430\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435: ", item.destination] }), (function () {
                                            var highlightsArray = [];
                                            if (item.highlights) {
                                                if (Array.isArray(item.highlights)) {
                                                    highlightsArray = item.highlights;
                                                }
                                                else if (typeof item.highlights === 'string') {
                                                    try {
                                                        highlightsArray = JSON.parse(item.highlights);
                                                    }
                                                    catch (e) {
                                                        highlightsArray = [item.highlights];
                                                    }
                                                }
                                            }
                                            return highlightsArray.length > 0 && ((0, jsx_runtime_1.jsxs)("p", { children: ["\u0414\u043E\u0441\u0442\u043E\u043F\u0440\u0438\u043C\u0435\u0447\u0430\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u0438: ", highlightsArray.slice(0, 2).join(', ')] }));
                                        })()] })), item.type === 'cruise' && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("p", { children: "\u0422\u0438\u043F: \u041A\u0440\u0443\u0438\u0437" }), (0, jsx_runtime_1.jsxs)("p", { children: ["\u0414\u043B\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u044C: ", item.duration] }), (0, jsx_runtime_1.jsxs)("p", { children: ["\u041E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435: ", item.departure] }), (function () {
                                            var highlightsArray = [];
                                            if (item.highlights) {
                                                if (Array.isArray(item.highlights)) {
                                                    highlightsArray = item.highlights;
                                                }
                                                else if (typeof item.highlights === 'string') {
                                                    try {
                                                        highlightsArray = JSON.parse(item.highlights);
                                                    }
                                                    catch (e) {
                                                        highlightsArray = [item.highlights];
                                                    }
                                                }
                                            }
                                            return highlightsArray.length > 0 && ((0, jsx_runtime_1.jsxs)("p", { children: ["\u041C\u0430\u0440\u0448\u0440\u0443\u0442: ", highlightsArray.slice(0, 2).join(', ')] }));
                                        })()] })), (0, jsx_runtime_1.jsxs)(ItemPrice, { children: [new Intl.NumberFormat('ru-RU').format(item.price), " \u20BD"] }), (0, jsx_runtime_1.jsx)(QuantityControl, { children: (0, jsx_runtime_1.jsxs)("span", { children: ["\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E: ", item.quantity] }) })] }), (0, jsx_runtime_1.jsx)(RemoveButton, { onClick: function () { return removeFromCart(item.id); }, children: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C" })] }, item.id)); }), (0, jsx_runtime_1.jsxs)(CartSummary, { children: [(0, jsx_runtime_1.jsxs)(SummaryRow, { children: [(0, jsx_runtime_1.jsx)("span", { children: "\u0422\u043E\u0432\u0430\u0440\u043E\u0432 \u0432 \u043A\u043E\u0440\u0437\u0438\u043D\u0435:" }), (0, jsx_runtime_1.jsx)("span", { children: cartItems.length })] }), (0, jsx_runtime_1.jsxs)(SummaryRow, { className: "total", children: [(0, jsx_runtime_1.jsx)("span", { children: "\u0418\u0442\u043E\u0433\u043E:" }), (0, jsx_runtime_1.jsxs)("span", { children: [getCartTotal(), " \u20BD"] })] }), (0, jsx_runtime_1.jsx)(CheckoutButton, { onClick: handleCheckout, disabled: isCheckingOut, children: isCheckingOut ? 'Оформление заказа...' : 'Оформить заказ' })] })] }) }));
};
exports.default = Cart;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13, templateObject_14, templateObject_15, templateObject_16;
