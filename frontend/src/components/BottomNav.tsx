// src/components/BottomNav.tsx
import React from "react";
import { Home, Users, User } from "lucide-react";

export type TabId = "home" | "barbers" | "profile";

type BottomNavProps = {
  activeTab: TabId;
  onChange: (tab: TabId) => void;
};

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onChange }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-black/90 border-t border-neutral-800">
      <div className="mx-auto flex max-w-md items-center justify-between px-8 py-3 text-xs text-neutral-400">
        <button
          className={`flex flex-col items-center gap-1 ${
            activeTab === "home" ? "text-white" : ""
          }`}
          onClick={() => onChange("home")}
        >
          <Home size={20} />
          <span>Главная</span>
        </button>

        <button
          className={`flex flex-col items-center gap-1 ${
            activeTab === "barbers" ? "text-white" : ""
          }`}
          onClick={() => onChange("barbers")}
        >
          <Users size={20} />
          <span>Мастера</span>
        </button>

        <button
          className={`flex flex-col items-center gap-1 ${
            activeTab === "profile" ? "text-white" : ""
          }`}
          onClick={() => onChange("profile")}
        >
          <User size={20} />
          <span>Профиль</span>
        </button>
      </div>
    </nav>
  );
};
