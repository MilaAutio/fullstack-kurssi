import { useEffect, useState } from 'react'
import './App.css'
import DiaryEntries from './components/diaryentries'
import axios from 'axios'
import { DiaryEntry } from './types'

function App() {

  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/diaries').then(response => {
      setDiaryEntries(response.data)
    })
  }, [])

  return (
    <>
      <h1>Diary entries</h1>
      <DiaryEntries diaryEntries={diaryEntries} />
    </>
  )
}

export default App
