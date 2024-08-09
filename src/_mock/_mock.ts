import { sub } from 'date-fns';

import {
  _id,
  _prices,
  _nativeL,
  _nativeM,
  _nativeS,
  _ratings,
  _fullNames,
  _descriptions,
  _productNames,
  _images,
  _color,
} from './assets';

// ----------------------------------------------------------------------

export const _mock = {
  id: (index: number) => _id[index],
  time: (index: number) => sub(new Date(), { days: index, hours: index }),
  // Text
  productName: (index: number) => _productNames[index],
  description: (index: number) => _descriptions[index],
  // Name
  fullName: (index: number) => _fullNames[index],
  // Number
  number: {
    rating: (index: number) => _ratings[index],
    price: (index: number) => _prices[index],
    nativeS: (index: number) => _nativeS[index],
    nativeM: (index: number) => _nativeM[index],
    nativeL: (index: number) => _nativeL[index],
  },
  // Image
  // image: {
  //   avatar: (index: number) => `/assets/images/avatar/avatar_${index + 1}.jpg`,
  //   product: (index: number) => `/assets/images/z_product/product_${index + 1}.png`,
  // },
  image: {
    avatar: (index: number) => `/assets/images/avatar/avatar_${index + 1}.jpg`,
    product: (index: number) => _images[index],
  },

  color: (index: number) => _color[index]
};
