import AppBar from '@mui/material/AppBar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';

import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';

import { useOffSetTop } from 'src/hooks/use-off-set-top';
import { useResponsive } from 'src/hooks/use-responsive';

import Iconify from 'src/components/iconify';
import { bgBlur } from 'src/theme/css';

import { useContext, useEffect, useMemo, useState } from 'react';
import { fetchCarts } from 'src/apis/carts/cart-list-api';
import { CartContext, CartProvider, CartTriggerContext } from 'src/contexts/cart-context';
import HeaderShadow from '../common/header-shadow';
import { HEADER } from '../config-layout';
import { navConfig } from './config-navigation';
import NavDesktop from './nav/desktop';
import NavMobile from './nav/mobile';

// ----------------------------------------------------------------------

type Props = {
  headerOnDark: boolean;
};

export default function Header({ headerOnDark }: Props) {
  const { cartItems, dispatch } = useContext(CartContext);
  
const triggerContext = useContext(CartTriggerContext) as { trigger: number };

  const cartQuantity = cartItems.length || 0;

  const fetchData = async () => {
    const cartsList = await fetchCarts();
    dispatch({ type: "SET_CART_ITEMS", payload: cartsList });
  }

  useEffect(() => {
    fetchData()
  }, [triggerContext.trigger]);

  const theme = useTheme();

  const offset = useOffSetTop();

  const mdUp = useResponsive('up', 'md');

  const renderContent = (
    <>
      <Box sx={{ lineHeight: 0, position: 'relative' }}>{/* Logo here */}</Box>

      <>
        <Stack
          flexGrow={1}
          alignItems="center"
          sx={{
            height: 1,
            display: { xs: 'none', md: 'flex' },
          }}
        >
          <NavDesktop data={navConfig} />
        </Stack>

        <Box sx={{ flexGrow: { xs: 1, md: 'unset' } }} />
      </>

      <Stack spacing={2} direction="row" alignItems="center" justifyContent="flex-end">
        <Stack
          spacing={2}
          direction="row"
          alignItems="center"
          flexGrow={1}
          justifyContent="flex-end"
        >
          {!mdUp && (
            <IconButton size="small" color="inherit" sx={{ p: 0 }}>
              <Iconify icon="carbon:search" width={24} />
            </IconButton>
          )}
          <Badge badgeContent={cartQuantity} color="error">
            <IconButton
              component={RouterLink}
              href={paths.eCommerce.cart}
              size="small"
              color="inherit"
              sx={{ p: 0 }}
            >
              <Iconify icon="carbon:shopping-cart" width={24} />
            </IconButton>
          </Badge>

          <IconButton
            component={RouterLink}
            href={paths.eCommerce.account.personal}
            size="small"
            color="inherit"
            sx={{ p: 0 }}
          >
            <Iconify icon="carbon:user" width={24} />
          </IconButton>
        </Stack>
      </Stack>

      {!mdUp && <NavMobile data={navConfig} />}
    </>
  );

  return (
    <CartProvider>
      <AppBar>
        <Toolbar
          disableGutters
          sx={{
            height: {
              xs: HEADER.H_MOBILE,
              md: HEADER.H_DESKTOP,
            },
            transition: theme.transitions.create(['height', 'background-color'], {
              easing: theme.transitions.easing.easeInOut,
              duration: theme.transitions.duration.shorter,
            }),
            ...(headerOnDark && {
              color: 'common.white',
            }),
            ...(offset && {
              ...bgBlur({ color: theme.palette.background.default }),
              color: 'text.primary',
              height: {
                md: HEADER.H_DESKTOP - 16,
              },
            }),
          }}
        >
          <Container
            sx={{
              height: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {renderContent}
          </Container>
        </Toolbar>

        {offset && <HeaderShadow />}
      </AppBar>
    </CartProvider>
  );
}
