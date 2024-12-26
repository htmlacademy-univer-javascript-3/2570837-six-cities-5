import { FormEvent, useRef, useCallback, memo } from 'react';
import { useAppDispatch } from '../../hooks';
import { loginAction } from '../../store/api-actions.ts';
import { toast } from 'react-toastify';

const validatePassword = (password: string): boolean => {
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasNoSpaces = !/\s/.test(password);

  return hasLetter && hasNumber && hasNoSpaces;
};

function LoginFormComponent() {
  const loginFormRef = useRef<HTMLFormElement>(null);

  const dispatch = useAppDispatch();

  const handleSubmit = useCallback((evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (!loginFormRef.current) {
      return;
    }

    const formData = new FormData(loginFormRef.current);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!validatePassword(password)) {
      toast.warn('Password must contain at least one letter, one number, and no spaces.');
      return;
    }

    if (email && password) {
      dispatch(loginAction({
        email,
        password
      }));
    }
  }, [dispatch]);

  return (
    <section className="login">
      <h1 className="login__title">Sign in</h1>
      <form
        ref={loginFormRef}
        className="login__form form"
        action=""
        onSubmit={handleSubmit}
      >
        <div className="login__input-wrapper form__input-wrapper">
          <label className="visually-hidden">E-mail</label>
          <input className="login__input form__input" type="email" name="email" placeholder="Email" required />
        </div>
        <div className="login__input-wrapper form__input-wrapper">
          <label className="visually-hidden">Password</label>
          <input className="login__input form__input" type="password" name="password" placeholder="Password" required />
        </div>
        <button className="login__submit form__submit button" type="submit">Sign in</button>
      </form>
    </section>
  );
}

export const LoginForm = memo(LoginFormComponent);
