import localFont from 'next/font/local';

const josefin = localFont({
  src: [
    {
      path: '../../_fonts/JosefinSans/josefin-sans-v33-latin-300.woff2',
      weight: '300',
      style: 'normal'
    },
    {
      path: '../../_fonts/JosefinSans/josefin-sans-v33-latin-300italic.woff2',
      weight: '300',
      style: 'italic'
    },
    {
      path: '../../_fonts/JosefinSans/josefin-sans-v33-latin-500.woff2',
      weight: '500',
      style: 'normal'
    },
    {
      path: '../../_fonts/JosefinSans/josefin-sans-v33-latin-500italic.woff2',
      weight: '500',
      style: 'italic'
    },
    {
      path: '../../_fonts/JosefinSans/josefin-sans-v33-latin-600.woff2',
      weight: '600',
      style: 'normal'
    },
    {
      path: '../../_fonts/JosefinSans/josefin-sans-v33-latin-600italic.woff2',
      weight: '600',
      style: 'italic'
    },
    {
      path: '../../_fonts/JosefinSans/josefin-sans-v33-latin-italic.woff2',
      weight: '400',
      style: 'italic'
    },
    {
      path: '../../_fonts/JosefinSans/josefin-sans-v33-latin-regular.woff2',
      weight: '400',
      style: 'normal'
    }
  ],
  variable: '--font-josefin',
  display: 'swap'
});

export default josefin;
