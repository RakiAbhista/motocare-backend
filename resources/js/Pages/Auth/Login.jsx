import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import { Eye, EyeOff, Loader } from 'lucide-react';
import { toast } from 'sonner';
import authService from '../../services/authService';
import { twMerge } from 'tailwind-merge';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!email || !password) {
        toast.error('Email dan password harus diisi');
        setLoading(false);
        return;
      }

      const response = await authService.login(email, password);
      
      if (response.role === 'admin') {
        toast.success('Login berhasil! Redirecting...');
        setTimeout(() => {
          router.visit('/admin/dashboard');
        }, 500);
      } else {
        toast.error('Anda tidak memiliki akses ke admin panel');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('role');
        setLoading(false);
      }
    } catch (err) {
      if (err.message) {
        toast.error(err.message);
      } else if (err.error) {
        toast.error(err.error);
      } else {
        toast.error('Login gagal. Silakan cek email dan password Anda.');
      }
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F0F7FF] via-white to-[#E8F0FF] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#3564C4] mb-2 font-mulish">MotoCare</h1>
          <p className="text-gray-600 font-mulish">Admin Dashboard</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-md p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 font-mulish">Masuk ke Akun Anda</h2>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2 font-mulish">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@contoh.com"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-gray-50 focus:outline-none focus:border-[#3564C4] transition font-mulish"
                disabled={loading}
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2 font-mulish">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-gray-50 focus:outline-none focus:border-[#3564C4] transition font-mulish pr-12"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition"
                  disabled={loading}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-2">
              <input
                id="rememberMe"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-[#3564C4] cursor-pointer accent-[#3564C4]"
                disabled={loading}
              />
              <label htmlFor="rememberMe" className="text-sm text-gray-600 cursor-pointer font-mulish">
                Ingat saya
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={twMerge(
                'w-full py-3 rounded-xl font-medium text-white transition font-mulish flex items-center justify-center gap-2',
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-[#3564C4] hover:bg-[#2847a0] active:bg-[#1f2d73] shadow-md'
              )}
            >
              {loading && <Loader className="w-5 h-5 animate-spin" />}
              {loading ? 'Memproses...' : 'Masuk'}
            </button>
          </form>

          {/* Forgot Password Link */}
          <div className="mt-6 text-center">
            <Link
              href="/forgot-password"
              className="text-[#119CFF] hover:text-[#0a7db5] transition font-medium text-sm font-mulish"
            >
              Lupa Password?
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-gray-600 font-mulish">
            Belum punya akun?{' '}
            <Link href="/register" className="text-[#3564C4] hover:text-[#2847a0] font-medium transition">
              Daftar di sini
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
