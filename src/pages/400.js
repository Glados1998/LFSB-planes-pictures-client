export async function getStaticProps({locale}) {
    return {
        props: {
            messages: (await import(`../messages/${locale}.json`)).default
        }
    };
}

export default function Custom404() {
    return <h1>404 - Page Not Found</h1>
}
