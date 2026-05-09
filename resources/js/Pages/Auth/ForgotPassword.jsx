import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { Loader, Mail } from 'lucide-react';
import { toast } from 'sonner';
import authService from '../../services/authService';
import { twMerge } from 'tailwind-merge';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!email) {
        toast.error('Email harus diisi');
        setLoading(false);
        return;
      }

      // Check email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        toast.error('Format email tidak valid');
        setLoading(false);
        return;
      }

      const response = await authService.forgotPassword(email);
      toast.success('Link reset password sudah dikirim ke email kamu');
      setShowSuccess(true);
      setEmail('');
    } catch (err) {
      if (err.message) {
        toast.error(err.message);
      } else if (err.error) {
        toast.error(err.error);
      } else {
        toast.error('Gagal mengirim link reset password. Email mungkin tidak terdaftar.');
      }
      setLoading(false);
    }
  };

  if (showSuccess) {
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
                <Mail className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2 font-mulish">
                Cek Email Anda
              </h2>
              <p className="text-gray-600 font-mulish mb-4">
                Kami telah mengirimkan link reset password ke email Anda. Silakan ikuti instruksi untuk mereset password Anda.
              </p>
              <p className="text-sm text-gray-500 font-mulish mb-6">
                Link akan kadaluarsa dalam 1 jam. Jika tidak menerima email, cek folder spam Anda.
              </p>
            </div>

            {/* Back to Login */}
            <div className="space-y-3">
              <Link
                href="/login"
                className="w-full py-3 rounded-xl font-medium text-white bg-[#3564C4] hover:bg-[#2847a0] transition font-mulish inline-flex items-center justify-center"
              >
                Kembali ke Masuk
              </Link>
              <button
                onClick={() => setSuccess(false)}
                className="w-full py-3 rounded-xl font-medium text-[#3564C4] border-2 border-[#3564C4] hover:bg-blue-50 transition font-mulish"
              >
                Kirim Ulang
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F0F7FF] via-white to-[#E8F0FF] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#3564C4] mb-2 font-mulish">MotoCare</h1>
          <p className="text-gray-600 font-mulish">Reset Password</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-md p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2 font-mulish">Lupa Password?</h2>
          <p className="text-gray-600 text-sm mb-6 font-mulish">
            Masukkan email Anda dan kami akan mengirimkan link untuk mereset password.
          </p>

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

            {/* Info Box */}
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
              <p className="text-sm text-blue-800 font-mulish">
                📧 Pastikan Anda menggunakan email yang terdaftar di sistem kami.
              </p>
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
              {loading ? 'Mengirim...' : 'Kirim Link Reset'}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-gray-500 text-sm font-mulish">atau</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* Back to Login */}
          <Link
            href="/login"
            className="w-full py-3 rounded-xl font-medium text-center text-[#3564C4] border-2 border-[#3564C4] hover:bg-blue-50 transition font-mulish block"
          >
            Kembali ke Masuk
          </Link>
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
