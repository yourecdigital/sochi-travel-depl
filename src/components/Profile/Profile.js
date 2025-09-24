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
var AuthContext_1 = require("../../contexts/AuthContext");
var react_router_dom_1 = require("react-router-dom");
var axios_1 = __importDefault(require("axios"));
var styled_components_1 = __importDefault(require("styled-components"));
var ProfileContainer = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  min-height: 80vh;\n  padding: 40px 20px;\n  background: #f8f9fa;\n"], ["\n  min-height: 80vh;\n  padding: 40px 20px;\n  background: #f8f9fa;\n"])));
var ProfileContent = styled_components_1.default.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  max-width: 800px;\n  margin: 0 auto;\n"], ["\n  max-width: 800px;\n  margin: 0 auto;\n"])));
var Title = styled_components_1.default.h1(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  text-align: center;\n  color: #333;\n  margin-bottom: 40px;\n  font-size: 32px;\n"], ["\n  text-align: center;\n  color: #333;\n  margin-bottom: 40px;\n  font-size: 32px;\n"])));
var ProfileCard = styled_components_1.default.div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  background: white;\n  border-radius: 15px;\n  padding: 40px;\n  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);\n  margin-bottom: 30px;\n"], ["\n  background: white;\n  border-radius: 15px;\n  padding: 40px;\n  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);\n  margin-bottom: 30px;\n"])));
var ProfileSection = styled_components_1.default.div(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  margin-bottom: 30px;\n\n  &:last-child {\n    margin-bottom: 0;\n  }\n"], ["\n  margin-bottom: 30px;\n\n  &:last-child {\n    margin-bottom: 0;\n  }\n"])));
var SectionTitle = styled_components_1.default.h3(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  color: #333;\n  margin-bottom: 20px;\n  font-size: 20px;\n  border-bottom: 2px solid #667eea;\n  padding-bottom: 10px;\n"], ["\n  color: #333;\n  margin-bottom: 20px;\n  font-size: 20px;\n  border-bottom: 2px solid #667eea;\n  padding-bottom: 10px;\n"])));
var InfoRow = styled_components_1.default.div(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 15px 0;\n  border-bottom: 1px solid #eee;\n\n  &:last-child {\n    border-bottom: none;\n  }\n\n  @media (max-width: 768px) {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 5px;\n  }\n"], ["\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 15px 0;\n  border-bottom: 1px solid #eee;\n\n  &:last-child {\n    border-bottom: none;\n  }\n\n  @media (max-width: 768px) {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 5px;\n  }\n"])));
var Label = styled_components_1.default.span(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n  font-weight: 600;\n  color: #555;\n"], ["\n  font-weight: 600;\n  color: #555;\n"])));
var Value = styled_components_1.default.span(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n  color: #333;\n  font-size: 16px;\n"], ["\n  color: #333;\n  font-size: 16px;\n"])));
var BonusPoints = styled_components_1.default.div(templateObject_10 || (templateObject_10 = __makeTemplateObject(["\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  color: white;\n  padding: 20px;\n  border-radius: 10px;\n  text-align: center;\n  margin-bottom: 30px;\n"], ["\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  color: white;\n  padding: 20px;\n  border-radius: 10px;\n  text-align: center;\n  margin-bottom: 30px;\n"])));
var BonusTitle = styled_components_1.default.h3(templateObject_11 || (templateObject_11 = __makeTemplateObject(["\n  margin-bottom: 10px;\n  font-size: 18px;\n"], ["\n  margin-bottom: 10px;\n  font-size: 18px;\n"])));
var BonusAmount = styled_components_1.default.div(templateObject_12 || (templateObject_12 = __makeTemplateObject(["\n  font-size: 32px;\n  font-weight: bold;\n"], ["\n  font-size: 32px;\n  font-weight: bold;\n"])));
var ActionButtons = styled_components_1.default.div(templateObject_13 || (templateObject_13 = __makeTemplateObject(["\n  display: flex;\n  gap: 15px;\n  margin-top: 30px;\n\n  @media (max-width: 768px) {\n    flex-direction: column;\n  }\n"], ["\n  display: flex;\n  gap: 15px;\n  margin-top: 30px;\n\n  @media (max-width: 768px) {\n    flex-direction: column;\n  }\n"])));
var Button = styled_components_1.default.button(templateObject_14 || (templateObject_14 = __makeTemplateObject(["\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  color: white;\n  border: none;\n  border-radius: 8px;\n  padding: 12px 24px;\n  font-size: 16px;\n  font-weight: bold;\n  cursor: pointer;\n  transition: transform 0.2s ease;\n\n  &:hover {\n    transform: translateY(-2px);\n  }\n\n  &.secondary {\n    background: transparent;\n    color: #667eea;\n    border: 2px solid #667eea;\n\n    &:hover {\n      background: #667eea;\n      color: white;\n    }\n  }\n\n  &.danger {\n    background: #e74c3c;\n    border: 2px solid #e74c3c;\n\n    &:hover {\n      background: #c0392b;\n      border-color: #c0392b;\n    }\n  }\n"], ["\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  color: white;\n  border: none;\n  border-radius: 8px;\n  padding: 12px 24px;\n  font-size: 16px;\n  font-weight: bold;\n  cursor: pointer;\n  transition: transform 0.2s ease;\n\n  &:hover {\n    transform: translateY(-2px);\n  }\n\n  &.secondary {\n    background: transparent;\n    color: #667eea;\n    border: 2px solid #667eea;\n\n    &:hover {\n      background: #667eea;\n      color: white;\n    }\n  }\n\n  &.danger {\n    background: #e74c3c;\n    border: 2px solid #e74c3c;\n\n    &:hover {\n      background: #c0392b;\n      border-color: #c0392b;\n    }\n  }\n"])));
var LoginPrompt = styled_components_1.default.div(templateObject_15 || (templateObject_15 = __makeTemplateObject(["\n  text-align: center;\n  padding: 60px 20px;\n  background: white;\n  border-radius: 15px;\n  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);\n\n  h3 {\n    color: #333;\n    margin-bottom: 20px;\n  }\n\n  p {\n    color: #666;\n    margin-bottom: 30px;\n  }\n"], ["\n  text-align: center;\n  padding: 60px 20px;\n  background: white;\n  border-radius: 15px;\n  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);\n\n  h3 {\n    color: #333;\n    margin-bottom: 20px;\n  }\n\n  p {\n    color: #666;\n    margin-bottom: 30px;\n  }\n"])));
var Profile = function () {
    var _a = (0, AuthContext_1.useAuth)(), user = _a.user, logout = _a.logout, token = _a.token;
    var navigate = (0, react_router_dom_1.useNavigate)();
    var _b = (0, react_1.useState)(0), ordersCount = _b[0], setOrdersCount = _b[1];
    var _c = (0, react_1.useState)(true), loading = _c[0], setLoading = _c[1];
    (0, react_1.useEffect)(function () {
        var fetchOrdersCount = function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!token)
                            return [2 /*return*/];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        return [4 /*yield*/, axios_1.default.get('http://localhost:5000/api/orders', {
                                headers: {
                                    'Authorization': "Bearer ".concat(token)
                                }
                            })];
                    case 2:
                        response = _a.sent();
                        setOrdersCount(response.data.length);
                        return [3 /*break*/, 5];
                    case 3:
                        error_1 = _a.sent();
                        console.error('Error fetching orders:', error_1);
                        return [3 /*break*/, 5];
                    case 4:
                        setLoading(false);
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        if (user) {
            fetchOrdersCount();
        }
    }, [user, token]);
    // Функция для определения статуса пользователя
    var getUserStatus = function () {
        if (ordersCount >= 2) {
            return '💎 Постоянный клиент';
        }
        else if (ordersCount === 1) {
            return '⭐ Клиент';
        }
        else {
            return '🌟 Новый пользователь';
        }
    };
    if (!user) {
        return ((0, jsx_runtime_1.jsx)(ProfileContainer, { children: (0, jsx_runtime_1.jsx)(ProfileContent, { children: (0, jsx_runtime_1.jsxs)(LoginPrompt, { children: [(0, jsx_runtime_1.jsx)("h3", { children: "\u0412\u043E\u0439\u0434\u0438\u0442\u0435 \u0432 \u0441\u0438\u0441\u0442\u0435\u043C\u0443" }), (0, jsx_runtime_1.jsx)("p", { children: "\u0414\u043B\u044F \u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440\u0430 \u043F\u0440\u043E\u0444\u0438\u043B\u044F \u043D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u043E \u0432\u043E\u0439\u0442\u0438 \u0432 \u0441\u0438\u0441\u0442\u0435\u043C\u0443" }), (0, jsx_runtime_1.jsx)(Button, { onClick: function () { return navigate('/login'); }, children: "\u0412\u043E\u0439\u0442\u0438" })] }) }) }));
    }
    return ((0, jsx_runtime_1.jsx)(ProfileContainer, { children: (0, jsx_runtime_1.jsxs)(ProfileContent, { children: [(0, jsx_runtime_1.jsx)(Title, { children: "\u041F\u0440\u043E\u0444\u0438\u043B\u044C" }), (0, jsx_runtime_1.jsxs)(ProfileCard, { children: [(0, jsx_runtime_1.jsxs)(BonusPoints, { children: [(0, jsx_runtime_1.jsx)(BonusTitle, { children: "\u0411\u043E\u043D\u0443\u0441\u043D\u044B\u0435 \u0431\u0430\u043B\u043B\u044B" }), (0, jsx_runtime_1.jsx)(BonusAmount, { children: user.bonusPoints })] }), (0, jsx_runtime_1.jsxs)(ProfileSection, { children: [(0, jsx_runtime_1.jsx)(SectionTitle, { children: "\u041B\u0438\u0447\u043D\u0430\u044F \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F" }), (0, jsx_runtime_1.jsxs)(InfoRow, { children: [(0, jsx_runtime_1.jsx)(Label, { children: "\u0418\u043C\u044F:" }), (0, jsx_runtime_1.jsx)(Value, { children: user.name })] }), (0, jsx_runtime_1.jsxs)(InfoRow, { children: [(0, jsx_runtime_1.jsx)(Label, { children: "Email:" }), (0, jsx_runtime_1.jsx)(Value, { children: user.email })] }), user.phone && ((0, jsx_runtime_1.jsxs)(InfoRow, { children: [(0, jsx_runtime_1.jsx)(Label, { children: "\u0422\u0435\u043B\u0435\u0444\u043E\u043D:" }), (0, jsx_runtime_1.jsx)(Value, { children: user.phone })] }))] }), (0, jsx_runtime_1.jsxs)(ProfileSection, { children: [(0, jsx_runtime_1.jsx)(SectionTitle, { children: "\uD83C\uDF81 \u0411\u043E\u043D\u0443\u0441\u043D\u0430\u044F \u0441\u0438\u0441\u0442\u0435\u043C\u0430" }), (0, jsx_runtime_1.jsxs)(InfoRow, { children: [(0, jsx_runtime_1.jsx)(Label, { children: "\u0411\u043E\u043D\u0443\u0441\u043D\u044B\u0435 \u0431\u0430\u043B\u043B\u044B:" }), (0, jsx_runtime_1.jsxs)(Value, { style: {
                                                color: '#f59e0b',
                                                fontWeight: 'bold',
                                                fontSize: '18px'
                                            }, children: [user.bonusPoints.toLocaleString(), " \u0431\u0430\u043B\u043B\u043E\u0432"] })] }), (0, jsx_runtime_1.jsxs)(InfoRow, { children: [(0, jsx_runtime_1.jsx)(Label, { children: "\u0421\u0442\u0430\u0442\u0443\u0441:" }), (0, jsx_runtime_1.jsx)(Value, { children: loading ? 'Загрузка...' : getUserStatus() })] }), (0, jsx_runtime_1.jsxs)(InfoRow, { children: [(0, jsx_runtime_1.jsx)(Label, { children: "\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0437\u0430\u043A\u0430\u0437\u043E\u0432:" }), (0, jsx_runtime_1.jsx)(Value, { style: { color: '#f59e0b', fontWeight: 'bold' }, children: loading ? '...' : ordersCount })] }), (0, jsx_runtime_1.jsxs)(InfoRow, { children: [(0, jsx_runtime_1.jsx)(Label, { children: "\u041A\u0430\u043A \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C:" }), (0, jsx_runtime_1.jsx)(Value, { style: { fontSize: '14px', color: '#666' }, children: "1 \u0431\u0430\u043B\u043B = 1 \u0440\u0443\u0431\u043B\u044C \u0441\u043A\u0438\u0434\u043A\u0438 \u043F\u0440\u0438 \u043E\u043F\u043B\u0430\u0442\u0435 \u0442\u0443\u0440\u043E\u0432" })] })] }), (0, jsx_runtime_1.jsxs)(ActionButtons, { children: [(0, jsx_runtime_1.jsx)(Button, { onClick: function () { return navigate('/orders'); }, children: "\u041C\u043E\u0438 \u0437\u0430\u043A\u0430\u0437\u044B" }), (0, jsx_runtime_1.jsx)(Button, { className: "secondary", onClick: function () { return navigate('/tours'); }, children: "\u041F\u0435\u0440\u0435\u0439\u0442\u0438 \u043A \u0442\u0443\u0440\u0430\u043C" }), (0, jsx_runtime_1.jsx)(Button, { className: "danger", onClick: logout, children: "\u0412\u044B\u0439\u0442\u0438" })] })] })] }) }));
};
exports.default = Profile;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13, templateObject_14, templateObject_15;
