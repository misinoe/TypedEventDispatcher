type PayloadCallback<P> = (payload: P) => void;

export default class EventDispatcher<P> {
  listeners: PayloadCallback<P>[] = [];
  onceListeners: PayloadCallback<P>[] = [];

  dispose() {
    this.listeners = [];
    this.onceListeners = [];
  }

  dispatch(payload: P) {
    let i: number;
    let len: number;
    const {listeners, onceListeners} = this;

    for(i = 0, len = listeners.length; i < len; i++) {
      listeners[i](payload);
    }

    if (onceListeners.length > 0) {
      for(i = 0, len = onceListeners.length; i < len; i++) {
        onceListeners[i](payload);
      }
      onceListeners.splice(0, onceListeners.length);
    }
  }

  on(callback: PayloadCallback<P>) {
    this.listeners.push(callback);
  }

  once(callback: PayloadCallback<P>) {
    this.onceListeners.push(callback);
  }

  off(callback: PayloadCallback<P>): number {
    let deleteCount: number = 0;

    let i: number;
    let len: number;
    const {listeners, onceListeners} = this;

    for(i = 0, len = listeners.length; i < len; i++) {
      if (listeners[i] === callback) {
        listeners.splice(i, 1);
        deleteCount ++;
        i--;
        len--;
      }
    }

    if (onceListeners.length > 0) {
      for(i = 0, len = onceListeners.length; i < len; i++) {
        if (onceListeners[i] === callback) {
          onceListeners.splice(i, 1);
          deleteCount ++;
          i--;
          len--;
        }
      }
    }

    return deleteCount;
  }
}
