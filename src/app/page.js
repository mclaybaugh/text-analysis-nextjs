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
  // find total word count including punctuation
  // find word count without punctuation
  // order words by count
  let wordCountWithPunct = 0;
  let wordCount = 0;
  let wordCountMap = [];
  for (let chapter of data) {
    for (let verse of chapter) {
      for (let word of verse) {
        wordCountWithPunct++;
        if (word === '׃' || word === '־') {
          // punctuation
        } else {
          wordCount++;
          wordCountMap = addToArrayUnique(word, wordCountMap);
        }
      }
    }
  }
  wordCountMap.sort((a, b) => {
    if (a.count > b.count) {
      return -1;
    } else if (a.count === b.count) {
      return 0;
    } else {
      return 1;
    }
  });
  let wordAnalysis = wordCountMap.map((word) => {
    return (
      <div>{word.word}: {word.count}</div>
    )
  })
  return (
    <div className={styles.text}>
      <div>
        <h2>Details</h2>
        <div>total word count with punctuation: {wordCountWithPunct}</div>
        <div>total word count: {wordCount}</div>
        <div>word analysis count: {wordAnalysis.length}</div>
        <div>word analysis: {wordAnalysis}</div>
      </div>
      <div>
        <h2>Text</h2>
        {chapters}
      </div>
    </div>
  )
}

function addToArrayUnique(word, arr) {
  let updated = false;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].word === word) {
      arr[i].count++;
      updated = true;
      break;
    }
  }
  if (!updated) {
    arr.push({
      word: word,
      count: 1
    });
  }
  return arr;
}