import Image from 'next/image'
import styles from './page.module.css'
import { data } from './data';

export default function Home() {
  const chapters = data.map((chapter, i) => {
    const verses = chapter.map((words, i) => {
      const wordEls = words.map(word => {
        return (
          <div className={styles.word}>
            {word}
          </div>
        )
      })
      const verseNum = i + 1;
      return (
        <div className={styles.verse}>
          <div className={styles.verseNum}>{verseNum}</div>
          {wordEls}
        </div>
      );
    })
    const chapterNum = i + 1;
    return (
      <div className={styles.chapter}>
        <h3>{chapterNum}</h3>
        {verses}
      </div>
    )
  })
  
  return (
    <div className={styles.text}>
      <div>
        <h2>Details</h2>
      </div>
      <div>
        <h2>Text</h2>
        {chapters}
      </div>
    </div>
  )
}

