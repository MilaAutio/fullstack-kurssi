import './App.css'
import DiaryEntries from './components/diaryentries'
import NewEntry from './components/newEntry'
import { useState } from 'react'
import { DiaryEntry } from './types';
import { DiaryEntriesContext } from './contexts/diaryEntriesContext';

function App() {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);

  return (
    <DiaryEntriesContext.Provider value={{ diaryEntries, setDiaryEntries }}>
      <h1>Diary entries</h1>
      <NewEntry />
      <DiaryEntries />
    </DiaryEntriesContext.Provider>
  )
}

export default App
