import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { HomeScreen } from './pages/HomeScreen';
import { BarbersScreen } from './pages/BarbersScreen';
import { ProfileScreen } from './pages/ProfileScreen';
import type { TabId } from './theme';

export const App: React.FC = () => {
  const [tab, setTab] = useState<TabId>('home');

  return (
    <Layout tab={tab} onTabChange={setTab}>
      {tab === 'home' && <HomeScreen goToBarbers={() => setTab('barbers')} />}
      {tab === 'barbers' && <BarbersScreen />}
      {tab === 'profile' && <ProfileScreen />}
    </Layout>
  );
};
