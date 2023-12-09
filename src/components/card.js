import Link from "next/link";

export default function Card({ plane }) {
    return (
        <Link href={`/gallery/${plane._id}`}>
            <div>
                <span>
                   Aircraft: {plane.aircraft_name.name}
                </span>
            </div>
            <div>
                <img src={plane.image} alt={plane.aircraft_name.name}
                     />
            </div>
            <div>
                <div>
                    <span>Operator: </span>
                    <span>{plane.operator.name}</span>
                </div>
                <div >
                    <span>Registry: </span>
                    <span>{plane.aircraft_identification.registry}</span>
                </div>
                <div >
                    <span>Serial number: </span>
                    <span>{plane.aircraft_identification.serial_number}</span>
                </div>
            </div>
        </Link>
)
}
