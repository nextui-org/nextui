import useClipboard from '../index';
import { renderHook } from '@testing-library/react-hooks';

describe('UseClipboard', () => {
  beforeAll(() => {
    window.getSelection = jest.fn().mockImplementation(() => ({
      removeAllRanges: jest.fn(),
      addRange: jest.fn()
    }));
    document.createRange = jest.fn().mockImplementation(() => ({
      selectNode: jest.fn()
    }));
  });

  it('should work correctly', () => {
    document.execCommand = jest.fn();
    const { result } = renderHook(() => useClipboard());
    result.current.copy('test');
    expect(document.execCommand).toHaveBeenCalled();
    (document.execCommand as jest.Mock).mockClear();
  });

  it('should capture copy erros', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    document.execCommand = jest.fn().mockImplementation(() => {
      throw new Error('test');
    });
    const { result } = renderHook(() => useClipboard());
    result.current.copy('space speace breaks $@#');

    expect(errorSpy).toHaveBeenCalled();
    (document.execCommand as jest.Mock).mockClear();
    errorSpy.mockRestore();
  });

  it('should work correctly without text', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    document.execCommand = jest.fn();
    const { result } = renderHook(() => useClipboard());
    result.current.copy('');
    expect(errorSpy).not.toHaveBeenCalled();
    (document.execCommand as jest.Mock).mockClear();
    errorSpy.mockRestore();
  });

  it('should not throw errors when the browser does not support', () => {
    window.getSelection = jest.fn().mockImplementation(() => undefined);
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    document.execCommand = jest.fn();
    const { result } = renderHook(() => useClipboard());
    result.current.copy('test');
    expect(errorSpy).not.toHaveBeenCalled();
    (document.execCommand as jest.Mock).mockClear();
    (window.getSelection as jest.Mock).mockClear();
    errorSpy.mockRestore();
  });
});
