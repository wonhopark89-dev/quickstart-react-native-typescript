import React, { useContext } from 'react';

// @ts-ignore
export const DBContext = React.createContext<Realm>(); // context 객체를 담을 수 있다.

export const useDB = () => useContext<Realm>(DBContext);
