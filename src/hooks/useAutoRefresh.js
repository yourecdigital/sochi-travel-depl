"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAutoRefresh = void 0;
var react_1 = require("react");
var useAutoRefresh = function (callback, options) {
    if (options === void 0) { options = {}; }
    var _a = options.interval, interval = _a === void 0 ? 30000 : _a, _b = options.enabled, enabled = _b === void 0 ? true : _b; // по умолчанию каждые 30 секунд
    var intervalRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(function () {
        if (!enabled) {
            return;
        }
        // Первоначальный вызов
        callback();
        // Устанавливаем интервал
        intervalRef.current = setInterval(callback, interval);
        // Очистка при размонтировании
        return function () {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [callback, interval, enabled]);
    // Функция для принудительного обновления
    var refresh = function () {
        callback();
    };
    return { refresh: refresh };
};
exports.useAutoRefresh = useAutoRefresh;
