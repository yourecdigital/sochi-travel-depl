"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
require("./TopDestinationsSection.css");
var TopDestinationsSection = function () {
    var destinations = [
        {
            id: 1,
            name: "Сочи",
            description: "Столица летних Олимпийских игр 2014 года",
            image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
            rating: 4.9,
            reviews: 1250,
            tours: 45,
            price: "от 15 000 ₽",
            features: ["Пляжи", "Олимпийский парк", "Курортный проспект"]
        },
        {
            id: 2,
            name: "Красная Поляна",
            description: "Горнолыжный курорт мирового уровня",
            image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
            rating: 4.8,
            reviews: 890,
            tours: 32,
            price: "от 25 000 ₽",
            features: ["Горные лыжи", "Канатные дороги", "Экстремальный спорт"]
        },
        {
            id: 3,
            name: "Абхазия",
            description: "Загадочная страна с древней историей",
            image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
            rating: 4.7,
            reviews: 756,
            tours: 28,
            price: "от 12 000 ₽",
            features: ["Новый Афон", "Пицунда", "Гагры"]
        },
        {
            id: 4,
            name: "Зарубежные туры",
            description: "Путешествия по всему миру",
            image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
            rating: 4.9,
            reviews: 2100,
            tours: 120,
            price: "от 50 000 ₽",
            features: ["Европа", "Азия", "Америка"]
        }
    ];
    return ((0, jsx_runtime_1.jsx)("section", { className: "destinations-section", children: (0, jsx_runtime_1.jsxs)("div", { className: "container", children: [(0, jsx_runtime_1.jsxs)("div", { className: "section-header", children: [(0, jsx_runtime_1.jsx)("h2", { children: "\u041F\u043E\u043F\u0443\u043B\u044F\u0440\u043D\u044B\u0435 \u043D\u0430\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u044F" }), (0, jsx_runtime_1.jsx)("p", { children: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0438\u0434\u0435\u0430\u043B\u044C\u043D\u043E\u0435 \u043C\u0435\u0441\u0442\u043E \u0434\u043B\u044F \u0432\u0430\u0448\u0435\u0433\u043E \u043E\u0442\u0434\u044B\u0445\u0430" })] }), (0, jsx_runtime_1.jsx)("div", { className: "destinations-grid", children: destinations.map(function (destination) { return ((0, jsx_runtime_1.jsxs)("div", { className: "destination-card", children: [(0, jsx_runtime_1.jsxs)("div", { className: "destination-image", children: [(0, jsx_runtime_1.jsx)("img", { src: destination.image, alt: destination.name }), (0, jsx_runtime_1.jsx)("div", { className: "destination-overlay", children: (0, jsx_runtime_1.jsx)("button", { className: "btn btn-primary", children: "\u041F\u043E\u0434\u0440\u043E\u0431\u043D\u0435\u0435" }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "destination-content", children: [(0, jsx_runtime_1.jsx)("h3", { children: destination.name }), (0, jsx_runtime_1.jsx)("p", { children: destination.description }), (0, jsx_runtime_1.jsxs)("div", { className: "destination-stats", children: [(0, jsx_runtime_1.jsxs)("div", { className: "stat", children: ["\u2B50", (0, jsx_runtime_1.jsxs)("span", { children: [destination.rating, " (", destination.reviews, ")"] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "stat", children: ["\uD83D\uDC65", (0, jsx_runtime_1.jsxs)("span", { children: [destination.tours, " \u0442\u0443\u0440\u043E\u0432"] })] })] }), (0, jsx_runtime_1.jsx)("div", { className: "destination-features", children: destination.features.map(function (feature, index) { return ((0, jsx_runtime_1.jsx)("span", { className: "feature-tag", children: feature }, index)); }) }), (0, jsx_runtime_1.jsxs)("div", { className: "destination-footer", children: [(0, jsx_runtime_1.jsx)("span", { className: "price", children: destination.price }), (0, jsx_runtime_1.jsx)("button", { className: "btn btn-secondary", children: "\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u0442\u0443\u0440" })] })] })] }, destination.id)); }) }), (0, jsx_runtime_1.jsx)("div", { className: "destinations-cta", children: (0, jsx_runtime_1.jsxs)("div", { className: "cta-content", children: [(0, jsx_runtime_1.jsx)("h3", { children: "\u0425\u043E\u0442\u0438\u0442\u0435 \u0443\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u043E \u043D\u0430\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u044F\u0445?" }), (0, jsx_runtime_1.jsx)("p", { children: "\u041D\u0430\u0448\u0438 \u044D\u043A\u0441\u043F\u0435\u0440\u0442\u044B \u0440\u0430\u0441\u0441\u043A\u0430\u0436\u0443\u0442 \u043E \u043A\u0430\u0436\u0434\u043E\u043C \u043A\u0443\u0440\u043E\u0440\u0442\u0435 \u0438 \u043F\u043E\u043C\u043E\u0433\u0443\u0442 \u0432\u044B\u0431\u0440\u0430\u0442\u044C \u043B\u0443\u0447\u0448\u0438\u0439 \u0432\u0430\u0440\u0438\u0430\u043D\u0442" }), (0, jsx_runtime_1.jsxs)("div", { className: "cta-buttons", children: [(0, jsx_runtime_1.jsx)("button", { className: "btn btn-primary", children: "\u041F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u043A\u043E\u043D\u0441\u0443\u043B\u044C\u0442\u0430\u0446\u0438\u044E" }), (0, jsx_runtime_1.jsx)("button", { className: "btn btn-outline", children: "\u0421\u043A\u0430\u0447\u0430\u0442\u044C \u043A\u0430\u0442\u0430\u043B\u043E\u0433" })] })] }) })] }) }));
};
exports.default = TopDestinationsSection;
