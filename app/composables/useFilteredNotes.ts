export function useFilteredNotes(notes: Note[], searchQuery: string): Note[] {
  if (
    !searchQuery ||
    searchQuery.trim() === "" ||
    searchQuery.toLowerCase() === "all"
  ) {
    return notes;
  }

  const lowerCaseQuery = searchQuery.toLowerCase();

  return notes.filter((note) => {
    const titleMatch = note.title.toLowerCase().includes(lowerCaseQuery);
    const contentMatch = note.content.toLowerCase().includes(lowerCaseQuery);
    return titleMatch || contentMatch;
  });
}
