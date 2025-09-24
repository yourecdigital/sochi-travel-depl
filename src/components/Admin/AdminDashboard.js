"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var styled_components_1 = __importDefault(require("styled-components"));
var AdminLayout_1 = __importDefault(require("./AdminLayout"));
var ToursEditor_1 = __importDefault(require("./ToursEditor"));
var HotelsEditor_1 = __importDefault(require("./HotelsEditor"));
var ForeignEditor_1 = __importDefault(require("./ForeignEditor"));
var CruisesEditor_1 = __importDefault(require("./CruisesEditor"));
var PromotionsEditor_1 = __importDefault(require("./PromotionsEditor"));
var ServicesEditor_1 = __importDefault(require("./ServicesEditor"));
var HeroBackgroundManager_1 = __importDefault(require("./HeroBackgroundManager"));
var ClientsManager_1 = __importDefault(require("./ClientsManager"));
var ContentArea = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.98) 100%);\n  border-radius: 16px;\n  box-shadow: 0 8px 32px rgba(205, 164, 52, 0.2);\n  min-height: 600px;\n  backdrop-filter: blur(20px);\n  border: 2px solid rgba(205, 164, 52, 0.3);\n  position: relative;\n  overflow: hidden;\n\n  &::before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    height: 4px;\n    background: linear-gradient(90deg, #90ccec, #CDA434, #7CFC00);\n    border-radius: 16px 16px 0 0;\n  }\n"], ["\n  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.98) 100%);\n  border-radius: 16px;\n  box-shadow: 0 8px 32px rgba(205, 164, 52, 0.2);\n  min-height: 600px;\n  backdrop-filter: blur(20px);\n  border: 2px solid rgba(205, 164, 52, 0.3);\n  position: relative;\n  overflow: hidden;\n\n  &::before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    height: 4px;\n    background: linear-gradient(90deg, #90ccec, #CDA434, #7CFC00);\n    border-radius: 16px 16px 0 0;\n  }\n"])));
var AdminDashboard = function () {
    var searchParams = (0, react_router_dom_1.useSearchParams)()[0];
    var navigate = (0, react_router_dom_1.useNavigate)();
    var sectionParam = searchParams.get('section');
    var _a = (0, react_1.useState)(sectionParam || 'tours'), activeSection = _a[0], setActiveSection = _a[1];
    (0, react_1.useEffect)(function () {
        var adminToken = localStorage.getItem('adminToken');
        if (!adminToken) {
            navigate('/admin/login');
        }
    }, [navigate]);
    (0, react_1.useEffect)(function () {
        if (sectionParam && sectionParam !== activeSection) {
            setActiveSection(sectionParam);
        }
    }, [sectionParam, activeSection]);
    // handleLogout теперь обрабатывается в AdminLayout
    var renderContent = function () {
        switch (activeSection) {
            case 'tours':
                return (0, jsx_runtime_1.jsx)(ToursEditor_1.default, {});
            case 'hotels':
                return (0, jsx_runtime_1.jsx)(HotelsEditor_1.default, {});
            case 'foreign':
                return (0, jsx_runtime_1.jsx)(ForeignEditor_1.default, {});
            case 'cruises':
                return (0, jsx_runtime_1.jsx)(CruisesEditor_1.default, {});
            case 'promotions':
                return (0, jsx_runtime_1.jsx)(PromotionsEditor_1.default, {});
            case 'services':
                return (0, jsx_runtime_1.jsx)(ServicesEditor_1.default, {});
            case 'hero-backgrounds':
                return (0, jsx_runtime_1.jsx)(HeroBackgroundManager_1.default, {});
            case 'clients':
                return (0, jsx_runtime_1.jsx)(ClientsManager_1.default, {});
            default:
                return (0, jsx_runtime_1.jsx)(ToursEditor_1.default, {});
        }
    };
    return ((0, jsx_runtime_1.jsx)(AdminLayout_1.default, { children: (0, jsx_runtime_1.jsx)(ContentArea, { children: renderContent() }) }));
};
exports.default = AdminDashboard;
var templateObject_1;
