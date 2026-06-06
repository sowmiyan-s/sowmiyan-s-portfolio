import React from 'react';
import './CyberButton.css';

interface CyberButtonProps {
    text: string;
    href?: string;
    onClick?: () => void;
}

const CyberButton = ({ text, href, onClick }: CyberButtonProps) => {
    const content = (
        <>
            <span className="button-shadow" />
            <span className="button-edge" />
            <span className="button-front">
                {text}
            </span>
        </>
    );

    if (href) {
        return (
            <div className="styled-button-wrapper">
                <a href={href} className="delete-button text-center w-full min-w-[200px]" target="_blank" rel="noopener noreferrer">
                    {content}
                </a>
            </div>
        );
    }

    return (
        <div className="styled-button-wrapper">
            <button className="delete-button text-center w-full min-w-[200px]" onClick={onClick}>
                {content}
            </button>
        </div>
    );
};

export default CyberButton;
