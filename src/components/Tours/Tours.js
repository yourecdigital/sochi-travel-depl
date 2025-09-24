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
var CartContext_1 = require("../../contexts/CartContext");
var AuthContext_1 = require("../../contexts/AuthContext");
var react_router_dom_1 = require("react-router-dom");
var react_hot_toast_1 = __importDefault(require("react-hot-toast"));
var styled_components_1 = __importDefault(require("styled-components"));
var ToursContainer = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  padding: 60px 20px;\n  background: #f8f9fa;\n"], ["\n  padding: 60px 20px;\n  background: #f8f9fa;\n"])));
var ToursContent = styled_components_1.default.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  max-width: 1200px;\n  margin: 0 auto;\n"], ["\n  max-width: 1200px;\n  margin: 0 auto;\n"])));
var Title = styled_components_1.default.h2(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  text-align: center;\n  color: #333;\n  margin-bottom: 50px;\n  font-size: 36px;\n"], ["\n  text-align: center;\n  color: #333;\n  margin-bottom: 50px;\n  font-size: 36px;\n"])));
var FilterSection = styled_components_1.default.div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  margin-bottom: 40px;\n  text-align: center;\n"], ["\n  margin-bottom: 40px;\n  text-align: center;\n"])));
var FilterButton = styled_components_1.default.button(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  background: ", ";\n  color: ", ";\n  border: 2px solid ", ";\n  border-radius: 25px;\n  padding: 10px 20px;\n  margin: 0 10px 10px 0;\n  font-size: 14px;\n  font-weight: bold;\n  cursor: pointer;\n  transition: all 0.3s ease;\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);\n  }\n"], ["\n  background: ", ";\n  color: ", ";\n  border: 2px solid ", ";\n  border-radius: 25px;\n  padding: 10px 20px;\n  margin: 0 10px 10px 0;\n  font-size: 14px;\n  font-weight: bold;\n  cursor: pointer;\n  transition: all 0.3s ease;\n\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);\n  }\n"])), function (props) { return props.active ? 'linear-gradient(135deg, #1e293b 0%, #1e293b 100%)' : 'white'; }, function (props) { return props.active ? 'white' : '#333'; }, function (props) { return props.active ? 'transparent' : '#1e293b'; });
var CategorySection = styled_components_1.default.div(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  margin-bottom: 60px;\n"], ["\n  margin-bottom: 60px;\n"])));
var CategoryTitle = styled_components_1.default.h3(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  color: #333;\n  font-size: 28px;\n  margin-bottom: 30px;\n  padding-bottom: 10px;\n  border-bottom: 3px solid #1e293b;\n  display: inline-block;\n"], ["\n  color: #333;\n  font-size: 28px;\n  margin-bottom: 30px;\n  padding-bottom: 10px;\n  border-bottom: 3px solid #1e293b;\n  display: inline-block;\n"])));
var ToursGrid = styled_components_1.default.div(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));\n  gap: 30px;\n  margin-bottom: 40px;\n"], ["\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));\n  gap: 30px;\n  margin-bottom: 40px;\n"])));
var TourCard = styled_components_1.default.div(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n  background: white;\n  border-radius: 15px;\n  overflow: hidden;\n  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);\n  transition: transform 0.3s ease;\n\n  &:hover {\n    transform: translateY(-5px);\n  }\n"], ["\n  background: white;\n  border-radius: 15px;\n  overflow: hidden;\n  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);\n  transition: transform 0.3s ease;\n\n  &:hover {\n    transform: translateY(-5px);\n  }\n"])));
var TourImage = styled_components_1.default.div(templateObject_10 || (templateObject_10 = __makeTemplateObject(["\n  height: 200px;\n  background: linear-gradient(135deg, #1e293b 0%, #334155 50%, #1e293b 100%);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: white;\n  font-size: 48px;\n  font-weight: bold;\n"], ["\n  height: 200px;\n  background: linear-gradient(135deg, #1e293b 0%, #334155 50%, #1e293b 100%);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: white;\n  font-size: 48px;\n  font-weight: bold;\n"])));
var TourContent = styled_components_1.default.div(templateObject_11 || (templateObject_11 = __makeTemplateObject(["\n  padding: 20px;\n"], ["\n  padding: 20px;\n"])));
var TourName = styled_components_1.default.h4(templateObject_12 || (templateObject_12 = __makeTemplateObject(["\n  color: #333;\n  margin-bottom: 10px;\n  font-size: 18px;\n  line-height: 1.3;\n"], ["\n  color: #333;\n  margin-bottom: 10px;\n  font-size: 18px;\n  line-height: 1.3;\n"])));
var TourDescription = styled_components_1.default.p(templateObject_13 || (templateObject_13 = __makeTemplateObject(["\n  color: #666;\n  margin-bottom: 15px;\n  line-height: 1.5;\n  font-size: 14px;\n"], ["\n  color: #666;\n  margin-bottom: 15px;\n  line-height: 1.5;\n  font-size: 14px;\n"])));
var TourPrice = styled_components_1.default.div(templateObject_14 || (templateObject_14 = __makeTemplateObject(["\n  font-size: 24px;\n  font-weight: bold;\n  color: #1e293b;\n  margin-bottom: 15px;\n"], ["\n  font-size: 24px;\n  font-weight: bold;\n  color: #1e293b;\n  margin-bottom: 15px;\n"])));
var AddToCartButton = styled_components_1.default.button(templateObject_15 || (templateObject_15 = __makeTemplateObject(["\n  width: 100%;\n  background: linear-gradient(135deg, #1e293b 0%, #1e293b 100%);\n  color: white;\n  border: none;\n  border-radius: 8px;\n  padding: 12px;\n  font-size: 16px;\n  font-weight: bold;\n  cursor: pointer;\n  transition: transform 0.2s ease;\n\n  &:hover {\n    transform: translateY(-2px);\n  }\n\n  &:disabled {\n    opacity: 0.7;\n    cursor: not-allowed;\n    transform: none;\n  }\n"], ["\n  width: 100%;\n  background: linear-gradient(135deg, #1e293b 0%, #1e293b 100%);\n  color: white;\n  border: none;\n  border-radius: 8px;\n  padding: 12px;\n  font-size: 16px;\n  font-weight: bold;\n  cursor: pointer;\n  transition: transform 0.2s ease;\n\n  &:hover {\n    transform: translateY(-2px);\n  }\n\n  &:disabled {\n    opacity: 0.7;\n    cursor: not-allowed;\n    transform: none;\n  }\n"])));
var Tours = function () {
    var _a = (0, react_1.useState)('Все'), selectedCategory = _a[0], setSelectedCategory = _a[1];
    var addToCart = (0, CartContext_1.useCart)().addToCart;
    var user = (0, AuthContext_1.useAuth)().user;
    var navigate = (0, react_router_dom_1.useNavigate)();
    // Данные туров
    var toursData = [
        // Красная поляна
        {
            id: 1,
            name: "Панорама Красной поляны",
            description: "Захватывающий вид на горные вершины и долины Красной Поляны. Идеально для фотографий и наслаждения природой.",
            price: 2500,
            category: "Красная поляна",
            duration: "1 час",
            destination: "Красная Поляна"
        },
        {
            id: 2,
            name: "Поляна 960",
            description: "Посещение знаменитой смотровой площадки на высоте 960 метров. Панорамный вид на весь курорт.",
            price: 1800,
            category: "Красная поляна",
            duration: "1 час",
            destination: "Красная Поляна"
        },
        {
            id: 3,
            name: "Панорама Красной Поляны V1 тариф семейный",
            description: "Специальный семейный тариф для посещения панорамной площадки. Включает скидки для детей.",
            price: 4000,
            category: "Красная поляна",
            duration: "1 час",
            destination: "Красная Поляна"
        },
        // Прогулочные билеты
        {
            id: 4,
            name: "Прогулочный билет \"День на Роза Хутор\"",
            description: "Полноценный день на знаменитом курорте Роза Хутор. Включает подъемники и доступ к инфраструктуре.",
            price: 3500,
            category: "Прогулочные билеты",
            duration: "1 день",
            destination: "Роза Хутор"
        },
        {
            id: 5,
            name: "Прогулочный билет «Путь к вершинам + Парк Водопадов + Моя Россия»",
            description: "Комплексный тур включающий подъем к вершинам, посещение парка водопадов и этнографического комплекса.",
            price: 4200,
            category: "Прогулочные билеты",
            duration: "1 день",
            destination: "Роза Хутор"
        },
        {
            id: 6,
            name: "Прогулочный билет «В горы к альпакам»",
            description: "Уникальная возможность познакомиться с альпаками в горных условиях. Интерактивная программа для всей семьи.",
            price: 2800,
            category: "Прогулочные билеты",
            duration: "1 день",
            destination: "Роза Хутор"
        },
        {
            id: 7,
            name: "Прогулочный билет «В горы с гидом»",
            description: "Профессиональный гид проведет вас по самым живописным маршрутам с интересными рассказами о местности.",
            price: 3200,
            category: "Прогулочные билеты",
            duration: "1 день",
            destination: "Роза Хутор"
        },
        {
            id: 8,
            name: "Родельбан 1 круг Утренний",
            description: "Утренний спуск на родельбане по специальной трассе. Идеально для начала активного дня.",
            price: 800,
            category: "Прогулочные билеты",
            duration: "1 час",
            destination: "Роза Хутор"
        },
        {
            id: 9,
            name: "Родельбан 1 круг",
            description: "Классический спуск на родельбане по горной трассе. Захватывающие эмоции и адреналин.",
            price: 1000,
            category: "Прогулочные билеты",
            duration: "1 час",
            destination: "Роза Хутор"
        },
        {
            id: 10,
            name: "Родельбан 2 круга",
            description: "Двойная порция адреналина! Два спуска на родельбане с небольшим перерывом.",
            price: 1800,
            category: "Прогулочные билеты",
            duration: "1 час",
            destination: "Роза Хутор"
        },
        {
            id: 11,
            name: "Родельбан 3 круга",
            description: "Тройной экстрим! Три спуска на родельбане для настоящих любителей острых ощущений.",
            price: 2500,
            category: "Прогулочные билеты",
            duration: "1 час",
            destination: "Роза Хутор"
        },
        {
            id: 12,
            name: "Родельбан 1 круг Ночные виражи",
            description: "Ночной спуск на родельбане с подсветкой трассы. Романтичное и захватывающее приключение.",
            price: 1200,
            category: "Прогулочные билеты",
            duration: "1 час",
            destination: "Роза Хутор"
        },
        // Туры на квадроциклах
        {
            id: 13,
            name: "Квадротур \"7 вершин\"",
            description: "Экстремальный тур на квадроциклах по семи горным вершинам. Для опытных водителей.",
            price: 4500,
            category: "Туры на квадроциклах",
            duration: "1 день",
            destination: "Роза Хутор"
        },
        {
            id: 14,
            name: "Квадротур \"Хадкор\"",
            description: "Тур по сложным горным маршрутам с преодолением препятствий. Высокий уровень сложности.",
            price: 3800,
            category: "Туры на квадроциклах",
            duration: "1 день",
            destination: "Роза Хутор"
        },
        {
            id: 15,
            name: "Квадротур \"Новичок\"",
            description: "Идеальный тур для начинающих. Простые маршруты с обучением управлению квадроциклом.",
            price: 2500,
            category: "Туры на квадроциклах",
            duration: "1 день",
            destination: "Роза Хутор"
        },
        // Туры на Джипах
        {
            id: 16,
            name: "Джип-тур по горным тропам",
            description: "Захватывающее путешествие на внедорожнике по горным дорогам с посещением смотровых площадок.",
            price: 3500,
            category: "Туры на Джипах",
            duration: "1 день",
            destination: "Роза Хутор"
        },
        {
            id: 17,
            name: "Джип-тур \"Водопады и каньоны\"",
            description: "Тур на джипе к самым красивым водопадам и каньонам региона. Фотосессия включена.",
            price: 4200,
            category: "Туры на Джипах",
            duration: "1 день",
            destination: "Роза Хутор"
        },
        // Абхазия
        {
            id: 18,
            name: "Тур \"Золотое Кольцо Абхазии\"",
            description: "Комплексный тур по главным достопримечательностям Абхазии. Включает Озеро Рица, Новый Афон и другие места.",
            price: 5500,
            category: "Абхазия",
            duration: "1 день",
            destination: "Абхазия"
        },
        // Сочи
        {
            id: 19,
            name: "\"Обзорная экскурсия по Сочи\" из Красной Поляны",
            description: "Полноценная обзорная экскурсия по Сочи с выездом из Красной Поляны. Все главные достопримечательности города.",
            price: 2800,
            category: "Сочи",
            duration: "1 день",
            destination: "Сочи"
        },
        // Трансфер
        {
            id: 20,
            name: "Трансфер в Скайпарк",
            description: "Комфортный трансфер к знаменитому Скайпарку. Включает ожидание и обратную дорогу.",
            price: 1500,
            category: "Трансфер",
            duration: "1 день",
            destination: "Скайпарк"
        },
        {
            id: 21,
            name: "Трансфер в Аэропорт",
            description: "Надежный трансфер в аэропорт Сочи. Встреча в отеле, помощь с багажом.",
            price: 2000,
            category: "Трансфер",
            duration: "1 день",
            destination: "Аэропорт"
        },
        {
            id: 22,
            name: "Трансфер из аэропорта",
            description: "Встреча в аэропорту и трансфер до места назначения. Включает табличку с именем.",
            price: 2000,
            category: "Трансфер",
            duration: "1 день",
            destination: "Аэропорт"
        },
        // Конные туры
        {
            id: 23,
            name: "Конный тур \"Ахштырская пещера\"",
            description: "Конная прогулка к знаменитой Ахштырской пещере. Романтичное путешествие верхом.",
            price: 3200,
            category: "Конные туры",
            duration: "1 день",
            destination: "Роза Хутор"
        },
        {
            id: 24,
            name: "Конный тур \"Каньон Псахо\"",
            description: "Верховая прогулка по живописному каньону Псахо. Уникальные виды и природа.",
            price: 3800,
            category: "Конные туры",
            duration: "1 день",
            destination: "Роза Хутор"
        },
        {
            id: 25,
            name: "Конный тур \"Сухой Каньон\"",
            description: "Тур верхом по Сухому каньону с остановками для фотографий и отдыха.",
            price: 3500,
            category: "Конные туры",
            duration: "1 день",
            destination: "Роза Хутор"
        },
        {
            id: 26,
            name: "Конный тур \"Маршрут на смотровую\"",
            description: "Конная прогулка к смотровой площадке с панорамным видом на горы и море.",
            price: 3000,
            category: "Конные туры",
            duration: "1 день",
            destination: "Роза Хутор"
        },
        // Морской отдых
        {
            id: 27,
            name: "Морская прогулка",
            description: "Романтичная прогулка на катере по Черному морю. Виды на побережье с воды.",
            price: 2500,
            category: "Морской отдых",
            duration: "1 день",
            destination: "Черное море"
        },
        {
            id: 28,
            name: "Морская рыбалка",
            description: "Профессиональная морская рыбалка с опытным капитаном. Снасти включены.",
            price: 4000,
            category: "Морской отдых",
            duration: "1 день",
            destination: "Черное море"
        },
        // Рафтинг
        {
            id: 29,
            name: "Рафтинг по горной реке Мзымте",
            description: "Экстремальный сплав по горной реке Мзымте. Полное снаряжение и инструктор включены.",
            price: 3500,
            category: "Рафтинг",
            duration: "1 день",
            destination: "Мзымта"
        }
    ];
    var categories = ['Все', 'Красная поляна', 'Прогулочные билеты', 'Туры на квадроциклах', 'Туры на Джипах', 'Абхазия', 'Сочи', 'Трансфер', 'Конные туры', 'Морской отдых', 'Рафтинг'];
    var filteredTours = selectedCategory === 'Все'
        ? toursData
        : toursData.filter(function (tour) { return tour.category === selectedCategory; });
    var groupedTours = filteredTours.reduce(function (acc, tour) {
        if (!acc[tour.category]) {
            acc[tour.category] = [];
        }
        acc[tour.category].push(tour);
        return acc;
    }, {});
    var handleAddToCart = function (tour) { return __awaiter(void 0, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!user) {
                        react_hot_toast_1.default.error('Необходимо войти в систему');
                        navigate('/login');
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, addToCart(tour.id, 'tour', tour)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var formatPrice = function (price) {
        return new Intl.NumberFormat('ru-RU').format(price);
    };
    return ((0, jsx_runtime_1.jsx)(ToursContainer, { children: (0, jsx_runtime_1.jsxs)(ToursContent, { children: [(0, jsx_runtime_1.jsx)(Title, { children: "\u041D\u0430\u0448\u0438 \u0442\u0443\u0440\u044B" }), (0, jsx_runtime_1.jsx)(FilterSection, { children: categories.map(function (category) { return ((0, jsx_runtime_1.jsx)(FilterButton, { active: selectedCategory === category, onClick: function () { return setSelectedCategory(category); }, children: category }, category)); }) }), Object.entries(groupedTours).map(function (_a) {
                    var category = _a[0], tours = _a[1];
                    return ((0, jsx_runtime_1.jsxs)(CategorySection, { children: [(0, jsx_runtime_1.jsx)(CategoryTitle, { children: category }), (0, jsx_runtime_1.jsx)(ToursGrid, { children: tours.map(function (tour) { return ((0, jsx_runtime_1.jsxs)(TourCard, { children: [(0, jsx_runtime_1.jsx)(TourImage, { children: tour.name.charAt(0) }), (0, jsx_runtime_1.jsxs)(TourContent, { children: [(0, jsx_runtime_1.jsx)(TourName, { children: tour.name }), (0, jsx_runtime_1.jsx)(TourDescription, { children: tour.description }), (0, jsx_runtime_1.jsxs)(TourPrice, { children: [formatPrice(tour.price), " \u20BD"] }), (0, jsx_runtime_1.jsx)(AddToCartButton, { onClick: function () { return handleAddToCart(tour); }, children: "\u0417\u0430\u0431\u0440\u043E\u043D\u0438\u0440\u043E\u0432\u0430\u0442\u044C" })] })] }, tour.id)); }) })] }, category));
                })] }) }));
};
exports.default = Tours;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13, templateObject_14, templateObject_15;
