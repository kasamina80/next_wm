import type { AppProps } from 'next/app'
import { useEffect } from 'react';

function App({ Component, pageProps, router }: AppProps) {
  useEffect(() => {
	  console.log("app useEffect called!");
  },[router.asPath]);

  return <Component {...pageProps} />
}

export default App;
