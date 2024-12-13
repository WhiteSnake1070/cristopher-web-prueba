import BundleCard from '../../components/Bundles/BundleCard';
import { Box, Grid } from '@mui/material';

const styles = {
  container: {
    justifyContent: 'center',
  }
}

const BundlesSection = props => {
  return (
    <Box>
      <h2>{props.title}</h2>
      <Grid container sx={styles.container}>
        {props.bundles.map(bundle => <BundleCard key={bundle._id} {...bundle} />)}
      </Grid>
    </Box>
  );
}

export default BundlesSection;
