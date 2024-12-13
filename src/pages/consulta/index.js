import { useState } from 'react';
import Head from 'next/head';
import { Accordion, AccordionDetails, AccordionSummary, Container, Typography } from '@mui/material';
import ProspectForm from '../../components/Query/ProspectForm';
import SearchWithPin from '../../components/Query/SearchWithPin';
import SearchResult from '../../components/Query/SearchResult';

const styles = {
  container: {
    py: '2rem',
  },
}

const Query = () => {
  const [step, setStep] = useState(1);

  return (
    <>
      <Head>
      <title>Cristopher | Consultar con pin</title>
      </Head>
      <Container sx={styles.container}>
        <Accordion expanded={step === 1}>
          <AccordionSummary>
            <Typography variant="h5" fontWeight="bold">Quién consulta</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ProspectForm setStep={setStep} />
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={step === 2}>
          <AccordionSummary>
            <Typography variant="h5" fontWeight="bold">Datos de consulta</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <SearchWithPin setStep={setStep} />
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={step === 3}>
          <AccordionSummary>
            <Typography variant="h5" fontWeight="bold">Resultado de la búsqueda</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <SearchResult setStep={setStep} />
          </AccordionDetails>
        </Accordion>
      </Container>
    </>
  )
}

export default Query;
