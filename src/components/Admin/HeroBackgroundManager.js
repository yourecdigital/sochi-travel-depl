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
var axios_1 = __importDefault(require("axios"));
var react_hot_toast_1 = __importDefault(require("react-hot-toast"));
require("./HeroBackgroundManager.css");
var Container = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  padding: 20px;\n"], ["\n  padding: 20px;\n"])));
var Title = styled_components_1.default.h2(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  color: #1e293b;\n  margin: 0 0 20px 0;\n"], ["\n  color: #1e293b;\n  margin: 0 0 20px 0;\n"])));
var Modal = styled_components_1.default.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(0, 0, 0, 0.5);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 9999;\n"], ["\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(0, 0, 0, 0.5);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 9999;\n"])));
var ModalContent = styled_components_1.default.div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  background: white;\n  padding: 30px;\n  border-radius: 10px;\n  width: 90%;\n  max-width: 600px;\n  max-height: 80vh;\n  overflow-y: auto;\n"], ["\n  background: white;\n  padding: 30px;\n  border-radius: 10px;\n  width: 90%;\n  max-width: 600px;\n  max-height: 80vh;\n  overflow-y: auto;\n"])));
var ModalHeader = styled_components_1.default.div(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 20px;\n  padding-bottom: 15px;\n  border-bottom: 1px solid #e2e8f0;\n"], ["\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 20px;\n  padding-bottom: 15px;\n  border-bottom: 1px solid #e2e8f0;\n"])));
var ModalTitle = styled_components_1.default.h3(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  color: #1e293b;\n  margin: 0;\n"], ["\n  color: #1e293b;\n  margin: 0;\n"])));
var CloseButton = styled_components_1.default.button(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  background: none;\n  border: none;\n  font-size: 24px;\n  cursor: pointer;\n  color: #6b7280;\n  \n  &:hover {\n    color: #374151;\n  }\n"], ["\n  background: none;\n  border: none;\n  font-size: 24px;\n  cursor: pointer;\n  color: #6b7280;\n  \n  &:hover {\n    color: #374151;\n  }\n"])));
var FormGroup = styled_components_1.default.div(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n  margin-bottom: 20px;\n"], ["\n  margin-bottom: 20px;\n"])));
var Label = styled_components_1.default.label(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n  display: block;\n  margin-bottom: 8px;\n  font-weight: 600;\n  color: #374151;\n"], ["\n  display: block;\n  margin-bottom: 8px;\n  font-weight: 600;\n  color: #374151;\n"])));
var Input = styled_components_1.default.input(templateObject_10 || (templateObject_10 = __makeTemplateObject(["\n  width: 100%;\n  padding: 12px;\n  border: 1px solid #d1d5db;\n  border-radius: 8px;\n  font-size: 14px;\n  \n  &:focus {\n    outline: none;\n    border-color: #3b82f6;\n    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);\n  }\n"], ["\n  width: 100%;\n  padding: 12px;\n  border: 1px solid #d1d5db;\n  border-radius: 8px;\n  font-size: 14px;\n  \n  &:focus {\n    outline: none;\n    border-color: #3b82f6;\n    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);\n  }\n"])));
var Select = styled_components_1.default.select(templateObject_11 || (templateObject_11 = __makeTemplateObject(["\n  width: 100%;\n  padding: 12px;\n  border: 1px solid #d1d5db;\n  border-radius: 8px;\n  font-size: 14px;\n  background: white;\n  \n  &:focus {\n    outline: none;\n    border-color: #3b82f6;\n    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);\n  }\n"], ["\n  width: 100%;\n  padding: 12px;\n  border: 1px solid #d1d5db;\n  border-radius: 8px;\n  font-size: 14px;\n  background: white;\n  \n  &:focus {\n    outline: none;\n    border-color: #3b82f6;\n    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);\n  }\n"])));
var Button = styled_components_1.default.button(templateObject_12 || (templateObject_12 = __makeTemplateObject(["\n  padding: 12px 20px;\n  border: none;\n  border-radius: 8px;\n  cursor: pointer;\n  font-weight: 600;\n  font-size: 14px;\n  transition: all 0.2s ease;\n  margin-right: 10px;\n  \n  ", "\n"], ["\n  padding: 12px 20px;\n  border: none;\n  border-radius: 8px;\n  cursor: pointer;\n  font-weight: 600;\n  font-size: 14px;\n  transition: all 0.2s ease;\n  margin-right: 10px;\n  \n  ", "\n"])), function (props) {
    switch (props.$variant) {
        case 'primary':
            return "\n          background: #3b82f6;\n          color: white;\n          &:hover { background: #2563eb; }\n        ";
        case 'danger':
            return "\n          background: #ef4444;\n          color: white;\n          &:hover { background: #dc2626; }\n        ";
        default:
            return "\n          background: #6b7280;\n          color: white;\n          &:hover { background: #4b5563; }\n        ";
    }
});
var ImagePreview = styled_components_1.default.div(templateObject_13 || (templateObject_13 = __makeTemplateObject(["\n  width: 100%;\n  height: 200px;\n  border-radius: 8px;\n  overflow: hidden;\n  margin-bottom: 15px;\n  background: #f3f4f6;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border: 2px dashed #d1d5db;\n"], ["\n  width: 100%;\n  height: 200px;\n  border-radius: 8px;\n  overflow: hidden;\n  margin-bottom: 15px;\n  background: #f3f4f6;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border: 2px dashed #d1d5db;\n"])));
var PreviewImage = styled_components_1.default.img(templateObject_14 || (templateObject_14 = __makeTemplateObject(["\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n"], ["\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n"])));
var PreviewVideo = styled_components_1.default.video(templateObject_15 || (templateObject_15 = __makeTemplateObject(["\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n"], ["\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n"])));
var FrameCaptureSection = styled_components_1.default.div(templateObject_16 || (templateObject_16 = __makeTemplateObject(["\n  margin-top: 15px;\n  padding: 15px;\n  background: #f8fafc;\n  border-radius: 8px;\n  border: 1px solid #e2e8f0;\n"], ["\n  margin-top: 15px;\n  padding: 15px;\n  background: #f8fafc;\n  border-radius: 8px;\n  border: 1px solid #e2e8f0;\n"])));
var FrameCaptureTitle = styled_components_1.default.h4(templateObject_17 || (templateObject_17 = __makeTemplateObject(["\n  margin: 0 0 10px 0;\n  color: #374151;\n  font-size: 14px;\n  font-weight: 600;\n"], ["\n  margin: 0 0 10px 0;\n  color: #374151;\n  font-size: 14px;\n  font-weight: 600;\n"])));
var FrameCaptureButtons = styled_components_1.default.div(templateObject_18 || (templateObject_18 = __makeTemplateObject(["\n  display: flex;\n  gap: 10px;\n  margin-bottom: 10px;\n"], ["\n  display: flex;\n  gap: 10px;\n  margin-bottom: 10px;\n"])));
var CaptureButton = styled_components_1.default.button(templateObject_19 || (templateObject_19 = __makeTemplateObject(["\n  padding: 8px 16px;\n  background: #3b82f6;\n  color: white;\n  border: none;\n  border-radius: 6px;\n  cursor: pointer;\n  font-size: 12px;\n  font-weight: 500;\n  transition: background-color 0.2s;\n\n  &:hover {\n    background: #2563eb;\n  }\n\n  &:disabled {\n    background: #9ca3af;\n    cursor: not-allowed;\n  }\n"], ["\n  padding: 8px 16px;\n  background: #3b82f6;\n  color: white;\n  border: none;\n  border-radius: 6px;\n  cursor: pointer;\n  font-size: 12px;\n  font-weight: 500;\n  transition: background-color 0.2s;\n\n  &:hover {\n    background: #2563eb;\n  }\n\n  &:disabled {\n    background: #9ca3af;\n    cursor: not-allowed;\n  }\n"])));
var UploadFrameButton = styled_components_1.default.button(templateObject_20 || (templateObject_20 = __makeTemplateObject(["\n  padding: 8px 16px;\n  background: #10b981;\n  color: white;\n  border: none;\n  border-radius: 6px;\n  cursor: pointer;\n  font-size: 12px;\n  font-weight: 500;\n  transition: background-color 0.2s;\n\n  &:hover {\n    background: #059669;\n  }\n\n  &:disabled {\n    background: #9ca3af;\n    cursor: not-allowed;\n  }\n"], ["\n  padding: 8px 16px;\n  background: #10b981;\n  color: white;\n  border: none;\n  border-radius: 6px;\n  cursor: pointer;\n  font-size: 12px;\n  font-weight: 500;\n  transition: background-color 0.2s;\n\n  &:hover {\n    background: #059669;\n  }\n\n  &:disabled {\n    background: #9ca3af;\n    cursor: not-allowed;\n  }\n"])));
var CapturedFramePreview = styled_components_1.default.div(templateObject_21 || (templateObject_21 = __makeTemplateObject(["\n  width: 100%;\n  height: 120px;\n  border-radius: 6px;\n  overflow: hidden;\n  background: #f3f4f6;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border: 2px dashed #d1d5db;\n"], ["\n  width: 100%;\n  height: 120px;\n  border-radius: 6px;\n  overflow: hidden;\n  background: #f3f4f6;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border: 2px dashed #d1d5db;\n"])));
var CapturedFrameImage = styled_components_1.default.img(templateObject_22 || (templateObject_22 = __makeTemplateObject(["\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n"], ["\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n"])));
var UploadButton = styled_components_1.default.button(templateObject_23 || (templateObject_23 = __makeTemplateObject(["\n  background: #10b981;\n  color: white;\n  border: none;\n  padding: 12px 20px;\n  border-radius: 8px;\n  cursor: pointer;\n  font-weight: 600;\n  margin-top: 10px;\n  \n  &:hover {\n    background: #059669;\n  }\n  \n  &:disabled {\n    background: #9ca3af;\n    cursor: not-allowed;\n  }\n"], ["\n  background: #10b981;\n  color: white;\n  border: none;\n  padding: 12px 20px;\n  border-radius: 8px;\n  cursor: pointer;\n  font-weight: 600;\n  margin-top: 10px;\n  \n  &:hover {\n    background: #059669;\n  }\n  \n  &:disabled {\n    background: #9ca3af;\n    cursor: not-allowed;\n  }\n"])));
var SaveButton = styled_components_1.default.button(templateObject_24 || (templateObject_24 = __makeTemplateObject(["\n  background: ", ";\n  color: white;\n  border: none;\n  padding: 15px 30px;\n  border-radius: 8px;\n  cursor: pointer;\n  font-weight: 700;\n  font-size: 16px;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n  transform: translateY(0);\n  transition: all 0.3s ease;\n  margin-top: 20px;\n  \n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);\n    background: ", ";\n  }\n  \n  &:disabled {\n    background: #9ca3af;\n    cursor: not-allowed;\n    transform: none;\n    box-shadow: none;\n  }\n"], ["\n  background: ", ";\n  color: white;\n  border: none;\n  padding: 15px 30px;\n  border-radius: 8px;\n  cursor: pointer;\n  font-weight: 700;\n  font-size: 16px;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n  transform: translateY(0);\n  transition: all 0.3s ease;\n  margin-top: 20px;\n  \n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);\n    background: ", ";\n  }\n  \n  &:disabled {\n    background: #9ca3af;\n    cursor: not-allowed;\n    transform: none;\n    box-shadow: none;\n  }\n"])), function (props) { return props.$hasImage ? '#10b981' : '#3b82f6'; }, function (props) { return props.$hasImage ? '#059669' : '#2563eb'; });
var WarningMessage = styled_components_1.default.div(templateObject_25 || (templateObject_25 = __makeTemplateObject(["\n  background: #fef3c7;\n  border: 1px solid #f59e0b;\n  color: #92400e;\n  padding: 12px;\n  border-radius: 8px;\n  margin-top: 15px;\n  font-size: 14px;\n"], ["\n  background: #fef3c7;\n  border: 1px solid #f59e0b;\n  color: #92400e;\n  padding: 12px;\n  border-radius: 8px;\n  margin-top: 15px;\n  font-size: 14px;\n"])));
var KNOWN_PAGES = [
    { value: 'home', label: 'Главная страница' },
    { value: 'tours', label: 'Туры по России' },
    { value: 'hotels', label: 'Отели' },
    { value: 'foreign', label: 'Зарубежные туры' },
    { value: 'cruises', label: 'Круизы' },
    { value: 'promotions', label: 'Акции' },
    { value: 'services', label: 'Услуги' },
    { value: 'contacts', label: 'Контакты' }
];
var HeroBackgroundManager = function () {
    var _a = (0, react_1.useState)([]), backgrounds = _a[0], setBackgrounds = _a[1];
    var _b = (0, react_1.useState)(true), loading = _b[0], setLoading = _b[1];
    var _c = (0, react_1.useState)(false), showModal = _c[0], setShowModal = _c[1];
    var _d = (0, react_1.useState)(null), editingBackground = _d[0], setEditingBackground = _d[1];
    // Form state
    var _e = (0, react_1.useState)('home'), pageName = _e[0], setPageName = _e[1];
    var _f = (0, react_1.useState)('image'), backgroundType = _f[0], setBackgroundType = _f[1];
    var _g = (0, react_1.useState)(null), selectedFile = _g[0], setSelectedFile = _g[1];
    var _h = (0, react_1.useState)(null), imagePreview = _h[0], setImagePreview = _h[1];
    var _j = (0, react_1.useState)(false), uploading = _j[0], setUploading = _j[1];
    var _k = (0, react_1.useState)(false), saving = _k[0], setSaving = _k[1];
    // Video frame capture state
    var _l = (0, react_1.useState)(null), videoRef = _l[0], setVideoRef = _l[1];
    var _m = (0, react_1.useState)(null), capturedFrame = _m[0], setCapturedFrame = _m[1];
    var _o = (0, react_1.useState)(false), capturingFrame = _o[0], setCapturingFrame = _o[1];
    (0, react_1.useEffect)(function () {
        fetchBackgrounds();
    }, []);
    var fetchBackgrounds = function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, 3, 4]);
                    setLoading(true);
                    return [4 /*yield*/, axios_1.default.get('http://localhost:5000/api/hero-backgrounds')];
                case 1:
                    response = _a.sent();
                    setBackgrounds(response.data || []);
                    return [3 /*break*/, 4];
                case 2:
                    error_1 = _a.sent();
                    console.error('Error fetching backgrounds:', error_1);
                    react_hot_toast_1.default.error('Ошибка загрузки фонов');
                    return [3 /*break*/, 4];
                case 3:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var handleEdit = function (background) {
        setEditingBackground(background);
        setPageName(background.page_name);
        setBackgroundType(background.background_type);
        setSelectedFile(null);
        setImagePreview(null);
        setShowModal(true);
    };
    var handleAddNew = function () {
        setEditingBackground(null);
        setPageName('home');
        setBackgroundType('image');
        setSelectedFile(null);
        setImagePreview(null);
        setShowModal(true);
    };
    var handleCloseModal = function () {
        setShowModal(false);
        setEditingBackground(null);
        setSelectedFile(null);
        setImagePreview(null);
    };
    var handleFileSelect = function (event) {
        var _a;
        var file = (_a = event.target.files) === null || _a === void 0 ? void 0 : _a[0];
        if (file) {
            setSelectedFile(file);
            // Создаем локальный preview для отображения
            var reader = new FileReader();
            reader.onload = function (e) {
                var _a;
                // Не перезаписываем imagePreview, если файл уже загружен на сервер
                if (!imagePreview || imagePreview.startsWith('data:')) {
                    setImagePreview((_a = e.target) === null || _a === void 0 ? void 0 : _a.result);
                }
            };
            reader.readAsDataURL(file);
        }
    };
    var handleUpload = function () { return __awaiter(void 0, void 0, void 0, function () {
        var formData, response, uploaded, error_2;
        var _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    if (!selectedFile)
                        return [2 /*return*/];
                    setUploading(true);
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 3, 4, 5]);
                    formData = new FormData();
                    formData.append('image', selectedFile);
                    return [4 /*yield*/, axios_1.default.post('http://localhost:5000/api/upload', formData, {
                            headers: {
                                'Authorization': "Bearer ".concat(localStorage.getItem('adminToken')),
                                'Content-Type': 'multipart/form-data'
                            }
                        })];
                case 2:
                    response = _d.sent();
                    uploaded = ((_a = response.data) === null || _a === void 0 ? void 0 : _a.imageUrl) || ((_b = response.data) === null || _b === void 0 ? void 0 : _b.url) || ((_c = response.data) === null || _c === void 0 ? void 0 : _c.path);
                    if (uploaded) {
                        // Normalize slashes and ensure single /uploads prefix
                        uploaded = String(uploaded).replace(/\\/g, '/');
                        uploaded = uploaded.replace(/^\/?(uploads)[\/]+/, 'uploads/');
                        if (!uploaded.startsWith('uploads/')) {
                            uploaded = "uploads/".concat(uploaded.replace(/^\/+/, ''));
                        }
                        uploaded = "/".concat(uploaded.replace(/^\/+/, ''));
                        react_hot_toast_1.default.success('Файл успешно загружен!');
                        setImagePreview(uploaded);
                        setSelectedFile(null);
                    }
                    else {
                        react_hot_toast_1.default.error('Ошибка загрузки файла');
                    }
                    return [3 /*break*/, 5];
                case 3:
                    error_2 = _d.sent();
                    console.error('Upload error:', error_2);
                    react_hot_toast_1.default.error('Ошибка загрузки файла');
                    return [3 /*break*/, 5];
                case 4:
                    setUploading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var handleSave = function () { return __awaiter(void 0, void 0, void 0, function () {
        var normalizedUrl, backgroundData, response, error_3;
        var _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    if (!imagePreview) {
                        react_hot_toast_1.default.error('Пожалуйста, загрузите изображение или видео');
                        return [2 /*return*/];
                    }
                    // Check if imagePreview is a data URL (local preview)
                    if (imagePreview.startsWith('data:')) {
                        react_hot_toast_1.default.error('Пожалуйста, сначала загрузите файл на сервер');
                        return [2 /*return*/];
                    }
                    setSaving(true);
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 4, 5, 6]);
                    normalizedUrl = imagePreview;
                    normalizedUrl = String(normalizedUrl).replace(/\\/g, '/');
                    normalizedUrl = normalizedUrl.replace(/^\/?(uploads)[\/]+/, 'uploads/');
                    if (!normalizedUrl.startsWith('uploads/')) {
                        normalizedUrl = "uploads/".concat(normalizedUrl.replace(/^\/+/, ''));
                    }
                    normalizedUrl = "/".concat(normalizedUrl.replace(/^\/+/, ''));
                    backgroundData = {
                        page_name: pageName,
                        background_image_url: normalizedUrl,
                        background_type: backgroundType,
                        fallback_image_url: capturedFrame && !capturedFrame.startsWith('data:') ? capturedFrame : null
                    };
                    return [4 /*yield*/, axios_1.default.post('http://localhost:5000/api/hero-backgrounds', backgroundData, {
                            headers: {
                                'Authorization': "Bearer ".concat(localStorage.getItem('adminToken')),
                                'Content-Type': 'application/json'
                            }
                        })];
                case 2:
                    response = _d.sent();
                    console.log('Save response:', response.data);
                    react_hot_toast_1.default.success(editingBackground ? 'Фон обновлен!' : 'Фон создан!');
                    return [4 /*yield*/, fetchBackgrounds()];
                case 3:
                    _d.sent();
                    handleCloseModal();
                    return [3 /*break*/, 6];
                case 4:
                    error_3 = _d.sent();
                    console.error('Save error:', error_3);
                    console.error('Error response:', (_a = error_3.response) === null || _a === void 0 ? void 0 : _a.data);
                    react_hot_toast_1.default.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0438\u044F \u0444\u043E\u043D\u0430: ".concat(((_c = (_b = error_3.response) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.error) || error_3.message));
                    return [3 /*break*/, 6];
                case 5:
                    setSaving(false);
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    // Video frame capture functions
    var handleVideoLoad = function (video) {
        console.log('Video element loaded:', video);
        setVideoRef(video);
    };
    var captureFrame = function () { return __awaiter(void 0, void 0, void 0, function () {
        var canvas, ctx, frameDataUrl;
        return __generator(this, function (_a) {
            if (!videoRef) {
                console.error('Video ref not available');
                react_hot_toast_1.default.error('Видео не загружено');
                return [2 /*return*/];
            }
            if (videoRef.videoWidth === 0 || videoRef.videoHeight === 0) {
                console.error('Video dimensions not available');
                react_hot_toast_1.default.error('Видео еще не готово, подождите немного');
                return [2 /*return*/];
            }
            setCapturingFrame(true);
            try {
                console.log('Capturing frame from video:', videoRef.videoWidth, 'x', videoRef.videoHeight);
                canvas = document.createElement('canvas');
                ctx = canvas.getContext('2d');
                if (!ctx) {
                    throw new Error('Canvas context not available');
                }
                canvas.width = videoRef.videoWidth;
                canvas.height = videoRef.videoHeight;
                // Clear canvas first
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                // Draw the video frame
                ctx.drawImage(videoRef, 0, 0, canvas.width, canvas.height);
                // Check if canvas is tainted
                try {
                    ctx.getImageData(0, 0, 1, 1);
                }
                catch (e) {
                    throw new Error('Canvas is tainted due to CORS restrictions. Please ensure the video is served with proper CORS headers.');
                }
                frameDataUrl = canvas.toDataURL('image/jpeg', 0.8);
                console.log('Frame captured, data URL length:', frameDataUrl.length);
                setCapturedFrame(frameDataUrl);
                react_hot_toast_1.default.success('Кадр успешно захвачен!');
            }
            catch (error) {
                console.error('Frame capture error:', error);
                if (error instanceof Error && error.message.includes('tainted')) {
                    react_hot_toast_1.default.error('Ошибка CORS: Видео должно быть загружено с правильными заголовками безопасности');
                }
                else {
                    react_hot_toast_1.default.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u0437\u0430\u0445\u0432\u0430\u0442\u0430 \u043A\u0430\u0434\u0440\u0430: ".concat(error instanceof Error ? error.message : 'Неизвестная ошибка'));
                }
            }
            finally {
                setCapturingFrame(false);
            }
            return [2 /*return*/];
        });
    }); };
    var uploadFrame = function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, blob, formData, adminToken, uploadResponse, uploaded, error_4;
        var _a, _b, _c, _d, _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    if (!capturedFrame)
                        return [2 /*return*/];
                    setCapturingFrame(true);
                    _f.label = 1;
                case 1:
                    _f.trys.push([1, 5, 6, 7]);
                    console.log('Starting frame upload...');
                    return [4 /*yield*/, fetch(capturedFrame)];
                case 2:
                    response = _f.sent();
                    return [4 /*yield*/, response.blob()];
                case 3:
                    blob = _f.sent();
                    console.log('Blob created:', blob.size, 'bytes');
                    formData = new FormData();
                    formData.append('image', blob, 'video-frame.jpg');
                    console.log('Uploading to server...');
                    adminToken = localStorage.getItem('adminToken');
                    console.log('Admin token exists:', !!adminToken);
                    if (!adminToken) {
                        throw new Error('Admin token not found. Please login again.');
                    }
                    return [4 /*yield*/, axios_1.default.post('http://localhost:5000/api/upload', formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                                'Authorization': "Bearer ".concat(adminToken)
                            },
                            timeout: 30000 // 30 second timeout
                        })];
                case 4:
                    uploadResponse = _f.sent();
                    console.log('Upload response:', uploadResponse.data);
                    if (uploadResponse.data && uploadResponse.data.imageUrl) {
                        uploaded = uploadResponse.data.imageUrl;
                        // Normalize slashes and ensure single /uploads prefix
                        uploaded = String(uploaded).replace(/\\/g, '/');
                        uploaded = uploaded.replace(/^\/?(uploads)[\/]+/, 'uploads/');
                        if (!uploaded.startsWith('uploads/')) {
                            uploaded = "uploads/".concat(uploaded.replace(/^\/+/, ''));
                        }
                        uploaded = "/".concat(uploaded.replace(/^\/+/, ''));
                        console.log('Normalized URL:', uploaded);
                        setCapturedFrame(uploaded);
                        react_hot_toast_1.default.success('Кадр успешно загружен на сервер!');
                    }
                    else {
                        throw new Error('No imageUrl in response');
                    }
                    return [3 /*break*/, 7];
                case 5:
                    error_4 = _f.sent();
                    console.error('Frame upload error:', error_4);
                    console.error('Error response:', (_a = error_4.response) === null || _a === void 0 ? void 0 : _a.data);
                    if (axios_1.default.isAxiosError(error_4)) {
                        if (error_4.code === 'ECONNREFUSED') {
                            react_hot_toast_1.default.error('Не удается подключиться к серверу. Проверьте, что сервер запущен.');
                        }
                        else if (((_b = error_4.response) === null || _b === void 0 ? void 0 : _b.status) === 401) {
                            react_hot_toast_1.default.error('Ошибка авторизации. Пожалуйста, войдите в систему заново.');
                        }
                        else if (((_c = error_4.response) === null || _c === void 0 ? void 0 : _c.status) === 413) {
                            react_hot_toast_1.default.error('Файл слишком большой. Попробуйте захватить кадр меньшего размера.');
                        }
                        else if ((_e = (_d = error_4.response) === null || _d === void 0 ? void 0 : _d.data) === null || _e === void 0 ? void 0 : _e.error) {
                            react_hot_toast_1.default.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0438 \u043A\u0430\u0434\u0440\u0430: ".concat(error_4.response.data.error));
                        }
                        else {
                            react_hot_toast_1.default.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0438 \u043A\u0430\u0434\u0440\u0430: ".concat(error_4.message));
                        }
                    }
                    else {
                        react_hot_toast_1.default.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0438 \u043A\u0430\u0434\u0440\u0430: ".concat(error_4 instanceof Error ? error_4.message : 'Неизвестная ошибка'));
                    }
                    return [3 /*break*/, 7];
                case 6:
                    setCapturingFrame(false);
                    return [7 /*endfinally*/];
                case 7: return [2 /*return*/];
            }
        });
    }); };
    var handleDelete = function (pageName) { return __awaiter(void 0, void 0, void 0, function () {
        var error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!window.confirm('Вы уверены, что хотите удалить этот фон?')) {
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, axios_1.default.delete("http://localhost:5000/api/hero-backgrounds/".concat(encodeURIComponent(pageName)), {
                            headers: {
                                'Authorization': "Bearer ".concat(localStorage.getItem('adminToken'))
                            }
                        })];
                case 2:
                    _a.sent();
                    react_hot_toast_1.default.success('Фон удален!');
                    return [4 /*yield*/, fetchBackgrounds()];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    error_5 = _a.sent();
                    console.error('Delete error:', error_5);
                    react_hot_toast_1.default.error('Ошибка удаления фона');
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var getPageLabel = function (pageValue) {
        var page = KNOWN_PAGES.find(function (p) { return p.value === pageValue; });
        return page ? page.label : pageValue;
    };
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(Container, { children: [(0, jsx_runtime_1.jsx)(Title, { children: "\u0423\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u0444\u043E\u043D\u0430\u043C\u0438 Hero" }), (0, jsx_runtime_1.jsx)("div", { children: "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430..." })] }));
    }
    return ((0, jsx_runtime_1.jsxs)(Container, { children: [(0, jsx_runtime_1.jsx)(Title, { children: "\uD83D\uDDBC\uFE0F \u0423\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u0444\u043E\u043D\u0430\u043C\u0438 Hero" }), (0, jsx_runtime_1.jsx)(Button, { "$variant": "primary", onClick: handleAddNew, children: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043D\u043E\u0432\u044B\u0439 \u0444\u043E\u043D" }), (0, jsx_runtime_1.jsx)("div", { className: "hero-backgrounds-grid", children: KNOWN_PAGES.map(function (page) {
                    var background = backgrounds.find(function (bg) { return bg.page_name === page.value; });
                    return ((0, jsx_runtime_1.jsxs)("div", { className: "hero-background-card", children: [(0, jsx_runtime_1.jsxs)("div", { className: "background-info", children: [(0, jsx_runtime_1.jsx)("h3", { children: page.label }), (0, jsx_runtime_1.jsx)("span", { className: "page-key", children: page.value }), (0, jsx_runtime_1.jsx)("p", { className: "last-updated", children: (background === null || background === void 0 ? void 0 : background.updated_at)
                                            ? "\u041E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u043E: ".concat(new Date(background.updated_at).toLocaleString())
                                            : 'Фон не установлен' })] }), (0, jsx_runtime_1.jsx)("div", { className: "background-preview", children: (background === null || background === void 0 ? void 0 : background.background_image_url) ? (background.background_type === 'video' ? ((0, jsx_runtime_1.jsx)("video", { src: "http://localhost:5000".concat(background.background_image_url), className: "preview-video", muted: true })) : ((0, jsx_runtime_1.jsx)("img", { src: "http://localhost:5000".concat(background.background_image_url), alt: "".concat(page.label, " background"), className: "preview-image" }))) : ((0, jsx_runtime_1.jsxs)("div", { className: "no-background", children: [(0, jsx_runtime_1.jsx)("div", { className: "no-background-icon", children: "\uD83D\uDDBC\uFE0F" }), (0, jsx_runtime_1.jsx)("div", { children: "\u041D\u0435\u0442 \u0444\u043E\u043D\u0430" })] })) }), (0, jsx_runtime_1.jsxs)("div", { className: "background-actions", children: [(0, jsx_runtime_1.jsx)(Button, { "$variant": "primary", onClick: function () { return handleEdit(background || { page_name: page.value, background_type: 'image', background_image_url: null }); }, children: background ? 'Редактировать' : 'Добавить фон' }), background && ((0, jsx_runtime_1.jsx)(Button, { "$variant": "danger", onClick: function () { return handleDelete(page.value); }, children: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C" }))] })] }, page.value));
                }) }), showModal && ((0, jsx_runtime_1.jsx)(Modal, { onClick: handleCloseModal, children: (0, jsx_runtime_1.jsxs)(ModalContent, { onClick: function (e) { return e.stopPropagation(); }, children: [(0, jsx_runtime_1.jsxs)(ModalHeader, { children: [(0, jsx_runtime_1.jsx)(ModalTitle, { children: editingBackground ? 'Редактировать фон' : 'Добавить новый фон' }), (0, jsx_runtime_1.jsx)(CloseButton, { onClick: handleCloseModal, children: "\u00D7" })] }), (0, jsx_runtime_1.jsxs)(FormGroup, { children: [(0, jsx_runtime_1.jsx)(Label, { children: "\u0421\u0442\u0440\u0430\u043D\u0438\u0446\u0430" }), (0, jsx_runtime_1.jsx)(Select, { value: pageName, onChange: function (e) { return setPageName(e.target.value); }, disabled: !!editingBackground, children: KNOWN_PAGES.map(function (page) { return ((0, jsx_runtime_1.jsx)("option", { value: page.value, children: page.label }, page.value)); }) })] }), (0, jsx_runtime_1.jsxs)(FormGroup, { children: [(0, jsx_runtime_1.jsx)(Label, { children: "\u0422\u0438\u043F \u0444\u043E\u043D\u0430" }), (0, jsx_runtime_1.jsxs)(Select, { value: backgroundType, onChange: function (e) { return setBackgroundType(e.target.value); }, children: [(0, jsx_runtime_1.jsx)("option", { value: "image", children: "\u0418\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435" }), (0, jsx_runtime_1.jsx)("option", { value: "video", children: "\u0412\u0438\u0434\u0435\u043E" })] })] }), (0, jsx_runtime_1.jsxs)(FormGroup, { children: [(0, jsx_runtime_1.jsx)(Label, { children: "\u0424\u0430\u0439\u043B" }), (0, jsx_runtime_1.jsx)(Input, { type: "file", accept: backgroundType === 'image' ? 'image/*' : 'video/*', onChange: handleFileSelect }), (0, jsx_runtime_1.jsxs)("div", { style: { fontSize: '12px', color: '#6b7280', marginTop: '5px' }, children: ["\u041C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u044B\u0439 \u0440\u0430\u0437\u043C\u0435\u0440 \u0444\u0430\u0439\u043B\u0430: 100MB", selectedFile && ((0, jsx_runtime_1.jsxs)("span", { style: { color: selectedFile.size > 100 * 1024 * 1024 ? '#ef4444' : '#059669' }, children: [' ', "(", Math.round(selectedFile.size / 1024 / 1024), "MB)"] }))] }), selectedFile && selectedFile.size > 100 * 1024 * 1024 && ((0, jsx_runtime_1.jsx)("div", { style: { color: '#ef4444', fontSize: '12px', marginTop: '5px' }, children: "\u26A0\uFE0F \u0424\u0430\u0439\u043B \u0441\u043B\u0438\u0448\u043A\u043E\u043C \u0431\u043E\u043B\u044C\u0448\u043E\u0439! \u041C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u044B\u0439 \u0440\u0430\u0437\u043C\u0435\u0440: 100MB" })), selectedFile && selectedFile.size <= 100 * 1024 * 1024 && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(UploadButton, { onClick: handleUpload, disabled: uploading, children: uploading ? 'Загрузка...' : 'Загрузить файл' }), imagePreview && ((0, jsx_runtime_1.jsx)(WarningMessage, { children: "\u26A0\uFE0F \u0424\u0430\u0439\u043B \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043D! \u041D\u0435 \u0437\u0430\u0431\u0443\u0434\u044C\u0442\u0435 \u0441\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F." }))] }))] }), (0, jsx_runtime_1.jsx)(ImagePreview, { children: imagePreview ? (backgroundType === 'video' ? ((0, jsx_runtime_1.jsx)(PreviewVideo, { ref: handleVideoLoad, src: imagePreview.startsWith('data:') ? imagePreview : "http://localhost:5000".concat(imagePreview), controls: true, crossOrigin: "anonymous" })) : ((0, jsx_runtime_1.jsx)(PreviewImage, { src: imagePreview.startsWith('data:') ? imagePreview : "http://localhost:5000".concat(imagePreview), alt: "Preview" }))) : (editingBackground === null || editingBackground === void 0 ? void 0 : editingBackground.background_image_url) ? (editingBackground.background_type === 'video' ? ((0, jsx_runtime_1.jsx)(PreviewVideo, { ref: handleVideoLoad, src: "http://localhost:5000".concat(editingBackground.background_image_url), controls: true, crossOrigin: "anonymous" })) : ((0, jsx_runtime_1.jsx)(PreviewImage, { src: "http://localhost:5000".concat(editingBackground.background_image_url), alt: "Current background" }))) : ((0, jsx_runtime_1.jsx)("div", { style: { color: '#6b7280' }, children: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0444\u0430\u0439\u043B \u0434\u043B\u044F \u043F\u0440\u0435\u0434\u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440\u0430" })) }), ((imagePreview && backgroundType === 'video') || ((editingBackground === null || editingBackground === void 0 ? void 0 : editingBackground.background_type) === 'video')) && ((0, jsx_runtime_1.jsxs)(FrameCaptureSection, { children: [(0, jsx_runtime_1.jsx)(FrameCaptureTitle, { children: "\uD83D\uDCF8 \u0417\u0430\u0445\u0432\u0430\u0442 \u043A\u0430\u0434\u0440\u0430 \u0434\u043B\u044F fallback \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F" }), (0, jsx_runtime_1.jsxs)(FrameCaptureButtons, { children: [(0, jsx_runtime_1.jsx)(CaptureButton, { onClick: captureFrame, disabled: capturingFrame || !videoRef, children: capturingFrame ? 'Захват...' : 'Захватить кадр' }), capturedFrame && ((0, jsx_runtime_1.jsx)(UploadFrameButton, { onClick: uploadFrame, disabled: capturingFrame, children: capturingFrame ? 'Загрузка...' : 'Загрузить кадр' }))] }), capturedFrame && ((0, jsx_runtime_1.jsx)(CapturedFramePreview, { children: (0, jsx_runtime_1.jsx)(CapturedFrameImage, { src: capturedFrame.startsWith('data:') ? capturedFrame : "http://localhost:5000".concat(capturedFrame), alt: "Captured frame" }) })), (0, jsx_runtime_1.jsx)("div", { style: { fontSize: '12px', color: '#6b7280', marginTop: '8px' }, children: "\uD83D\uDCA1 \u041F\u0435\u0440\u0435\u043C\u043E\u0442\u0430\u0439\u0442\u0435 \u0432\u0438\u0434\u0435\u043E \u043D\u0430 \u043D\u0443\u0436\u043D\u044B\u0439 \u043A\u0430\u0434\u0440 \u0438 \u043D\u0430\u0436\u043C\u0438\u0442\u0435 \"\u0417\u0430\u0445\u0432\u0430\u0442\u0438\u0442\u044C \u043A\u0430\u0434\u0440\"" })] })), (0, jsx_runtime_1.jsx)(SaveButton, { onClick: handleSave, disabled: saving || (!imagePreview && !(editingBackground === null || editingBackground === void 0 ? void 0 : editingBackground.background_image_url)), "$hasImage": !!imagePreview, children: saving ? 'Сохранение...' : 'Сохранить фон' })] }) }))] }));
};
exports.default = HeroBackgroundManager;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13, templateObject_14, templateObject_15, templateObject_16, templateObject_17, templateObject_18, templateObject_19, templateObject_20, templateObject_21, templateObject_22, templateObject_23, templateObject_24, templateObject_25;
