import type { Note } from "../types/note";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type NoteState = {
  notes: Note[];
};

type NoteAction = {
  add: (note: Note) => void;
  update: (id: string, note: Note) => void;
  remove: (id: string) => void;
  archive: (id: string) => void;
  bookmark: (id: string) => void;
  unarchive: (id: string) => void;
  unbookmark: (id: string) => void;
};

type NoteStore = NoteState & NoteAction;

const useNotesStore = create<NoteStore>()(
  persist(
    immer((set) => ({
      notes: [],
      add: (note) =>
        set((state) => {
          state.notes.push(note);
        }),
      update: (id, updatedNote) =>
        set((state) => {
          state.notes = state.notes.map((note) =>
            note.id === id ? updatedNote : note
          );
        }),
      remove: (id) =>
        set((state) => {
          state.notes = state.notes.filter((note) => note.id !== id);
        }),
      archive: (id) =>
        set((state) => {
          state.notes = state.notes.map((note) =>
            note.id === id ? { ...note, archived: true } : note
          );
        }),
      bookmark: (id) =>
        set((state) => {
          state.notes = state.notes.map((note) =>
            note.id === id ? { ...note, bookmarked: true } : note
          );
        }),
      unarchive: (id) =>
        set((state) => {
          state.notes = state.notes.map((note) =>
            note.id === id ? { ...note, archived: false } : note
          );
        }),
      unbookmark: (id) =>
        set((state) => {
          state.notes = state.notes.map((note) =>
            note.id === id ? { ...note, bookmarked: false } : note
          );
        }),
    })),
    {
      name: "notes",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useNotesStore;
