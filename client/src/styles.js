import stylish from '@dmamills/stylish';

export const [
  flex,
  alignItemsCenter,
  flexCenter,
  column,
  spacedEvenly,
  spaceBetween,
  justifyEnd,
  flexGrow,
  flex2,
  alignSelfCenter,
] = stylish(
  { display: 'flex' },
  { alignItems: 'center' },
  { alignItems: 'center', justifyContent: 'center' },
  { flexDirection: 'column' },
  { justifyContent: 'space-evenly' },
  { justifyContent: 'space-between' },
  { justifyContent: 'flex-end' },
  { flexGrow: '1' },
  { flex: '2' },
  { alignSelf: 'center' },
);

export const [
  whiteText,
  lightGreyText,
  textCenter,
  listStyleNone,
  debugBox,
 ] = stylish(
  { color: 'white' },
  { color: '#C8C8C8' },
  { textAlign: 'center' },
  { listStyleType: 'none' },
  { border: '1px solid black' },
);

export const link = stylish({
  color: '#FFF', 
  ':hover': { color: '#C8C8C8' }
});

export const [
  p0,
  p05,
  p1,
  p2
] = stylish(
  { padding: '0' },
  { padding: '0.5rem' },
  { padding: '1rem' },
  { padding: '2rem' },
);

export const [
  ph0,
  ph05,
  ph1,
  ph2
] = stylish(
  { padding: '0 0' },
  { padding: '0 0.5rem' },
  { padding: '0 1rem' },
  { padding: '0 2rem' },
);



export const [
  mr0,
  mr05,
  mr1,
  mr2
] = stylish(
  { marginRight: '0' },
  { marginRight: '0.5rem' },
  { marginRight: '1rem' },
  { marginRight: '2rem' },
);

export const [
  ml0,
  ml05,
  ml1,
  ml2
] = stylish(
  { marginLeft: '0' },
  { marginLeft: '0.5rem' },
  { marginLeft: '1rem' },
  { marginLeft: '2rem' },
);

export const [
  m0,
  m05,
  m1,
  m2
] = stylish(
  { margin: '0' },
  { margin: '0.5rem' },
  { margin: '1rem' },
  { margin: '2rem' },
);