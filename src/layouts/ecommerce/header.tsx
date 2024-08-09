import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { alpha, useTheme } from '@mui/material/styles';

import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';

import { useResponsive } from 'src/hooks/use-responsive';

import { bgGradient } from 'src/theme/css';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function Header() {
  const theme = useTheme();

  const mdUp = useResponsive('up', 'md');

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_1.jpg',
        }),
      }}
    >
      <Container
        sx={{
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          height: { xs: 64, md: 72 },
        }}
      >
        <Stack
          spacing={3}
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
          <Badge badgeContent={4} color="error">
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
      </Container>
    </Box>
  );
}
