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
      bg: colorMode === 'dark' ? 'gray.700' : 'gray.300',
      color: colorMode === 'dark' ? 'white' : 'black',
      border: '1px',
      borderColor: colorMode === 'dark' ? 'gray.900' : 'white',
    }),
    gray: ({ colorMode }) => ({
      bg: colorMode === 'dark' ? 'gray.700' : 'gray.700',
      color: 'yellow.400',
      border: '1px',
      borderColor: colorMode === 'dark' ? 'gray.900' : 'white',
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
