import elementResizeDetectorFactory from 'element-resize-detector';
const resizeDetector = elementResizeDetectorFactory({ strategy: 'scroll' });

export default {
  name: 'WithDimensions',

  data() {
    return {
      width: null,
      height: null
    };
  },

  mounted() {
    const callback = el => {
      this.width = el.offsetWidth;
      this.height = el.offsetHeight;
      this.$emit('size-changed', { width: this.width, height: this.height });
    };

    resizeDetector.listenTo(this.$el, callback);

    this.$once('hook:beforeDestroy', () => {
      resizeDetector.removeListener(this.$el, callback);
    });
  },

  render() {
    return this.$scopedSlots.default({
      width: this.width,
      height: this.height
    });
  }
};
