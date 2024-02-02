import {useEffect} from 'react';
import Image from 'next/image';
import notFound from "@/assets/images/imageNotFound.jpg";
import {MdClose} from "react-icons/md";

export default function ImageOverlay({imageUrl, onClose}) {

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    return (
        <div className='overlay'>
            <div className='overlay-column'>
                <Image src={imageUrl || notFound} alt='Aircraft' width={1200} height={800}/>
                <div className='overlay-column__side'>
                    <button onClick={onClose}>
                        <MdClose/>
                    </button>
                </div>
            </div>

        </div>
    );
}