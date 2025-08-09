import Header from './_components/Header';
import '@/app/_styles/globals.css';
import josefin from './_styles/fonts/josefin';

export const metadata = {
  title: {
    template: '%s / The Wild Oasis',
    default: 'Welcome / The Wild Oasis'
  },
  description: 'Luxuries cabin hotel, located in the heart of the italy'
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body
        className={`${josefin.variable} flex min-h-screen flex-col bg-primary-950 text-primary-100 antialiased`}
      >
        <Header />

        <div className='grid flex-1 px-8 py-12'>
          <main className='mx-auto w-full max-w-7xl'>{children}</main>
        </div>
      </body>
    </html>
  );
}
