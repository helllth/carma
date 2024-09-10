// prevents cesium bundle from causing uncaught errors when bundled.
// TODO Replace with a proper lazy loading of cesium

if (typeof TransformStream === 'undefined') {
  console.warn('Die TransformStream API wird von diesem Browser nicht unterstützt. Bitte benutzen sie einen unterstützten Browser.');
  class DummyTransformStream {
    constructor() {
      this.readable = null;
      this.writable = null;
    }
  }
  window.TransformStream = DummyTransformStream;
}
