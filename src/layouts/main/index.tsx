import Box, { BoxProps } from '@mui/material/Box';

import Header from './header';
import Footer from './footer';
import { HEADER } from '../config-layout';
import { CartProvider } from 'src/contexts/cart-context';

// ----------------------------------------------------------------------

type Props = BoxProps & {
  children: React.ReactNode;
  headerOnDark?: boolean;
  disabledSpacing?: boolean;
};

export default function MainLayout({
  children,
  headerOnDark = false,
  disabledSpacing = false,
  sx,
  ...other
}: Props) {
  return (
    <CartProvider>
      <Box
        sx={{
          height: 1,
          display: 'flex',
          flexDirection: 'column',
          ...sx,
        }}
        {...other}
      >
        <Header headerOnDark={headerOnDark} />

        <Box component="main" sx={{ flexGrow: 1 }}>
          {!(disabledSpacing || headerOnDark) && (
            <Box
              sx={{
                height: { xs: HEADER.H_MOBILE, md: HEADER.H_DESKTOP },
              }}
            />
          )}

          {children}
        </Box>

        <Footer />
      </Box>
    </CartProvider>
  );
}
