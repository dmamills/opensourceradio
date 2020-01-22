import stylish from '@dmamills/stylish';

export const [ dropzoneStyles, folderLabel ] = stylish({
  border: '2px solid rgba(0, 0, 0, 0.3)',
  height: '200px',
  cursor: 'pointer',
  overflowY: 'scroll',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
}, {
  width: '100px'
});
