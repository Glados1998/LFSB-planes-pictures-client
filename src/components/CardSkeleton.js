import Image from "next/image";
import notFound from "@/assets/images/imageNotFound.jpg";

export default function CardSkeleton() {

    return (
        <div className={'card-skeleton card-skeleton__shadow'}>
            <div className="card-skeleton__image">
                <Image src={notFound} alt={"search"} width={300} height={150} priority/>
            </div>
            <div className="card-skeleton__content">
                <div className="card-skeleton__content-title">
                    <h3>Chargement...</h3>
                </div>
                <div className="card-skeleton__content-subtitle">
                    <p>Chargement...</p>
                    <p>Chargement...</p>
                </div>
            </div>
            <div className="card-skeleton__footer">
                <button className="button">
                    Voir plus
                </button>
            </div>
        </div>
    )
}