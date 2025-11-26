import React from 'react';
import { tabs } from '../theme';
import type { TabId } from '../theme';

type Props = {
  active: TabId;
  onChange: (id: TabId) => void;
};

const iconPath: Record<string, string> = {
  home: 'M3 10L12 3l9 7v10H3z',
  razor: 'M3 11h18v2H3z',
  user: 'M12 12a4 4 0 100-8 4 4 0 000 8zm0 2c-4.4 0-8 2.2-8 5v1h16v-1c0-2.8-3.6-5-8-5z',
};

export const BottomNav: React.FC<Props> = ({ active, onChange }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-black/90 border-t border-neutral-800 backdrop-blur-md">
      <div className="mx-auto flex max-w-md justify-between px-6 py-2">
        {tabs.map((tab) => {
          const isActive = tab.id === active;
          return (
            <button
              key={tab.id}
              className={`flex flex-col items-center text-xs ${
                isActive ? 'text-white' : 'text-neutral-500'
              }`}
              onClick={() => onChange(tab.id)}
            >
              <svg
                className={`mb-1 h-6 w-6 ${isActive ? '' : 'opacity-70'}`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.7}
              >
                <path d={iconPath[tab.icon]} />
              </svg>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
