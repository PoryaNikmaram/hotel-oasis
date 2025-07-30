import Image from 'next/image';

import logo from '../icon.png';

function Logo() {
  return (
    <a href='/' className='z-10 flex items-center gap-4'>
      <Image src={logo} height='60' width='60' alt='The Wild Oasis logo' />
      <span className='text-xl font-semibold text-primary-100'>
        The Wild Oasis
      </span>
    </a>
  );
}

export default Logo;
