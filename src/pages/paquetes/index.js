import Head from 'next/head';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from '@mui/material';
import BundlesSection from '../../components/Bundles/BundlesSection';

import { getBundlesList } from '../../actions/bundlesActions';

const Bundles = () => {
  const dispatch = useDispatch();
  const bundles = useSelector(state => state.bundles.list);

  useEffect(() => {
    dispatch(getBundlesList({}));
  }, []);

  const basics = useMemo(() => bundles.filter(bundle => bundle.type === 'Básicas'));
  const queries = useMemo(() => bundles.filter(bundle => bundle.type === 'Consultas'));
  const specifics = useMemo(() => bundles.filter(bundle => bundle.type === 'Consultas Específicas'));
  const tests = useMemo(() => bundles.filter(bundle => bundle.type === 'Pruebas de Confiabilidad'));

  return (
    <>
      <Head>
        <title>Cristopher | Paquetes</title>
      </Head>
      <Container>
        <h1>Paquetes</h1>
        {basics.length > 0 ? <BundlesSection title="Consultas básicas" bundles={basics} /> : null}
        {queries.length > 0 ? <BundlesSection title="Consultas completas" bundles={queries} /> : null}
        {specifics.length > 0 ? <BundlesSection title="Consultas Específicas" bundles={specifics} /> : null}
        {tests.length > 0 ? <BundlesSection title="Pruebas de Confiabilidad" bundles={tests} /> : null}
      </Container>
    </>
  );
}

export default Bundles;
