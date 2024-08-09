// ----------------------------------------------------------------------

export const paths = {
  root: `/`,
  eCommerce: {
    root: '/',
    products: '/products',
    product: `/product`,
    cart: '/cart',
    checkout: `/checkout`,
    orderCompleted: '/order-completed',
    account: {
      root: `/account/personal`,
      personal: `/account/personal`,
      orders: `/account/orders`,
      payment: `/account/payment`,
    },
  },
  // Auth
  login: '/login',
  register: '/register',
  forgotPassword: '/forgot-password',
  // Common
  maintenance: '/maintenance',
  comingsoon: '/coming-soon',
  page404: '/error/404',
  page500: '/error/500',
  support: '/',
};
