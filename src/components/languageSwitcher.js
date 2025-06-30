import {useRouter} from 'next/router';
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {Check} from "lucide-react";

/**
 * LanguageSwitcher component provides a dropdown menu for switching between available locales.
 * Utilizes Next.js router for locale management and navigation.
 *
 * @component
 * @returns {JSX.Element} The rendered language switcher dropdown.
 */
export default function LanguageSwitcher() {
    const {locales, locale: currentLocale, pathname, query} = useRouter();
    const router = useRouter();

    /**
     * Handles locale selection and navigates to the same route with the selected locale.
     *
     * @param {string} locale - The locale to switch to.
     */
    const handleSelect = (locale) => {
        router.push({pathname, query}, pathname, {locale});
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-[60px]">
                    {currentLocale.toUpperCase()}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[60px]">
                {locales.map((locale) => (
                    <DropdownMenuItem
                        key={locale}
                        onClick={() => handleSelect(locale)}
                    >
                        <span>{locale.toUpperCase()}</span>
                        {locale === currentLocale && <Check className="ml-auto h-4 w-4"/>}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
