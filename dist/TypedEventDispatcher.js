"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventDispatcher = void 0;
var EventDispatcher = /** @class */ (function () {
    function EventDispatcher() {
        this.listeners = [];
        this.onceListeners = [];
    }
    EventDispatcher.prototype.dispose = function () {
        this.listeners = [];
        this.onceListeners = [];
    };
    EventDispatcher.prototype.dispatch = function (payload) {
        var i;
        var len;
        var listeners = this.listeners.slice(0);
        for (i = 0, len = listeners.length; i < len; i++) {
            listeners[i](payload);
        }
        var onceListeners = this.onceListeners.slice(0);
        if (onceListeners.length > 0) {
            for (i = 0, len = onceListeners.length; i < len; i++) {
                onceListeners[i](payload);
            }
            onceListeners.splice(0, onceListeners.length);
        }
    };
    EventDispatcher.prototype.on = function (callback) {
        this.listeners.push(callback);
    };
    EventDispatcher.prototype.once = function (callback) {
        this.onceListeners.push(callback);
    };
    EventDispatcher.prototype.off = function (callback) {
        var deleteCount = 0;
        var i;
        var len;
        var _a = this, listeners = _a.listeners, onceListeners = _a.onceListeners;
        for (i = 0, len = listeners.length; i < len; i++) {
            if (listeners[i] === callback) {
                listeners.splice(i, 1);
                deleteCount++;
                i--;
                len--;
            }
        }
        if (onceListeners.length > 0) {
            for (i = 0, len = onceListeners.length; i < len; i++) {
                if (onceListeners[i] === callback) {
                    onceListeners.splice(i, 1);
                    deleteCount++;
                    i--;
                    len--;
                }
            }
        }
        return deleteCount;
    };
    return EventDispatcher;
}());
exports.EventDispatcher = EventDispatcher;
exports.default = EventDispatcher;
//# sourceMappingURL=TypedEventDispatcher.js.map