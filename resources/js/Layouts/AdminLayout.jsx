import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import {
  Menu,
  X,
  Bell,
  LogOut,
  LayoutDashboard,
  Users,
  Settings,
  Wrench,
  Package,
  ShoppingCart,
  Car,
  ChevronDown,
} from 'lucide-react';

export default function AdminLayout({ children, title = 'Dashboard' }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);
  const { url } = usePage();

  const menuItems = [
    { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Manajemen Akun', href: '/admin/accounts', icon: Users },
    { label: 'Manajemen Workshop', href: '/admin/workshops', icon: Wrench },
    { label: 'Manajemen Services', href: '/admin/services', icon: Package },
    { label: 'Manajemen Vehicles', href: '/admin/vehicles', icon: Car },
    { label: 'Orders', href: '/admin/orders', icon: ShoppingCart },
  ];

  const isActive = (href) => url.startsWith(href);

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen bg-white border-r border-gray-200 transition-all duration-300 z-40 ${
          sidebarOpen ? 'w-64' : 'w-20'
        }`}
      >
        <div className="p-6 flex items-center justify-between">
          {sidebarOpen && (
            <h1 className="text-2xl font-bold text-primary">MotoCare</h1>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1 hover:bg-gray-100 rounded-lg transition"
          >
            {sidebarOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="px-4 mt-8 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  active
                    ? 'bg-primary-light text-primary font-semibold shadow-sm'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-30">
          <div className="px-6 py-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">{title}</h2>

            <div className="flex items-center gap-6">
              {/* Notifications */}
              <div className="relative">
                <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition">
                  <Bell className="w-6 h-6" />
                  <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                </button>
              </div>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-3 hover:bg-gray-100 px-3 py-2 rounded-lg transition"
                >
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-semibold">
                    AD
                  </div>
                  {sidebarOpen && (
                    <>
                      <span className="text-sm font-medium text-gray-700">Admin</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          profileOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </>
                  )}
                </button>

                {/* Dropdown Menu */}
                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                    <Link
                      href="/admin/profile"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                    >
                      Profile Saya
                    </Link>
                    <Link
                      href="/admin/settings"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                    >
                      Pengaturan
                    </Link>
                    <hr className="my-2" />
                    <Link
                      href="/logout"
                      method="post"
                      as="button"
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 flex items-center gap-2 transition"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
