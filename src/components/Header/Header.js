"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var AuthContext_1 = require("../../contexts/AuthContext");
var CartContext_1 = require("../../contexts/CartContext");
var CartWidget_1 = __importDefault(require("../CartWidget/CartWidget"));
var BonusDisplay_1 = __importDefault(require("../BonusDisplay/BonusDisplay"));
require("./Header.css");
var Header = function () {
    var _a = (0, react_1.useState)(false), isMenuOpen = _a[0], setIsMenuOpen = _a[1];
    var location = (0, react_router_dom_1.useLocation)();
    var navigate = (0, react_router_dom_1.useNavigate)();
    var _b = (0, AuthContext_1.useAuth)(), user = _b.user, logout = _b.logout;
    var getCartCount = (0, CartContext_1.useCart)().getCartCount;
    // Функция для вычисления высоты header и установки CSS custom property
    var updateHeaderHeight = function () {
        var header = document.querySelector('.header');
        if (header) {
            var headerHeight = header.offsetHeight;
            var heroPaddingTop = headerHeight + 20; // +20px для дополнительного пространства
            // Устанавливаем CSS custom property
            document.documentElement.style.setProperty('--header-height', "".concat(headerHeight, "px"));
            document.documentElement.style.setProperty('--hero-padding-top', "".concat(heroPaddingTop, "px"));
        }
    };
    // Вызываем функцию при монтировании и изменении размера окна
    (0, react_1.useEffect)(function () {
        updateHeaderHeight();
        var handleResize = function () {
            updateHeaderHeight();
        };
        window.addEventListener('resize', handleResize);
        return function () {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    var toggleMenu = function () {
        setIsMenuOpen(!isMenuOpen);
    };
    var closeMenu = function () {
        setIsMenuOpen(false);
    };
    var isActive = function (path) {
        return location.pathname === path;
    };
    var handleLogout = function () {
        logout();
        closeMenu();
        navigate('/');
    };
    return ((0, jsx_runtime_1.jsx)("header", { className: "header", children: (0, jsx_runtime_1.jsxs)("div", { className: "header-container", children: [(0, jsx_runtime_1.jsx)("div", { className: "logo", children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.Link, { to: "/", onClick: closeMenu, children: [(0, jsx_runtime_1.jsx)("h1", { children: "\u0421\u043E\u0447\u0438\u0422\u0443\u0440" }), (0, jsx_runtime_1.jsx)("span", { children: "\u041B\u0443\u0447\u0448\u0438\u0435 \u0442\u0443\u0440\u044B \u0432 \u0421\u043E\u0447\u0438" })] }) }), (0, jsx_runtime_1.jsxs)("nav", { className: "nav ".concat(isMenuOpen ? 'nav-open' : ''), children: [(0, jsx_runtime_1.jsxs)("ul", { className: "nav-list", children: [(0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/", className: isActive('/') ? 'active' : '', onClick: closeMenu, children: "\u0413\u043B\u0430\u0432\u043D\u0430\u044F" }) }), (0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/tours", className: isActive('/tours') ? 'active' : '', onClick: closeMenu, children: "\u0422\u0443\u0440\u044B" }) }), (0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/hotels", className: isActive('/hotels') ? 'active' : '', onClick: closeMenu, children: "\u041E\u0442\u0435\u043B\u0438" }) }), (0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/foreign", className: isActive('/foreign') ? 'active' : '', onClick: closeMenu, children: "\u0417\u0430\u0440\u0443\u0431\u0435\u0436" }) }), (0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/cruises", className: isActive('/cruises') ? 'active' : '', onClick: closeMenu, children: "\u041A\u0440\u0443\u0438\u0437\u044B" }) }), (0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/services", className: isActive('/services') ? 'active' : '', onClick: closeMenu, children: "\u0423\u0441\u043B\u0443\u0433\u0438" }) }), (0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/promotions", className: isActive('/promotions') ? 'active' : '', onClick: closeMenu, children: "\u0410\u043A\u0446\u0438\u0438" }) }), (0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/contact", className: isActive('/contact') ? 'active' : '', onClick: closeMenu, children: "\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u044B" }) })] }), (0, jsx_runtime_1.jsx)("div", { className: "mobile-auth-actions", children: user ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(BonusDisplay_1.default, {}), (0, jsx_runtime_1.jsxs)(react_router_dom_1.Link, { to: "/cart", className: "cart-button", onClick: closeMenu, children: ["\uD83D\uDED2 \u041A\u043E\u0440\u0437\u0438\u043D\u0430", getCartCount() > 0 && ((0, jsx_runtime_1.jsx)("span", { className: "cart-count", children: getCartCount() }))] }), (0, jsx_runtime_1.jsxs)(react_router_dom_1.Link, { to: "/profile", className: "profile-button", onClick: closeMenu, children: ["\uD83D\uDC64 ", user.name] }), (0, jsx_runtime_1.jsx)("button", { className: "logout-button", onClick: handleLogout, children: "\u0412\u044B\u0439\u0442\u0438" })] })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/login", className: "auth-button login", onClick: closeMenu, children: "\u0412\u043E\u0439\u0442\u0438" }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/register", className: "auth-button register", onClick: closeMenu, children: "\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044F" })] })) })] }), (0, jsx_runtime_1.jsx)("div", { className: "header-actions", children: user ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(BonusDisplay_1.default, {}), (0, jsx_runtime_1.jsx)(CartWidget_1.default, {}), (0, jsx_runtime_1.jsxs)(react_router_dom_1.Link, { to: "/profile", className: "profile-button", onClick: closeMenu, children: ["\uD83D\uDC64 ", user.name] }), (0, jsx_runtime_1.jsx)("button", { className: "logout-button", onClick: handleLogout, children: "\u0412\u044B\u0439\u0442\u0438" })] })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/login", className: "auth-button login", onClick: closeMenu, children: "\u0412\u043E\u0439\u0442\u0438" }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/register", className: "auth-button register", onClick: closeMenu, children: "\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044F" })] })) }), (0, jsx_runtime_1.jsx)("button", { className: "mobile-menu-btn", onClick: toggleMenu, children: isMenuOpen ? '✕' : '☰' })] }) }));
};
exports.default = Header;
