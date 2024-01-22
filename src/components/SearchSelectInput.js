import React, {useEffect, useRef, useState} from 'react';

function SearchSelectInput({options, onSelect}) {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredOptions, setFilteredOptions] = useState(options);
    const [showOptions, setShowOptions] = useState(false);
    const wrapperRef = useRef(null);

    useEffect(() => {
        // Filter the options based on the search query
        if (searchQuery) {
            const filtered = options.filter(option =>
                option.attributes.label.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredOptions(filtered);
        } else {
            setFilteredOptions(options);
        }
    }, [searchQuery, options]);


    const handleInputChange = (event) => {
        setSearchQuery(event.target.value);
        setShowOptions(true);
    };

    const handleInputFocus = () => {
        setShowOptions(true);
    };

    const handleSelectOption = (option) => {
        setSearchQuery(option.attributes.label);
        setShowOptions(false);
        onSelect(option); // Pass the entire option object
    };


    // Click outside to close options list
    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setShowOptions(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [wrapperRef]);

    return (
        <div ref={wrapperRef}>
            <input
                type="text"
                value={searchQuery}
                onFocus={handleInputFocus}
                onChange={handleInputChange}
                placeholder="Search..."
            />
            {showOptions && (
                <ul>
                    {filteredOptions.map((option) => (
                        <li key={option.id} onClick={() => handleSelectOption(option)}>
                            {option.attributes.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default SearchSelectInput;