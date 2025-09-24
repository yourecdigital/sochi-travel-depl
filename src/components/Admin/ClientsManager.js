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
var react_router_dom_1 = require("react-router-dom");
var styled_components_1 = __importDefault(require("styled-components"));
var axios_1 = __importDefault(require("axios"));
var react_hot_toast_1 = __importDefault(require("react-hot-toast"));
var Container = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  padding: 20px;\n"], ["\n  padding: 20px;\n"])));
var Header = styled_components_1.default.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 20px;\n"], ["\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 20px;\n"])));
var Title = styled_components_1.default.h2(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  color: #1e293b;\n  margin: 0;\n"], ["\n  color: #1e293b;\n  margin: 0;\n"])));
var StatsGrid = styled_components_1.default.div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 20px;\n  margin-bottom: 30px;\n"], ["\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 20px;\n  margin-bottom: 30px;\n"])));
var StatCard = styled_components_1.default.div(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  background: white;\n  border: 1px solid #e2e8f0;\n  border-radius: 8px;\n  padding: 20px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n"], ["\n  background: white;\n  border: 1px solid #e2e8f0;\n  border-radius: 8px;\n  padding: 20px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n"])));
var StatTitle = styled_components_1.default.h3(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  color: #64748b;\n  margin: 0 0 10px 0;\n  font-size: 14px;\n  font-weight: 500;\n"], ["\n  color: #64748b;\n  margin: 0 0 10px 0;\n  font-size: 14px;\n  font-weight: 500;\n"])));
var StatValue = styled_components_1.default.div(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  font-size: 24px;\n  font-weight: 700;\n  color: #1e293b;\n"], ["\n  font-size: 24px;\n  font-weight: 700;\n  color: #1e293b;\n"])));
var ClientsTable = styled_components_1.default.div(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n  background: white;\n  border: 1px solid #e2e8f0;\n  border-radius: 8px;\n  overflow: hidden;\n"], ["\n  background: white;\n  border: 1px solid #e2e8f0;\n  border-radius: 8px;\n  overflow: hidden;\n"])));
var TableHeader = styled_components_1.default.div(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n  background: #f8fafc;\n  padding: 15px 20px;\n  border-bottom: 1px solid #e2e8f0;\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr 100px 100px 120px;\n  gap: 20px;\n  font-weight: 600;\n  color: #374151;\n"], ["\n  background: #f8fafc;\n  padding: 15px 20px;\n  border-bottom: 1px solid #e2e8f0;\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr 100px 100px 120px;\n  gap: 20px;\n  font-weight: 600;\n  color: #374151;\n"])));
var TableRow = styled_components_1.default.div(templateObject_10 || (templateObject_10 = __makeTemplateObject(["\n  padding: 15px 20px;\n  border-bottom: 1px solid #f1f5f9;\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr 100px 100px 120px;\n  gap: 20px;\n  align-items: center;\n  \n  &:last-child {\n    border-bottom: none;\n  }\n  \n  &:hover {\n    background: #f8fafc;\n  }\n"], ["\n  padding: 15px 20px;\n  border-bottom: 1px solid #f1f5f9;\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr 100px 100px 120px;\n  gap: 20px;\n  align-items: center;\n  \n  &:last-child {\n    border-bottom: none;\n  }\n  \n  &:hover {\n    background: #f8fafc;\n  }\n"])));
var Button = styled_components_1.default.button(templateObject_11 || (templateObject_11 = __makeTemplateObject(["\n  padding: 6px 12px;\n  border: none;\n  border-radius: 6px;\n  cursor: pointer;\n  font-weight: 500;\n  font-size: 12px;\n  transition: all 0.2s ease;\n  \n  ", "\n"], ["\n  padding: 6px 12px;\n  border: none;\n  border-radius: 6px;\n  cursor: pointer;\n  font-weight: 500;\n  font-size: 12px;\n  transition: all 0.2s ease;\n  \n  ", "\n"])), function (props) {
    switch (props.variant) {
        case 'primary':
            return "\n          background: #3b82f6;\n          color: white;\n          &:hover { background: #2563eb; }\n        ";
        case 'info':
            return "\n          background: #06b6d4;\n          color: white;\n          &:hover { background: #0891b2; }\n        ";
        case 'success':
            return "\n          background: #10b981;\n          color: white;\n          &:hover { background: #059669; }\n        ";
        case 'warning':
            return "\n          background: #f59e0b;\n          color: white;\n          &:hover { background: #d97706; }\n        ";
        default:
            return "\n          background: #6b7280;\n          color: white;\n          &:hover { background: #4b5563; }\n        ";
    }
});
var StatusBadge = styled_components_1.default.span(templateObject_12 || (templateObject_12 = __makeTemplateObject(["\n  padding: 4px 8px;\n  border-radius: 12px;\n  font-size: 12px;\n  font-weight: 500;\n  \n  ", "\n"], ["\n  padding: 4px 8px;\n  border-radius: 12px;\n  font-size: 12px;\n  font-weight: 500;\n  \n  ", "\n"])), function (props) {
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
var ClientsManager = function () {
    var navigate = (0, react_router_dom_1.useNavigate)();
    var _a = (0, react_1.useState)([]), users = _a[0], setUsers = _a[1];
    var _b = (0, react_1.useState)(true), loading = _b[0], setLoading = _b[1];
    (0, react_1.useEffect)(function () {
        fetchUsers();
    }, []);
    var fetchUsers = function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, usersWithOrders, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, 4, 5]);
                    return [4 /*yield*/, axios_1.default.get('http://localhost:5000/api/admin/users', {
                            headers: {
                                'Authorization': "Bearer ".concat(localStorage.getItem('adminToken'))
                            }
                        })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, Promise.all(response.data.map(function (user) { return __awaiter(void 0, void 0, void 0, function () {
                            var ordersResponse, error_2;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        _a.trys.push([0, 2, , 3]);
                                        return [4 /*yield*/, axios_1.default.get("http://localhost:5000/api/admin/user/".concat(user.id, "/orders"), {
                                                headers: {
                                                    'Authorization': "Bearer ".concat(localStorage.getItem('adminToken'))
                                                }
                                            })];
                                    case 1:
                                        ordersResponse = _a.sent();
                                        return [2 /*return*/, __assign(__assign({}, user), { orders_count: ordersResponse.data.length })];
                                    case 2:
                                        error_2 = _a.sent();
                                        return [2 /*return*/, __assign(__assign({}, user), { orders_count: 0 })];
                                    case 3: return [2 /*return*/];
                                }
                            });
                        }); }))];
                case 2:
                    usersWithOrders = _a.sent();
                    setUsers(usersWithOrders);
                    return [3 /*break*/, 5];
                case 3:
                    error_1 = _a.sent();
                    console.error('Error fetching users:', error_1);
                    react_hot_toast_1.default.error('Ошибка загрузки клиентов');
                    return [3 /*break*/, 5];
                case 4:
                    setLoading(false);
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
    var handleViewUser = function (user) {
        navigate("/admin/user/".concat(user.id));
    };
    var totalUsers = users.length;
    var newUsers = users.filter(function (user) { return getUserStatus(user.orders_count) === 'new'; }).length;
    var clients = users.filter(function (user) { return getUserStatus(user.orders_count) === 'client'; }).length;
    var regularClients = users.filter(function (user) { return getUserStatus(user.orders_count) === 'regular'; }).length;
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(Container, { children: [(0, jsx_runtime_1.jsx)(Title, { children: "\u0423\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u043A\u043B\u0438\u0435\u043D\u0442\u0430\u043C\u0438" }), (0, jsx_runtime_1.jsx)("div", { children: "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430..." })] }));
    }
    return ((0, jsx_runtime_1.jsxs)(Container, { children: [(0, jsx_runtime_1.jsx)(Header, { children: (0, jsx_runtime_1.jsx)(Title, { children: "\uD83D\uDC65 \u0423\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u043A\u043B\u0438\u0435\u043D\u0442\u0430\u043C\u0438" }) }), (0, jsx_runtime_1.jsxs)(StatsGrid, { children: [(0, jsx_runtime_1.jsxs)(StatCard, { children: [(0, jsx_runtime_1.jsx)(StatTitle, { children: "\u0412\u0441\u0435\u0433\u043E \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u0439" }), (0, jsx_runtime_1.jsx)(StatValue, { children: totalUsers })] }), (0, jsx_runtime_1.jsxs)(StatCard, { children: [(0, jsx_runtime_1.jsx)(StatTitle, { children: "\u041D\u043E\u0432\u044B\u0445 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u0439" }), (0, jsx_runtime_1.jsx)(StatValue, { children: newUsers })] }), (0, jsx_runtime_1.jsxs)(StatCard, { children: [(0, jsx_runtime_1.jsx)(StatTitle, { children: "\u041A\u043B\u0438\u0435\u043D\u0442\u043E\u0432" }), (0, jsx_runtime_1.jsx)(StatValue, { children: clients })] }), (0, jsx_runtime_1.jsxs)(StatCard, { children: [(0, jsx_runtime_1.jsx)(StatTitle, { children: "\u041F\u043E\u0441\u0442\u043E\u044F\u043D\u043D\u044B\u0445 \u043A\u043B\u0438\u0435\u043D\u0442\u043E\u0432" }), (0, jsx_runtime_1.jsx)(StatValue, { children: regularClients })] })] }), (0, jsx_runtime_1.jsxs)(ClientsTable, { children: [(0, jsx_runtime_1.jsxs)(TableHeader, { children: [(0, jsx_runtime_1.jsx)("div", { children: "\u0418\u043C\u044F" }), (0, jsx_runtime_1.jsx)("div", { children: "Email" }), (0, jsx_runtime_1.jsx)("div", { children: "\u0422\u0435\u043B\u0435\u0444\u043E\u043D" }), (0, jsx_runtime_1.jsx)("div", { children: "\u0414\u0430\u0442\u0430 \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u0438" }), (0, jsx_runtime_1.jsx)("div", { children: "\u0411\u043E\u043D\u0443\u0441\u044B" }), (0, jsx_runtime_1.jsx)("div", { children: "\u0417\u0430\u043A\u0430\u0437\u044B" }), (0, jsx_runtime_1.jsx)("div", { children: "\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u044F" })] }), users.map(function (user) { return ((0, jsx_runtime_1.jsxs)(TableRow, { children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("div", { style: { fontWeight: '600' }, children: user.name }), (0, jsx_runtime_1.jsx)("div", { style: { fontSize: '12px', color: '#64748b' }, children: (0, jsx_runtime_1.jsx)(StatusBadge, { "$status": getUserStatus(user.orders_count), children: getUserStatusText(user.orders_count) }) })] }), (0, jsx_runtime_1.jsx)("div", { children: user.email }), (0, jsx_runtime_1.jsx)("div", { style: {
                                    color: user.phone ? '#1e293b' : '#64748b',
                                    fontStyle: user.phone ? 'normal' : 'italic'
                                }, children: user.phone || user.phone_number || user.telephone || 'Не указан' }), (0, jsx_runtime_1.jsx)("div", { children: new Date(user.created_at).toLocaleDateString() }), (0, jsx_runtime_1.jsx)("div", { style: {
                                    color: user.bonus_points > 0 ? '#f59e0b' : '#64748b',
                                    fontWeight: '600'
                                }, children: user.bonus_points.toLocaleString() }), (0, jsx_runtime_1.jsx)("div", { style: {
                                    color: user.orders_count > 0 ? '#059669' : '#64748b',
                                    fontWeight: '600'
                                }, children: user.orders_count }), (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(Button, { variant: "primary", onClick: function () { return handleViewUser(user); }, children: "\uD83D\uDC64 \u041E\u0442\u043A\u0440\u044B\u0442\u044C \u043F\u0440\u043E\u0444\u0438\u043B\u044C" }) })] }, user.id)); })] })] }));
};
exports.default = ClientsManager;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12;
