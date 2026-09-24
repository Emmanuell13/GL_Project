import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginPage from './LoginPage';

const setup = (auth = vi.fn().mockResolvedValue({ token: 't' })) => {
  const onSuccess = vi.fn();
  render(<LoginPage onAuthenticate={auth} onSuccess={onSuccess} />);
  return { auth, onSuccess, user: userEvent.setup() };
};

it('shows validation errors and does not call the backend when empty', async () => {
  const { auth, user } = setup();
  await user.click(screen.getByTestId('login-button'));
  expect(screen.getByText('Email is required')).toBeInTheDocument();
  expect(screen.getByText('Password is required')).toBeInTheDocument();
  expect(auth).not.toHaveBeenCalled();
});

it('logs in with valid credentials', async () => {
  const { auth, onSuccess, user } = setup();
  await user.type(screen.getByLabelText('Email'), 'demo@example.com');
  await user.type(screen.getByLabelText('Password'), 'Password123');
  await user.click(screen.getByTestId('login-button'));
  expect(auth).toHaveBeenCalledWith('demo@example.com', 'Password123');
  expect(onSuccess).toHaveBeenCalledWith('t');
});

it('shows the backend error when login fails', async () => {
  const { user } = setup(vi.fn().mockRejectedValue(new Error('Invalid email or password')));
  await user.type(screen.getByLabelText('Email'), 'demo@example.com');
  await user.type(screen.getByLabelText('Password'), 'wrongpass1');
  await user.click(screen.getByTestId('login-button'));
  expect(await screen.findByText('Invalid email or password')).toBeInTheDocument();
});

it('toggles password visibility', async () => {
  const { user } = setup();
  const input = screen.getByLabelText('Password');
  expect(input).toHaveAttribute('type', 'password');
  await user.click(screen.getByRole('button', { name: 'Show' }));
  expect(input).toHaveAttribute('type', 'text');
  await user.click(screen.getByRole('button', { name: 'Hide' }));
  expect(input).toHaveAttribute('type', 'password');
});
