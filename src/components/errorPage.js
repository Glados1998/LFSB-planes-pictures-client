import Head from "next/head";
import Link from "next/link";
import {useTranslations} from "next-intl";
import {Button} from "@/components/ui/button";

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
            <Button asChild variant="outline">
                <Link href="/">{t("backHome")}</Link>
            </Button>
        </main>
    );
}
