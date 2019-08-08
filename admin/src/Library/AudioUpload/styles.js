import stylish from '@dmamills/stylish';

export const [ dropzoneStyles, folderLabel, previewText ] = stylish({
  border: '2px solid rgba(0, 0, 0, 0.3)',
  height: '200px',
  cursor: 'pointer',
  overflowY: 'scroll',
  display: 'flex',
  flexDirection: 'column',
}, {
  width: '100px'
}, {
  textAlign: 'center',
  flex: '1',
  alignSelf: 'center',
  justifySelf: 'center',
});
