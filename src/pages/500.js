import ErrorPage from "@/components/errorPage";

export async function getStaticProps({locale}) {
    return {
        props: {
            messages: (await import(`messages/${locale}.json`)).default,
        },
    };
}

export default function ServerErrorPage() {
    return <ErrorPage statusCode={500}/>;
}
