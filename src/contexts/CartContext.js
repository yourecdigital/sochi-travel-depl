"use strict";
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
exports.CartProvider = exports.useCart = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var axios_1 = __importDefault(require("axios"));
var react_hot_toast_1 = __importDefault(require("react-hot-toast"));
var AuthContext_1 = require("./AuthContext");
var CartContext = (0, react_1.createContext)(undefined);
var useCart = function () {
    var context = (0, react_1.useContext)(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
exports.useCart = useCart;
var CartProvider = function (_a) {
    var children = _a.children;
    var _b = (0, react_1.useState)([]), cartItems = _b[0], setCartItems = _b[1];
    var _c = (0, react_1.useState)(false), loading = _c[0], setLoading = _c[1];
    var user = (0, AuthContext_1.useAuth)().user;
    var fetchCartItems = (0, react_1.useCallback)(function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!user)
                        return [2 /*return*/];
                    setLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, axios_1.default.get('http://localhost:5000/api/cart')];
                case 2:
                    response = _a.sent();
                    setCartItems(response.data);
                    return [3 /*break*/, 5];
                case 3:
                    error_1 = _a.sent();
                    console.error('Error fetching cart items:', error_1);
                    react_hot_toast_1.default.error('Ошибка загрузки корзины');
                    return [3 /*break*/, 5];
                case 4:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); }, [user]);
    // Fetch cart items when user changes
    (0, react_1.useEffect)(function () {
        if (user) {
            fetchCartItems();
        }
        else {
            setCartItems([]);
        }
    }, [user, fetchCartItems]);
    var addToCart = function (itemId_1, type_1, itemData_1) {
        var args_1 = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            args_1[_i - 3] = arguments[_i];
        }
        return __awaiter(void 0, __spreadArray([itemId_1, type_1, itemData_1], args_1, true), void 0, function (itemId, type, itemData, quantity) {
            var itemType, error_2, message;
            var _a, _b;
            if (quantity === void 0) { quantity = 1; }
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!user) {
                            react_hot_toast_1.default.error('Необходимо войти в систему');
                            return [2 /*return*/];
                        }
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 4, , 5]);
                        // Отправляем на сервер
                        return [4 /*yield*/, axios_1.default.post('http://localhost:5000/api/cart/add', {
                                itemId: itemId,
                                type: type,
                                quantity: quantity,
                                itemData: itemData
                            })];
                    case 2:
                        // Отправляем на сервер
                        _c.sent();
                        // Обновляем корзину с сервера
                        return [4 /*yield*/, fetchCartItems()];
                    case 3:
                        // Обновляем корзину с сервера
                        _c.sent();
                        itemType = 'Товар';
                        if (type === 'tour')
                            itemType = 'Тур';
                        else if (type === 'room')
                            itemType = 'Номер';
                        else if (type === 'foreign')
                            itemType = 'Зарубежный тур';
                        else if (type === 'cruise')
                            itemType = 'Круиз';
                        else if (type === 'service')
                            itemType = 'Услуга';
                        react_hot_toast_1.default.success("".concat(itemType, " \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D \u0432 \u043A\u043E\u0440\u0437\u0438\u043D\u0443"));
                        return [3 /*break*/, 5];
                    case 4:
                        error_2 = _c.sent();
                        message = ((_b = (_a = error_2.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.error) || 'Ошибка добавления в корзину';
                        react_hot_toast_1.default.error(message);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    var removeFromCart = function (cartItemId) { return __awaiter(void 0, void 0, void 0, function () {
        var error_3, message;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1.default.delete("http://localhost:5000/api/cart/".concat(cartItemId))];
                case 1:
                    _c.sent();
                    setCartItems(function (prev) { return prev.filter(function (item) { return item.id !== cartItemId; }); });
                    react_hot_toast_1.default.success('Товар удален из корзины');
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _c.sent();
                    message = ((_b = (_a = error_3.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.error) || 'Ошибка удаления из корзины';
                    react_hot_toast_1.default.error(message);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var clearCart = function () {
        setCartItems([]);
    };
    var getCartTotal = function () {
        return cartItems.reduce(function (total, item) { return total + (item.price * item.quantity); }, 0);
    };
    var getCartCount = function () {
        return cartItems.reduce(function (count, item) { return count + item.quantity; }, 0);
    };
    var value = {
        cartItems: cartItems,
        addToCart: addToCart,
        removeFromCart: removeFromCart,
        clearCart: clearCart,
        getCartTotal: getCartTotal,
        getCartCount: getCartCount,
        loading: loading
    };
    return ((0, jsx_runtime_1.jsx)(CartContext.Provider, { value: value, children: children }));
};
exports.CartProvider = CartProvider;
