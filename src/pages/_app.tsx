import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { useRouter } from "next/router";

const MyApp: AppType = ({ Component, pageProps }) => {
    const router = useRouter();
    const path = router.asPath;
    return <Component {...pageProps} />;
};

export default api.withTRPC(MyApp);
