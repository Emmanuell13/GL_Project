import { useState } from 'react';
import { IonPage, IonContent } from '@ionic/react';
import { validateEmail, validatePassword, authenticate } from './auth';

type Props = {
  // Injected so tests can replace the real backend.
  onAuthenticate?: typeof authenticate;
  onSuccess?: (token: string) => void;
};

export default function LoginPage({ onAuthenticate = authenticate, onSuccess }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [formError, setFormError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    const next = {
      email: validateEmail(email) ?? undefined,
      password: validatePassword(password) ?? undefined,
    };
    setErrors(next);
    setFormError('');
    if (next.email || next.password) return;

    setLoading(true);
    try {
      const { token } = await onAuthenticate(email, password);
      onSuccess?.(token);
    } catch (e) {
      setFormError(e instanceof Error ? e.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonContent>
        <main className="screen">
          <div className="badge" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="4" y="11" width="16" height="10" rx="2" />
              <path d="M8 11V7a4 4 0 0 1 8 0v4" />
            </svg>
          </div>
          <h1>Welcome back</h1>
          <p className="lead">Sign in to continue.</p>

          <form onSubmit={(e) => { e.preventDefault(); submit(); }} noValidate>
            {formError && <p className="banner" role="alert">{formError}</p>}

            <div className="field">
              <label htmlFor="email">Email</label>
              <div className="control">
                <input
                  id="email" type="email" autoComplete="email" placeholder="you@example.com"
                  value={email} onChange={(e) => setEmail(e.target.value)}
                  aria-invalid={!!errors.email} aria-describedby={errors.email ? 'email-error' : undefined}
                />
              </div>
              {errors.email && <p className="error" id="email-error" role="alert">{errors.email}</p>}
            </div>

            <div className="field">
              <label htmlFor="password">Password</label>
              <div className="control has-toggle">
                <input
                  id="password" type={showPassword ? 'text' : 'password'} autoComplete="current-password"
                  placeholder="At least 8 characters"
                  value={password} onChange={(e) => setPassword(e.target.value)}
                  aria-invalid={!!errors.password} aria-describedby={errors.password ? 'password-error' : undefined}
                />
                <button type="button" className="toggle" aria-pressed={showPassword} onClick={() => setShowPassword((v) => !v)}>
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              {errors.password && <p className="error" id="password-error" role="alert">{errors.password}</p>}
            </div>

            <button type="button" className="primary" disabled={loading} onClick={submit} data-testid="login-button">
              {loading ? 'Signing in…' : 'Log in'}
            </button>
          </form>

          <p className="hint">Demo account: <strong>demo@example.com</strong> / <strong>Password123</strong></p>
        </main>
      </IonContent>
    </IonPage>
  );
}
