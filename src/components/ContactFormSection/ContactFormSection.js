"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
require("./ContactFormSection.css");
var ContactFormSection = function () {
    var _a = (0, react_1.useState)({
        name: '',
        phone: '',
        email: '',
        destination: '',
        dates: '',
        guests: '',
        message: ''
    }), formData = _a[0], setFormData = _a[1];
    var _b = (0, react_1.useState)(false), isSubmitting = _b[0], setIsSubmitting = _b[1];
    var _c = (0, react_1.useState)(false), isSubmitted = _c[0], setIsSubmitted = _c[1];
    var handleChange = function (e) {
        var _a;
        setFormData(__assign(__assign({}, formData), (_a = {}, _a[e.target.name] = e.target.value, _a)));
    };
    var handleSubmit = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    setIsSubmitting(true);
                    // Имитация отправки формы
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 2000); })];
                case 1:
                    // Имитация отправки формы
                    _a.sent();
                    setIsSubmitting(false);
                    setIsSubmitted(true);
                    // Сброс формы через 3 секунды
                    setTimeout(function () {
                        setIsSubmitted(false);
                        setFormData({
                            name: '',
                            phone: '',
                            email: '',
                            destination: '',
                            dates: '',
                            guests: '',
                            message: ''
                        });
                    }, 3000);
                    return [2 /*return*/];
            }
        });
    }); };
    return ((0, jsx_runtime_1.jsx)("section", { className: "contact-form-section", children: (0, jsx_runtime_1.jsx)("div", { className: "container", children: (0, jsx_runtime_1.jsxs)("div", { className: "contact-grid", children: [(0, jsx_runtime_1.jsxs)("div", { className: "contact-info", children: [(0, jsx_runtime_1.jsxs)("div", { className: "info-header", children: [(0, jsx_runtime_1.jsx)("h2", { children: "\u041F\u043E\u043B\u0443\u0447\u0438\u0442\u0435 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u043E\u0435 \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u0435" }), (0, jsx_runtime_1.jsx)("p", { children: "\u041E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u0437\u0430\u044F\u0432\u043A\u0443, \u0438 \u043D\u0430\u0448 \u043C\u0435\u043D\u0435\u0434\u0436\u0435\u0440 \u0441\u0432\u044F\u0436\u0435\u0442\u0441\u044F \u0441 \u0432\u0430\u043C\u0438 \u0432 \u0442\u0435\u0447\u0435\u043D\u0438\u0435 15 \u043C\u0438\u043D\u0443\u0442" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "info-items", children: [(0, jsx_runtime_1.jsxs)("div", { className: "info-item", children: [(0, jsx_runtime_1.jsx)("div", { className: "info-icon", children: "\uD83D\uDCDE" }), (0, jsx_runtime_1.jsxs)("div", { className: "info-content", children: [(0, jsx_runtime_1.jsx)("h4", { children: "\u0422\u0435\u043B\u0435\u0444\u043E\u043D" }), (0, jsx_runtime_1.jsx)("p", { children: "+7 (862) 200-00-00" }), (0, jsx_runtime_1.jsx)("a", { href: "tel:+78620000000", className: "info-link", children: "\u041F\u043E\u0437\u0432\u043E\u043D\u0438\u0442\u044C" })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "info-item", children: [(0, jsx_runtime_1.jsx)("div", { className: "info-icon", children: "\uD83D\uDCAC" }), (0, jsx_runtime_1.jsxs)("div", { className: "info-content", children: [(0, jsx_runtime_1.jsx)("h4", { children: "WhatsApp" }), (0, jsx_runtime_1.jsx)("p", { children: "+7 (862) 200-00-00" }), (0, jsx_runtime_1.jsx)("a", { href: "https://wa.me/78620000000", className: "info-link", target: "_blank", rel: "noopener noreferrer", children: "\u041D\u0430\u043F\u0438\u0441\u0430\u0442\u044C" })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "info-item", children: [(0, jsx_runtime_1.jsx)("div", { className: "info-icon", children: "\u2709\uFE0F" }), (0, jsx_runtime_1.jsxs)("div", { className: "info-content", children: [(0, jsx_runtime_1.jsx)("h4", { children: "Email" }), (0, jsx_runtime_1.jsx)("p", { children: "info@sochitur.ru" }), (0, jsx_runtime_1.jsx)("a", { href: "mailto:info@sochitur.ru", className: "info-link", children: "\u041D\u0430\u043F\u0438\u0441\u0430\u0442\u044C" })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "info-item", children: [(0, jsx_runtime_1.jsx)("div", { className: "info-icon", children: "\uD83D\uDCCD" }), (0, jsx_runtime_1.jsxs)("div", { className: "info-content", children: [(0, jsx_runtime_1.jsx)("h4", { children: "\u0410\u0434\u0440\u0435\u0441" }), (0, jsx_runtime_1.jsx)("p", { children: "\u0433. \u0421\u043E\u0447\u0438, \u0443\u043B. \u041A\u0443\u0440\u043E\u0440\u0442\u043D\u0430\u044F, 15" }), (0, jsx_runtime_1.jsx)("a", { href: "#map", className: "info-link", children: "\u041F\u043E\u0441\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u043D\u0430 \u043A\u0430\u0440\u0442\u0435" })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "info-item", children: [(0, jsx_runtime_1.jsx)("div", { className: "info-icon", children: "\uD83D\uDD50" }), (0, jsx_runtime_1.jsxs)("div", { className: "info-content", children: [(0, jsx_runtime_1.jsx)("h4", { children: "\u0420\u0435\u0436\u0438\u043C \u0440\u0430\u0431\u043E\u0442\u044B" }), (0, jsx_runtime_1.jsx)("p", { children: "\u041F\u043D-\u0412\u0441: 9:00 - 21:00" }), (0, jsx_runtime_1.jsx)("span", { className: "info-note", children: "\u0411\u0435\u0437 \u0432\u044B\u0445\u043E\u0434\u043D\u044B\u0445" })] })] })] })] }), (0, jsx_runtime_1.jsx)("div", { className: "contact-form", children: isSubmitted ? ((0, jsx_runtime_1.jsxs)("div", { className: "success-message", children: [(0, jsx_runtime_1.jsx)("div", { className: "success-icon", children: "\u2713" }), (0, jsx_runtime_1.jsx)("h3", { children: "\u0421\u043F\u0430\u0441\u0438\u0431\u043E \u0437\u0430 \u0437\u0430\u044F\u0432\u043A\u0443!" }), (0, jsx_runtime_1.jsx)("p", { children: "\u041D\u0430\u0448 \u043C\u0435\u043D\u0435\u0434\u0436\u0435\u0440 \u0441\u0432\u044F\u0436\u0435\u0442\u0441\u044F \u0441 \u0432\u0430\u043C\u0438 \u0432 \u0442\u0435\u0447\u0435\u043D\u0438\u0435 15 \u043C\u0438\u043D\u0443\u0442" })] })) : ((0, jsx_runtime_1.jsxs)("form", { onSubmit: handleSubmit, children: [(0, jsx_runtime_1.jsxs)("div", { className: "form-header", children: [(0, jsx_runtime_1.jsx)("h3", { children: "\u041E\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u0437\u0430\u044F\u0432\u043A\u0443" }), (0, jsx_runtime_1.jsx)("p", { children: "\u0417\u0430\u043F\u043E\u043B\u043D\u0438\u0442\u0435 \u0444\u043E\u0440\u043C\u0443, \u0438 \u043C\u044B \u043F\u043E\u0434\u0431\u0435\u0440\u0435\u043C \u0438\u0434\u0435\u0430\u043B\u044C\u043D\u044B\u0439 \u0442\u0443\u0440" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-row", children: [(0, jsx_runtime_1.jsxs)("div", { className: "form-group", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "name", children: "\u0418\u043C\u044F *" }), (0, jsx_runtime_1.jsx)("input", { type: "text", id: "name", name: "name", value: formData.name, onChange: handleChange, required: true, placeholder: "\u0412\u0430\u0448\u0435 \u0438\u043C\u044F" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-group", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "phone", children: "\u0422\u0435\u043B\u0435\u0444\u043E\u043D *" }), (0, jsx_runtime_1.jsx)("input", { type: "tel", id: "phone", name: "phone", value: formData.phone, onChange: handleChange, required: true, placeholder: "+7 (___) ___-__-__" })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-row", children: [(0, jsx_runtime_1.jsxs)("div", { className: "form-group", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "email", children: "Email" }), (0, jsx_runtime_1.jsx)("input", { type: "email", id: "email", name: "email", value: formData.email, onChange: handleChange, placeholder: "your@email.com" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-group", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "destination", children: "\u041D\u0430\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435" }), (0, jsx_runtime_1.jsxs)("select", { id: "destination", name: "destination", value: formData.destination, onChange: handleChange, children: [(0, jsx_runtime_1.jsx)("option", { value: "", children: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043D\u0430\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435" }), (0, jsx_runtime_1.jsx)("option", { value: "sochi", children: "\u0421\u043E\u0447\u0438" }), (0, jsx_runtime_1.jsx)("option", { value: "krasnaya-polyana", children: "\u041A\u0440\u0430\u0441\u043D\u0430\u044F \u041F\u043E\u043B\u044F\u043D\u0430" }), (0, jsx_runtime_1.jsx)("option", { value: "abkhazia", children: "\u0410\u0431\u0445\u0430\u0437\u0438\u044F" }), (0, jsx_runtime_1.jsx)("option", { value: "foreign", children: "\u0417\u0430\u0440\u0443\u0431\u0435\u0436\u043D\u044B\u0435 \u0442\u0443\u0440\u044B" })] })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-row", children: [(0, jsx_runtime_1.jsxs)("div", { className: "form-group", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "dates", children: "\u0414\u0430\u0442\u044B \u043F\u043E\u0435\u0437\u0434\u043A\u0438" }), (0, jsx_runtime_1.jsx)("input", { type: "text", id: "dates", name: "dates", value: formData.dates, onChange: handleChange, placeholder: "\u041A\u043E\u0433\u0434\u0430 \u043F\u043B\u0430\u043D\u0438\u0440\u0443\u0435\u0442\u0435 \u043F\u043E\u0435\u0445\u0430\u0442\u044C?" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-group", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "guests", children: "\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0433\u043E\u0441\u0442\u0435\u0439" }), (0, jsx_runtime_1.jsxs)("select", { id: "guests", name: "guests", value: formData.guests, onChange: handleChange, children: [(0, jsx_runtime_1.jsx)("option", { value: "", children: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E" }), (0, jsx_runtime_1.jsx)("option", { value: "1", children: "1 \u0447\u0435\u043B\u043E\u0432\u0435\u043A" }), (0, jsx_runtime_1.jsx)("option", { value: "2", children: "2 \u0447\u0435\u043B\u043E\u0432\u0435\u043A\u0430" }), (0, jsx_runtime_1.jsx)("option", { value: "3", children: "3 \u0447\u0435\u043B\u043E\u0432\u0435\u043A\u0430" }), (0, jsx_runtime_1.jsx)("option", { value: "4", children: "4 \u0447\u0435\u043B\u043E\u0432\u0435\u043A\u0430" }), (0, jsx_runtime_1.jsx)("option", { value: "5+", children: "5+ \u0447\u0435\u043B\u043E\u0432\u0435\u043A" })] })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-group", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "message", children: "\u0414\u043E\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u0430\u044F \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F" }), (0, jsx_runtime_1.jsx)("textarea", { id: "message", name: "message", value: formData.message, onChange: handleChange, rows: 4, placeholder: "\u0420\u0430\u0441\u0441\u043A\u0430\u0436\u0438\u0442\u0435 \u043E \u0432\u0430\u0448\u0438\u0445 \u043F\u043E\u0436\u0435\u043B\u0430\u043D\u0438\u044F\u0445..." })] }), (0, jsx_runtime_1.jsx)("button", { type: "submit", className: "btn btn-primary ".concat(isSubmitting ? 'loading' : ''), disabled: isSubmitting, children: isSubmitting ? 'Отправляем...' : 'Получить предложение' }), (0, jsx_runtime_1.jsxs)("p", { className: "form-note", children: ["\u041D\u0430\u0436\u0438\u043C\u0430\u044F \u043A\u043D\u043E\u043F\u043A\u0443, \u0432\u044B \u0441\u043E\u0433\u043B\u0430\u0448\u0430\u0435\u0442\u0435\u0441\u044C \u0441 ", (0, jsx_runtime_1.jsx)("a", { href: "/privacy", children: "\u043F\u043E\u043B\u0438\u0442\u0438\u043A\u043E\u0439 \u043A\u043E\u043D\u0444\u0438\u0434\u0435\u043D\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0438" })] })] })) })] }) }) }));
};
exports.default = ContactFormSection;
