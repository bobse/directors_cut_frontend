import {
  extendTheme,
  withDefaultColorScheme,
  theme as baseTheme,
} from '@chakra-ui/react';
import { Button } from './Button';
import { Badge } from './Badge';
import { Input } from './Input';

export const customTheme = extendTheme(
  {
    config: {
      initialColorMode: 'dark',
      useSystemColorMode: false,
    },
    colors: {
      brand: baseTheme.colors.yellow,

      yellow: {
        50: '#FFFDE5',
        100: '#FFF8B8',
        200: '#FFF48A',
        300: '#FFF05C',
        400: '#FFEB2E',
        500: '#FFE700',
        600: '#CCB900',
        700: '#998B00',
        800: '#665C00',
        900: '#332E00',
      },
      red: {
        50: '#FEE6E6',
        100: '#FDBABA',
        200: '#FC8D8D',
        300: '#FA6060',
        400: '#F93434',
        500: '#F80707',
        600: '#C60606',
        700: '#950404',
        800: '#630303',
        900: '#320101',
      },
      green: {
        50: '#ECF8F6',
        100: '#CAEDE6',
        200: '#A8E1D5',
        300: '#86D5C5',
        400: '#64C9B5',
        500: '#42BDA5',
        600: '#359784',
        700: '#277263',
        800: '#1A4C42',
        900: '#0D2621',
      },
      teal: {
        50: '#EEF7F7',
        100: '#CEE9E8',
        200: '#AFDAD9',
        300: '#8FCCCA',
        400: '#70BDBB',
        500: '#50AFAC',
        600: '#408C8A',
        700: '#306967',
        800: '#204645',
        900: '#102322',
      },
      cyan: {
        50: '#E5FAFF',
        100: '#B8F2FF',
        200: '#8AE9FF',
        300: '#5CE1FF',
        400: '#2ED8FF',
        500: '#00D0FF',
        600: '#00A6CC',
        700: '#007D99',
        800: '#005366',
        900: '#002A33',
      },
      blue: {
        50: '#EDF0F8',
        100: '#CBD6EB',
        200: '#AABBDE',
        300: '#89A1D2',
        400: '#6887C5',
        500: '#476CB8',
        600: '#395693',
        700: '#2A416F',
        800: '#1C2B4A',
        900: '#0E1625',
      },
      pink: {
        50: '#FDE7EF',
        100: '#FBBCD3',
        200: '#F891B6',
        300: '#F5669A',
        400: '#F23B7E',
        500: '#EF1061',
        600: '#BF0D4E',
        700: '#90093A',
        800: '#600627',
        900: '#300313',
      },
    },
    shadows: {
      outline: 0,
    },
    fonts: {
      heading: `'Oswald', sans-serif`,
      body: `'Lato', sans-serif`,
    },
    textStyles: {
      h1: {
        fontSize: ['2.5rem', '4rem'],
        fontFamily: `'Oswald', sans-serif`,
        fontWeight: 'normal',
        lineHeight: '110%',
        letterSpacing: '-0.05rem',
        textTransform: 'uppercase',
        fontStyle: 'italic',
      },
      h2: {
        fontSize: ['1.3rem', '1.5rem'],
        fontFamily: `'Oswald', sans-serif`,
        fontWeight: '400',
        lineHeight: '110%',
        letterSpacing: '-0.05rem',
        textTransform: 'uppercase',
        fontStyle: 'italic',
      },
    },
    components: {
      Button,
      Badge,
      Input,
    },
  },

  withDefaultColorScheme({ colorScheme: 'yellow' })
);
