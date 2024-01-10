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
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',

        }}>
            <span>&gt;</span>
            <input
                ref={inputRef}
                className={styles.terminalInput}
                type="text"
                value={value}
                onChange={onChange}
                onKeyPress={onKeyPress}
                autoFocus
            />
        </div>
    );
};

export default TerminalInput;