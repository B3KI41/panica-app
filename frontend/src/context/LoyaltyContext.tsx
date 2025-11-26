import React, { createContext, useContext, useEffect, useState } from 'react';
import type { LoyaltyInfo } from '../api/loyalty';
import { fetchLoyalty } from '../api/loyalty';

type LoyaltyContextType = {
  data: LoyaltyInfo | null;
  isLoading: boolean;
  refresh: () => void;
};

const LoyaltyContext = createContext<LoyaltyContextType>({
  data: null,
  isLoading: true,
  refresh: () => {},
});

export const useLoyalty = () => useContext(LoyaltyContext);

export const LoyaltyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<LoyaltyInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const load = () => {
    setIsLoading(true);
    fetchLoyalty()
      .then(setData)
      .catch(() => setData(null))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <LoyaltyContext.Provider value={{ data, isLoading, refresh: load }}>
      {children}
    </LoyaltyContext.Provider>
  );
};
