"use client";

import { Bell, UserCircle2, TrendingUp } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">

      <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-5">

        {/* Logo */}

        <div className="flex items-center gap-3">

          <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">

            <TrendingUp size={26} />

          </div>

          <div>

            <h1 className="text-2xl font-bold">
              InvestAI
            </h1>

            <p className="text-xs text-slate-400">
              AI Investment Research Agent
            </p>

          </div>

        </div>

        {/* Right */}

        <div className="flex items-center gap-5">

          <button className="hover:text-blue-400 transition">

            <Bell size={22} />

          </button>

          <button>

            <UserCircle2
              size={36}
              className="text-slate-300 hover:text-blue-400 transition"
            />

          </button>

        </div>

      </div>

    </nav>
  );
}