const BASE_URL = 'https://api.coinpaprika.com/v1';
const COINS_URL = `${BASE_URL}/coins`;

export const coins = () => fetch(COINS_URL).then((res) => res.json());

export const info = (queryKey: string) => fetch(`${COINS_URL}/${queryKey}`).then((response) => response.json());

export const history = (queryKey: string) =>
  fetch(`${BASE_URL}/tickers/${queryKey}/historical?start=${new Date().toISOString().split('T')[0]}&interval=30m`).then(
    (response) => response.json(),
  );
