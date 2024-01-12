import React, { useEffect, forwardRef } from 'react';
import styles from './styles/input.module.css';

type TerminalInputProps = {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

const TerminalInput = forwardRef<HTMLInputElement, TerminalInputProps>(
    ({ value, onChange, onKeyPress }, ref) => {
        useEffect(() => {
            if (ref && 'current' in ref) {
                ref.current?.focus();
            }
        }, [ref]);

        return (
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
            }}>
                <span>&gt;</span>
                <input
                    ref={ref}
                    className={styles.terminalInput}
                    type="text"
                    value={value}
                    onChange={onChange}
                    onKeyPress={onKeyPress}
                    autoFocus
                />
            </div>
        );
    }
);

TerminalInput.displayName = 'TerminalInput';

export default TerminalInput;
