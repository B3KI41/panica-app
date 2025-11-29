// src/components/Layout.tsx
import React from "react";
import { Header } from "./Header";
import { BottomNav } from "./BottomNav";
import type { TabId } from "./BottomNav";

type LayoutProps = {
  tab: TabId;
  onTabChange: (tab: TabId) => void;
  children: React.ReactNode;
};

export const Layout: React.FC<LayoutProps> = ({ tab, onTabChange, children }) => {
  return (
    <div className="min-h-screen bg-panika-bg text-white flex flex-col">
      {/* Верхняя шапка PANIKA */}
      <Header />

      {/* Контент экрана */}
      <main className="flex-1 px-4 pb-24 pt-6 max-w-md mx-auto w-full">
        {children}
      </main>

      {/* Нижняя навигация */}
      <BottomNav activeTab={tab} onChange={onTabChange} />
    </div>
  );
};
