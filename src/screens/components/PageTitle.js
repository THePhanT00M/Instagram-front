import { Helmet } from "react-helmet-async";

function PageTitle({ title, lang = "ko" }) {
    return (
        <Helmet>
            <html lang={lang} />
            <title>{title} | Instagram</title>
        </Helmet>
    );
}

export default PageTitle;
