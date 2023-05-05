import type { AppProps } from 'next/app'
import { globalStyles } from '../styles/global'

import Image from 'next/image';
import logoImg from '../assets/logo.svg'
import { Container, Header } from '../styles/pages/app';
import Link from 'next/link';

globalStyles();

export default function App({ Component, pageProps }: AppProps) {  
  return (
    <Container>
      <Header>
        <Link href='/'>
          <Image src={logoImg.src} width={120} height={80} alt="" />
        </Link>
      </Header>

      <Component {...pageProps} />
    </Container>
  )
}
