

import Image from 'next/image'
import styles from './styles/page.module.css'


import TaglineTxt from './tagline'
import TerminalText from './terminal'
import TerminalWindow from './window'

export default function Home() {
  return (
    <main className={styles.main}>
      <TerminalWindow>
        <pre>
          {`
          _    _                  _____ _                  _            _    
         | |  | |                |_   _( )                | |          | |   
         | |__| | ___ _   _        | | |/ _ __ ___        | | __ _  ___| | __
         |  __  |/ _ \\ | | |       | |   | '_ \` _ \\   _   | |/ _\` |/ __| |/ /
         | |  | |  __/ |_| | _    _| |_  | | | | | | | |__| | (_| | (__|   < 
         |_|  |_|\\___|\\__  |( )  |_____| |_| |_| |_|  \\____/ \\____|\\___|_|\\_\\
                       __/ ||/                                              
                      |___/                                                
        `}
        </pre>
        <TaglineTxt />
        <br />
        <br />
        {/* <TerminalText /> */}
      </TerminalWindow>
    </main>
  )
}


