import { AppProps } from 'next/app';
import GlobalStyle from './GlobalStyle';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { wrapper } from '../store';

const app = ({ Component, pageProps }: AppProps) => (
	<>
		<GlobalStyle />
		<Header />
		<Component {...pageProps} />
		<Footer />
	</>
);

export default wrapper.withRedux(app);
