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
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var useHeroBackground_1 = require("../../hooks/useHeroBackground");
require("./UniversalHeroSection.css");
var UniversalHeroSection = function (_a) {
    var pageName = _a.pageName, title = _a.title, subtitle = _a.subtitle, description = _a.description, children = _a.children, _b = _a.className, className = _b === void 0 ? '' : _b;
    var background = (0, useHeroBackground_1.useHeroBackground)(pageName).background;
    var videoRef = (0, react_1.useRef)(null);
    var _c = (0, react_1.useState)(false), isVideoLoaded = _c[0], setIsVideoLoaded = _c[1];
    var _d = (0, react_1.useState)(false), hasUserInteracted = _d[0], setHasUserInteracted = _d[1];
    // Диагностика состояния
    console.log('UniversalHeroSection render:', {
        pageName: pageName,
        hasBackground: !!background,
        backgroundType: background === null || background === void 0 ? void 0 : background.background_type,
        hasFallback: !!(background === null || background === void 0 ? void 0 : background.fallback_image_url),
        isVideoLoaded: isVideoLoaded
    });
    (0, react_1.useEffect)(function () {
        var video = videoRef.current;
        console.log('useEffect triggered:', {
            hasVideo: !!video,
            backgroundType: background === null || background === void 0 ? void 0 : background.background_type,
            videoSrc: background === null || background === void 0 ? void 0 : background.background_image_url,
            fallbackUrl: background === null || background === void 0 ? void 0 : background.fallback_image_url
        });
        // Сброс состояния при смене фона
        setIsVideoLoaded(false);
        if (video && (background === null || background === void 0 ? void 0 : background.background_type) === 'video') {
            // Простая функция воспроизведения
            var playVideo_1 = function () { return __awaiter(void 0, void 0, void 0, function () {
                var error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            console.log('Attempting to play video...');
                            console.log('Video element state:', {
                                src: video.src,
                                readyState: video.readyState,
                                paused: video.paused,
                                muted: video.muted,
                                autoplay: video.autoplay,
                                loop: video.loop
                            });
                            // Принудительно устанавливаем muted для автовоспроизведения
                            video.muted = true;
                            return [4 /*yield*/, video.play()];
                        case 1:
                            _a.sent();
                            console.log('Video play successful');
                            setIsVideoLoaded(true);
                            return [3 /*break*/, 3];
                        case 2:
                            error_1 = _a.sent();
                            console.warn('Video play failed:', error_1);
                            // Попытка через задержку
                            setTimeout(function () { return __awaiter(void 0, void 0, void 0, function () {
                                var retryError_1;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            _a.trys.push([0, 3, , 4]);
                                            if (!video.paused) return [3 /*break*/, 2];
                                            console.log('Retry attempt after 500ms');
                                            return [4 /*yield*/, video.play()];
                                        case 1:
                                            _a.sent();
                                            console.log('Video play successful on retry');
                                            setIsVideoLoaded(true);
                                            _a.label = 2;
                                        case 2: return [3 /*break*/, 4];
                                        case 3:
                                            retryError_1 = _a.sent();
                                            console.error('Video play failed on retry:', retryError_1);
                                            return [3 /*break*/, 4];
                                        case 4: return [2 /*return*/];
                                    }
                                });
                            }); }, 500);
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); };
            // Обработчики событий
            var handleCanPlay_1 = function () {
                console.log('Video can play');
                playVideo_1();
            };
            var handlePlaying_1 = function () {
                console.log('Video started playing');
                setIsVideoLoaded(true);
            };
            var handleEnded_1 = function () {
                console.log('Video ended, restarting');
                video.currentTime = 0;
                video.play().catch(console.error);
            };
            var handleError_1 = function (e) {
                console.error('Video error:', e);
                setIsVideoLoaded(false);
            };
            // Добавляем обработчики
            video.addEventListener('canplay', handleCanPlay_1);
            video.addEventListener('playing', handlePlaying_1);
            video.addEventListener('ended', handleEnded_1);
            video.addEventListener('error', handleError_1);
            // Попробуем запустить видео сразу если оно готово
            if (video.readyState >= 3) {
                playVideo_1();
            }
            // Дополнительная попытка при загрузке страницы
            var handleLoad_1 = function () {
                console.log('Page loaded, attempting to play video');
                playVideo_1();
            };
            // Добавляем обработчик загрузки страницы
            window.addEventListener('load', handleLoad_1);
            // Добавляем обработчики взаимодействия пользователя для обхода ограничений браузера
            var handleUserInteraction_1 = function () {
                console.log('User interaction detected, attempting to play video');
                playVideo_1();
                // Удаляем обработчики после первого взаимодействия
                document.removeEventListener('click', handleUserInteraction_1);
                document.removeEventListener('touchstart', handleUserInteraction_1);
            };
            document.addEventListener('click', handleUserInteraction_1);
            document.addEventListener('touchstart', handleUserInteraction_1);
            // Cleanup
            return function () {
                window.removeEventListener('load', handleLoad_1);
                document.removeEventListener('click', handleUserInteraction_1);
                document.removeEventListener('touchstart', handleUserInteraction_1);
                video.removeEventListener('canplay', handleCanPlay_1);
                video.removeEventListener('playing', handlePlaying_1);
                video.removeEventListener('ended', handleEnded_1);
                video.removeEventListener('error', handleError_1);
            };
        }
    }, [background]);
    // Глобальное отслеживание взаимодействия пользователя для обхода ограничений автовоспроизведения
    (0, react_1.useEffect)(function () {
        if (hasUserInteracted || !background || background.background_type !== 'video') {
            return;
        }
        var handleGlobalInteraction = function () {
            console.log('Global user interaction detected');
            setHasUserInteracted(true);
            var video = videoRef.current;
            if (video && video.paused) {
                console.log('Attempting to play video after user interaction');
                video.play().catch(console.error);
            }
            // Удаляем обработчики после первого взаимодействия
            document.removeEventListener('click', handleGlobalInteraction);
            document.removeEventListener('touchstart', handleGlobalInteraction);
            document.removeEventListener('keydown', handleGlobalInteraction);
        };
        document.addEventListener('click', handleGlobalInteraction);
        document.addEventListener('touchstart', handleGlobalInteraction);
        document.addEventListener('keydown', handleGlobalInteraction);
        return function () {
            document.removeEventListener('click', handleGlobalInteraction);
            document.removeEventListener('touchstart', handleGlobalInteraction);
            document.removeEventListener('keydown', handleGlobalInteraction);
        };
    }, [hasUserInteracted, background]);
    // Отладочная информация
    console.log('UniversalHeroSection render:', {
        background: background,
        isVideoLoaded: isVideoLoaded,
        hasUserInteracted: hasUserInteracted,
        pageName: pageName
    });
    return ((0, jsx_runtime_1.jsx)("section", { className: "universal-hero-section ".concat(className), children: (0, jsx_runtime_1.jsxs)("div", { className: "hero-background", children: [(background === null || background === void 0 ? void 0 : background.background_image_url) ? (background.background_type === 'video' ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [!isVideoLoaded && background.fallback_image_url && ((0, jsx_runtime_1.jsx)("img", { src: "http://localhost:5000".concat(background.fallback_image_url), alt: "".concat(title, " background"), className: "hero-background-image hero-fallback-image", style: {
                                opacity: 1,
                                pointerEvents: 'none',
                                cursor: 'default',
                                zIndex: -1,
                                position: 'absolute',
                                top: 0,
                                left: 0
                            }, onContextMenu: function (e) { return e.preventDefault(); }, onDragStart: function (e) { return e.preventDefault(); } })), (0, jsx_runtime_1.jsx)("video", { ref: videoRef, src: "http://localhost:5000".concat(background.background_image_url), className: "hero-background-video", muted: true, autoPlay: true, loop: true, playsInline: true, preload: "auto", poster: background.fallback_image_url ? "http://localhost:5000".concat(background.fallback_image_url) : undefined, controls: false, disablePictureInPicture: true, disableRemotePlayback: true, crossOrigin: "anonymous", style: {
                                opacity: 1,
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                pointerEvents: 'none',
                                cursor: 'default',
                                zIndex: -1,
                                position: 'absolute',
                                top: 0,
                                left: 0
                            }, onContextMenu: function (e) { return e.preventDefault(); }, onDragStart: function (e) { return e.preventDefault(); }, onEnded: function () {
                                console.log('Video ended, restarting via inline handler');
                                var video = videoRef.current;
                                if (video) {
                                    video.currentTime = 0;
                                    setTimeout(function () {
                                        video.play().catch(console.error);
                                    }, 100);
                                }
                            } })] })) : ((0, jsx_runtime_1.jsx)("img", { src: "http://localhost:5000".concat(background.background_image_url), alt: "".concat(title, " background"), className: "hero-background-image", style: {
                        pointerEvents: 'none',
                        cursor: 'default',
                        zIndex: -1,
                        position: 'absolute',
                        top: 0,
                        left: 0
                    }, onContextMenu: function (e) { return e.preventDefault(); }, onDragStart: function (e) { return e.preventDefault(); } }))) : ((0, jsx_runtime_1.jsx)("div", { className: "hero-default-background" })), (0, jsx_runtime_1.jsx)("div", { className: "hero-overlay" }), (0, jsx_runtime_1.jsxs)("div", { className: "hero-content", children: [(0, jsx_runtime_1.jsxs)("div", { className: "hero-text-container", children: [(0, jsx_runtime_1.jsx)("h1", { className: "hero-title", dangerouslySetInnerHTML: { __html: title } }), description && (0, jsx_runtime_1.jsx)("p", { className: "hero-description", children: description })] }), children] })] }) }));
};
exports.default = UniversalHeroSection;
