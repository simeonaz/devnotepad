export type Note = {
  id: string;
  title: string;
  content: string;
  category: string;
  createdAt: string; // ISO date string
};

const STORAGE_KEY = "devtools_notes";

export function useNotes() {
  const notes = ref<Note[]>([]);

  if (process.client) {
    notes.value = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]").sort(
      (a: Note, b: Note) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  function loadNotes() {
    const storedNotes = localStorage.getItem(STORAGE_KEY);
    if (storedNotes) {
      notes.value = JSON.parse(storedNotes);
    }
  }

  function saveNotes() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes.value));
  }

  function addNote(note: Note) {
    const id = crypto.randomUUID();
    note.id = id;
    note.createdAt = new Date().toISOString();
    notes.value.push(note);
    saveNotes();
  }

  function updateNote(updatedNote: Note) {
    const index = notes.value.findIndex((note) => note.id === updatedNote.id);
    if (index !== -1) {
      notes.value[index] = updatedNote;
      saveNotes();
    }
  }

  function deleteNote(noteId: string) {
    notes.value = notes.value.filter((note) => note.id !== noteId);
    saveNotes();
  }

  return {
    notes,
    loadNotes,
    addNote,
    updateNote,
    deleteNote,
  };
}
