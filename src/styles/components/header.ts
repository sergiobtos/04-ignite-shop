import { styled } from '@stitches/react'

export const HeaderContainer = styled('header', {
  padding: '2rem 0',
  width: '100%',
  maxWidth: 1180,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',

  position: 'fixed',
  top: 0,
  left: '50%',

  transform: 'translateX(-50%)',
  zIndex: '9999',
})

export const BagLink = styled('button', {
  width: 48,
  height: 48,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 8,
  border: 'none',
  position: 'relative',
  cursor: 'pointer',

  backgroundColor: '$elements',
  color: '$text',

  span: {
    width: 24,
    height: 24,
    position: 'absolute',
    top: '-12px',
    right: '-12px',
    borderRadius: '50%',

    backgroundColor: '$green',
    color: '$white',
    outline: '$background solid',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  variants: {
    empty: {
      true: {
        color: '$icon',
      },
    },
  },
})