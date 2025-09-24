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
var react_1 = require("react");
var styled_components_1 = __importDefault(require("styled-components"));
var axios_1 = __importDefault(require("axios"));
var react_hot_toast_1 = __importDefault(require("react-hot-toast"));
var Container = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  padding: 20px;\n"], ["\n  padding: 20px;\n"])));
var Header = styled_components_1.default.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 20px;\n"], ["\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 20px;\n"])));
var Title = styled_components_1.default.h2(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  color: #1e293b;\n  margin: 0;\n"], ["\n  color: #1e293b;\n  margin: 0;\n"])));
var AddButton = styled_components_1.default.button(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  background: #10b981;\n  color: white;\n  border: none;\n  padding: 10px 20px;\n  border-radius: 6px;\n  cursor: pointer;\n  font-weight: 500;\n  transition: background 0.3s ease;\n\n  &:hover {\n    background: #059669;\n  }\n"], ["\n  background: #10b981;\n  color: white;\n  border: none;\n  padding: 10px 20px;\n  border-radius: 6px;\n  cursor: pointer;\n  font-weight: 500;\n  transition: background 0.3s ease;\n\n  &:hover {\n    background: #059669;\n  }\n"])));
var Grid = styled_components_1.default.div(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));\n  gap: 20px;\n  margin-bottom: 20px;\n"], ["\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));\n  gap: 20px;\n  margin-bottom: 20px;\n"])));
var Card = styled_components_1.default.div(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  background: white;\n  border: 1px solid #e2e8f0;\n  border-radius: 8px;\n  padding: 20px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n"], ["\n  background: white;\n  border: 1px solid #e2e8f0;\n  border-radius: 8px;\n  padding: 20px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n"])));
var CardTitle = styled_components_1.default.h3(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  color: #1e293b;\n  margin: 0 0 10px 0;\n  font-size: 18px;\n"], ["\n  color: #1e293b;\n  margin: 0 0 10px 0;\n  font-size: 18px;\n"])));
var CardDescription = styled_components_1.default.p(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n  color: #64748b;\n  margin: 0 0 15px 0;\n  line-height: 1.5;\n"], ["\n  color: #64748b;\n  margin: 0 0 15px 0;\n  line-height: 1.5;\n"])));
var CardPrice = styled_components_1.default.div(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n  font-size: 20px;\n  font-weight: 600;\n  color: #059669;\n  margin-bottom: 15px;\n"], ["\n  font-size: 20px;\n  font-weight: 600;\n  color: #059669;\n  margin-bottom: 15px;\n"])));
var CardInfo = styled_components_1.default.div(templateObject_10 || (templateObject_10 = __makeTemplateObject(["\n  margin-bottom: 10px;\n  font-size: 14px;\n  color: #64748b;\n"], ["\n  margin-bottom: 10px;\n  font-size: 14px;\n  color: #64748b;\n"])));
var ButtonGroup = styled_components_1.default.div(templateObject_11 || (templateObject_11 = __makeTemplateObject(["\n  display: flex;\n  gap: 10px;\n"], ["\n  display: flex;\n  gap: 10px;\n"])));
var EditButton = styled_components_1.default.button(templateObject_12 || (templateObject_12 = __makeTemplateObject(["\n  background: #3b82f6;\n  color: white;\n  border: none;\n  padding: 8px 16px;\n  border-radius: 4px;\n  cursor: pointer;\n  font-size: 14px;\n  transition: background 0.3s ease;\n\n  &:hover {\n    background: #2563eb;\n  }\n"], ["\n  background: #3b82f6;\n  color: white;\n  border: none;\n  padding: 8px 16px;\n  border-radius: 4px;\n  cursor: pointer;\n  font-size: 14px;\n  transition: background 0.3s ease;\n\n  &:hover {\n    background: #2563eb;\n  }\n"])));
var DeleteButton = styled_components_1.default.button(templateObject_13 || (templateObject_13 = __makeTemplateObject(["\n  background: #ef4444;\n  color: white;\n  border: none;\n  padding: 8px 16px;\n  border-radius: 4px;\n  cursor: pointer;\n  font-size: 14px;\n  transition: background 0.3s ease;\n\n  &:hover {\n    background: #dc2626;\n  }\n"], ["\n  background: #ef4444;\n  color: white;\n  border: none;\n  padding: 8px 16px;\n  border-radius: 4px;\n  cursor: pointer;\n  font-size: 14px;\n  transition: background 0.3s ease;\n\n  &:hover {\n    background: #dc2626;\n  }\n"])));
var Modal = styled_components_1.default.div(templateObject_14 || (templateObject_14 = __makeTemplateObject(["\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(0, 0, 0, 0.5);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 9999;\n"], ["\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(0, 0, 0, 0.5);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 9999;\n"])));
var ModalContent = styled_components_1.default.div(templateObject_15 || (templateObject_15 = __makeTemplateObject(["\n  background: white;\n  padding: 30px;\n  border-radius: 10px;\n  width: 90%;\n  max-width: 600px;\n  min-height: 120vh;\n  max-height: 120vh;\n  overflow-y: auto;\n"], ["\n  background: white;\n  padding: 30px;\n  border-radius: 10px;\n  width: 90%;\n  max-width: 600px;\n  min-height: 120vh;\n  max-height: 120vh;\n  overflow-y: auto;\n"])));
var ModalTitle = styled_components_1.default.h3(templateObject_16 || (templateObject_16 = __makeTemplateObject(["\n  color: #1e293b;\n  margin: 0 0 20px 0;\n"], ["\n  color: #1e293b;\n  margin: 0 0 20px 0;\n"])));
var Form = styled_components_1.default.form(templateObject_17 || (templateObject_17 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  gap: 15px;\n"], ["\n  display: flex;\n  flex-direction: column;\n  gap: 15px;\n"])));
var FormGroup = styled_components_1.default.div(templateObject_18 || (templateObject_18 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  gap: 5px;\n"], ["\n  display: flex;\n  flex-direction: column;\n  gap: 5px;\n"])));
var Label = styled_components_1.default.label(templateObject_19 || (templateObject_19 = __makeTemplateObject(["\n  font-weight: 500;\n  color: #374151;\n"], ["\n  font-weight: 500;\n  color: #374151;\n"])));
var Input = styled_components_1.default.input(templateObject_20 || (templateObject_20 = __makeTemplateObject(["\n  padding: 10px;\n  border: 1px solid #d1d5db;\n  border-radius: 6px;\n  font-size: 14px;\n\n  &:focus {\n    outline: none;\n    border-color: #3b82f6;\n    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);\n  }\n"], ["\n  padding: 10px;\n  border: 1px solid #d1d5db;\n  border-radius: 6px;\n  font-size: 14px;\n\n  &:focus {\n    outline: none;\n    border-color: #3b82f6;\n    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);\n  }\n"])));
var FileInput = styled_components_1.default.input(templateObject_21 || (templateObject_21 = __makeTemplateObject(["\n  padding: 10px;\n  border: 1px solid #d1d5db;\n  border-radius: 6px;\n  font-size: 14px;\n  cursor: pointer;\n\n  &:focus {\n    outline: none;\n    border-color: #3b82f6;\n    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);\n  }\n"], ["\n  padding: 10px;\n  border: 1px solid #d1d5db;\n  border-radius: 6px;\n  font-size: 14px;\n  cursor: pointer;\n\n  &:focus {\n    outline: none;\n    border-color: #3b82f6;\n    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);\n  }\n"])));
var ImagePreview = styled_components_1.default.div(templateObject_22 || (templateObject_22 = __makeTemplateObject(["\n  margin-top: 10px;\n  max-width: 200px;\n  \n  img {\n    width: 100%;\n    height: auto;\n    border-radius: 6px;\n    border: 1px solid #d1d5db;\n  }\n"], ["\n  margin-top: 10px;\n  max-width: 200px;\n  \n  img {\n    width: 100%;\n    height: auto;\n    border-radius: 6px;\n    border: 1px solid #d1d5db;\n  }\n"])));
var UploadButton = styled_components_1.default.button(templateObject_23 || (templateObject_23 = __makeTemplateObject(["\n  background: #3b82f6;\n  color: white;\n  border: none;\n  padding: 8px 16px;\n  border-radius: 4px;\n  cursor: pointer;\n  font-size: 14px;\n  margin-top: 5px;\n  transition: background 0.3s ease;\n\n  &:hover {\n    background: #2563eb;\n  }\n\n  &:disabled {\n    background: #9ca3af;\n    cursor: not-allowed;\n  }\n"], ["\n  background: #3b82f6;\n  color: white;\n  border: none;\n  padding: 8px 16px;\n  border-radius: 4px;\n  cursor: pointer;\n  font-size: 14px;\n  margin-top: 5px;\n  transition: background 0.3s ease;\n\n  &:hover {\n    background: #2563eb;\n  }\n\n  &:disabled {\n    background: #9ca3af;\n    cursor: not-allowed;\n  }\n"])));
var TextArea = styled_components_1.default.textarea(templateObject_24 || (templateObject_24 = __makeTemplateObject(["\n  padding: 10px;\n  border: 1px solid #d1d5db;\n  border-radius: 6px;\n  font-size: 14px;\n  min-height: 100px;\n  resize: vertical;\n\n  &:focus {\n    outline: none;\n    border-color: #3b82f6;\n    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);\n  }\n"], ["\n  padding: 10px;\n  border: 1px solid #d1d5db;\n  border-radius: 6px;\n  font-size: 14px;\n  min-height: 100px;\n  resize: vertical;\n\n  &:focus {\n    outline: none;\n    border-color: #3b82f6;\n    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);\n  }\n"])));
var ModalButtons = styled_components_1.default.div(templateObject_25 || (templateObject_25 = __makeTemplateObject(["\n  display: flex;\n  gap: 10px;\n  justify-content: flex-end;\n  margin-top: 20px;\n"], ["\n  display: flex;\n  gap: 10px;\n  justify-content: flex-end;\n  margin-top: 20px;\n"])));
var SaveButton = styled_components_1.default.button(templateObject_26 || (templateObject_26 = __makeTemplateObject(["\n  background: #10b981;\n  color: white;\n  border: none;\n  padding: 10px 20px;\n  border-radius: 6px;\n  cursor: pointer;\n  font-weight: 500;\n  transition: background 0.3s ease;\n\n  &:hover {\n    background: #059669;\n  }\n"], ["\n  background: #10b981;\n  color: white;\n  border: none;\n  padding: 10px 20px;\n  border-radius: 6px;\n  cursor: pointer;\n  font-weight: 500;\n  transition: background 0.3s ease;\n\n  &:hover {\n    background: #059669;\n  }\n"])));
var CancelButton = styled_components_1.default.button(templateObject_27 || (templateObject_27 = __makeTemplateObject(["\n  background: #6b7280;\n  color: white;\n  border: none;\n  padding: 10px 20px;\n  border-radius: 6px;\n  cursor: pointer;\n  font-weight: 500;\n  transition: background 0.3s ease;\n\n  &:hover {\n    background: #4b5563;\n  }\n"], ["\n  background: #6b7280;\n  color: white;\n  border: none;\n  padding: 10px 20px;\n  border-radius: 6px;\n  cursor: pointer;\n  font-weight: 500;\n  transition: background 0.3s ease;\n\n  &:hover {\n    background: #4b5563;\n  }\n"])));
var CruisesEditor = function () {
    var _a = (0, react_1.useState)([]), cruises = _a[0], setCruises = _a[1];
    var _b = (0, react_1.useState)(false), isModalOpen = _b[0], setIsModalOpen = _b[1];
    var _c = (0, react_1.useState)(null), editingCruise = _c[0], setEditingCruise = _c[1];
    var _d = (0, react_1.useState)({
        name: '',
        description: '',
        price: '',
        departure: '',
        duration: '',
        destination: '',
        image_url: '',
        available: true
    }), formData = _d[0], setFormData = _d[1];
    var _e = (0, react_1.useState)(null), selectedFile = _e[0], setSelectedFile = _e[1];
    var _f = (0, react_1.useState)(''), imagePreview = _f[0], setImagePreview = _f[1];
    var _g = (0, react_1.useState)(false), uploading = _g[0], setUploading = _g[1];
    (0, react_1.useEffect)(function () {
        fetchCruises();
    }, []);
    var fetchCruises = function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1.default.get('http://localhost:5000/api/cruises')];
                case 1:
                    response = _a.sent();
                    setCruises(response.data);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.error('Error fetching cruises:', error_1);
                    react_hot_toast_1.default.error('Ошибка загрузки круизов');
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var handleAddNew = function () {
        setEditingCruise(null);
        setFormData({
            name: '',
            description: '',
            price: '',
            departure: '',
            duration: '',
            destination: '',
            image_url: '',
            available: true
        });
        setSelectedFile(null);
        setImagePreview('');
        setIsModalOpen(true);
    };
    var handleEdit = function (cruise) {
        setEditingCruise(cruise);
        setFormData({
            name: cruise.name,
            description: cruise.description,
            price: cruise.price.toString(),
            departure: cruise.departure,
            duration: cruise.duration || '',
            destination: cruise.destination || '',
            image_url: cruise.image_url || '',
            available: cruise.available
        });
        setSelectedFile(null);
        setImagePreview('');
        setIsModalOpen(true);
    };
    var handleDelete = function (id) { return __awaiter(void 0, void 0, void 0, function () {
        var error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!window.confirm('Вы уверены, что хотите удалить этот круиз?')) return [3 /*break*/, 4];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, axios_1.default.delete("http://localhost:5000/api/cruises/".concat(id), {
                            headers: {
                                'Authorization': "Bearer ".concat(localStorage.getItem('adminToken'))
                            }
                        })];
                case 2:
                    _a.sent();
                    react_hot_toast_1.default.success('Круиз удален');
                    fetchCruises();
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    console.error('Error deleting cruise:', error_2);
                    react_hot_toast_1.default.error('Ошибка удаления круиза');
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var handleFileSelect = function (e) {
        var _a;
        var file = (_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0];
        if (file) {
            setSelectedFile(file);
            var reader = new FileReader();
            reader.onload = function (e) {
                var _a;
                setImagePreview((_a = e.target) === null || _a === void 0 ? void 0 : _a.result);
            };
            reader.readAsDataURL(file);
        }
    };
    var handleUpload = function () { return __awaiter(void 0, void 0, void 0, function () {
        var formData, response_1, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!selectedFile) {
                        react_hot_toast_1.default.error('Выберите файл для загрузки');
                        return [2 /*return*/];
                    }
                    setUploading(true);
                    formData = new FormData();
                    formData.append('image', selectedFile);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, axios_1.default.post('http://localhost:5000/api/upload', formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                                'Authorization': "Bearer ".concat(localStorage.getItem('adminToken'))
                            }
                        })];
                case 2:
                    response_1 = _a.sent();
                    if (response_1.data.success) {
                        setFormData(function (prev) { return (__assign(__assign({}, prev), { image_url: response_1.data.imageUrl })); });
                        react_hot_toast_1.default.success('Изображение загружено');
                        setSelectedFile(null);
                        setImagePreview('');
                    }
                    return [3 /*break*/, 5];
                case 3:
                    error_3 = _a.sent();
                    console.error('Upload error:', error_3);
                    react_hot_toast_1.default.error('Ошибка загрузки изображения');
                    return [3 /*break*/, 5];
                case 4:
                    setUploading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var handleSubmit = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var cruiseData, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    cruiseData = __assign(__assign({}, formData), { price: parseFloat(formData.price) });
                    if (!editingCruise) return [3 /*break*/, 3];
                    return [4 /*yield*/, axios_1.default.put("http://localhost:5000/api/cruises/".concat(editingCruise.id), cruiseData, {
                            headers: {
                                'Authorization': "Bearer ".concat(localStorage.getItem('adminToken'))
                            }
                        })];
                case 2:
                    _a.sent();
                    react_hot_toast_1.default.success('Круиз обновлен');
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, axios_1.default.post('http://localhost:5000/api/cruises', cruiseData, {
                        headers: {
                            'Authorization': "Bearer ".concat(localStorage.getItem('adminToken'))
                        }
                    })];
                case 4:
                    _a.sent();
                    react_hot_toast_1.default.success('Круиз создан');
                    _a.label = 5;
                case 5:
                    setIsModalOpen(false);
                    fetchCruises();
                    return [3 /*break*/, 7];
                case 6:
                    error_4 = _a.sent();
                    console.error('Error saving cruise:', error_4);
                    react_hot_toast_1.default.error('Ошибка сохранения круиза');
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    }); };
    return ((0, jsx_runtime_1.jsxs)(Container, { children: [(0, jsx_runtime_1.jsxs)(Header, { children: [(0, jsx_runtime_1.jsx)(Title, { children: "\u0423\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u043A\u0440\u0443\u0438\u0437\u0430\u043C\u0438" }), (0, jsx_runtime_1.jsx)(AddButton, { onClick: handleAddNew, children: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043A\u0440\u0443\u0438\u0437" })] }), (0, jsx_runtime_1.jsx)(Grid, { children: cruises.map(function (cruise) { return ((0, jsx_runtime_1.jsxs)(Card, { children: [(0, jsx_runtime_1.jsx)(CardTitle, { children: cruise.name }), (0, jsx_runtime_1.jsx)(CardDescription, { children: cruise.description }), (0, jsx_runtime_1.jsxs)(CardPrice, { children: [cruise.price, " \u20BD"] }), (0, jsx_runtime_1.jsxs)(CardInfo, { children: [(0, jsx_runtime_1.jsx)("strong", { children: "\u041F\u043E\u0440\u0442 \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u044F:" }), " ", cruise.departure] }), cruise.duration && ((0, jsx_runtime_1.jsxs)(CardInfo, { children: [(0, jsx_runtime_1.jsx)("strong", { children: "\u0414\u043B\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u044C:" }), " ", cruise.duration] })), cruise.destination && ((0, jsx_runtime_1.jsxs)(CardInfo, { children: [(0, jsx_runtime_1.jsx)("strong", { children: "\u041D\u0430\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435:" }), " ", cruise.destination] })), (0, jsx_runtime_1.jsxs)(CardInfo, { children: [(0, jsx_runtime_1.jsx)("strong", { children: "\u0421\u0442\u0430\u0442\u0443\u0441:" }), " ", cruise.available ? 'Доступен' : 'Недоступен'] }), cruise.image_url && ((0, jsx_runtime_1.jsxs)(CardInfo, { children: [(0, jsx_runtime_1.jsx)("strong", { children: "\u0418\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435:" }), (0, jsx_runtime_1.jsx)("img", { src: "http://localhost:5000".concat(cruise.image_url), alt: cruise.name, style: {
                                        width: '100%',
                                        height: '150px',
                                        objectFit: 'cover',
                                        borderRadius: '6px',
                                        marginTop: '8px'
                                    } })] })), (0, jsx_runtime_1.jsxs)(ButtonGroup, { children: [(0, jsx_runtime_1.jsx)(EditButton, { onClick: function () { return handleEdit(cruise); }, children: "\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C" }), (0, jsx_runtime_1.jsx)(DeleteButton, { onClick: function () { return handleDelete(cruise.id); }, children: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C" })] })] }, cruise.id)); }) }), isModalOpen && ((0, jsx_runtime_1.jsx)(Modal, { onClick: function () { return setIsModalOpen(false); }, children: (0, jsx_runtime_1.jsxs)(ModalContent, { onClick: function (e) { return e.stopPropagation(); }, children: [(0, jsx_runtime_1.jsx)(ModalTitle, { children: editingCruise ? 'Редактировать круиз' : 'Добавить круиз' }), (0, jsx_runtime_1.jsxs)(Form, { onSubmit: handleSubmit, children: [(0, jsx_runtime_1.jsxs)(FormGroup, { children: [(0, jsx_runtime_1.jsx)(Label, { children: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u043A\u0440\u0443\u0438\u0437\u0430" }), (0, jsx_runtime_1.jsx)(Input, { type: "text", value: formData.name, onChange: function (e) { return setFormData(__assign(__assign({}, formData), { name: e.target.value })); }, required: true })] }), (0, jsx_runtime_1.jsxs)(FormGroup, { children: [(0, jsx_runtime_1.jsx)(Label, { children: "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435" }), (0, jsx_runtime_1.jsx)(TextArea, { value: formData.description, onChange: function (e) { return setFormData(__assign(__assign({}, formData), { description: e.target.value })); }, required: true })] }), (0, jsx_runtime_1.jsxs)(FormGroup, { children: [(0, jsx_runtime_1.jsx)(Label, { children: "\u0426\u0435\u043D\u0430 (\u20BD)" }), (0, jsx_runtime_1.jsx)(Input, { type: "number", value: formData.price, onChange: function (e) { return setFormData(__assign(__assign({}, formData), { price: e.target.value })); }, required: true, min: "0", step: "0.01" })] }), (0, jsx_runtime_1.jsxs)(FormGroup, { children: [(0, jsx_runtime_1.jsx)(Label, { children: "\u041F\u043E\u0440\u0442 \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u044F" }), (0, jsx_runtime_1.jsx)(Input, { type: "text", value: formData.departure, onChange: function (e) { return setFormData(__assign(__assign({}, formData), { departure: e.target.value })); }, required: true })] }), (0, jsx_runtime_1.jsxs)(FormGroup, { children: [(0, jsx_runtime_1.jsx)(Label, { children: "\u0414\u043B\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u044C (\u043D\u0435\u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E)" }), (0, jsx_runtime_1.jsx)(Input, { type: "text", value: formData.duration, onChange: function (e) { return setFormData(__assign(__assign({}, formData), { duration: e.target.value })); }, placeholder: "\u043D\u0430\u043F\u0440\u0438\u043C\u0435\u0440: 7 \u0434\u043D\u0435\u0439 / 6 \u043D\u043E\u0447\u0435\u0439" })] }), (0, jsx_runtime_1.jsxs)(FormGroup, { children: [(0, jsx_runtime_1.jsx)(Label, { children: "\u041D\u0430\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435 (\u043D\u0435\u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E)" }), (0, jsx_runtime_1.jsx)(Input, { type: "text", value: formData.destination, onChange: function (e) { return setFormData(__assign(__assign({}, formData), { destination: e.target.value })); }, placeholder: "\u043D\u0430\u043F\u0440\u0438\u043C\u0435\u0440: \u0421\u0440\u0435\u0434\u0438\u0437\u0435\u043C\u043D\u043E\u0435 \u043C\u043E\u0440\u0435" })] }), (0, jsx_runtime_1.jsxs)(FormGroup, { children: [(0, jsx_runtime_1.jsx)(Label, { children: "\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435" }), (0, jsx_runtime_1.jsx)(FileInput, { type: "file", accept: "image/*", onChange: handleFileSelect }), imagePreview && ((0, jsx_runtime_1.jsx)(ImagePreview, { children: (0, jsx_runtime_1.jsx)("img", { src: imagePreview, alt: "Preview" }) })), (0, jsx_runtime_1.jsx)(UploadButton, { type: "button", onClick: handleUpload, disabled: !selectedFile || uploading, children: uploading ? 'Загрузка...' : 'Загрузить' })] }), (0, jsx_runtime_1.jsxs)(FormGroup, { children: [(0, jsx_runtime_1.jsx)(Label, { children: "URL \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F (\u043D\u0435\u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E)" }), (0, jsx_runtime_1.jsx)(Input, { type: "text", value: formData.image_url, onChange: function (e) { return setFormData(__assign(__assign({}, formData), { image_url: e.target.value })); }, placeholder: "\u0418\u043B\u0438 \u0432\u0432\u0435\u0434\u0438\u0442\u0435 URL \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F" })] }), (0, jsx_runtime_1.jsx)(FormGroup, { children: (0, jsx_runtime_1.jsxs)(Label, { children: [(0, jsx_runtime_1.jsx)("input", { type: "checkbox", checked: formData.available, onChange: function (e) { return setFormData(__assign(__assign({}, formData), { available: e.target.checked })); } }), "\u0414\u043E\u0441\u0442\u0443\u043F\u0435\u043D \u0434\u043B\u044F \u0431\u0440\u043E\u043D\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F"] }) }), (0, jsx_runtime_1.jsxs)(ModalButtons, { children: [(0, jsx_runtime_1.jsx)(CancelButton, { type: "button", onClick: function () { return setIsModalOpen(false); }, children: "\u041E\u0442\u043C\u0435\u043D\u0430" }), (0, jsx_runtime_1.jsx)(SaveButton, { type: "submit", children: editingCruise ? 'Сохранить' : 'Создать' })] })] })] }) }))] }));
};
exports.default = CruisesEditor;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13, templateObject_14, templateObject_15, templateObject_16, templateObject_17, templateObject_18, templateObject_19, templateObject_20, templateObject_21, templateObject_22, templateObject_23, templateObject_24, templateObject_25, templateObject_26, templateObject_27;
