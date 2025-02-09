import { createContext, Dispatch, SetStateAction } from 'react';
import { DiaryEntry } from '../types';

interface DiaryEntriesContextType {
  diaryEntries: DiaryEntry[];
  setDiaryEntries: Dispatch<SetStateAction<DiaryEntry[]>>;
}

export const DiaryEntriesContext = createContext<DiaryEntriesContextType>({
  diaryEntries: [],
  setDiaryEntries: () => {},
});
