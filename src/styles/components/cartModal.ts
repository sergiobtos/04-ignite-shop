import { styled } from '@stitches/react'
import * as Dialog from '@radix-ui/react-dialog'

export const CartContent = styled('div', {
  height: '100%',
  display: 'flex',
  flexDirection: 'column',

  strong: {
    fontSize: '$lg',
  },
})

export const BodyCart = styled('section', {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
})

export const FooterCart = styled('footer', {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  button: {
    marginTop: 'auto',
    backgroundColor: '$green',
    border: 0,
    color: '$white',
    borderRadius: 8,
    padding: '1.25rem',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '$md',
    transition: 'all 0.2s',

    '&:disabled': {
      opacity: 0.6,
      cursor: 'not-allowed',
    },

    '&:enabled:hover': {
      backgroundColor: '$green-light',
    },
  },
  p: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '$md',

    '&:last-of-type': {
      fontWeight: 'bold',
      span: {
        '&:last-of-type': {
          fontSize: '$xl',
        },
      },
    },
  },
})

export const CartList = styled('div', {
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  marginTop: '2rem',
})

export const Item = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '1.25rem',
})

export const ItemImage = styled('div', {
  width: '6.375rem',
  height: '5.8125rem',
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',

  borderRadius: 8,
})
export const ItemDescription = styled('div', {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
  alignItems: 'flex-start',

  p: {
    fontSize: '$md',
    color: '$text',
  },

  strong: {
    display: 'block',
    fontSize: '$md',
  },

  button: {
    background: 'none',
    border: 'none',
    fontWeight: 'bold',
    color: '$green',

    cursor: 'pointer',
  },
  div: {
    display: 'flex',
    gap: '1rem',
  },
})

export const DialogContent = styled(Dialog.Content, {
  width: '100%',
  maxWidth: 480,
  height: '100vh',
  padding: '4.5rem 3rem',
  backgroundColor: '$elements',
  position: 'fixed',
  top: 0,
  right: 0,
  zIndex: 9999,
})
export const DialogClose = styled(Dialog.Close, {
  width: '3rem',
  height: '3rem',
  position: 'absolute',
  border: 'none',
  top: 20,
  right: 20,
  cursor: 'pointer',

  backgroundColor: 'transparent',
  color: '$icon',
})