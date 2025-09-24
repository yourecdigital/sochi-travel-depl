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
var Container = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  padding: 20px;\n  min-height: 100vh;\n  background: #1e293b;\n"], ["\n  padding: 20px;\n  min-height: 100vh;\n  background: #1e293b;\n"])));
var Header = styled_components_1.default.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 30px;\n  padding-bottom: 20px;\n  border-bottom: 2px solid rgba(255, 255, 255, 0.2);\n"], ["\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 30px;\n  padding-bottom: 20px;\n  border-bottom: 2px solid rgba(255, 255, 255, 0.2);\n"])));
var Title = styled_components_1.default.h2(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  color: #ffffff;\n  margin: 0;\n  display: flex;\n  align-items: center;\n  gap: 10px;\n"], ["\n  color: #ffffff;\n  margin: 0;\n  display: flex;\n  align-items: center;\n  gap: 10px;\n"])));
var BackButton = styled_components_1.default.button(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  background: #6b7280;\n  color: white;\n  border: none;\n  padding: 10px 20px;\n  border-radius: 8px;\n  cursor: pointer;\n  font-weight: 500;\n  transition: all 0.2s ease;\n  \n  &:hover {\n    background: #4b5563;\n    transform: translateY(-2px);\n  }\n"], ["\n  background: #6b7280;\n  color: white;\n  border: none;\n  padding: 10px 20px;\n  border-radius: 8px;\n  cursor: pointer;\n  font-weight: 500;\n  transition: all 0.2s ease;\n  \n  &:hover {\n    background: #4b5563;\n    transform: translateY(-2px);\n  }\n"])));
var UserInfoCard = styled_components_1.default.div(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  background: rgba(30, 41, 59, 0.95);\n  border: 2px solid rgba(255, 255, 255, 0.2);\n  border-radius: 12px;\n  padding: 25px;\n  margin-bottom: 30px;\n  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);\n  backdrop-filter: blur(20px);\n"], ["\n  background: rgba(30, 41, 59, 0.95);\n  border: 2px solid rgba(255, 255, 255, 0.2);\n  border-radius: 12px;\n  padding: 25px;\n  margin-bottom: 30px;\n  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);\n  backdrop-filter: blur(20px);\n"])));
var UserInfoGrid = styled_components_1.default.div(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n  gap: 20px;\n  margin-bottom: 20px;\n"], ["\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n  gap: 20px;\n  margin-bottom: 20px;\n"])));
var InfoItem = styled_components_1.default.div(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  gap: 5px;\n"], ["\n  display: flex;\n  flex-direction: column;\n  gap: 5px;\n"])));
var InfoLabel = styled_components_1.default.span(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n  color: rgba(255, 255, 255, 0.8);\n  font-size: 14px;\n  font-weight: 500;\n"], ["\n  color: rgba(255, 255, 255, 0.8);\n  font-size: 14px;\n  font-weight: 500;\n"])));
var InfoValue = styled_components_1.default.span(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n  color: #ffffff;\n  font-size: 16px;\n  font-weight: 600;\n"], ["\n  color: #ffffff;\n  font-size: 16px;\n  font-weight: 600;\n"])));
var StatusBadge = styled_components_1.default.span(templateObject_10 || (templateObject_10 = __makeTemplateObject(["\n  padding: 6px 12px;\n  border-radius: 20px;\n  font-size: 14px;\n  font-weight: 500;\n  display: inline-block;\n  \n  ", "\n"], ["\n  padding: 6px 12px;\n  border-radius: 20px;\n  font-size: 14px;\n  font-weight: 500;\n  display: inline-block;\n  \n  ", "\n"])), function (props) {
    switch (props.$status) {
        case 'new':
            return "\n          background: #fef3c7;\n          color: #92400e;\n        ";
        case 'client':
            return "\n          background: #dbeafe;\n          color: #1e40af;\n        ";
        case 'regular':
            return "\n          background: #d1fae5;\n          color: #065f46;\n        ";
        default:
            return "\n          background: #f3f4f6;\n          color: #374151;\n        ";
    }
});
var ActionsSection = styled_components_1.default.div(templateObject_11 || (templateObject_11 = __makeTemplateObject(["\n  background: rgba(30, 41, 59, 0.95);\n  border: 2px solid rgba(255, 255, 255, 0.2);\n  border-radius: 12px;\n  padding: 25px;\n  margin-bottom: 30px;\n  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);\n  backdrop-filter: blur(20px);\n"], ["\n  background: rgba(30, 41, 59, 0.95);\n  border: 2px solid rgba(255, 255, 255, 0.2);\n  border-radius: 12px;\n  padding: 25px;\n  margin-bottom: 30px;\n  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);\n  backdrop-filter: blur(20px);\n"])));
var SectionTitle = styled_components_1.default.h3(templateObject_12 || (templateObject_12 = __makeTemplateObject(["\n  color: #ffffff;\n  margin: 0 0 20px 0;\n  display: flex;\n  align-items: center;\n  gap: 10px;\n"], ["\n  color: #ffffff;\n  margin: 0 0 20px 0;\n  display: flex;\n  align-items: center;\n  gap: 10px;\n"])));
var Button = styled_components_1.default.button(templateObject_13 || (templateObject_13 = __makeTemplateObject(["\n  padding: 10px 20px;\n  border: none;\n  border-radius: 8px;\n  cursor: pointer;\n  font-weight: 500;\n  font-size: 14px;\n  transition: all 0.2s ease;\n  margin-right: 10px;\n  margin-bottom: 10px;\n  \n  ", "\n"], ["\n  padding: 10px 20px;\n  border: none;\n  border-radius: 8px;\n  cursor: pointer;\n  font-weight: 500;\n  font-size: 14px;\n  transition: all 0.2s ease;\n  margin-right: 10px;\n  margin-bottom: 10px;\n  \n  ", "\n"])), function (props) {
    switch (props.variant) {
        case 'primary':
            return "\n          background: #3b82f6;\n          color: white;\n          &:hover { background: #2563eb; transform: translateY(-2px); }\n        ";
        case 'success':
            return "\n          background: #10b981;\n          color: white;\n          &:hover { background: #059669; transform: translateY(-2px); }\n        ";
        case 'warning':
            return "\n          background: #f59e0b;\n          color: white;\n          &:hover { background: #d97706; transform: translateY(-2px); }\n        ";
        case 'info':
            return "\n          background: #06b6d4;\n          color: white;\n          &:hover { background: #0891b2; transform: translateY(-2px); }\n        ";
        default:
            return "\n          background: #6b7280;\n          color: white;\n          &:hover { background: #4b5563; transform: translateY(-2px); }\n        ";
    }
});
var OrdersSection = styled_components_1.default.div(templateObject_14 || (templateObject_14 = __makeTemplateObject(["\n  background: rgba(30, 41, 59, 0.95);\n  border: 2px solid rgba(255, 255, 255, 0.2);\n  border-radius: 12px;\n  padding: 25px;\n  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);\n  backdrop-filter: blur(20px);\n"], ["\n  background: rgba(30, 41, 59, 0.95);\n  border: 2px solid rgba(255, 255, 255, 0.2);\n  border-radius: 12px;\n  padding: 25px;\n  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);\n  backdrop-filter: blur(20px);\n"])));
var OrderCard = styled_components_1.default.div(templateObject_15 || (templateObject_15 = __makeTemplateObject(["\n  background: rgba(255, 255, 255, 0.1);\n  border: 1px solid rgba(255, 255, 255, 0.2);\n  border-radius: 8px;\n  padding: 20px;\n  margin-bottom: 15px;\n  backdrop-filter: blur(10px);\n"], ["\n  background: rgba(255, 255, 255, 0.1);\n  border: 1px solid rgba(255, 255, 255, 0.2);\n  border-radius: 8px;\n  padding: 20px;\n  margin-bottom: 15px;\n  backdrop-filter: blur(10px);\n"])));
var OrderHeader = styled_components_1.default.div(templateObject_16 || (templateObject_16 = __makeTemplateObject(["\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 15px;\n"], ["\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 15px;\n"])));
var OrderId = styled_components_1.default.span(templateObject_17 || (templateObject_17 = __makeTemplateObject(["\n  font-weight: 600;\n  color: #ffffff;\n  font-size: 16px;\n"], ["\n  font-weight: 600;\n  color: #ffffff;\n  font-size: 16px;\n"])));
var OrderDate = styled_components_1.default.span(templateObject_18 || (templateObject_18 = __makeTemplateObject(["\n  color: rgba(255, 255, 255, 0.8);\n  font-size: 14px;\n"], ["\n  color: rgba(255, 255, 255, 0.8);\n  font-size: 14px;\n"])));
var OrderDetails = styled_components_1.default.div(templateObject_19 || (templateObject_19 = __makeTemplateObject(["\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n"], ["\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n"])));
var OrderAmount = styled_components_1.default.div(templateObject_20 || (templateObject_20 = __makeTemplateObject(["\n  font-size: 18px;\n  font-weight: 700;\n  color: #059669;\n"], ["\n  font-size: 18px;\n  font-weight: 700;\n  color: #059669;\n"])));
var OrderStatus = styled_components_1.default.span(templateObject_21 || (templateObject_21 = __makeTemplateObject(["\n  padding: 6px 12px;\n  border-radius: 20px;\n  font-size: 12px;\n  font-weight: 500;\n  \n  ", "\n"], ["\n  padding: 6px 12px;\n  border-radius: 20px;\n  font-size: 12px;\n  font-weight: 500;\n  \n  ", "\n"])), function (props) {
    switch (props.$status) {
        case 'pending':
            return "\n          background: #fef3c7;\n          color: #92400e;\n        ";
        case 'completed':
            return "\n          background: #d1fae5;\n          color: #065f46;\n        ";
        case 'cancelled':
            return "\n          background: #fee2e2;\n          color: #991b1b;\n        ";
        default:
            return "\n          background: #f3f4f6;\n          color: #374151;\n        ";
    }
});
var Modal = styled_components_1.default.div(templateObject_22 || (templateObject_22 = __makeTemplateObject(["\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(0, 0, 0, 0.5);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 9999;\n"], ["\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(0, 0, 0, 0.5);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 9999;\n"])));
var ModalContent = styled_components_1.default.div(templateObject_23 || (templateObject_23 = __makeTemplateObject(["\n  background: rgba(30, 41, 59, 0.98);\n  padding: 30px;\n  border-radius: 12px;\n  width: 90%;\n  max-width: 500px;\n  text-align: center;\n  border: 2px solid rgba(255, 255, 255, 0.2);\n  backdrop-filter: blur(25px);\n"], ["\n  background: rgba(30, 41, 59, 0.98);\n  padding: 30px;\n  border-radius: 12px;\n  width: 90%;\n  max-width: 500px;\n  text-align: center;\n  border: 2px solid rgba(255, 255, 255, 0.2);\n  backdrop-filter: blur(25px);\n"])));
var ModalTitle = styled_components_1.default.h3(templateObject_24 || (templateObject_24 = __makeTemplateObject(["\n  color: #ffffff;\n  margin: 0 0 20px 0;\n"], ["\n  color: #ffffff;\n  margin: 0 0 20px 0;\n"])));
var Form = styled_components_1.default.div(templateObject_25 || (templateObject_25 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  gap: 15px;\n  align-items: center;\n"], ["\n  display: flex;\n  flex-direction: column;\n  gap: 15px;\n  align-items: center;\n"])));
var InputGroup = styled_components_1.default.div(templateObject_26 || (templateObject_26 = __makeTemplateObject(["\n  display: flex;\n  gap: 10px;\n  align-items: center;\n"], ["\n  display: flex;\n  gap: 10px;\n  align-items: center;\n"])));
var Input = styled_components_1.default.input(templateObject_27 || (templateObject_27 = __makeTemplateObject(["\n  width: 100px;\n  padding: 8px 12px;\n  border: 1px solid rgba(255, 255, 255, 0.3);\n  border-radius: 6px;\n  font-size: 14px;\n  text-align: center;\n  background: rgba(255, 255, 255, 0.1);\n  color: #ffffff;\n  \n  &:focus {\n    outline: none;\n    border-color: #3b82f6;\n    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);\n  }\n  \n  &::placeholder {\n    color: rgba(255, 255, 255, 0.6);\n  }\n"], ["\n  width: 100px;\n  padding: 8px 12px;\n  border: 1px solid rgba(255, 255, 255, 0.3);\n  border-radius: 6px;\n  font-size: 14px;\n  text-align: center;\n  background: rgba(255, 255, 255, 0.1);\n  color: #ffffff;\n  \n  &:focus {\n    outline: none;\n    border-color: #3b82f6;\n    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);\n  }\n  \n  &::placeholder {\n    color: rgba(255, 255, 255, 0.6);\n  }\n"])));
var ButtonGroup = styled_components_1.default.div(templateObject_28 || (templateObject_28 = __makeTemplateObject(["\n  display: flex;\n  gap: 10px;\n  justify-content: center;\n"], ["\n  display: flex;\n  gap: 10px;\n  justify-content: center;\n"])));
var UserDetailPage = function () {
    var id = (0, react_router_dom_1.useParams)().id;
    var navigate = (0, react_router_dom_1.useNavigate)();
    var _a = (0, react_1.useState)(null), user = _a[0], setUser = _a[1];
    var _b = (0, react_1.useState)([]), orders = _b[0], setOrders = _b[1];
    var _c = (0, react_1.useState)(true), loading = _c[0], setLoading = _c[1];
    var _d = (0, react_1.useState)(false), ordersLoading = _d[0], setOrdersLoading = _d[1];
    var _e = (0, react_1.useState)(false), showBonusModal = _e[0], setShowBonusModal = _e[1];
    var _f = (0, react_1.useState)(''), bonusAmount = _f[0], setBonusAmount = _f[1];
    var _g = (0, react_1.useState)('add'), bonusAction = _g[0], setBonusAction = _g[1];
    (0, react_1.useEffect)(function () {
        if (id && !isNaN(parseInt(id))) {
            fetchUser();
            fetchUserOrders();
        }
        else {
            setLoading(false);
            setUser(null);
        }
    }, [id]);
    var fetchUser = function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, foundUser, ordersResponse, error_1, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 8, 9, 10]);
                    return [4 /*yield*/, axios_1.default.get('http://localhost:5000/api/admin/users', {
                            headers: {
                                'Authorization': "Bearer ".concat(localStorage.getItem('adminToken'))
                            }
                        })];
                case 1:
                    response = _a.sent();
                    foundUser = response.data.find(function (user) { return user.id === parseInt(id || '0'); });
                    if (!foundUser) return [3 /*break*/, 6];
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, axios_1.default.get("http://localhost:5000/api/admin/user/".concat(foundUser.id, "/orders"), {
                            headers: {
                                'Authorization': "Bearer ".concat(localStorage.getItem('adminToken'))
                            }
                        })];
                case 3:
                    ordersResponse = _a.sent();
                    // console.log('Orders response:', ordersResponse.data); // Отладочная информация
                    foundUser.orders_count = ordersResponse.data.length;
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    // console.log('Error fetching orders:', error); // Отладочная информация
                    foundUser.orders_count = 0;
                    return [3 /*break*/, 5];
                case 5:
                    setUser(foundUser);
                    return [3 /*break*/, 7];
                case 6:
                    setUser(null);
                    _a.label = 7;
                case 7: return [3 /*break*/, 10];
                case 8:
                    error_2 = _a.sent();
                    console.error('Error fetching user:', error_2);
                    react_hot_toast_1.default.error('Ошибка загрузки пользователя');
                    setUser(null);
                    return [3 /*break*/, 10];
                case 9:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 10: return [2 /*return*/];
            }
        });
    }); };
    var fetchUserOrders = function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!id)
                        return [2 /*return*/];
                    setOrdersLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, axios_1.default.get("http://localhost:5000/api/admin/user/".concat(id, "/orders"), {
                            headers: {
                                'Authorization': "Bearer ".concat(localStorage.getItem('adminToken'))
                            }
                        })];
                case 2:
                    response = _a.sent();
                    // console.log('fetchUserOrders response:', response.data); // Отладочная информация
                    setOrders(response.data);
                    return [3 /*break*/, 5];
                case 3:
                    error_3 = _a.sent();
                    console.error('Error fetching user orders:', error_3);
                    // Не показываем ошибку, если пользователь не найден - просто пустой список заказов
                    setOrders([]);
                    return [3 /*break*/, 5];
                case 4:
                    setOrdersLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var getUserStatus = function (ordersCount) {
        if (ordersCount >= 2)
            return 'regular';
        if (ordersCount === 1)
            return 'client';
        return 'new';
    };
    var getUserStatusText = function (ordersCount) {
        if (ordersCount >= 2)
            return '💎 Постоянный клиент';
        if (ordersCount === 1)
            return '⭐ Клиент';
        return '🌟 Новый пользователь';
    };
    var handleBonusClick = function (action) {
        setBonusAction(action);
        setBonusAmount('');
        setShowBonusModal(true);
    };
    var handleBonusSubmit = function () { return __awaiter(void 0, void 0, void 0, function () {
        var points, endpoint, reason, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!user || !bonusAmount)
                        return [2 /*return*/];
                    points = parseInt(bonusAmount);
                    if (!points || points <= 0) {
                        react_hot_toast_1.default.error('Введите корректное количество бонусов');
                        return [2 /*return*/];
                    }
                    // Проверяем, что у пользователя достаточно бонусов для списания
                    if (bonusAction === 'deduct' && user.bonus_points < points) {
                        react_hot_toast_1.default.error('Недостаточно бонусов для списания');
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    endpoint = bonusAction === 'add' ? '/api/admin/bonus/add' : '/api/admin/bonus/deduct';
                    reason = bonusAction === 'add' ? 'Бонус от администратора' : 'Списание администратором';
                    return [4 /*yield*/, axios_1.default.post("http://localhost:5000".concat(endpoint), {
                            userId: user.id,
                            points: points,
                            reason: reason
                        }, {
                            headers: {
                                'Authorization': "Bearer ".concat(localStorage.getItem('adminToken'))
                            }
                        })];
                case 2:
                    _a.sent();
                    react_hot_toast_1.default.success("".concat(bonusAction === 'add' ? 'Начислено' : 'Списано', " ").concat(points, " \u0431\u043E\u043D\u0443\u0441\u043E\u0432 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044E ").concat(user.name));
                    setShowBonusModal(false);
                    setBonusAmount('');
                    fetchUser(); // Обновляем данные пользователя
                    return [3 /*break*/, 4];
                case 3:
                    error_4 = _a.sent();
                    console.error('Error managing bonus:', error_4);
                    react_hot_toast_1.default.error("\u041E\u0448\u0438\u0431\u043A\u0430 ".concat(bonusAction === 'add' ? 'начисления' : 'списания', " \u0431\u043E\u043D\u0443\u0441\u043E\u0432"));
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var closeBonusModal = function () {
        setShowBonusModal(false);
        setBonusAmount('');
    };
    if (loading) {
        return ((0, jsx_runtime_1.jsx)(Container, { children: (0, jsx_runtime_1.jsx)("div", { style: { color: 'rgba(255, 255, 255, 0.8)' }, children: "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F..." }) }));
    }
    if (!user) {
        return ((0, jsx_runtime_1.jsx)(Container, { children: (0, jsx_runtime_1.jsxs)(Header, { children: [(0, jsx_runtime_1.jsx)(Title, { children: "\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D" }), (0, jsx_runtime_1.jsx)(BackButton, { onClick: function () { return navigate('/admin/dashboard?section=clients'); }, children: "\u2190 \u041D\u0430\u0437\u0430\u0434 \u043A \u0441\u043F\u0438\u0441\u043A\u0443 \u043A\u043B\u0438\u0435\u043D\u0442\u043E\u0432" })] }) }));
    }
    return ((0, jsx_runtime_1.jsxs)(Container, { children: [(0, jsx_runtime_1.jsxs)(Header, { children: [(0, jsx_runtime_1.jsxs)(Title, { children: ["\uD83D\uDC64 ", user.name, (0, jsx_runtime_1.jsx)(StatusBadge, { "$status": getUserStatus(user.orders_count), children: getUserStatusText(user.orders_count) })] }), (0, jsx_runtime_1.jsx)(BackButton, { onClick: function () { return navigate('/admin/dashboard?section=clients'); }, children: "\u2190 \u041D\u0430\u0437\u0430\u0434 \u043A \u0441\u043F\u0438\u0441\u043A\u0443 \u043A\u043B\u0438\u0435\u043D\u0442\u043E\u0432" })] }), (0, jsx_runtime_1.jsxs)(UserInfoCard, { children: [(0, jsx_runtime_1.jsx)(SectionTitle, { children: "\uD83D\uDCCB \u0418\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F \u043E \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435" }), (0, jsx_runtime_1.jsxs)(UserInfoGrid, { children: [(0, jsx_runtime_1.jsxs)(InfoItem, { children: [(0, jsx_runtime_1.jsx)(InfoLabel, { children: "ID \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F" }), (0, jsx_runtime_1.jsxs)(InfoValue, { children: ["#", user.id] })] }), (0, jsx_runtime_1.jsxs)(InfoItem, { children: [(0, jsx_runtime_1.jsx)(InfoLabel, { children: "\u0418\u043C\u044F" }), (0, jsx_runtime_1.jsx)(InfoValue, { children: user.name })] }), (0, jsx_runtime_1.jsxs)(InfoItem, { children: [(0, jsx_runtime_1.jsx)(InfoLabel, { children: "Email" }), (0, jsx_runtime_1.jsx)(InfoValue, { children: user.email })] }), (0, jsx_runtime_1.jsxs)(InfoItem, { children: [(0, jsx_runtime_1.jsx)(InfoLabel, { children: "\u0422\u0435\u043B\u0435\u0444\u043E\u043D" }), (0, jsx_runtime_1.jsx)(InfoValue, { children: user.phone || user.phone_number || user.telephone || 'Не указан' })] }), (0, jsx_runtime_1.jsxs)(InfoItem, { children: [(0, jsx_runtime_1.jsx)(InfoLabel, { children: "\u0414\u0430\u0442\u0430 \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u0438" }), (0, jsx_runtime_1.jsx)(InfoValue, { children: new Date(user.created_at).toLocaleDateString('ru-RU') })] }), (0, jsx_runtime_1.jsxs)(InfoItem, { children: [(0, jsx_runtime_1.jsx)(InfoLabel, { children: "\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0437\u0430\u043A\u0430\u0437\u043E\u0432" }), (0, jsx_runtime_1.jsx)(InfoValue, { children: user.orders_count || 0 })] }), (0, jsx_runtime_1.jsxs)(InfoItem, { children: [(0, jsx_runtime_1.jsx)(InfoLabel, { children: "\u0411\u043E\u043D\u0443\u0441\u043D\u044B\u0435 \u0431\u0430\u043B\u043B\u044B" }), (0, jsx_runtime_1.jsx)(InfoValue, { style: { color: '#f59e0b' }, children: user.bonus_points.toLocaleString() })] })] })] }), (0, jsx_runtime_1.jsxs)(ActionsSection, { children: [(0, jsx_runtime_1.jsx)(SectionTitle, { children: "\u2699\uFE0F \u0423\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u0431\u043E\u043D\u0443\u0441\u0430\u043C\u0438" }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(Button, { variant: "success", onClick: function () { return handleBonusClick('add'); }, children: "\u2795 \u041D\u0430\u0447\u0438\u0441\u043B\u0438\u0442\u044C \u0431\u043E\u043D\u0443\u0441\u044B" }), (0, jsx_runtime_1.jsx)(Button, { variant: "warning", onClick: function () { return handleBonusClick('deduct'); }, disabled: user.bonus_points === 0, children: "\u2796 \u0421\u043F\u0438\u0441\u0430\u0442\u044C \u0431\u043E\u043D\u0443\u0441\u044B" }), (0, jsx_runtime_1.jsx)(Button, { variant: "info", onClick: fetchUserOrders, children: "\uD83D\uDD04 \u041E\u0431\u043D\u043E\u0432\u0438\u0442\u044C \u0437\u0430\u043A\u0430\u0437\u044B" })] })] }), (0, jsx_runtime_1.jsxs)(OrdersSection, { children: [(0, jsx_runtime_1.jsx)(SectionTitle, { children: "\uD83D\uDCE6 \u0418\u0441\u0442\u043E\u0440\u0438\u044F \u0437\u0430\u043A\u0430\u0437\u043E\u0432" }), ordersLoading ? ((0, jsx_runtime_1.jsx)("div", { style: { color: 'rgba(255, 255, 255, 0.8)' }, children: "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430 \u0437\u0430\u043A\u0430\u0437\u043E\u0432..." })) : orders.length === 0 ? ((0, jsx_runtime_1.jsx)("div", { style: { textAlign: 'center', padding: '40px', color: 'rgba(255, 255, 255, 0.8)' }, children: "\u0423 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F \u043F\u043E\u043A\u0430 \u043D\u0435\u0442 \u0437\u0430\u043A\u0430\u0437\u043E\u0432" })) : ((0, jsx_runtime_1.jsx)("div", { children: orders.map(function (order) { return ((0, jsx_runtime_1.jsxs)(OrderCard, { children: [(0, jsx_runtime_1.jsxs)(OrderHeader, { children: [(0, jsx_runtime_1.jsxs)(OrderId, { children: ["\u0417\u0430\u043A\u0430\u0437 #", order.id] }), (0, jsx_runtime_1.jsx)(OrderDate, { children: new Date(order.created_at).toLocaleString('ru-RU') })] }), (0, jsx_runtime_1.jsxs)(OrderDetails, { children: [(0, jsx_runtime_1.jsxs)(OrderAmount, { children: [order.total_amount.toLocaleString(), " \u20BD"] }), (0, jsx_runtime_1.jsx)(OrderStatus, { "$status": order.status, children: order.status === 'pending' ? 'Ожидает' :
                                                order.status === 'completed' ? 'Завершен' :
                                                    order.status === 'cancelled' ? 'Отменен' : order.status })] })] }, order.id)); }) }))] }), showBonusModal && ((0, jsx_runtime_1.jsx)(Modal, { onClick: closeBonusModal, children: (0, jsx_runtime_1.jsxs)(ModalContent, { onClick: function (e) { return e.stopPropagation(); }, children: [(0, jsx_runtime_1.jsxs)(ModalTitle, { children: [bonusAction === 'add' ? 'Начислить бонусы' : 'Списать бонусы', " \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044E ", user.name] }), (0, jsx_runtime_1.jsxs)(Form, { children: [(0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsxs)("p", { style: { margin: '0 0 10px 0', color: 'rgba(255, 255, 255, 0.8)' }, children: ["\u0422\u0435\u043A\u0443\u0449\u0438\u0435 \u0431\u043E\u043D\u0443\u0441\u044B: ", (0, jsx_runtime_1.jsx)("strong", { style: { color: '#f59e0b' }, children: user.bonus_points.toLocaleString() })] }) }), (0, jsx_runtime_1.jsxs)(InputGroup, { children: [(0, jsx_runtime_1.jsx)("label", { style: { color: '#ffffff', fontWeight: '500' }, children: "\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0431\u043E\u043D\u0443\u0441\u043E\u0432:" }), (0, jsx_runtime_1.jsx)(Input, { type: "number", value: bonusAmount, onChange: function (e) { return setBonusAmount(e.target.value); }, placeholder: "0", min: "1" })] }), (0, jsx_runtime_1.jsxs)(ButtonGroup, { children: [(0, jsx_runtime_1.jsx)(Button, { variant: "secondary", onClick: closeBonusModal, children: "\u041E\u0442\u043C\u0435\u043D\u0430" }), (0, jsx_runtime_1.jsx)(Button, { variant: bonusAction === 'add' ? 'success' : 'warning', onClick: handleBonusSubmit, children: bonusAction === 'add' ? 'Начислить' : 'Списать' })] })] })] }) }))] }));
};
exports.default = UserDetailPage;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13, templateObject_14, templateObject_15, templateObject_16, templateObject_17, templateObject_18, templateObject_19, templateObject_20, templateObject_21, templateObject_22, templateObject_23, templateObject_24, templateObject_25, templateObject_26, templateObject_27, templateObject_28;
