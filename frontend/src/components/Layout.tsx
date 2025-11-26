import React from 'react';
import { BottomNav } from './BottomNav';
import { Header } from './Header';
import type { TabId } from '../theme';

type Props = {
  tab: TabId;
  onTabChange: (id: TabId) => void;
  children: React.ReactNode;
};

export const Layout: React.FC<Props> = ({ tab, onTabChange, children }) => {
  return (
    <div className="min-h-screen bg-panica-bg text-panica-text">
      <div className="mx-auto flex min-h-screen max-w-md flex-col px-4 pb-20 pt-6">
        <Header />
        <main className="mt-3 flex-1 space-y-4">{children}</main>
      </div>
      <BottomNav active={tab} onChange={onTabChange} />
    </div>
  );
};
