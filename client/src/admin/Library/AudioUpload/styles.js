import stylish from '@dmamills/stylish';

export const [ dropzoneStyles, folderLabel ] = stylish({
  border: '2px solid rgba(0, 0, 0, 0.3)',
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
}, {
  width: '100px'
});
