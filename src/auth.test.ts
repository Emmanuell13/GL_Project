import { validateEmail, validatePassword, authenticate } from './auth';

describe('validateEmail', () => {
  it('rejects empty', () => expect(validateEmail('')).toBe('Email is required'));
  it('rejects malformed', () => expect(validateEmail('abc')).toBe('Enter a valid email address'));
  it('accepts valid', () => expect(validateEmail('a@b.co')).toBeNull());
});

describe('validatePassword', () => {
  it('rejects empty', () => expect(validatePassword('')).toBe('Password is required'));
  it('rejects short', () => expect(validatePassword('1234567')).toMatch(/at least 8/));
  it('accepts long enough', () => expect(validatePassword('12345678')).toBeNull());
});

describe('authenticate', () => {
  it('returns a token for the demo account', async () => {
    await expect(authenticate('demo@example.com', 'Password123')).resolves.toEqual({ token: 'fake-jwt-token' });
  });
  it('throws for wrong credentials', async () => {
    await expect(authenticate('demo@example.com', 'wrongpass1')).rejects.toThrow('Invalid email or password');
  });
});
