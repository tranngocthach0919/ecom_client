import { _mock } from './_mock';

// ----------------------------------------------------------------------

const NAME = [
  'Rolex Submariner',
  'Omega Seamaster',
  'Tag Heuer Carrera',
  'Casio G-Shock',
  'Seiko Prospex',
  'Citizen Eco-Drive',
  'Breitling Navitimer',
  'Patek Philippe Nautilus',
  'Audemars Piguet Royal Oak',
  'Tissot Le Locle',
  'Fossil Grant',
  'Longines HydroConquest',
  'Hamilton Khaki Field',
  'Oris Aquis Date'
];

const CATEGORIES = [
  'Luxury',
  'Luxury',
  'Sport',
  'Sport',
  'Diving',
  'Eco-friendly',
  'Aviation',
  'Luxury',
  'Luxury',
  'Dress',
  'Casual',
  'Diving',
  'Military',
  'Diving'
];




const DESCRIPTION = `
<p>Aenean viverra rhoncus pede. Etiam feugiat lorem non metus. Quisque malesuada placerat nisl.</p>

<br/>
<ul>
  <li> Aenean viverra rhoncus pede. </li>
  <li> Aenean viverra rhoncus pede. </li>
  <li> Aenean viverra rhoncus pede. </li>
  <li> Aenean viverra rhoncus pede. </li>
  <li> Aenean viverra rhoncus pede. </li>
</ul>
<br/>

<p>Aenean viverra rhoncus pede. Etiam feugiat lorem non metus. Quisque malesuada placerat nisl.</p>
`;

// ----------------------------------------------------------------------

export const _productsTable = [...Array(12)].map((_, index) => ({
  id: _mock.id(index),
  orderId: `#011120${index + 1}`,
  item: NAME[index],
  deliveryDate: _mock.time(index),
  price: _mock.number.price(index),
  status: ['Completed', 'To Process', 'Cancelled', 'Return'][index] || 'Completed',
}));

export const _products = [...Array(24)].map((_, index) => ({
  id: _mock.id(index),
  stock: 100,
  name: _mock.productName(index),
  description: DESCRIPTION,
  category: CATEGORIES[index],
  color: _mock.color(index),
  price: _mock.number.price(index),
  sold: _mock.number.nativeM(index),
  caption: _mock.description(index),
  coverUrl: _mock.image.product(index),
  ratingNumber: _mock.number.rating(index),
  totalReviews: _mock.number.nativeL(index),
  label: ['sale', 'new', 'sale', 'sale'][index] || '',
  priceSale:
    [
      _mock.number.price(1),
      _mock.number.price(2),
      _mock.number.price(3),
      _mock.number.price(4),
      _mock.number.price(5),
    ][index] || 0,
  images: [
    _mock.image.product(1),
    _mock.image.product(2),
    _mock.image.product(3),
    _mock.image.product(4),
    _mock.image.product(5),
    _mock.image.product(6),
    _mock.image.product(7),
    _mock.image.product(8),
  ],
}));
