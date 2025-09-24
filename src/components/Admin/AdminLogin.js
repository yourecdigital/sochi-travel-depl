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
var styled_components_1 = __importDefault(require("styled-components"));
var axios_1 = __importDefault(require("axios"));
var react_hot_toast_1 = __importDefault(require("react-hot-toast"));
var LoginContainer = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  min-height: 100vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);\n  padding: 20px;\n"], ["\n  min-height: 100vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);\n  padding: 20px;\n"])));
var LoginCard = styled_components_1.default.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  background: white;\n  padding: 40px;\n  border-radius: 15px;\n  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);\n  width: 100%;\n  max-width: 400px;\n"], ["\n  background: white;\n  padding: 40px;\n  border-radius: 15px;\n  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);\n  width: 100%;\n  max-width: 400px;\n"])));
var Title = styled_components_1.default.h2(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  text-align: center;\n  color: #1e293b;\n  margin-bottom: 30px;\n  font-size: 28px;\n"], ["\n  text-align: center;\n  color: #1e293b;\n  margin-bottom: 30px;\n  font-size: 28px;\n"])));
var Form = styled_components_1.default.form(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n"], ["\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n"])));
var FormGroup = styled_components_1.default.div(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n"], ["\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n"])));
var Label = styled_components_1.default.label(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  font-weight: 600;\n  color: #555;\n  font-size: 14px;\n"], ["\n  font-weight: 600;\n  color: #555;\n  font-size: 14px;\n"])));
var Input = styled_components_1.default.input(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  padding: 12px 16px;\n  border: 2px solid #e1e5e9;\n  border-radius: 8px;\n  font-size: 16px;\n  transition: border-color 0.3s ease, box-shadow 0.3s ease;\n\n  &:focus {\n    outline: none;\n    border-color: #ffd700;\n    box-shadow: 0 0 0 3px rgba(255, 215, 0, 0.15);\n  }\n"], ["\n  padding: 12px 16px;\n  border: 2px solid #e1e5e9;\n  border-radius: 8px;\n  font-size: 16px;\n  transition: border-color 0.3s ease, box-shadow 0.3s ease;\n\n  &:focus {\n    outline: none;\n    border-color: #ffd700;\n    box-shadow: 0 0 0 3px rgba(255, 215, 0, 0.15);\n  }\n"])));
var Button = styled_components_1.default.button(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n  background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);\n  color: #1e293b;\n  padding: 14px;\n  border: none;\n  border-radius: 8px;\n  font-size: 16px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: transform 0.2s ease, box-shadow 0.2s ease;\n  box-shadow: 0 8px 20px rgba(255, 215, 0, 0.3);\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: 0 12px 28px rgba(255, 215, 0, 0.35);\n  }\n\n  &:disabled {\n    opacity: 0.7;\n    cursor: not-allowed;\n    transform: none;\n    box-shadow: none;\n  }\n"], ["\n  background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);\n  color: #1e293b;\n  padding: 14px;\n  border: none;\n  border-radius: 8px;\n  font-size: 16px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: transform 0.2s ease, box-shadow 0.2s ease;\n  box-shadow: 0 8px 20px rgba(255, 215, 0, 0.3);\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: 0 12px 28px rgba(255, 215, 0, 0.35);\n  }\n\n  &:disabled {\n    opacity: 0.7;\n    cursor: not-allowed;\n    transform: none;\n    box-shadow: none;\n  }\n"])));
var ErrorMessage = styled_components_1.default.div(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n  color: #e74c3c;\n  text-align: center;\n  font-size: 14px;\n  margin-top: 10px;\n"], ["\n  color: #e74c3c;\n  text-align: center;\n  font-size: 14px;\n  margin-top: 10px;\n"])));
var AdminLogin = function () {
    var _a = (0, react_1.useState)(''), username = _a[0], setUsername = _a[1];
    var _b = (0, react_1.useState)(''), password = _b[0], setPassword = _b[1];
    var _c = (0, react_1.useState)(''), error = _c[0], setError = _c[1];
    var _d = (0, react_1.useState)(false), isLoading = _d[0], setIsLoading = _d[1];
    var navigate = (0, react_router_dom_1.useNavigate)();
    var handleSubmit = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var response, error_1, message;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    e.preventDefault();
                    setError('');
                    setIsLoading(true);
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, axios_1.default.post('http://localhost:5000/api/admin/login', {
                            username: username,
                            password: password
                        })];
                case 2:
                    response = _c.sent();
                    localStorage.setItem('adminToken', response.data.token);
                    react_hot_toast_1.default.success('Успешный вход в админ-панель');
                    navigate('/admin/dashboard');
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _c.sent();
                    message = ((_b = (_a = error_1.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.error) || 'Ошибка входа';
                    setError(message);
                    react_hot_toast_1.default.error(message);
                    return [3 /*break*/, 4];
                case 4:
                    setIsLoading(false);
                    return [2 /*return*/];
            }
        });
    }); };
    return ((0, jsx_runtime_1.jsx)(LoginContainer, { children: (0, jsx_runtime_1.jsxs)(LoginCard, { children: [(0, jsx_runtime_1.jsx)(Title, { children: "\u0412\u0445\u043E\u0434 \u0432 \u0430\u0434\u043C\u0438\u043D-\u043F\u0430\u043D\u0435\u043B\u044C" }), (0, jsx_runtime_1.jsxs)(Form, { onSubmit: handleSubmit, children: [(0, jsx_runtime_1.jsxs)(FormGroup, { children: [(0, jsx_runtime_1.jsx)(Label, { children: "\u0418\u043C\u044F \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F" }), (0, jsx_runtime_1.jsx)(Input, { type: "text", value: username, onChange: function (e) { return setUsername(e.target.value); }, required: true })] }), (0, jsx_runtime_1.jsxs)(FormGroup, { children: [(0, jsx_runtime_1.jsx)(Label, { children: "\u041F\u0430\u0440\u043E\u043B\u044C" }), (0, jsx_runtime_1.jsx)(Input, { type: "password", value: password, onChange: function (e) { return setPassword(e.target.value); }, required: true })] }), (0, jsx_runtime_1.jsx)(Button, { type: "submit", disabled: isLoading, children: isLoading ? 'Вход...' : 'Войти' })] }), error && (0, jsx_runtime_1.jsx)(ErrorMessage, { children: error })] }) }));
};
exports.default = AdminLogin;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9;
