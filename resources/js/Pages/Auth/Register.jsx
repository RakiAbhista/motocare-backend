import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import { Eye, EyeOff, Loader, Check } from 'lucide-react';
import { toast } from 'sonner';
import authService from '../../services/authService';
import { twMerge } from 'tailwind-merge';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    role: 'customer',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [validations, setValidations] = useState({
    minLength: false,
    hasUpperCase: false,
    hasNumber: false,
  });

  const validatePassword = (pass) => {
    const newValidations = {
      minLength: pass.length >= 8,
      hasUpperCase: /[A-Z]/.test(pass),
      hasNumber: /\d/.test(pass),
    };
    setValidations(newValidations);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === 'password') {
      validatePassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validation
      if (!formData.name || !formData.email || !formData.password || !formData.passwordConfirmation) {
        toast.error('Semua field harus diisi');
        setLoading(false);
        return;
      }

      if (formData.password.length < 8) {
        toast.error('Password minimal 8 karakter');
        setLoading(false);
        return;
      }

      if (formData.password !== formData.passwordConfirmation) {
        toast.error('Password dan konfirmasi password tidak cocok');
        setLoading(false);
        return;
      }

      if (!termsAccepted) {
        toast.error('Anda harus menerima syarat dan ketentuan');
        setLoading(false);
        return;
      }

      const response = await authService.register(
        formData.name,
        formData.email,
        formData.password,
        formData.passwordConfirmation,
        formData.role
      );

      toast.success('Pendaftaran berhasil! Redirecting...');
      
      // Redirect ke dashboard sesuai role
      setTimeout(() => {
        if (formData.role === 'admin') {
          router.visit('/admin/dashboard');
        } else {
          router.visit('/dashboard');
        }
      }, 500);
    } catch (err) {
      if (err.message) {
        toast.error(err.message);
      } else if (err.error) {
        toast.error(err.error);
      } else if (err.errors) {
        // Handle validation errors from backend
        const firstError = Object.values(err.errors)[0];
        toast.error(Array.isArray(firstError) ? firstError[0] : firstError);
      } else {
        toast.error('Pendaftaran gagal. Silakan coba lagi.');
      }
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F0F7FF] via-white to-[#E8F0FF] flex items-center justify-center p-4 py-8">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#3564C4] mb-2 font-mulish">MotoCare</h1>
          <p className="text-gray-600 font-mulish">Buat Akun Baru</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-md p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 font-mulish">Daftar Akun Baru</h2>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Input */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2 font-mulish">
                Nama Lengkap
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Masukkan nama lengkap"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-gray-50 focus:outline-none focus:border-[#3564C4] transition font-mulish"
                disabled={loading}
              />
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2 font-mulish">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="nama@contoh.com"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-gray-50 focus:outline-none focus:border-[#3564C4] transition font-mulish"
                disabled={loading}
              />
            </div>

            {/* Role Selection */}
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2 font-mulish">
                Role
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-gray-50 focus:outline-none focus:border-[#3564C4] transition font-mulish"
                disabled={loading}
              >
                <option value="customer">Customer</option>
                <option value="mechanic">Mekanik</option>
              </select>
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
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
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

              {/* Password Validation Checklist */}
              {formData.password && (
                <div className="mt-3 space-y-2">
                  <p className="text-xs text-gray-600 font-mulish mb-2">Persyaratan password:</p>
                  <div className="flex items-center gap-2">
                    <div
                      className={twMerge(
                        'w-4 h-4 rounded-full flex items-center justify-center',
                        validations.minLength
                          ? 'bg-green-100'
                          : 'bg-gray-100'
                      )}
                    >
                      {validations.minLength && (
                        <Check className="w-3 h-3 text-green-600" />
                      )}
                    </div>
                    <span className={twMerge(
                      'text-xs font-mulish',
                      validations.minLength ? 'text-green-600' : 'text-gray-500'
                    )}>
                      Minimal 8 karakter
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className={twMerge(
                        'w-4 h-4 rounded-full flex items-center justify-center',
                        validations.hasUpperCase
                          ? 'bg-green-100'
                          : 'bg-gray-100'
                      )}
                    >
                      {validations.hasUpperCase && (
                        <Check className="w-3 h-3 text-green-600" />
                      )}
                    </div>
                    <span className={twMerge(
                      'text-xs font-mulish',
                      validations.hasUpperCase ? 'text-green-600' : 'text-gray-500'
                    )}>
                      Mengandung huruf besar (A-Z)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className={twMerge(
                        'w-4 h-4 rounded-full flex items-center justify-center',
                        validations.hasNumber
                          ? 'bg-green-100'
                          : 'bg-gray-100'
                      )}
                    >
                      {validations.hasNumber && (
                        <Check className="w-3 h-3 text-green-600" />
                      )}
                    </div>
                    <span className={twMerge(
                      'text-xs font-mulish',
                      validations.hasNumber ? 'text-green-600' : 'text-gray-500'
                    )}>
                      Mengandung angka (0-9)
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password Input */}
            <div>
              <label htmlFor="passwordConfirmation" className="block text-sm font-medium text-gray-700 mb-2 font-mulish">
                Konfirmasi Password
              </label>
              <div className="relative">
                <input
                  id="passwordConfirmation"
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="passwordConfirmation"
                  value={formData.passwordConfirmation}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={twMerge(
                    'w-full px-4 py-3 rounded-xl border-2 bg-gray-50 focus:outline-none transition font-mulish pr-12',
                    formData.passwordConfirmation && formData.password !== formData.passwordConfirmation
                      ? 'border-red-300'
                      : 'border-gray-200 focus:border-[#3564C4]'
                  )}
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition"
                  disabled={loading}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {formData.passwordConfirmation && formData.password !== formData.passwordConfirmation && (
                <p className="text-xs text-red-500 mt-1 font-mulish">Password tidak cocok</p>
              )}
            </div>

            {/* Terms Acceptance */}
            <div className="flex items-start gap-3 bg-blue-50 p-4 rounded-xl">
              <input
                id="terms"
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="w-4 h-4 rounded mt-1 border-gray-300 text-[#3564C4] cursor-pointer accent-[#3564C4]"
                disabled={loading}
              />
              <label htmlFor="terms" className="text-xs text-gray-600 cursor-pointer font-mulish">
                Saya menyetujui{' '}
                <Link href="/terms" className="text-[#3564C4] hover:underline">
                  Syarat dan Ketentuan
                </Link>{' '}
                dan{' '}
                <Link href="/privacy" className="text-[#3564C4] hover:underline">
                  Kebijakan Privasi
                </Link>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !termsAccepted}
              className={twMerge(
                'w-full py-3 rounded-xl font-medium text-white transition font-mulish flex items-center justify-center gap-2 mt-6',
                loading || !termsAccepted
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-[#3564C4] hover:bg-[#2847a0] active:bg-[#1f2d73] shadow-md'
              )}
            >
              {loading && <Loader className="w-5 h-5 animate-spin" />}
              {loading ? 'Memproses...' : 'Daftar'}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-gray-600 font-mulish">
            Sudah punya akun?{' '}
            <Link href="/login" className="text-[#3564C4] hover:text-[#2847a0] font-medium transition">
              Masuk di sini
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
