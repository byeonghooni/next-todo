import App, { AppContext, AppProps, AppInitialProps } from 'next/app';
import GlobalStyle from './GlobalStyle';

const app = ({ Component, pageProps }: AppProps) => {
	return (
		<>
			<GlobalStyle />
			<Component {...pageProps} />
		</>
	);
};

export default app;
