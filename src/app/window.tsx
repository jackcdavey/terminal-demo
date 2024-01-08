// A div wrapper stylized like a terminal window, with macOS window controls. Accepts children.
import React from 'react';
import styles from './TerminalWindow.module.css';

type TerminalWindowProps = {
    children: React.ReactNode;
};

const TerminalWindow: React.FC<TerminalWindowProps> = ({ children }) => {
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
                {children}
            </div>
        </div>
    );
};

export default TerminalWindow;
