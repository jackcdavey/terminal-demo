

import Image from 'next/image'
import styles from './page.module.css'

import TerminalText from './terminal'

export default function Home() {
  return (
    <main className={styles.main}>

      <pre>
        {`
          _    _                  _____ _                  _            _    
         | |  | |                |_   _( )                | |          | |   
         | |__| | ___ _   _        | | |/ _ __ ___        | | __ _  ___| | __
         |  __  |/ _ \\ | | |       | |   | '_ \` _ \\   _   | |/ _\` |/ __| |/ /
         | |  | |  __/ |_| |      _| |_  | | | | | | | |__| | (_| | (__|   < 
         |_|  |_|\___|\\__,  |( )  |_____| |_| |_| |_|  \\____/ \\__,_|\____|_|\\_\\
                       __/ |/                                              
                      |___/                                                
        `}
      </pre>

      <TerminalText />
      <p>
        Hi, Im Jack
      </p>
    </main>
  )
}

