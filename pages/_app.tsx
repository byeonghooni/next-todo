import { AppProps } from 'next/app';
import GlobalStyle from './GlobalStyle';
import Header from '../components/Header';

const app = ({ Component, pageProps }: AppProps) => (
	<>
		<GlobalStyle />
		<Header />
		<Component {...pageProps} />
	</>
);

export default app;
