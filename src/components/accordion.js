import {useState} from "react";

export default function Accordion({controllerElement, children}) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className={'accordion'}>
            <div className={'accordion_header'} onClick={() => setIsExpanded(prevIsExpanded => !prevIsExpanded)}>
                {controllerElement(isExpanded)}
            </div>
            {isExpanded && (
                <div className={'accordion_content'}>
                    {children}
                </div>
            )}
        </div>
    )
}