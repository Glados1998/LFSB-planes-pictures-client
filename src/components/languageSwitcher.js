import {useState} from "react";

export default function LanguageSwitcher() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('English');

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleSelect = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
    };

    const optionsLabel = ['Français', 'English', 'Deutsch'];

    return (
        <div className={'language_switcher'}>
            <div className={'language_switcher-button'} onClick={handleToggle}>
                {selectedOption}
            </div>
            {isOpen && (
                <div className={'language_switcher-content'}>
                    {optionsLabel.map(optionsLabel => (
                        <div
                            className={`language_switcher-content-selection ${optionsLabel === selectedOption && 'selected'}`}
                            onClick={() => handleSelect(optionsLabel)}>
                            {optionsLabel}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}