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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var UniversalHeroSection_1 = __importDefault(require("../../components/UniversalHeroSection/UniversalHeroSection"));
require("./ContactPage.css");
var ContactPage = function () {
    var _a = (0, react_1.useState)({
        name: '',
        email: '',
        phone: '',
        message: ''
    }), formData = _a[0], setFormData = _a[1];
    var handleInputChange = function (e) {
        var _a = e.target, name = _a.name, value = _a.value;
        setFormData(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[name] = value, _a)));
        });
    };
    var handleSubmit = function (e) {
        e.preventDefault();
        // Здесь будет логика отправки формы
        console.log('Form submitted:', formData);
        alert('Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.');
        setFormData({
            name: '',
            email: '',
            phone: '',
            message: ''
        });
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "contact-page", children: [(0, jsx_runtime_1.jsx)(UniversalHeroSection_1.default, { pageName: "contacts", title: "\u0421\u0432\u044F\u0436\u0438\u0442\u0435\u0441\u044C \u0441 \u043D\u0430\u043C\u0438", description: "\u041C\u044B \u0433\u043E\u0442\u043E\u0432\u044B \u043E\u0442\u0432\u0435\u0442\u0438\u0442\u044C \u043D\u0430 \u0432\u0441\u0435 \u0432\u0430\u0448\u0438 \u0432\u043E\u043F\u0440\u043E\u0441\u044B \u0438 \u043F\u043E\u043C\u043E\u0447\u044C \u043E\u0440\u0433\u0430\u043D\u0438\u0437\u043E\u0432\u0430\u0442\u044C \u043D\u0435\u0437\u0430\u0431\u044B\u0432\u0430\u0435\u043C\u043E\u0435 \u043F\u0443\u0442\u0435\u0448\u0435\u0441\u0442\u0432\u0438\u0435 \u0432 \u0421\u043E\u0447\u0438" }), (0, jsx_runtime_1.jsx)("div", { className: "contact-content", children: (0, jsx_runtime_1.jsxs)("div", { className: "container", children: [(0, jsx_runtime_1.jsxs)("div", { className: "contact-grid", children: [(0, jsx_runtime_1.jsxs)("div", { className: "contact-info", children: [(0, jsx_runtime_1.jsx)("h2", { children: "\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u043D\u0430\u044F \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F" }), (0, jsx_runtime_1.jsxs)("div", { className: "info-items", children: [(0, jsx_runtime_1.jsxs)("div", { className: "info-item", children: [(0, jsx_runtime_1.jsx)("div", { className: "info-icon", children: "\uD83D\uDCDE" }), (0, jsx_runtime_1.jsxs)("div", { className: "info-content", children: [(0, jsx_runtime_1.jsx)("h3", { children: "\u0422\u0435\u043B\u0435\u0444\u043E\u043D" }), (0, jsx_runtime_1.jsx)("p", { children: "+7 (862) 200-00-00" }), (0, jsx_runtime_1.jsx)("p", { children: "+7 (862) 200-00-01" })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "info-item", children: [(0, jsx_runtime_1.jsx)("div", { className: "info-icon", children: "\u2709\uFE0F" }), (0, jsx_runtime_1.jsxs)("div", { className: "info-content", children: [(0, jsx_runtime_1.jsx)("h3", { children: "Email" }), (0, jsx_runtime_1.jsx)("p", { children: "info@sochitour.ru" }), (0, jsx_runtime_1.jsx)("p", { children: "booking@sochitour.ru" })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "info-item", children: [(0, jsx_runtime_1.jsx)("div", { className: "info-icon", children: "\uD83D\uDCCD" }), (0, jsx_runtime_1.jsxs)("div", { className: "info-content", children: [(0, jsx_runtime_1.jsx)("h3", { children: "\u0410\u0434\u0440\u0435\u0441" }), (0, jsx_runtime_1.jsx)("p", { children: "\u0433. \u0421\u043E\u0447\u0438, \u0443\u043B. \u041A\u0443\u0440\u043E\u0440\u0442\u043D\u044B\u0439 \u043F\u0440\u043E\u0441\u043F\u0435\u043A\u0442, 123" }), (0, jsx_runtime_1.jsx)("p", { children: "\u041E\u0444\u0438\u0441 45, 4 \u044D\u0442\u0430\u0436" })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "info-item", children: [(0, jsx_runtime_1.jsx)("div", { className: "info-icon", children: "\uD83D\uDD50" }), (0, jsx_runtime_1.jsxs)("div", { className: "info-content", children: [(0, jsx_runtime_1.jsx)("h3", { children: "\u0420\u0435\u0436\u0438\u043C \u0440\u0430\u0431\u043E\u0442\u044B" }), (0, jsx_runtime_1.jsx)("p", { children: "\u041F\u043D-\u041F\u0442: 9:00 - 20:00" }), (0, jsx_runtime_1.jsx)("p", { children: "\u0421\u0431-\u0412\u0441: 10:00 - 18:00" })] })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "social-links", children: [(0, jsx_runtime_1.jsx)("h3", { children: "\u041C\u044B \u0432 \u0441\u043E\u0446\u0438\u0430\u043B\u044C\u043D\u044B\u0445 \u0441\u0435\u0442\u044F\u0445" }), (0, jsx_runtime_1.jsxs)("div", { className: "social-icons", children: [(0, jsx_runtime_1.jsx)("a", { href: "https://wa.me/78620000000", target: "_blank", rel: "noopener noreferrer", className: "social-icon whatsapp", children: "\uD83D\uDCAC" }), (0, jsx_runtime_1.jsx)("a", { href: "https://t.me/sochitour", target: "_blank", rel: "noopener noreferrer", className: "social-icon telegram", children: "\uD83D\uDCF1" })] })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "contact-form", children: [(0, jsx_runtime_1.jsx)("h2", { children: "\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435" }), (0, jsx_runtime_1.jsxs)("form", { onSubmit: handleSubmit, children: [(0, jsx_runtime_1.jsxs)("div", { className: "form-group", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "name", children: "\u0412\u0430\u0448\u0435 \u0438\u043C\u044F *" }), (0, jsx_runtime_1.jsx)("input", { type: "text", id: "name", name: "name", value: formData.name, onChange: handleInputChange, required: true, placeholder: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0432\u0430\u0448\u0435 \u0438\u043C\u044F" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-group", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "email", children: "Email *" }), (0, jsx_runtime_1.jsx)("input", { type: "email", id: "email", name: "email", value: formData.email, onChange: handleInputChange, required: true, placeholder: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0432\u0430\u0448 email" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-group", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "phone", children: "\u0422\u0435\u043B\u0435\u0444\u043E\u043D" }), (0, jsx_runtime_1.jsx)("input", { type: "tel", id: "phone", name: "phone", value: formData.phone, onChange: handleInputChange, placeholder: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0432\u0430\u0448 \u0442\u0435\u043B\u0435\u0444\u043E\u043D" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-group", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "message", children: "\u0421\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435 *" }), (0, jsx_runtime_1.jsx)("textarea", { id: "message", name: "message", value: formData.message, onChange: handleInputChange, required: true, rows: 5, placeholder: "\u041E\u043F\u0438\u0448\u0438\u0442\u0435 \u0432\u0430\u0448\u0438 \u043F\u043E\u0436\u0435\u043B\u0430\u043D\u0438\u044F \u0438\u043B\u0438 \u0437\u0430\u0434\u0430\u0439\u0442\u0435 \u0432\u043E\u043F\u0440\u043E\u0441" })] }), (0, jsx_runtime_1.jsx)("button", { type: "submit", className: "btn-submit", children: "\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435" })] })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "map-section", children: [(0, jsx_runtime_1.jsx)("h2", { children: "\u041A\u0430\u043A \u043D\u0430\u0441 \u043D\u0430\u0439\u0442\u0438" }), (0, jsx_runtime_1.jsx)("div", { className: "map-placeholder", children: (0, jsx_runtime_1.jsxs)("div", { className: "map-content", children: ["\uD83D\uDCCD", (0, jsx_runtime_1.jsx)("p", { children: "\u041A\u0430\u0440\u0442\u0430 \u0431\u0443\u0434\u0435\u0442 \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043D\u0430 \u0437\u0434\u0435\u0441\u044C" }), (0, jsx_runtime_1.jsx)("p", { children: "\u0433. \u0421\u043E\u0447\u0438, \u0443\u043B. \u041A\u0443\u0440\u043E\u0440\u0442\u043D\u044B\u0439 \u043F\u0440\u043E\u0441\u043F\u0435\u043A\u0442, 123" })] }) })] })] }) })] }));
};
exports.default = ContactPage;
