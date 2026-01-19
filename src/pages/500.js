export async function getStaticProps({locale}) {
    return {
        props: {
            messages: (await import(`../messages/${locale}.json`)).default
        }
    };
}

export default function Custom500() {
    return <h1>500 - Server-side error occurred</h1>
}
