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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var styled_components_1 = __importDefault(require("styled-components"));
var EditorContainer = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  padding: 20px;\n"], ["\n  padding: 20px;\n"])));
var EditorHeader = styled_components_1.default.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 20px;\n  padding-bottom: 15px;\n  border-bottom: 2px solid #e2e8f0;\n"], ["\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 20px;\n  padding-bottom: 15px;\n  border-bottom: 2px solid #e2e8f0;\n"])));
var Title = styled_components_1.default.h2(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  color: #1e293b;\n  margin: 0;\n  font-size: 20px;\n"], ["\n  color: #1e293b;\n  margin: 0;\n  font-size: 20px;\n"])));
var AddButton = styled_components_1.default.button(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  background: #10b981;\n  color: white;\n  border: none;\n  padding: 10px 20px;\n  border-radius: 6px;\n  cursor: pointer;\n  font-weight: 500;\n  transition: background 0.3s ease;\n\n  &:hover {\n    background: #059669;\n  }\n"], ["\n  background: #10b981;\n  color: white;\n  border: none;\n  padding: 10px 20px;\n  border-radius: 6px;\n  cursor: pointer;\n  font-weight: 500;\n  transition: background 0.3s ease;\n\n  &:hover {\n    background: #059669;\n  }\n"])));
var CardsGrid = styled_components_1.default.div(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));\n  gap: 20px;\n  margin-bottom: 20px;\n"], ["\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));\n  gap: 20px;\n  margin-bottom: 20px;\n"])));
var Card = styled_components_1.default.div(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  background: white;\n  border: 1px solid #e2e8f0;\n  border-radius: 10px;\n  overflow: hidden;\n  transition: box-shadow 0.3s ease;\n\n  &:hover {\n    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n  }\n"], ["\n  background: white;\n  border: 1px solid #e2e8f0;\n  border-radius: 10px;\n  overflow: hidden;\n  transition: box-shadow 0.3s ease;\n\n  &:hover {\n    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n  }\n"])));
var CardImage = styled_components_1.default.div(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  height: 200px;\n  background: ", ";\n  background-size: cover;\n  background-position: center;\n  position: relative;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: #64748b;\n  font-size: 14px;\n"], ["\n  height: 200px;\n  background: ", ";\n  background-size: cover;\n  background-position: center;\n  position: relative;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: #64748b;\n  font-size: 14px;\n"])), function (props) { return props.imageUrl ? "url(".concat(props.imageUrl, ")") : '#f1f5f9'; });
var CardContent = styled_components_1.default.div(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n  padding: 15px;\n"], ["\n  padding: 15px;\n"])));
var CardTitle = styled_components_1.default.h3(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n  margin: 0 0 10px 0;\n  color: #1e293b;\n  font-size: 16px;\n"], ["\n  margin: 0 0 10px 0;\n  color: #1e293b;\n  font-size: 16px;\n"])));
var CardDescription = styled_components_1.default.p(templateObject_10 || (templateObject_10 = __makeTemplateObject(["\n  margin: 0 0 15px 0;\n  color: #64748b;\n  font-size: 14px;\n  line-height: 1.5;\n"], ["\n  margin: 0 0 15px 0;\n  color: #64748b;\n  font-size: 14px;\n  line-height: 1.5;\n"])));
var CardActions = styled_components_1.default.div(templateObject_11 || (templateObject_11 = __makeTemplateObject(["\n  display: flex;\n  gap: 10px;\n"], ["\n  display: flex;\n  gap: 10px;\n"])));
var ActionButton = styled_components_1.default.button(templateObject_12 || (templateObject_12 = __makeTemplateObject(["\n  flex: 1;\n  padding: 8px 12px;\n  border: none;\n  border-radius: 4px;\n  cursor: pointer;\n  font-size: 12px;\n  font-weight: 500;\n  transition: all 0.3s ease;\n  \n  background: ", ";\n  color: white;\n\n  &:hover {\n    background: ", ";\n  }\n"], ["\n  flex: 1;\n  padding: 8px 12px;\n  border: none;\n  border-radius: 4px;\n  cursor: pointer;\n  font-size: 12px;\n  font-weight: 500;\n  transition: all 0.3s ease;\n  \n  background: ", ";\n  color: white;\n\n  &:hover {\n    background: ", ";\n  }\n"])), function (props) { return props.variant === 'delete' ? '#ef4444' : '#3b82f6'; }, function (props) { return props.variant === 'delete' ? '#dc2626' : '#2563eb'; });
var Modal = styled_components_1.default.div(templateObject_13 || (templateObject_13 = __makeTemplateObject(["\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(0, 0, 0, 0.5);\n  display: ", ";\n  align-items: center;\n  justify-content: center;\n  z-index: 9999;\n"], ["\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(0, 0, 0, 0.5);\n  display: ", ";\n  align-items: center;\n  justify-content: center;\n  z-index: 9999;\n"])), function (props) { return props.isOpen ? 'flex' : 'none'; });
var ModalContent = styled_components_1.default.div(templateObject_14 || (templateObject_14 = __makeTemplateObject(["\n  background: white;\n  padding: 30px;\n  border-radius: 10px;\n  width: 90%;\n  max-width: 500px;\n  min-height: 120vh;\n  max-height: 120vh;\n  overflow-y: auto;\n"], ["\n  background: white;\n  padding: 30px;\n  border-radius: 10px;\n  width: 90%;\n  max-width: 500px;\n  min-height: 120vh;\n  max-height: 120vh;\n  overflow-y: auto;\n"])));
var ModalHeader = styled_components_1.default.div(templateObject_15 || (templateObject_15 = __makeTemplateObject(["\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 20px;\n"], ["\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 20px;\n"])));
var ModalTitle = styled_components_1.default.h3(templateObject_16 || (templateObject_16 = __makeTemplateObject(["\n  margin: 0;\n  color: #1e293b;\n"], ["\n  margin: 0;\n  color: #1e293b;\n"])));
var CloseButton = styled_components_1.default.button(templateObject_17 || (templateObject_17 = __makeTemplateObject(["\n  background: none;\n  border: none;\n  font-size: 24px;\n  cursor: pointer;\n  color: #64748b;\n  \n  &:hover {\n    color: #1e293b;\n  }\n"], ["\n  background: none;\n  border: none;\n  font-size: 24px;\n  cursor: pointer;\n  color: #64748b;\n  \n  &:hover {\n    color: #1e293b;\n  }\n"])));
var Form = styled_components_1.default.form(templateObject_18 || (templateObject_18 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  gap: 15px;\n"], ["\n  display: flex;\n  flex-direction: column;\n  gap: 15px;\n"])));
var FormGroup = styled_components_1.default.div(templateObject_19 || (templateObject_19 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  gap: 5px;\n"], ["\n  display: flex;\n  flex-direction: column;\n  gap: 5px;\n"])));
var Label = styled_components_1.default.label(templateObject_20 || (templateObject_20 = __makeTemplateObject(["\n  font-weight: 600;\n  color: #374151;\n  font-size: 14px;\n"], ["\n  font-weight: 600;\n  color: #374151;\n  font-size: 14px;\n"])));
var Input = styled_components_1.default.input(templateObject_21 || (templateObject_21 = __makeTemplateObject(["\n  padding: 10px;\n  border: 1px solid #d1d5db;\n  border-radius: 6px;\n  font-size: 14px;\n\n  &:focus {\n    outline: none;\n    border-color: #3b82f6;\n    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);\n  }\n"], ["\n  padding: 10px;\n  border: 1px solid #d1d5db;\n  border-radius: 6px;\n  font-size: 14px;\n\n  &:focus {\n    outline: none;\n    border-color: #3b82f6;\n    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);\n  }\n"])));
var TextArea = styled_components_1.default.textarea(templateObject_22 || (templateObject_22 = __makeTemplateObject(["\n  padding: 10px;\n  border: 1px solid #d1d5db;\n  border-radius: 6px;\n  font-size: 14px;\n  min-height: 100px;\n  resize: vertical;\n\n  &:focus {\n    outline: none;\n    border-color: #3b82f6;\n    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);\n  }\n"], ["\n  padding: 10px;\n  border: 1px solid #d1d5db;\n  border-radius: 6px;\n  font-size: 14px;\n  min-height: 100px;\n  resize: vertical;\n\n  &:focus {\n    outline: none;\n    border-color: #3b82f6;\n    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);\n  }\n"])));
var FileInput = styled_components_1.default.input(templateObject_23 || (templateObject_23 = __makeTemplateObject(["\n  padding: 10px;\n  border: 1px solid #d1d5db;\n  border-radius: 6px;\n  font-size: 14px;\n"], ["\n  padding: 10px;\n  border: 1px solid #d1d5db;\n  border-radius: 6px;\n  font-size: 14px;\n"])));
var SaveButton = styled_components_1.default.button(templateObject_24 || (templateObject_24 = __makeTemplateObject(["\n  background: #10b981;\n  color: white;\n  border: none;\n  padding: 12px;\n  border-radius: 6px;\n  cursor: pointer;\n  font-weight: 500;\n  font-size: 14px;\n  transition: background 0.3s ease;\n\n  &:hover {\n    background: #059669;\n  }\n\n  &:disabled {\n    background: #9ca3af;\n    cursor: not-allowed;\n  }\n"], ["\n  background: #10b981;\n  color: white;\n  border: none;\n  padding: 12px;\n  border-radius: 6px;\n  cursor: pointer;\n  font-weight: 500;\n  font-size: 14px;\n  transition: background 0.3s ease;\n\n  &:hover {\n    background: #059669;\n  }\n\n  &:disabled {\n    background: #9ca3af;\n    cursor: not-allowed;\n  }\n"])));
var CardEditor = function (_a) {
    var title = _a.title, cards = _a.cards, onSave = _a.onSave, onDelete = _a.onDelete, onAdd = _a.onAdd;
    var _b = (0, react_1.useState)(false), isModalOpen = _b[0], setIsModalOpen = _b[1];
    var _c = (0, react_1.useState)(null), editingCard = _c[0], setEditingCard = _c[1];
    var _d = (0, react_1.useState)({}), formData = _d[0], setFormData = _d[1];
    var handleEdit = function (card) {
        setEditingCard(card);
        setFormData(card);
        setIsModalOpen(true);
    };
    var handleAdd = function () {
        setEditingCard(null);
        setFormData({});
        setIsModalOpen(true);
    };
    var handleSave = function (e) {
        e.preventDefault();
        if (editingCard) {
            onSave(__assign(__assign({}, editingCard), formData));
        }
        else {
            onSave({
                id: Date.now().toString(),
                title: formData.title || '',
                description: formData.description || '',
                imageUrl: formData.imageUrl,
                price: formData.price
            });
        }
        setIsModalOpen(false);
    };
    var handleImageChange = function (e) {
        var _a;
        var file = (_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0];
        if (file) {
            var reader = new FileReader();
            reader.onload = function (e) {
                var _a;
                setFormData(__assign(__assign({}, formData), { imageUrl: (_a = e.target) === null || _a === void 0 ? void 0 : _a.result }));
            };
            reader.readAsDataURL(file);
        }
    };
    return ((0, jsx_runtime_1.jsxs)(EditorContainer, { children: [(0, jsx_runtime_1.jsxs)(EditorHeader, { children: [(0, jsx_runtime_1.jsx)(Title, { children: title }), (0, jsx_runtime_1.jsx)(AddButton, { onClick: handleAdd, children: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0443" })] }), (0, jsx_runtime_1.jsx)(CardsGrid, { children: cards.map(function (card) { return ((0, jsx_runtime_1.jsxs)(Card, { children: [(0, jsx_runtime_1.jsx)(CardImage, { imageUrl: card.imageUrl, children: !card.imageUrl && 'Нет изображения' }), (0, jsx_runtime_1.jsxs)(CardContent, { children: [(0, jsx_runtime_1.jsx)(CardTitle, { children: card.title }), (0, jsx_runtime_1.jsx)(CardDescription, { children: card.description }), card.price && (0, jsx_runtime_1.jsxs)("p", { children: ["\u0426\u0435\u043D\u0430: ", card.price, " \u20BD"] }), (0, jsx_runtime_1.jsxs)(CardActions, { children: [(0, jsx_runtime_1.jsx)(ActionButton, { onClick: function () { return handleEdit(card); }, children: "\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C" }), (0, jsx_runtime_1.jsx)(ActionButton, { variant: "delete", onClick: function () { return onDelete(card.id); }, children: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C" })] })] })] }, card.id)); }) }), (0, jsx_runtime_1.jsx)(Modal, { isOpen: isModalOpen, children: (0, jsx_runtime_1.jsxs)(ModalContent, { children: [(0, jsx_runtime_1.jsxs)(ModalHeader, { children: [(0, jsx_runtime_1.jsx)(ModalTitle, { children: editingCard ? 'Редактировать карточку' : 'Добавить карточку' }), (0, jsx_runtime_1.jsx)(CloseButton, { onClick: function () { return setIsModalOpen(false); }, children: "\u00D7" })] }), (0, jsx_runtime_1.jsxs)(Form, { onSubmit: handleSave, children: [(0, jsx_runtime_1.jsxs)(FormGroup, { children: [(0, jsx_runtime_1.jsx)(Label, { children: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435" }), (0, jsx_runtime_1.jsx)(Input, { type: "text", value: formData.title || '', onChange: function (e) { return setFormData(__assign(__assign({}, formData), { title: e.target.value })); }, required: true })] }), (0, jsx_runtime_1.jsxs)(FormGroup, { children: [(0, jsx_runtime_1.jsx)(Label, { children: "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435" }), (0, jsx_runtime_1.jsx)(TextArea, { value: formData.description || '', onChange: function (e) { return setFormData(__assign(__assign({}, formData), { description: e.target.value })); }, required: true })] }), (0, jsx_runtime_1.jsxs)(FormGroup, { children: [(0, jsx_runtime_1.jsx)(Label, { children: "\u0418\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435" }), (0, jsx_runtime_1.jsx)(FileInput, { type: "file", accept: "image/*", onChange: handleImageChange })] }), (0, jsx_runtime_1.jsxs)(FormGroup, { children: [(0, jsx_runtime_1.jsx)(Label, { children: "\u0426\u0435\u043D\u0430 (\u20BD)" }), (0, jsx_runtime_1.jsx)(Input, { type: "number", value: formData.price || '', onChange: function (e) { return setFormData(__assign(__assign({}, formData), { price: Number(e.target.value) })); } })] }), (0, jsx_runtime_1.jsx)(SaveButton, { type: "submit", children: editingCard ? 'Сохранить' : 'Добавить' })] })] }) })] }));
};
exports.default = CardEditor;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13, templateObject_14, templateObject_15, templateObject_16, templateObject_17, templateObject_18, templateObject_19, templateObject_20, templateObject_21, templateObject_22, templateObject_23, templateObject_24;
