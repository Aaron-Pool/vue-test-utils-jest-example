import { mount } from '@vue/test-utils';
import WithDimensions from '../src/WithDimensions';

const callbacks = [];
function mockDetector() {
  return {
    listenTo(el, callback) {
      callbacks.push(callback);
      callback({ offsetHeight: 500, offsetWidth: 500 });
    },
    mockResize(width, height) {
      callbacks.forEach(callback =>
        callback({
          offsetHeight: height,
          offsetWidth: width
        })
      );
    }
  };
}

function factory(mockFn) {
  return mount(WithDimensions, {
    scopedSlots: {
      default: mockFn || '<div/>'
    }
  });
}

jest.mock('element-resize-detector', () => mockDetector);

describe('WithDimensions is a renderless component that provides a scoped slot with the current element dimensions', () => {
  it('should initialize with dimension data', () => {
    const mockSlot = jest.fn();
    factory(mockSlot);
    expect(mockSlot.mock.calls).toEqual([[{ width: 500, height: 500 }]]);
  });
});
