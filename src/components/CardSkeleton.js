import Image from "next/image";
import notFound from "@/assets/images/imageNotFound.jpg";

export default function CardSkeleton() {

    return (
        <div className={'card card__shadow'}>
            <div className="card__image">
                <Image src={notFound} alt={"search"} width={300} height={150} priority/>
            </div>
            <div className="card__content">
                <div className="card__content-title">
                    <h3>Chargement...</h3>
                </div>
                <div className="card__content-subtitle">
                    <p>Chargement...</p>
                    <p>Chargement...</p>
                </div>
            </div>
            <div className="card__footer">
                <button className="button">
                    Voir plus
                </button>
            </div>
        </div>
    )
}