import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { store } from '../store'
import { setCount } from '../store/modules/access_counter'
import { useEffect } from 'react'

function App({ Component, pageProps, router }: AppProps) {
  useEffect(() => {
    const fetchApi = async () => {
      const response = await fetch('/api/update_cookie', { method: 'POST' });
      const result = await response.json();
      const accessCount = parseInt(result.message);
      store.dispatch(setCount(accessCount));
    };
    fetchApi();
  }, [router.asPath]);

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default App;