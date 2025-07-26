export type Note = {
  id: string;
  title: string;
  content: string;
  category: string;
  createdAt: string; // ISO date string
};

const STORAGE_KEY = "devtools_notes";

// Instance unique partagée
let notesInstance: ReturnType<typeof createNotesInstance> | null = null;

function createNotesInstance() {
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

  function sortNotes() {
    notes.value.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  function addNote(note: Note) {
    const id = crypto.randomUUID();
    note.id = id;
    note.createdAt = new Date().toISOString();
    notes.value.push(note);
    sortNotes();
    saveNotes();
  }

  function updateNote(updatedNote: Note) {
    const index = notes.value.findIndex((note) => note.id === updatedNote.id);
    if (index !== -1) {
      notes.value[index] = updatedNote;
      sortNotes();
      saveNotes();
    }
  }

  function deleteNote(noteId: string) {
    notes.value = notes.value.filter((note) => note.id !== noteId);
    sortNotes();
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

export function useNotes() {
  if (!notesInstance) {
    notesInstance = createNotesInstance();
  }
  return notesInstance;
}
