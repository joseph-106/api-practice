import { NextComponentType } from "next";
import { AppContext, AppInitialProps, AppProps } from "next/app";
import "./index.scss";

const App: NextComponentType<AppContext, AppInitialProps, AppProps> = ({
  Component,
  pageProps,
}) => <Component {...pageProps} />;

App.getInitialProps = async ({
  Component,
  ctx,
}: AppContext): Promise<AppInitialProps> => {
  const pageProps = await Component.getInitialProps?.(ctx);
  return { pageProps };
};

export default App;
