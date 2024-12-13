import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { useRouter } from 'next/router';

import Layout from '../components/Layout';
import '../styles/globals.css';
import '@splidejs/react-splide/css';

import store from '../store';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    if(router.route !== '/' && router.route !== '/registro') {
      router.replace('/');
    }
  }, []);

  useEffect(() => {
    let idleTime = 0;
    setInterval(() => {
      idleTime ++;
      if(idleTime >= 30) {
        window.location.reload();
      }
    }, 60000);

    document.addEventListener('mousemove', () => idleTime = 0);
    document.addEventListener('keypress', () => idleTime = 0);
  }, []);

  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}

export default MyApp
