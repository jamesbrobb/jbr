import { IsDefinedValuePipe } from './is-defined-value.pipe';

describe('IsDefinedValuePipe', () => {
  let pipe: IsDefinedValuePipe;
  beforeEach(() => {
    pipe = new IsDefinedValuePipe();
  });

  describe('should return false when', () => {
    it('supplied with undefined', () => {
      expect(pipe.transform(undefined)).toBe(false);
    });

    it('supplied with null', () => {
      expect(pipe.transform(null)).toBe(false);
    });

    it('supplied with an empty string', () => {
      expect(pipe.transform('')).toBe(false);
    });
  });

  describe('should return true when', () => {
    it('supplied with zero', () => {
      expect(pipe.transform(0)).toBe(true);
    });

    it('supplied with NaN', () => {
      expect(pipe.transform(NaN)).toBe(true);
    });

    it('supplied with false', () => {
      expect(pipe.transform(false)).toBe(true);
    });

    it('supplied with an empty object', () => {
      expect(pipe.transform({})).toBe(true);
    });

    it('supplied with an empty array', () => {
      expect(pipe.transform([])).toBe(true);
    });
  });
});
