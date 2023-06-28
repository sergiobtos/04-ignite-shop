import { styled } from '@stitches/react'

export const ArrowType = styled('svg', {
  width: 30,
  height: 30,
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  fill: '$white',
  cursor: 'pointer',
  left: 'auto',
  right: 5,

  variants: {
    left: {
      true: {
        left: 5,
        right: 'auto',
      },
    },
    disabled: {
      true: {
        fill: 'Gray',
      },
    },
  },
})