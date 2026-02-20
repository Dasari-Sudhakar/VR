import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import PageWrapper from '../../components/common/PageWrapper';

const AuthPage = ({ mode = 'login' }) => {
  const isLogin = mode === 'login';
  const navigate = useNavigate();
  const { login, signup } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        await login({ email: form.email, password: form.password });
      } else {
        await signup(form);
      }
      toast.success(isLogin ? 'Welcome back!' : 'Account created!');
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper>
      <form onSubmit={submit} className="glass mx-auto max-w-md rounded-3xl p-8">
        <h1 className="mb-6 text-3xl font-bold">{isLogin ? 'Login' : 'Create Account'}</h1>
        {!isLogin && (
          <input className="mb-3 w-full rounded-xl p-3 text-slate-900" placeholder="Name" required onChange={(e) => setForm({ ...form, name: e.target.value })} />
        )}
        <input className="mb-3 w-full rounded-xl p-3 text-slate-900" placeholder="Email" type="email" required onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input className="mb-4 w-full rounded-xl p-3 text-slate-900" placeholder="Password" type="password" required onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button disabled={loading} className="w-full rounded-xl bg-cyan-500 p-3 font-semibold text-slate-900">
          {loading ? 'Please wait...' : isLogin ? 'Login' : 'Sign Up'}
        </button>
        <p className="mt-4 text-sm">
          {isLogin ? 'No account?' : 'Already a member?'}{' '}
          <Link className="text-cyan-400" to={isLogin ? '/signup' : '/login'}>
            {isLogin ? 'Sign up' : 'Login'}
          </Link>
        </p>
      </form>
    </PageWrapper>
  );
};

export default AuthPage;
