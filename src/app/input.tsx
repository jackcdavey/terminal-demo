import React, { useEffect, useRef } from 'react';
import styles from './styles/input.module.css';

type TerminalInputProps = {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

const TerminalInput: React.FC<TerminalInputProps> = ({ value, onChange, onKeyPress }) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    return (
        <input
            ref={inputRef}
            className={styles.terminalInput}
            type="text"
            value={value}
            onChange={onChange}
            onKeyPress={onKeyPress}
            autoFocus
        />
    );
};

export default TerminalInput;