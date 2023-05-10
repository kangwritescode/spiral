import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { CocktailContextProvider } from "~/context/CocktailContext";

const MyApp: AppType = ({ Component, pageProps }) => {
    return (
        <CocktailContextProvider>
            <Component {...pageProps} />
        </CocktailContextProvider>
    );
};

export default api.withTRPC(MyApp);
