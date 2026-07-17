import Head from "next/head";
import Link from "next/link";
import {useTranslations} from "next-intl";

export default function ErrorPage({statusCode}) {
    const t = useTranslations("errors");
    const isNotFound = statusCode === 404;
    const title = t(isNotFound ? "notFound.title" : "server.title");
    const message = t(isNotFound ? "notFound.message" : "server.message");

    return (
        <main
            className="container mx-auto flex min-h-[50vh] max-w-3xl flex-col items-center justify-center gap-4 px-4 py-16 text-center">
            <Head>
                <title>{statusCode} | LFSB Planes Pictures</title>
            </Head>
            <p className="text-sm font-semibold text-gray-500">{statusCode}</p>
            <h1 className="text-3xl font-bold sm:text-4xl">{title}</h1>
            <p className="max-w-xl text-gray-600">{message}</p>
            <Link
                href="/"
                className="rounded-md bg-gray-900 px-4 py-2 font-semibold text-white transition-colors hover:bg-gray-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
            >
                {t("backHome")}
            </Link>
        </main>
    );
}
