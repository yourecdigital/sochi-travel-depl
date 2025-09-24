"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var styled_components_1 = __importDefault(require("styled-components"));
var CategorySelector = function (_a) {
    var value = _a.value, onChange = _a.onChange, existingCategories = _a.existingCategories, _b = _a.placeholder, placeholder = _b === void 0 ? "Выберите категорию" : _b;
    var _c = (0, react_1.useState)(false), isNewCategory = _c[0], setIsNewCategory = _c[1];
    var _d = (0, react_1.useState)(''), newCategoryName = _d[0], setNewCategoryName = _d[1];
    // Проверяем, является ли текущее значение новой категорией
    (0, react_1.useEffect)(function () {
        if (value && !existingCategories.includes(value)) {
            setIsNewCategory(true);
            setNewCategoryName(value);
        }
    }, [value, existingCategories]);
    var handleCategoryChange = function (selectedValue) {
        if (selectedValue === 'new') {
            setIsNewCategory(true);
            setNewCategoryName('');
            onChange('');
        }
        else {
            setIsNewCategory(false);
            setNewCategoryName('');
            onChange(selectedValue);
        }
    };
    var handleNewCategoryChange = function (newValue) {
        setNewCategoryName(newValue);
        onChange(newValue);
    };
    return ((0, jsx_runtime_1.jsx)(Container, { children: !isNewCategory ? ((0, jsx_runtime_1.jsxs)(Select, { value: value, onChange: function (e) { return handleCategoryChange(e.target.value); }, children: [(0, jsx_runtime_1.jsx)("option", { value: "", children: placeholder }), existingCategories.map(function (category) { return ((0, jsx_runtime_1.jsx)("option", { value: category, children: category }, category)); }), (0, jsx_runtime_1.jsx)("option", { value: "new", children: "\u2795 \u041D\u043E\u0432\u0430\u044F \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F" })] })) : ((0, jsx_runtime_1.jsxs)(NewCategoryContainer, { children: [(0, jsx_runtime_1.jsxs)(Select, { value: "new", onChange: function (e) { return handleCategoryChange(e.target.value); }, children: [(0, jsx_runtime_1.jsx)("option", { value: "new", children: "\u2795 \u041D\u043E\u0432\u0430\u044F \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F" }), existingCategories.map(function (category) { return ((0, jsx_runtime_1.jsx)("option", { value: category, children: category }, category)); })] }), (0, jsx_runtime_1.jsx)(Input, { type: "text", value: newCategoryName, onChange: function (e) { return handleNewCategoryChange(e.target.value); }, placeholder: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u043D\u043E\u0432\u043E\u0439 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438", required: true })] })) }));
};
var Container = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  width: 100%;\n"], ["\n  width: 100%;\n"])));
var Select = styled_components_1.default.select(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  width: 100%;\n  padding: 12px;\n  border: 1px solid #ddd;\n  border-radius: 6px;\n  font-size: 14px;\n  background-color: white;\n  cursor: pointer;\n  \n  &:focus {\n    outline: none;\n    border-color: #007bff;\n    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);\n  }\n"], ["\n  width: 100%;\n  padding: 12px;\n  border: 1px solid #ddd;\n  border-radius: 6px;\n  font-size: 14px;\n  background-color: white;\n  cursor: pointer;\n  \n  &:focus {\n    outline: none;\n    border-color: #007bff;\n    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);\n  }\n"])));
var NewCategoryContainer = styled_components_1.default.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n"], ["\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n"])));
var Input = styled_components_1.default.input(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  width: 100%;\n  padding: 12px;\n  border: 1px solid #ddd;\n  border-radius: 6px;\n  font-size: 14px;\n  \n  &:focus {\n    outline: none;\n    border-color: #007bff;\n    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);\n  }\n"], ["\n  width: 100%;\n  padding: 12px;\n  border: 1px solid #ddd;\n  border-radius: 6px;\n  font-size: 14px;\n  \n  &:focus {\n    outline: none;\n    border-color: #007bff;\n    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);\n  }\n"])));
exports.default = CategorySelector;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
