import { useEffect } from 'react';
import { ThemeProvider } from 'next-themes';
import { useRouter } from 'next/router';
import ReactGA from 'react-ga';

import '../styles/globals.css';
import HighContrastProvider from '../provider/high-contrast';

const App = ({ Component, pageProps }) => {
  const router = useRouter();

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      ReactGA.initialize(process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID);
    }
  }, []);

  useEffect(() => {
    const handleRouteChange = (url) => {
      ReactGA.pageview(url);
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <HighContrastProvider>
      <ThemeProvider attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
    </HighContrastProvider>
  );
};

export default App;
