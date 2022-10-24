import { defineStyleConfig } from '@chakra-ui/react';

export const Badge = defineStyleConfig({
  // The styles all button have in common
  baseStyle: {
    fontWeight: 'normal',
    textTransform: 'uppercase',
    paddingLeft: '4px',
    paddingRight: '4px',
    paddingTop: '2px',
    paddingBottom: '2px',
    fontSize: '0.6rem',
  },
  variants: {
    solid: ({ colorMode }) => ({
      bg: colorMode === 'dark' ? 'gray.900' : 'gray.200',
      color: colorMode === 'dark' ? 'white' : 'black',
    }),
    gray: ({ colorMode }) => ({
      bg: colorMode === 'dark' ? 'gray.900' : 'gray.900',
      color: 'yellow.400',
    }),
    available: {
      bg: 'yellow.400',
      color: 'black',
    },
    new: {
      bg: 'red.600',
      color: 'white',
    },
  },
  // The default size and variant values
  defaultProps: {
    size: 'sm',
    variant: 'solid',
  },
});
