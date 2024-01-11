import Image from 'next/image'
import styles from './page.module.css'
import { data } from './data';

export default function Home() {
  const lines = data.inthebeginning.map((words) => {
    const wordEls = words.map(word => {
      return (
        <div>
          {word}
        </div>
      )
    })
    return (
      <div className={styles.verse}>
        {wordEls}
      </div>
    );
  })
  return (
    <div className={styles.text}>
      {lines}
    </div>
  )
}

