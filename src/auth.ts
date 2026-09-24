// Pure logic: no UI, so it is trivial to unit test.

export function validateEmail(email: string): string | null {
  if (!email.trim()) return 'Email is required';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Enter a valid email address';
  return null;
}

export function validatePassword(password: string): string | null {
  if (!password) return 'Password is required';
  if (password.length < 8) return 'Password must be at least 8 characters';
  return null;
}

// Fake backend. Replace with a real API call later.
export async function authenticate(email: string, password: string): Promise<{ token: string }> {
  await new Promise((r) => setTimeout(r, 300));
  if (email === 'demo@example.com' && password === 'Password123') {
    return { token: 'fake-jwt-token' };
  }
  throw new Error('Invalid email or password');
}
