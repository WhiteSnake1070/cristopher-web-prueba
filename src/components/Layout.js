import { ThemeProvider } from '@mui/material';
import FeedbackAlert from '../components/FeedbackAlert';
import LoadingDialog from '../components/LoadingDialog';
import ErrorsDialog from '../components/ErrorsDialog';

import AppNavbar from './AppNavbar';

import theme from '../config/theme';
import AppFooter from './AppFooter';

const Layout = props => {
  return (
    <ThemeProvider theme={theme}>
      <AppNavbar />
      <main>
        {props.children}
      </main>
      <AppFooter />
      <LoadingDialog />
      <FeedbackAlert />
      <ErrorsDialog />
    </ThemeProvider>
  );
}

export default Layout;
