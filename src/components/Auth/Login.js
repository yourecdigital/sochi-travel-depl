"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
var react_1 = __importDefault(require("react"));
var react_hook_form_1 = require("react-hook-form");
var react_router_dom_1 = require("react-router-dom");
var AuthContext_1 = require("../../contexts/AuthContext");
var styled_components_1 = __importDefault(require("styled-components"));
var LoginContainer = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  min-height: 80vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);\n  padding: 40px 20px;\n"], ["\n  min-height: 80vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);\n  padding: 40px 20px;\n"])));
var LoginCard = styled_components_1.default.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  background: white;\n  padding: 40px;\n  border-radius: 15px;\n  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);\n  width: 100%;\n  max-width: 400px;\n"], ["\n  background: white;\n  padding: 40px;\n  border-radius: 15px;\n  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);\n  width: 100%;\n  max-width: 400px;\n"])));
var Title = styled_components_1.default.h2(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  text-align: center;\n  color: #1e293b;\n  margin-bottom: 30px;\n  font-size: 28px;\n"], ["\n  text-align: center;\n  color: #1e293b;\n  margin-bottom: 30px;\n  font-size: 28px;\n"])));
var Form = styled_components_1.default.form(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n"], ["\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n"])));
var FormGroup = styled_components_1.default.div(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n"], ["\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n"])));
var Label = styled_components_1.default.label(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  font-weight: 600;\n  color: #555;\n  font-size: 14px;\n"], ["\n  font-weight: 600;\n  color: #555;\n  font-size: 14px;\n"])));
var Input = styled_components_1.default.input(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  padding: 12px 16px;\n  border: 2px solid #e1e5e9;\n  border-radius: 8px;\n  font-size: 16px;\n  transition: border-color 0.3s ease, box-shadow 0.3s ease;\n\n  &:focus {\n    outline: none;\n    border-color: #ffd700;\n    box-shadow: 0 0 0 3px rgba(255, 215, 0, 0.15);\n  }\n\n  &.error {\n    border-color: #e74c3c;\n  }\n"], ["\n  padding: 12px 16px;\n  border: 2px solid #e1e5e9;\n  border-radius: 8px;\n  font-size: 16px;\n  transition: border-color 0.3s ease, box-shadow 0.3s ease;\n\n  &:focus {\n    outline: none;\n    border-color: #ffd700;\n    box-shadow: 0 0 0 3px rgba(255, 215, 0, 0.15);\n  }\n\n  &.error {\n    border-color: #e74c3c;\n  }\n"])));
var ErrorMessage = styled_components_1.default.span(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n  color: #e74c3c;\n  font-size: 12px;\n  margin-top: 4px;\n"], ["\n  color: #e74c3c;\n  font-size: 12px;\n  margin-top: 4px;\n"])));
var Button = styled_components_1.default.button(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n  background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);\n  color: #1e293b;\n  padding: 14px;\n  border: none;\n  border-radius: 8px;\n  font-size: 16px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: transform 0.2s ease, box-shadow 0.2s ease;\n  box-shadow: 0 8px 20px rgba(255, 215, 0, 0.3);\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: 0 12px 28px rgba(255, 215, 0, 0.35);\n  }\n\n  &:disabled {\n    opacity: 0.7;\n    cursor: not-allowed;\n    transform: none;\n    box-shadow: none;\n  }\n"], ["\n  background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);\n  color: #1e293b;\n  padding: 14px;\n  border: none;\n  border-radius: 8px;\n  font-size: 16px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: transform 0.2s ease, box-shadow 0.2s ease;\n  box-shadow: 0 8px 20px rgba(255, 215, 0, 0.3);\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: 0 12px 28px rgba(255, 215, 0, 0.35);\n  }\n\n  &:disabled {\n    opacity: 0.7;\n    cursor: not-allowed;\n    transform: none;\n    box-shadow: none;\n  }\n"])));
var RegisterLink = styled_components_1.default.div(templateObject_10 || (templateObject_10 = __makeTemplateObject(["\n  text-align: center;\n  margin-top: 20px;\n  color: #666;\n\n  a {\n    color: #000;\n    text-decoration: none;\n    font-weight: 600;\n\n    &:hover {\n      text-decoration: underline;\n    }\n  }\n"], ["\n  text-align: center;\n  margin-top: 20px;\n  color: #666;\n\n  a {\n    color: #000;\n    text-decoration: none;\n    font-weight: 600;\n\n    &:hover {\n      text-decoration: underline;\n    }\n  }\n"])));
var Login = function () {
    var _a = (0, AuthContext_1.useAuth)(), login = _a.login, user = _a.user;
    var navigate = (0, react_router_dom_1.useNavigate)();
    var _b = react_1.default.useState(false), isLoading = _b[0], setIsLoading = _b[1];
    var _c = (0, react_hook_form_1.useForm)(), register = _c.register, handleSubmit = _c.handleSubmit, errors = _c.formState.errors;
    var onSubmit = function (data) { return __awaiter(void 0, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setIsLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, login(data.email, data.password)];
                case 2:
                    _a.sent();
                    navigate('/');
                    return [3 /*break*/, 5];
                case 3:
                    error_1 = _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    // Если пользователь уже авторизован, показываем сообщение
    if (user) {
        return ((0, jsx_runtime_1.jsx)(LoginContainer, { children: (0, jsx_runtime_1.jsxs)(LoginCard, { children: [(0, jsx_runtime_1.jsx)(Title, { children: "\u0412\u044B \u0443\u0436\u0435 \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u043E\u0432\u0430\u043D\u044B" }), (0, jsx_runtime_1.jsxs)("div", { style: { textAlign: 'center', marginBottom: '30px' }, children: [(0, jsx_runtime_1.jsxs)("p", { style: { color: '#666', marginBottom: '20px' }, children: ["\u0414\u043E\u0431\u0440\u043E \u043F\u043E\u0436\u0430\u043B\u043E\u0432\u0430\u0442\u044C, ", user.name, "! \u0412\u044B \u0443\u0436\u0435 \u0432\u043E\u0448\u043B\u0438 \u0432 \u0441\u0438\u0441\u0442\u0435\u043C\u0443."] }), (0, jsx_runtime_1.jsx)(Button, { onClick: function () { return navigate('/'); }, children: "\u0412\u0435\u0440\u043D\u0443\u0442\u044C\u0441\u044F \u043D\u0430 \u0433\u043B\u0430\u0432\u043D\u0443\u044E" })] })] }) }));
    }
    return ((0, jsx_runtime_1.jsx)(LoginContainer, { children: (0, jsx_runtime_1.jsxs)(LoginCard, { children: [(0, jsx_runtime_1.jsx)(Title, { children: "\u0412\u0445\u043E\u0434 \u0432 \u0441\u0438\u0441\u0442\u0435\u043C\u0443" }), (0, jsx_runtime_1.jsxs)(Form, { onSubmit: handleSubmit(onSubmit), children: [(0, jsx_runtime_1.jsxs)(FormGroup, { children: [(0, jsx_runtime_1.jsx)(Label, { children: "Email" }), (0, jsx_runtime_1.jsx)(Input, __assign({ type: "email" }, register('email', {
                                    required: 'Email обязателен',
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: 'Некорректный email'
                                    }
                                }), { className: errors.email ? 'error' : '', placeholder: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0432\u0430\u0448 email" })), errors.email && (0, jsx_runtime_1.jsx)(ErrorMessage, { children: errors.email.message })] }), (0, jsx_runtime_1.jsxs)(FormGroup, { children: [(0, jsx_runtime_1.jsx)(Label, { children: "\u041F\u0430\u0440\u043E\u043B\u044C" }), (0, jsx_runtime_1.jsx)(Input, __assign({ type: "password" }, register('password', {
                                    required: 'Пароль обязателен',
                                    minLength: {
                                        value: 6,
                                        message: 'Пароль должен содержать минимум 6 символов'
                                    }
                                }), { className: errors.password ? 'error' : '', placeholder: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0432\u0430\u0448 \u043F\u0430\u0440\u043E\u043B\u044C" })), errors.password && (0, jsx_runtime_1.jsx)(ErrorMessage, { children: errors.password.message })] }), (0, jsx_runtime_1.jsx)(Button, { type: "submit", disabled: isLoading, children: isLoading ? 'Вход...' : 'Войти' })] }), (0, jsx_runtime_1.jsxs)(RegisterLink, { children: ["\u041D\u0435\u0442 \u0430\u043A\u043A\u0430\u0443\u043D\u0442\u0430? ", (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/register", children: "\u0417\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u0442\u044C\u0441\u044F" })] })] }) }));
};
exports.default = Login;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10;
