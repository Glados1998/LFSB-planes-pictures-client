import Link from "next/link";

export default function Card({ plane }) {
    return (
        <div className={'bg-white rounded-md shadow-md'}>
            <div className={'p-4'}>
                <h1 className={'text-xl font-bold'}>
                    <Link href={`/gallery/${plane.id}`}>
                        {plane.name}
                    </Link>
                </h1>
            </div>
        </div>
    )
}
