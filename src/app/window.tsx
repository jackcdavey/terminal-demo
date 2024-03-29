'use client'

import TerminalInput from './input';
import React, { useState, useEffect, useRef } from 'react';
import styles from './styles/TerminalWindow.module.css';

import { aboutCommand } from './commands/about';
import { projectsCommand } from './commands/projects';
import { helpCommand } from './commands/help';
import { contactCommand, ContactCommandState } from './commands/contact';
import { bannerCommand } from './commands/banner';
import { resumeCommand } from './commands/resume';
import { blackjackCommand, BlackjackGameState } from './commands/blackjack';

type TerminalWindowProps = {
    children: React.ReactNode;
};



const TerminalWindow: React.FC<TerminalWindowProps> = ({ children }) => {
    const [terminalHistory, setTerminalHistory] = useState<string[]>([]);
    const [currentInput, setCurrentInput] = useState('');
    const [isMaximized, setIsMaximized] = useState(false);
    const [currentCommand, setCurrentCommand] = useState<null | string>(null);
    const [contactState, setContactState] = useState<ContactCommandState>('IDLE');

    // For scrolling to the bottom of the terminal when new content is added
    const contentRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (contentRef.current) {
            contentRef.current.scrollTop = contentRef.current.scrollHeight;
        }
    }, [terminalHistory]);


    const [blackjackState, setBlackjackState] = useState<BlackjackGameState>({
        deck: [],
        playerHand: [],
        dealerHand: [],
        status: "idle"
    });


    // For focusing the input when the user clicks anywhere on the terminal
    const inputRef = useRef<HTMLInputElement>(null);
    const focusInput = () => {
        inputRef.current?.focus();
    };

    useEffect(() => {
        document.addEventListener('click', focusInput);
        return () => {
            document.removeEventListener('click', focusInput);
        };
    }, []);

    useEffect(() => {
        if (contactState === 'IDLE') {
            setCurrentCommand(null);
        }
    }, [contactState]);

    const handleCommandInput = (input: string) => {
        if (currentCommand) {
            const output = handleOngoingCommand(input);
            setTerminalHistory(terminalHistory => [...terminalHistory, `> ${input}`, output]);
        } else {
            handleCommand(input);
        }
        setCurrentInput('');
    };

    const updateTerminalHistory = (message: string) => {
        setTerminalHistory(terminalHistory => [...terminalHistory, message]);
    };

    const handleOngoingCommand = (input: string): string => {
        let output = '';
        switch (currentCommand) {
            case 'contact':
                output = contactCommand(input, contactState, setContactState, updateTerminalHistory);
                break;
            // ... other cases
        }
        return output;
    };

    // Render URLs as clickable links
    const renderWithLinks = (text: string) => {
        const urlPattern = /\[Link: (https?:\/\/[^\]]+)\]/g;
        const parts = text.split(urlPattern);

        return parts.map((part, index) => {
            // Check if 'part' is a URL
            if (part.match(/^https?:\/\//)) {
                return <a href={part} target="_blank" rel="noopener noreferrer" key={index}>{part}</a>;
            }
            return part;
        });
    };


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
            case 'banner':
                const bannerOutput = bannerCommand();
                setTerminalHistory(terminalHistory => [...terminalHistory, bannerOutput]);
                break;
            case 'about':
                const aboutOutput = aboutCommand();
                setTerminalHistory(terminalHistory => [...terminalHistory, aboutOutput]);
                break;
            case 'resume':
                const resumeOutput = resumeCommand();
                setTerminalHistory(terminalHistory => [...terminalHistory, `> ${command}`, resumeOutput]);
                window.open('/resume.png', '_blank');
                break;
            case 'projects':
                const projectsOutput = projectsCommand();
                setTerminalHistory(terminalHistory => [...terminalHistory, projectsOutput]);
                break;
            case 'blackjack start':
            case 'blackjack hit':
            case 'blackjack stand':
                const blackjackCommandInput = command.trim().substring(10).trim();
                const blackjackOutput = blackjackCommand(blackjackCommandInput, blackjackState, setBlackjackState);
                setTerminalHistory(terminalHistory => [...terminalHistory, blackjackOutput]);
                break;

            case 'contact':
                setCurrentCommand('contact');
                const contactOutput = contactCommand('', contactState, setContactState, updateTerminalHistory);
                setTerminalHistory(terminalHistory => [...terminalHistory, contactOutput]);
                break;
            default:
                if (currentCommand) {
                    // If there's an ongoing command, reset it
                    setCurrentCommand(null);
                }
                setTerminalHistory(terminalHistory => [...terminalHistory, 'Command not found']);
        }
        setCurrentInput('');
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentInput(e.target.value);
    };

    const handleInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && currentInput) {
            handleCommandInput(currentInput);
        }
    };

    const handleMinimizeClick = () => {
        // Redirect to the main website
        window.location.href = 'https://jackdavey.org';
    };

    const handleCloseClick = () => {
        // Redirect to the main website
        window.location.href = 'https://jackdavey.org';
    };

    const handleMaximizeClick = () => {
        // Adjust the terminal window to be 100vw x 100vh
        setIsMaximized(!isMaximized);
    };

    return (
        <div className={`${styles.terminalWindow} ${isMaximized ? styles.maximized : ''}`}>
            <div className={`${styles.titleBar} ${isMaximized ? styles.maximizedTitleBar : ''}`}>
                <div className={styles.buttons}>
                    <span className={`${styles.button} ${styles.close}`} onClick={handleCloseClick} />
                    <span className={`${styles.button} ${styles.minimize}`} onClick={handleMinimizeClick} />
                    <span className={`${styles.button} ${styles.maximize}`} onClick={handleMaximizeClick} />

                </div>
                <div className={styles.title}>
                    {/* jack_davey –– -zsh */}
                    jackdavey.org
                </div>
            </div>
            <div className={styles.content} ref={contentRef}>
                {children && <div className={styles.children}>{children}</div>}
                {terminalHistory.map((line, index) => (
                    <pre key={index} className={styles.preformatted}>{renderWithLinks(line)}</pre>
                ))}
                <TerminalInput
                    ref={inputRef}
                    value={currentInput}
                    onChange={handleInputChange}
                    onKeyPress={handleInputKeyPress}
                />
            </div>
        </div>
    );
};

export default TerminalWindow;