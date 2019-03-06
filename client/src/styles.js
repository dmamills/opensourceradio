import stylish from '@dmamills/stylish';

const [ 
  flex,
  alignItemsCenter,
  flexCenter,
  column,
  spacedEvenly,
  flexGrow,
  flex2,
  textCenter,
  listStyleNone,
  p1,
  p05,
  p0,
  m0,
 ] = stylish(
  { display: 'flex' },
  { alignItems: 'center' },
  { alignItems: 'center', justifyContent: 'center' },
  { flexDirection: 'column' },
  { justifyContent: 'space-evenly' },
  { flexGrow: '1' },
  { flex: '2' },
  { textAlign: 'center' },
  { listStyleType: 'none' },
  { padding: '1rem' },
  { padding: '0.5rem' },
  { padding: '0' },
  { margin: '0' },
);


export default {
  flex,
  alignItemsCenter,
  flexCenter,
  column,
  spacedEvenly,
  flexGrow,
  flex2,
  textCenter,
  p1,
  p05,
  m0,
  p0,
  listStyleNone,
}