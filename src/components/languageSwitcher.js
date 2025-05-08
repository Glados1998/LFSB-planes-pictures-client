import {useState} from "react";
import {useRouter} from 'next/router';

export default function LanguageSwitcher() {
    const [isOpen, setIsOpen] = useState(false);
    const {locales, locale: currentLocale, pathname, query} = useRouter();
    const router = useRouter();

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleSelect = (locale) => {
        router.push({pathname, query}, pathname, {locale});
        setIsOpen(false);
    };

    return (
        <div className={''}>
            <div className={''} onClick={handleToggle}>
                {currentLocale.toUpperCase()}
            </div>
            {isOpen && (
                <div className={''}>
                    {locales.map(locale => (
                        <div
                            key={locale}
                            className={` ${locale === currentLocale ? 'selected' : ''}`}
                            onClick={() => handleSelect(locale)}>
                            {locale.toUpperCase()}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
