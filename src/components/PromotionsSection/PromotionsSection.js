"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
require("./PromotionsSection.css");
var PromotionsSection = function () {
    var promotions = [
        {
            id: 1,
            title: "Сочи + Красная Поляна",
            description: "Комбинированный тур: пляжный отдых + горнолыжный курорт",
            price: 31500,
            oldPrice: 45000,
            discount: 30,
            image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
            duration: "7 дней",
            location: "Сочи, Красная Поляна",
            rating: 4.9,
            reviews: 127,
            hot: true
        },
        {
            id: 2,
            title: "Абхазия - Новый Афон",
            description: "Экскурсионный тур с посещением пещер и монастыря",
            price: 18500,
            oldPrice: 25000,
            discount: 26,
            image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
            duration: "5 дней",
            location: "Абхазия",
            rating: 4.8,
            reviews: 89,
            hot: false
        },
        {
            id: 3,
            title: "VIP-тур по Сочи",
            description: "Премиум отдых с индивидуальным гидом и трансфером",
            price: 75000,
            oldPrice: 95000,
            discount: 21,
            image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
            duration: "10 дней",
            location: "Сочи",
            rating: 5.0,
            reviews: 45,
            hot: true
        }
    ];
    return ((0, jsx_runtime_1.jsx)("section", { className: "promotions-section", children: (0, jsx_runtime_1.jsxs)("div", { className: "container", children: [(0, jsx_runtime_1.jsxs)("div", { className: "section-header", children: [(0, jsx_runtime_1.jsx)("h2", { children: "\u0413\u043E\u0440\u044F\u0447\u0438\u0435 \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u044F" }), (0, jsx_runtime_1.jsx)("p", { children: "\u0423\u0441\u043F\u0435\u0439\u0442\u0435 \u0437\u0430\u0431\u0440\u043E\u043D\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043B\u0443\u0447\u0448\u0438\u0435 \u0442\u0443\u0440\u044B \u043F\u043E \u0432\u044B\u0433\u043E\u0434\u043D\u044B\u043C \u0446\u0435\u043D\u0430\u043C" })] }), (0, jsx_runtime_1.jsx)("div", { className: "promotions-grid", children: promotions.map(function (promo) { return ((0, jsx_runtime_1.jsxs)("div", { className: "promo-card ".concat(promo.hot ? 'hot' : ''), children: [promo.hot && ((0, jsx_runtime_1.jsxs)("div", { className: "hot-badge", children: ["\uD83D\uDD25", (0, jsx_runtime_1.jsx)("span", { children: "\u0413\u043E\u0440\u044F\u0447\u0435\u0435" })] })), (0, jsx_runtime_1.jsxs)("div", { className: "promo-image", children: [(0, jsx_runtime_1.jsx)("img", { src: promo.image, alt: promo.title }), (0, jsx_runtime_1.jsxs)("div", { className: "discount-badge", children: ["-", promo.discount, "%"] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "promo-content", children: [(0, jsx_runtime_1.jsx)("h3", { children: promo.title }), (0, jsx_runtime_1.jsx)("p", { children: promo.description }), (0, jsx_runtime_1.jsxs)("div", { className: "promo-details", children: [(0, jsx_runtime_1.jsxs)("div", { className: "detail", children: ["\uD83D\uDD50", (0, jsx_runtime_1.jsx)("span", { children: promo.duration })] }), (0, jsx_runtime_1.jsxs)("div", { className: "detail", children: ["\uD83D\uDCCD", (0, jsx_runtime_1.jsx)("span", { children: promo.location })] }), (0, jsx_runtime_1.jsxs)("div", { className: "detail", children: ["\u2B50", (0, jsx_runtime_1.jsxs)("span", { children: [promo.rating, " (", promo.reviews, ")"] })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "promo-price", children: [(0, jsx_runtime_1.jsxs)("span", { className: "old-price", children: [promo.oldPrice.toLocaleString(), " \u20BD"] }), (0, jsx_runtime_1.jsxs)("span", { className: "new-price", children: [promo.price.toLocaleString(), " \u20BD"] })] }), (0, jsx_runtime_1.jsx)("button", { className: "btn btn-primary", children: "\u0417\u0430\u0431\u0440\u043E\u043D\u0438\u0440\u043E\u0432\u0430\u0442\u044C" })] })] }, promo.id)); }) }), (0, jsx_runtime_1.jsxs)("div", { className: "promotions-cta", children: [(0, jsx_runtime_1.jsx)("h3", { children: "\u041D\u0435 \u043D\u0430\u0448\u043B\u0438 \u043F\u043E\u0434\u0445\u043E\u0434\u044F\u0449\u0438\u0439 \u0442\u0443\u0440?" }), (0, jsx_runtime_1.jsx)("p", { children: "\u041D\u0430\u0448\u0438 \u043C\u0435\u043D\u0435\u0434\u0436\u0435\u0440\u044B \u043F\u043E\u0434\u0431\u0435\u0440\u0443\u0442 \u0434\u043B\u044F \u0432\u0430\u0441 \u0438\u0434\u0435\u0430\u043B\u044C\u043D\u044B\u0439 \u0432\u0430\u0440\u0438\u0430\u043D\u0442" }), (0, jsx_runtime_1.jsx)("button", { className: "btn btn-secondary", children: "\u041F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u043A\u043E\u043D\u0441\u0443\u043B\u044C\u0442\u0430\u0446\u0438\u044E" })] })] }) }));
};
exports.default = PromotionsSection;
