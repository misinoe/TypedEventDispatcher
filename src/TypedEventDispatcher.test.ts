import EventDispatcher from './TypedEventDispatcher';

interface Payload {
  payload: any;
}

describe('EventDispatcher test', () => {
  test('on test', () => {
    const eventDispatcher = new EventDispatcher<Payload>();

    let callCount = 0;
    const payloadList = [];
    eventDispatcher.on(data => {
      callCount ++;
      payloadList.push(data.payload);
    });

    eventDispatcher.dispatch({payload: 'payload1'});
    eventDispatcher.dispatch({payload: 12345});
    eventDispatcher.dispatch({payload: 'payload2'});
    eventDispatcher.dispatch({payload: 98765});

    expect(callCount).toBe(4);
    expect(payloadList).toStrictEqual([
      'payload1',
      12345,
      'payload2',
      98765,
    ]);
  });

  test('once test', () => {
    const eventDispatcher = new EventDispatcher<Payload>();

    let callCount = 0;
    let payload: any = null;
    eventDispatcher.once(data => {
      callCount ++;
      payload = data.payload;
    });

    eventDispatcher.dispatch({payload: 'payload'});
    eventDispatcher.dispatch({payload: 12345});

    expect(callCount).toBe(1);
    expect(payload).toBe('payload');
  });

  test('on to off test', () => {
    const eventDispatcher = new EventDispatcher<Payload>();
    let callCount = 0;
    const payloadList = [];
    const callback = (data: Payload) => {
      callCount ++;
      payloadList.push(data.payload);
    };

    eventDispatcher.on(callback);

    eventDispatcher.dispatch({payload: 1});
    eventDispatcher.dispatch({payload: 2});
    eventDispatcher.dispatch({payload: 3});

    const removeCount = eventDispatcher.off(callback);

    eventDispatcher.dispatch({payload: 4});
    eventDispatcher.dispatch({payload: 5});

    expect(removeCount).toBe(1);
    expect(payloadList).toStrictEqual([1, 2, 3]);
  });

  test('once to off test', () => {
    const eventDispatcher = new EventDispatcher<Payload>();
    let callCountA = 0;
    let callCountB = 0;
    const payloadListA = [];
    const payloadListB = [];

    const callbackA = (data: Payload) => {
      callCountA ++;
      payloadListA.push(data.payload);
    };

    const callbackB = (data: Payload) => {
      callCountB ++;
      payloadListB.push(data.payload);
    };

    eventDispatcher.once(callbackA);
    let removeCount = eventDispatcher.off(callbackA);
    expect(removeCount).toBe(1);

    eventDispatcher.on(callbackB);
    eventDispatcher.on(callbackB);
    eventDispatcher.once(callbackA);
    eventDispatcher.once(callbackA);
    eventDispatcher.once(callbackA);
    eventDispatcher.once(callbackB);
    eventDispatcher.once(callbackB);

    removeCount = eventDispatcher.off(callbackA);
    expect(removeCount).toBe(3);

    removeCount = eventDispatcher.off(callbackB);
    expect(removeCount).toBe(4);

    eventDispatcher.once(callbackA);

    eventDispatcher.dispatch({payload: 1});
    eventDispatcher.dispatch({payload: 2});
    eventDispatcher.dispatch({payload: 3});

    expect(payloadListA).toStrictEqual([1]);

    removeCount = eventDispatcher.off(callbackA);
    expect(removeCount).toBe(0);
  });

  test('dispose', () => {
    const eventDispatcher = new EventDispatcher<Payload>();
    eventDispatcher.on(() => {});
    eventDispatcher.once(() => {});

    expect(eventDispatcher.listeners.length).toBe(1);
    expect(eventDispatcher.onceListeners.length).toBe(1);

    eventDispatcher.dispose();

    expect(eventDispatcher.listeners.length).toBe(0);
    expect(eventDispatcher.onceListeners.length).toBe(0);
  });
});
