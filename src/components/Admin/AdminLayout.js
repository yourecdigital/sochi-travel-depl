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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var styled_components_1 = __importDefault(require("styled-components"));
var react_router_dom_1 = require("react-router-dom");
var AuthContext_1 = require("../../contexts/AuthContext");
var axios_1 = __importDefault(require("axios"));
var AdminContainer = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  min-height: 100vh;\n  background: #1e293b;\n  display: flex;\n  flex-direction: column;\n"], ["\n  min-height: 100vh;\n  background: #1e293b;\n  display: flex;\n  flex-direction: column;\n"])));
var TopBar = styled_components_1.default.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  background: #1e293b;\n  color: #ffffff;\n  padding: 1rem 2rem;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);\n  position: sticky;\n  top: 0;\n  z-index: 100;\n  backdrop-filter: blur(20px);\n  border-bottom: 3px solid rgba(255, 255, 255, 0.2);\n"], ["\n  background: #1e293b;\n  color: #ffffff;\n  padding: 1rem 2rem;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);\n  position: sticky;\n  top: 0;\n  z-index: 100;\n  backdrop-filter: blur(20px);\n  border-bottom: 3px solid rgba(255, 255, 255, 0.2);\n"])));
var TopBarLeft = styled_components_1.default.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n"], ["\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n"])));
var TopBarRight = styled_components_1.default.div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n"], ["\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n"])));
var Logo = styled_components_1.default.h1(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  margin: 0;\n  font-size: 1.5rem;\n  font-weight: 700;\n  color: #ffffff;\n  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);\n"], ["\n  margin: 0;\n  font-size: 1.5rem;\n  font-weight: 700;\n  color: #ffffff;\n  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);\n"])));
var TopBarButton = styled_components_1.default.button(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  background: rgba(255, 255, 255, 0.1);\n  color: #ffffff;\n  border: 2px solid rgba(255, 255, 255, 0.3);\n  padding: 0.5rem 1rem;\n  border-radius: 8px;\n  cursor: pointer;\n  font-size: 0.9rem;\n  font-weight: 600;\n  transition: all 0.3s ease;\n  backdrop-filter: blur(15px);\n\n  &:hover {\n    background: rgba(255, 255, 255, 0.2);\n    border-color: rgba(255, 255, 255, 0.5);\n    transform: translateY(-2px);\n    box-shadow: 0 8px 25px rgba(255, 255, 255, 0.2);\n  }\n"], ["\n  background: rgba(255, 255, 255, 0.1);\n  color: #ffffff;\n  border: 2px solid rgba(255, 255, 255, 0.3);\n  padding: 0.5rem 1rem;\n  border-radius: 8px;\n  cursor: pointer;\n  font-size: 0.9rem;\n  font-weight: 600;\n  transition: all 0.3s ease;\n  backdrop-filter: blur(15px);\n\n  &:hover {\n    background: rgba(255, 255, 255, 0.2);\n    border-color: rgba(255, 255, 255, 0.5);\n    transform: translateY(-2px);\n    box-shadow: 0 8px 25px rgba(255, 255, 255, 0.2);\n  }\n"])));
var NavigationBar = styled_components_1.default.div(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  background: rgba(30, 41, 59, 0.95);\n  border-bottom: 2px solid rgba(255, 255, 255, 0.2);\n  padding: 1rem 2rem;\n  display: flex;\n  gap: 1rem;\n  overflow-x: auto;\n  position: sticky;\n  top: 72px;\n  z-index: 99;\n  backdrop-filter: blur(20px);\n"], ["\n  background: rgba(30, 41, 59, 0.95);\n  border-bottom: 2px solid rgba(255, 255, 255, 0.2);\n  padding: 1rem 2rem;\n  display: flex;\n  gap: 1rem;\n  overflow-x: auto;\n  position: sticky;\n  top: 72px;\n  z-index: 99;\n  backdrop-filter: blur(20px);\n"])));
var NavButton = styled_components_1.default.button(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n  background: ", ";\n  color: #ffffff;\n  border: 2px solid ", ";\n  padding: 0.75rem 1.5rem;\n  border-radius: 10px;\n  cursor: pointer;\n  font-size: 0.9rem;\n  font-weight: 600;\n  white-space: nowrap;\n  transition: all 0.3s ease;\n  backdrop-filter: blur(15px);\n\n  &:hover {\n    background: rgba(255, 255, 255, 0.2);\n    border-color: rgba(255, 255, 255, 0.5);\n    color: #ffffff;\n    transform: translateY(-2px);\n    box-shadow: 0 8px 25px rgba(255, 255, 255, 0.2);\n  }\n"], ["\n  background: ", ";\n  color: #ffffff;\n  border: 2px solid ", ";\n  padding: 0.75rem 1.5rem;\n  border-radius: 10px;\n  cursor: pointer;\n  font-size: 0.9rem;\n  font-weight: 600;\n  white-space: nowrap;\n  transition: all 0.3s ease;\n  backdrop-filter: blur(15px);\n\n  &:hover {\n    background: rgba(255, 255, 255, 0.2);\n    border-color: rgba(255, 255, 255, 0.5);\n    color: #ffffff;\n    transform: translateY(-2px);\n    box-shadow: 0 8px 25px rgba(255, 255, 255, 0.2);\n  }\n"])), function (props) { return props.$active ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)'; }, function (props) { return props.$active ? 'rgba(255, 255, 255, 0.5)' : 'rgba(255, 255, 255, 0.3)'; });
var MainContent = styled_components_1.default.div(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n  display: flex;\n  flex: 1;\n"], ["\n  display: flex;\n  flex: 1;\n"])));
var Sidebar = styled_components_1.default.aside(templateObject_10 || (templateObject_10 = __makeTemplateObject(["\n  width: 280px;\n  background: rgba(30, 41, 59, 0.95);\n  border-right: 2px solid rgba(255, 255, 255, 0.2);\n  padding: 2rem 0;\n  position: sticky;\n  top: 144px;\n  height: calc(100vh - 144px);\n  overflow-y: auto;\n  backdrop-filter: blur(20px);\n"], ["\n  width: 280px;\n  background: rgba(30, 41, 59, 0.95);\n  border-right: 2px solid rgba(255, 255, 255, 0.2);\n  padding: 2rem 0;\n  position: sticky;\n  top: 144px;\n  height: calc(100vh - 144px);\n  overflow-y: auto;\n  backdrop-filter: blur(20px);\n"])));
var SidebarSection = styled_components_1.default.div(templateObject_11 || (templateObject_11 = __makeTemplateObject(["\n  margin-bottom: 2rem;\n"], ["\n  margin-bottom: 2rem;\n"])));
var SidebarTitle = styled_components_1.default.h3(templateObject_12 || (templateObject_12 = __makeTemplateObject(["\n  color: #ffffff;\n  font-size: 0.8rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  margin: 0 0 1rem 2rem;\n  opacity: 0.8;\n"], ["\n  color: #ffffff;\n  font-size: 0.8rem;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  margin: 0 0 1rem 2rem;\n  opacity: 0.8;\n"])));
var CategoryFilter = styled_components_1.default.div(templateObject_13 || (templateObject_13 = __makeTemplateObject(["\n  padding: 0 2rem;\n"], ["\n  padding: 0 2rem;\n"])));
var CategoryTitle = styled_components_1.default.h4(templateObject_14 || (templateObject_14 = __makeTemplateObject(["\n  color: #ffffff;\n  font-size: 1rem;\n  font-weight: 600;\n  margin: 0 0 1rem 0;\n"], ["\n  color: #ffffff;\n  font-size: 1rem;\n  font-weight: 600;\n  margin: 0 0 1rem 0;\n"])));
var CategoryButtons = styled_components_1.default.div(templateObject_15 || (templateObject_15 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n"], ["\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n"])));
var CategoryButton = styled_components_1.default.button(templateObject_16 || (templateObject_16 = __makeTemplateObject(["\n  background: ", ";\n  color: #ffffff;\n  border: 2px solid ", ";\n  padding: 0.75rem 1rem;\n  border-radius: 8px;\n  cursor: pointer;\n  font-size: 0.9rem;\n  font-weight: 600;\n  text-align: left;\n  transition: all 0.3s ease;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  backdrop-filter: blur(15px);\n\n  &:hover {\n    background: rgba(255, 255, 255, 0.2);\n    border-color: rgba(255, 255, 255, 0.5);\n    color: #ffffff;\n    transform: translateY(-2px);\n    box-shadow: 0 8px 25px rgba(255, 255, 255, 0.2);\n  }\n"], ["\n  background: ", ";\n  color: #ffffff;\n  border: 2px solid ", ";\n  padding: 0.75rem 1rem;\n  border-radius: 8px;\n  cursor: pointer;\n  font-size: 0.9rem;\n  font-weight: 600;\n  text-align: left;\n  transition: all 0.3s ease;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  backdrop-filter: blur(15px);\n\n  &:hover {\n    background: rgba(255, 255, 255, 0.2);\n    border-color: rgba(255, 255, 255, 0.5);\n    color: #ffffff;\n    transform: translateY(-2px);\n    box-shadow: 0 8px 25px rgba(255, 255, 255, 0.2);\n  }\n"])), function (props) { return props.$active ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)'; }, function (props) { return props.$active ? 'rgba(255, 255, 255, 0.5)' : 'rgba(255, 255, 255, 0.3)'; });
var DeleteButton = styled_components_1.default.button(templateObject_17 || (templateObject_17 = __makeTemplateObject(["\n  background: rgba(239, 68, 68, 0.9);\n  color: #ffffff;\n  border: 2px solid rgba(239, 68, 68, 0.3);\n  padding: 0.25rem 0.5rem;\n  border-radius: 6px;\n  cursor: pointer;\n  font-size: 0.75rem;\n  font-weight: 600;\n  transition: all 0.3s ease;\n  margin-left: 0.5rem;\n  backdrop-filter: blur(15px);\n\n  &:hover {\n    background: rgba(220, 38, 38, 0.95);\n    border-color: rgba(239, 68, 68, 0.5);\n    transform: translateY(-1px);\n    box-shadow: 0 4px 15px rgba(239, 68, 68, 0.3);\n  }\n"], ["\n  background: rgba(239, 68, 68, 0.9);\n  color: #ffffff;\n  border: 2px solid rgba(239, 68, 68, 0.3);\n  padding: 0.25rem 0.5rem;\n  border-radius: 6px;\n  cursor: pointer;\n  font-size: 0.75rem;\n  font-weight: 600;\n  transition: all 0.3s ease;\n  margin-left: 0.5rem;\n  backdrop-filter: blur(15px);\n\n  &:hover {\n    background: rgba(220, 38, 38, 0.95);\n    border-color: rgba(239, 68, 68, 0.5);\n    transform: translateY(-1px);\n    box-shadow: 0 4px 15px rgba(239, 68, 68, 0.3);\n  }\n"])));
var Modal = styled_components_1.default.div(templateObject_18 || (templateObject_18 = __makeTemplateObject(["\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(0, 0, 0, 0.5);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  z-index: 9999;\n"], ["\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(0, 0, 0, 0.5);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  z-index: 9999;\n"])));
var ModalContent = styled_components_1.default.div(templateObject_19 || (templateObject_19 = __makeTemplateObject(["\n  background: rgba(30, 41, 59, 0.98);\n  padding: 2rem;\n  border-radius: 16px;\n  max-width: 400px;\n  width: 90%;\n  min-height: 120vh;\n  max-height: 120vh;\n  text-align: center;\n  backdrop-filter: blur(25px);\n  border: 2px solid rgba(255, 255, 255, 0.2);\n  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);\n  overflow-y: auto;\n"], ["\n  background: rgba(30, 41, 59, 0.98);\n  padding: 2rem;\n  border-radius: 16px;\n  max-width: 400px;\n  width: 90%;\n  min-height: 120vh;\n  max-height: 120vh;\n  text-align: center;\n  backdrop-filter: blur(25px);\n  border: 2px solid rgba(255, 255, 255, 0.2);\n  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);\n  overflow-y: auto;\n"])));
var ModalTitle = styled_components_1.default.h3(templateObject_20 || (templateObject_20 = __makeTemplateObject(["\n  margin: 0 0 1rem 0;\n  color: #ffffff;\n"], ["\n  margin: 0 0 1rem 0;\n  color: #ffffff;\n"])));
var ModalText = styled_components_1.default.p(templateObject_21 || (templateObject_21 = __makeTemplateObject(["\n  margin: 0 0 1.5rem 0;\n  color: #ffffff;\n  opacity: 0.8;\n"], ["\n  margin: 0 0 1.5rem 0;\n  color: #ffffff;\n  opacity: 0.8;\n"])));
var ModalButtons = styled_components_1.default.div(templateObject_22 || (templateObject_22 = __makeTemplateObject(["\n  display: flex;\n  gap: 1rem;\n  justify-content: center;\n"], ["\n  display: flex;\n  gap: 1rem;\n  justify-content: center;\n"])));
var ModalButton = styled_components_1.default.button(templateObject_23 || (templateObject_23 = __makeTemplateObject(["\n  padding: 0.75rem 1.5rem;\n  border-radius: 8px;\n  border: 2px solid ", ";\n  background: ", ";\n  color: #ffffff;\n  cursor: pointer;\n  font-weight: 600;\n  transition: all 0.3s ease;\n  backdrop-filter: blur(15px);\n\n  &:hover {\n    background: ", ";\n    border-color: ", ";\n    transform: translateY(-2px);\n    box-shadow: 0 8px 25px rgba(255, 255, 255, 0.2);\n  }\n"], ["\n  padding: 0.75rem 1.5rem;\n  border-radius: 8px;\n  border: 2px solid ", ";\n  background: ", ";\n  color: #ffffff;\n  cursor: pointer;\n  font-weight: 600;\n  transition: all 0.3s ease;\n  backdrop-filter: blur(15px);\n\n  &:hover {\n    background: ", ";\n    border-color: ", ";\n    transform: translateY(-2px);\n    box-shadow: 0 8px 25px rgba(255, 255, 255, 0.2);\n  }\n"])), function (props) { return props.$danger ? 'rgba(239, 68, 68, 0.3)' : 'rgba(255, 255, 255, 0.3)'; }, function (props) { return props.$danger ? 'rgba(239, 68, 68, 0.9)' : 'rgba(255, 255, 255, 0.1)'; }, function (props) { return props.$danger ? 'rgba(220, 38, 38, 0.95)' : 'rgba(255, 255, 255, 0.2)'; }, function (props) { return props.$danger ? 'rgba(239, 68, 68, 0.5)' : 'rgba(255, 255, 255, 0.5)'; });
var ContentArea = styled_components_1.default.main(templateObject_24 || (templateObject_24 = __makeTemplateObject(["\n  flex: 1;\n  padding: 2rem;\n  overflow-y: auto;\n"], ["\n  flex: 1;\n  padding: 2rem;\n  overflow-y: auto;\n"])));
var AdminLayout = function (_a) {
    var children = _a.children;
    var navigate = (0, react_router_dom_1.useNavigate)();
    var location = (0, react_router_dom_1.useLocation)();
    var logout = (0, AuthContext_1.useAuth)().logout;
    var searchParams = new URLSearchParams(location.search);
    var currentSection = searchParams.get('section') || 'tours';
    var currentCategory = searchParams.get('category') || 'Все';
    var _b = (0, react_1.useState)(currentCategory), selectedCategory = _b[0], setSelectedCategory = _b[1];
    var _c = (0, react_1.useState)([]), categories = _c[0], setCategories = _c[1];
    var _d = (0, react_1.useState)(false), showDeleteModal = _d[0], setShowDeleteModal = _d[1];
    var _e = (0, react_1.useState)(''), categoryToDelete = _e[0], setCategoryToDelete = _e[1];
    var handleLogout = function () {
        logout();
        navigate('/admin/login');
    };
    var navigationItems = [
        { name: 'Туры по России', section: 'tours', icon: '🏔️' },
        { name: 'Зарубежные туры', section: 'foreign', icon: '✈️' },
        { name: 'Круизы', section: 'cruises', icon: '🚢' },
        { name: 'Горящие предложения', section: 'promotions', icon: '🔥' },
        { name: 'Наши услуги', section: 'services', icon: '🛠️' },
        { name: 'Отели и гостиницы', section: 'hotels', icon: '🏨' },
        { name: 'Клиенты', section: 'clients', icon: '👥' },
        { name: 'Фоны страниц', section: 'hero-backgrounds', icon: '🖼️' },
    ];
    // Функция для получения категорий в зависимости от текущей секции
    var fetchCategories = function () { return __awaiter(void 0, void 0, void 0, function () {
        var endpoint, response, uniqueCountries, uniqueCategories, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    endpoint = '';
                    switch (currentSection) {
                        case 'tours':
                            endpoint = '/api/tours';
                            break;
                        case 'foreign':
                            endpoint = '/api/foreign-tours';
                            break;
                        case 'cruises':
                            endpoint = '/api/cruises';
                            break;
                        case 'promotions':
                            endpoint = '/api/promotions';
                            break;
                        case 'services':
                            endpoint = '/api/services';
                            break;
                        case 'hotels':
                            endpoint = '/api/hotels';
                            break;
                        default:
                            endpoint = '/api/tours';
                    }
                    return [4 /*yield*/, axios_1.default.get("http://localhost:5000".concat(endpoint))];
                case 1:
                    response = _a.sent();
                    if (currentSection === 'foreign') {
                        uniqueCountries = Array.from(new Set(response.data
                            .map(function (item) { return item.country; })
                            .filter(Boolean)));
                        setCategories(__spreadArray(['Все'], uniqueCountries, true));
                    }
                    else {
                        uniqueCategories = Array.from(new Set(response.data
                            .map(function (item) { return item.category; })
                            .filter(Boolean)));
                        setCategories(__spreadArray(['Все'], uniqueCategories, true));
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.error('Error fetching categories:', error_1);
                    setCategories(['Все']);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    (0, react_1.useEffect)(function () {
        fetchCategories();
    }, [currentSection]);
    // Синхронизируем состояние с URL при изменении параметров
    (0, react_1.useEffect)(function () {
        setSelectedCategory(currentCategory);
    }, [currentCategory]);
    var handleSectionChange = function (section) {
        navigate("/admin/dashboard?section=".concat(section));
        setSelectedCategory('Все');
    };
    var handleCategoryChange = function (category) {
        setSelectedCategory(category);
        // Передаем выбранную категорию в дочерний компонент через URL
        navigate("/admin/dashboard?section=".concat(currentSection, "&category=").concat(category));
    };
    var handleDeleteCategory = function (category, e) {
        e.stopPropagation(); // Предотвращаем срабатывание onClick родительской кнопки
        if (category === 'Все')
            return; // Нельзя удалить "Все"
        setCategoryToDelete(category);
        setShowDeleteModal(true);
    };
    var confirmDeleteCategory = function () { return __awaiter(void 0, void 0, void 0, function () {
        var token, endpoint, fieldName, response, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, 5, 6]);
                    token = localStorage.getItem('adminToken');
                    if (!token) {
                        console.error('No admin token found');
                        return [2 /*return*/];
                    }
                    endpoint = '';
                    fieldName = '';
                    switch (currentSection) {
                        case 'tours':
                            endpoint = '/api/tours';
                            fieldName = 'category';
                            break;
                        case 'foreign':
                            endpoint = '/api/foreign-tours';
                            fieldName = 'country';
                            break;
                        case 'cruises':
                            endpoint = '/api/cruises';
                            fieldName = 'category';
                            break;
                        case 'promotions':
                            endpoint = '/api/promotions';
                            fieldName = 'category';
                            break;
                        case 'services':
                            endpoint = '/api/services';
                            fieldName = 'category';
                            break;
                        case 'hotels':
                            endpoint = '/api/hotels';
                            fieldName = 'category';
                            break;
                        default:
                            endpoint = '/api/tours';
                            fieldName = 'category';
                    }
                    return [4 /*yield*/, axios_1.default.delete("".concat(endpoint, "/category/").concat(encodeURIComponent(categoryToDelete)), {
                            headers: {
                                'Authorization': "Bearer ".concat(token)
                            }
                        })];
                case 1:
                    response = _a.sent();
                    if (!(response.status === 200)) return [3 /*break*/, 3];
                    // Обновляем список категорий
                    return [4 /*yield*/, fetchCategories()];
                case 2:
                    // Обновляем список категорий
                    _a.sent();
                    setSelectedCategory('Все');
                    navigate("/admin/dashboard?section=".concat(currentSection, "&category=\u0412\u0441\u0435"));
                    _a.label = 3;
                case 3: return [3 /*break*/, 6];
                case 4:
                    error_2 = _a.sent();
                    console.error('Error deleting category:', error_2);
                    alert('Ошибка при удалении категории');
                    return [3 /*break*/, 6];
                case 5:
                    setShowDeleteModal(false);
                    setCategoryToDelete('');
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    var cancelDeleteCategory = function () {
        setShowDeleteModal(false);
        setCategoryToDelete('');
    };
    return ((0, jsx_runtime_1.jsxs)(AdminContainer, { children: [(0, jsx_runtime_1.jsxs)(TopBar, { children: [(0, jsx_runtime_1.jsx)(TopBarLeft, { children: (0, jsx_runtime_1.jsx)(Logo, { children: "\u0410\u0434\u043C\u0438\u043D \u043F\u0430\u043D\u0435\u043B\u044C" }) }), (0, jsx_runtime_1.jsxs)(TopBarRight, { children: [(0, jsx_runtime_1.jsx)(TopBarButton, { onClick: function () { return navigate('/'); }, children: "\uD83C\uDFE0 \u041D\u0430 \u0433\u043B\u0430\u0432\u043D\u0443\u044E \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443" }), (0, jsx_runtime_1.jsx)(TopBarButton, { onClick: handleLogout, children: "\uD83D\uDEAA \u0412\u044B\u0445\u043E\u0434" })] })] }), (0, jsx_runtime_1.jsx)(NavigationBar, { children: navigationItems.map(function (item, index) { return ((0, jsx_runtime_1.jsxs)(NavButton, { "$active": currentSection === item.section, onClick: function () { return handleSectionChange(item.section); }, children: [item.icon, " ", item.name] }, index)); }) }), (0, jsx_runtime_1.jsxs)(MainContent, { children: [currentSection !== 'hero-backgrounds' && currentSection !== 'clients' && ((0, jsx_runtime_1.jsx)(Sidebar, { children: (0, jsx_runtime_1.jsx)(SidebarSection, { children: (0, jsx_runtime_1.jsxs)(CategoryFilter, { children: [(0, jsx_runtime_1.jsx)(CategoryTitle, { children: currentSection === 'foreign' ? 'Фильтр по странам' : 'Фильтр по категориям' }), (0, jsx_runtime_1.jsx)(CategoryButtons, { children: categories.map(function (category, index) { return ((0, jsx_runtime_1.jsxs)(CategoryButton, { "$active": selectedCategory === category, onClick: function () { return handleCategoryChange(category); }, children: [(0, jsx_runtime_1.jsx)("span", { children: category }), category !== 'Все' && (
                                                // Replace nested button with a span to avoid button-in-button hydration error
                                                (0, jsx_runtime_1.jsx)("span", { onClick: function (e) { return handleDeleteCategory(category, e); }, title: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C ".concat(currentSection === 'foreign' ? 'страну' : 'категорию', " \"").concat(category, "\""), style: {
                                                        background: 'rgba(239, 68, 68, 0.9)',
                                                        color: '#ffffff',
                                                        border: '2px solid rgba(239, 68, 68, 0.3)',
                                                        padding: '0.25rem 0.5rem',
                                                        borderRadius: 6,
                                                        cursor: 'pointer',
                                                        fontSize: '0.75rem',
                                                        fontWeight: 600,
                                                        transition: 'all 0.3s ease',
                                                        marginLeft: '0.5rem',
                                                        backdropFilter: 'blur(15px)'
                                                    }, role: "button", "aria-label": "\u0423\u0434\u0430\u043B\u0438\u0442\u044C ".concat(currentSection === 'foreign' ? 'страну' : 'категорию', " ").concat(category), children: "\uD83D\uDDD1\uFE0F" }))] }, index)); }) })] }) }) })), (0, jsx_runtime_1.jsx)(ContentArea, { children: children })] }), showDeleteModal && ((0, jsx_runtime_1.jsx)(Modal, { children: (0, jsx_runtime_1.jsxs)(ModalContent, { children: [(0, jsx_runtime_1.jsx)(ModalTitle, { children: "\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u0435 \u0443\u0434\u0430\u043B\u0435\u043D\u0438\u044F" }), (0, jsx_runtime_1.jsxs)(ModalText, { children: ["\u0412\u044B \u0442\u043E\u0447\u043D\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u0443\u0434\u0430\u043B\u0438\u0442\u044C ", currentSection === 'foreign' ? 'страну' : 'категорию', " \"", categoryToDelete, "\"?", (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsxs)("strong", { children: ["\u042D\u0442\u043E \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0435 \u0443\u0434\u0430\u043B\u0438\u0442 \u0432\u0441\u0435 \u043E\u0431\u044A\u0435\u043A\u0442\u044B \u0432 \u044D\u0442\u043E\u0439 ", currentSection === 'foreign' ? 'стране' : 'категории', " \u0438 \u043D\u0435 \u043C\u043E\u0436\u0435\u0442 \u0431\u044B\u0442\u044C \u043E\u0442\u043C\u0435\u043D\u0435\u043D\u043E!"] })] }), (0, jsx_runtime_1.jsxs)(ModalButtons, { children: [(0, jsx_runtime_1.jsx)(ModalButton, { onClick: cancelDeleteCategory, children: "\u041E\u0442\u043C\u0435\u043D\u0430" }), (0, jsx_runtime_1.jsx)(ModalButton, { "$danger": true, onClick: confirmDeleteCategory, children: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C" })] })] }) }))] }));
};
exports.default = AdminLayout;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13, templateObject_14, templateObject_15, templateObject_16, templateObject_17, templateObject_18, templateObject_19, templateObject_20, templateObject_21, templateObject_22, templateObject_23, templateObject_24;
