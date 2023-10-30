import Link from "next/link";

export default function Card({ plane }) {
    return (
        <Link href={`/gallery/${plane._id}`}
              className={'bg-white rounded-md shadow hover:shadow-md p-4 grid grid-flow-row gap-3 w-auto h-auto'}>
            <div>
                <span className={'text-lg font-bold'}>
                   Aircraft: {plane.aircraft_name.name}
                </span>
            </div>
            <div className={'aspect-h-1 aspect-w-1 w-full overflow-hidden'}>
                <img src={plane.image} alt={plane.aircraft_name.name}
                     className={'rounded-md object-cover object-center'}/>
            </div>
            <div className={'mt-3'}>
                <div className={'grid grid-flow-col gap-2'}>
                    <span className={'font-bold'}>Operator: </span>
                    <span>{plane.operator.name}</span>
                </div>
                <div className={'grid grid-flow-col gap-2'}>
                    <span className={'font-bold'}>Registry: </span>
                    <span>{plane.aircraft_identification.registry}</span>
                </div>
                <div className={'grid grid-flow-col gap-2'}>
                    <span className={'font-bold'}>Serial number: </span>
                    <span>{plane.aircraft_identification.serial_number}</span>
                </div>
            </div>
        </Link>
)
}
