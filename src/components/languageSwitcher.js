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
        <div className={'language_switcher'}>
            <div className={'language_switcher-button'} onClick={handleToggle}>
                {currentLocale.toUpperCase()}
            </div>
            {isOpen && (
                <div className={'language_switcher-content'}>
                    {locales.map(locale => (
                        <div
                            key={locale}
                            className={`language_switcher-content-selection ${locale === currentLocale ? 'selected' : ''}`}
                            onClick={() => handleSelect(locale)}>
                            {locale.toUpperCase()}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
