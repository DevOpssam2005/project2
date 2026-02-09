import { useSelector, useDispatch } from 'react-redux';
import { selectError, selectLoggedInUser } from '../authSlice';
import { Link, Navigate } from 'react-router-dom';
import { loginUserAsync } from '../authSlice';
import { useForm } from 'react-hook-form';

export default function Login() {
  const dispatch = useDispatch();
  const error = useSelector(selectError);
  const user = useSelector(selectLoggedInUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const styles = {
    page: {
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background:
        'linear-gradient(135deg, #667eea, #764ba2)',
    },
    card: {
      width: '100%',
      maxWidth: '420px',
      background: 'rgba(255,255,255,0.95)',
      borderRadius: '20px',
      padding: '2.5rem',
      boxShadow: '0 25px 50px rgba(0,0,0,0.2)',
      animation: 'float 4s ease-in-out infinite',
    },
    title: {
      textAlign: 'center',
      fontSize: '1.8rem',
      fontWeight: '700',
      marginBottom: '1.5rem',
      color: '#1f2937',
    },
    input: {
      width: '100%',
      padding: '10px 14px',
      borderRadius: '10px',
      border: '1px solid #d1d5db',
      outline: 'none',
      fontSize: '14px',
      transition: 'all 0.3s',
    },
    button: {
      width: '100%',
      padding: '10px',
      borderRadius: '12px',
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      color: '#fff',
      fontWeight: '600',
      border: 'none',
      cursor: 'pointer',
      marginTop: '10px',
      transition: 'transform 0.2s, box-shadow 0.2s',
    },
    link: {
      color: '#4f46e5',
      fontWeight: '600',
      textDecoration: 'none',
    },
    error: {
      color: '#ef4444',
      fontSize: '13px',
      marginTop: '4px',
    },
    footer: {
      marginTop: '1.5rem',
      textAlign: 'center',
      fontSize: '14px',
    },
  };

  return (
    <>
      {user && <Navigate to="/" replace={true} />}

      {/* Floating animation */}
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
          }
          button:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
          }
          input:focus {
            border-color: #6366f1;
            box-shadow: 0 0 0 2px rgba(99,102,241,0.3);
          }
        `}
      </style>

      <div style={styles.page}>
        <div style={styles.card}>
          <h2 style={styles.title}>Welcome Back 👋</h2>

          <form
            noValidate
            onSubmit={handleSubmit((data) => {
              dispatch(
                loginUserAsync({
                  email: data.email,
                  password: data.password,
                })
              );
            })}
          >
            {/* Email */}
            <div style={{ marginBottom: '1rem' }}>
              <input
                type="email"
                placeholder="Email address"
                style={styles.input}
                {...register('email', {
                  required: 'Email is required',
                })}
              />
              {errors.email && (
                <p style={styles.error}>{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div style={{ marginBottom: '1rem' }}>
              <input
                type="password"
                placeholder="Password"
                style={styles.input}
                {...register('password', {
                  required: 'Password is required',
                })}
              />
              {errors.password && (
                <p style={styles.error}>{errors.password.message}</p>
              )}
            </div>

            {error && <p style={styles.error}>{error}</p>}

            <button type="submit" style={styles.button}>
              Log in
            </button>
          </form>

          <div style={styles.footer}>
            <p>
              Not a member?{' '}
              <Link to="/signup" style={styles.link}>
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
