declare type PayloadCallback<P> = (payload: P) => void;
export declare class EventDispatcher<P> {
    listeners: PayloadCallback<P>[];
    onceListeners: PayloadCallback<P>[];
    dispose(): void;
    dispatch(payload: P): void;
    on(callback: PayloadCallback<P>): void;
    once(callback: PayloadCallback<P>): void;
    off(callback: PayloadCallback<P>): number;
}
export default EventDispatcher;
