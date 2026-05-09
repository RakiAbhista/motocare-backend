import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { Eye, EyeOff, Loader, Check } from 'lucide-react';
import { toast } from 'sonner';
import authService from '../../services/authService';
import { twMerge } from 'tailwind-merge';

export default function ResetPassword() {
  const searchParams = new URLSearchParams(window.location.search);
  const token = searchParams.get('token');
  const email = searchParams.get('email');

  const [formData, setFormData] = useState({
    password: '',
    passwordConfirmation: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [validations, setValidations] = useState({
    minLength: false,
    hasUpperCase: false,
    hasNumber: false,
  });

  useEffect(() => {
    // Validate token and email from URL
    if (!token || !email) {
      toast.error('Link reset password tidak valid atau kadaluarsa');
    }
  }, [token, email]);

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
      if (!token || !email) {
        toast.error('Link tidak valid');
        setLoading(false);
        return;
      }

      if (!formData.password || !formData.passwordConfirmation) {
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

      const response = await authService.resetPassword(
        email,
        token,
        formData.password,
        formData.passwordConfirmation
      );

      toast.success('Password berhasil direset! Silakan login kembali.');
      setSuccess(true);
      setFormData({ password: '', passwordConfirmation: '' });
    } catch (err) {
      if (err.message) {
        toast.error(err.message);
      } else if (err.error) {
        toast.error(err.error);
      } else {
        toast.error('Gagal mereset password. Link mungkin sudah kadaluarsa.');
      }
      setLoading(false);
    }
  };

  if (success) {
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
            {/* Success Message */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2 font-mulish">
                Password Berhasil Direset
              </h2>
              <p className="text-gray-600 font-mulish mb-6">
                Password Anda telah berhasil diubah. Silakan masuk dengan password baru Anda.
              </p>
            </div>

            {/* Back to Login */}
            <Link
              href="/login"
              className="w-full py-3 rounded-xl font-medium text-white bg-[#3564C4] hover:bg-[#2847a0] transition font-mulish inline-flex items-center justify-center"
            >
              Kembali ke Masuk
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F0F7FF] via-white to-[#E8F0FF] flex items-center justify-center p-4 py-8">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#3564C4] mb-2 font-mulish">MotoCare</h1>
          <p className="text-gray-600 font-mulish">Reset Password</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-md p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2 font-mulish">Password Baru</h2>
          <p className="text-gray-600 text-sm mb-6 font-mulish">
            Masukkan password baru Anda di bawah. Password harus kuat dan aman.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2 font-mulish">
                Password Baru
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

            {/* Info Box */}
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
              <p className="text-sm text-blue-800 font-mulish">
                🔒 Pastikan password Anda kuat dan tidak mudah ditebak oleh orang lain.
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !formData.password || !formData.passwordConfirmation}
              className={twMerge(
                'w-full py-3 rounded-xl font-medium text-white transition font-mulish flex items-center justify-center gap-2',
                loading || !formData.password || !formData.passwordConfirmation
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-[#3564C4] hover:bg-[#2847a0] active:bg-[#1f2d73] shadow-md'
              )}
            >
              {loading && <Loader className="w-5 h-5 animate-spin" />}
              {loading ? 'Memproses...' : 'Reset Password'}
            </button>
          </form>

          {/* Back to Login */}
          <Link
            href="/login"
            className="w-full py-3 rounded-xl font-medium text-center text-[#3564C4] border-2 border-[#3564C4] hover:bg-blue-50 transition font-mulish block mt-4"
          >
            Kembali ke Masuk
          </Link>
        </div>
      </div>
    </div>
  );
}
