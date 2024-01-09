'use client'

import TerminalInput from './input';
import React, { useState } from 'react';
import styles from './styles/TerminalWindow.module.css';

import { aboutCommand } from './commands/about';
import { projectsCommand } from './commands/projects';
import { helpCommand } from './commands/help';

type TerminalWindowProps = {
    children: React.ReactNode;
};

const TerminalWindow: React.FC<TerminalWindowProps> = ({ children }) => {
    const [terminalHistory, setTerminalHistory] = useState<string[]>([]);
    const [currentInput, setCurrentInput] = useState('');

    const handleCommand = (command: string) => {
        // Add the command to the terminal history
        setTerminalHistory(terminalHistory => [...terminalHistory, `> ${command}`]);

        // Parse the command
        switch (command.trim().toLowerCase()) {
            case 'help':
                const helpOutput = helpCommand();
                setTerminalHistory(terminalHistory => [...terminalHistory, helpOutput]);
                break;
            case 'clear':
                setTerminalHistory([]);
                break;
            case 'about':
                const aboutOutput = aboutCommand();
                setTerminalHistory(terminalHistory => [...terminalHistory, aboutOutput]);
                break;
            case 'projects':
                const projectsOutput = projectsCommand();
                setTerminalHistory(terminalHistory => [...terminalHistory, projectsOutput]);
                break;
            default:
                setTerminalHistory(terminalHistory => [...terminalHistory, 'Command not found']);
        }
        setCurrentInput('');
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentInput(e.target.value);
    };

    const handleInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && currentInput) {
            handleCommand(currentInput);
        }
    };

    return (
        <div className={styles.terminalWindow}>
            <div className={styles.titleBar}>
                <div className={styles.buttons}>
                    <span className={`${styles.button} ${styles.close}`}></span>
                    <span className={`${styles.button} ${styles.minimize}`}></span>
                    <span className={`${styles.button} ${styles.maximize}`}></span>
                </div>
                <div className={styles.title}>
                    {/* jack_davey –– -zsh */}
                    jackdavey.org
                </div>
            </div>
            <div className={styles.content}>
                {children && <div className={styles.children}>{children}</div>}
                {terminalHistory.map((line, index) => (
                    <pre key={index} className={styles.preformatted}>{line}</pre>
                ))}
                <TerminalInput
                    value={currentInput}
                    onChange={handleInputChange}
                    onKeyPress={handleInputKeyPress}
                />
            </div>
        </div>
    );
};

export default TerminalWindow;