import {useEffect} from 'react';
import Image from 'next/image';

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
        <div className='image-overlay'>
            <div className='image-overlay__image'>
                <Image src={imageUrl} alt='Aircraft' width={1200} height={800}/>
            </div>
            <div className='image-overlay__footer'>
                <button className='btn' onClick={onClose}>
                    Fermer
                </button>
            </div>
        </div>
    );
}