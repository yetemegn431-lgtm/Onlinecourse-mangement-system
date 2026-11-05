import React, { createContext, useContext, useState } from 'react';

type Book = {
  id: string;
  title: string;
  author: string;
  category: string;
  description: string;
};

type BookmarkContextType = {
  bookmarks: Book[];
  toggleBookmark: (book: Book) => void;
  isBookmarked: (id: string) => boolean;
};

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

export function BookmarkProvider({ children }: { children: React.ReactNode }) {
  const [bookmarks, setBookmarks] = useState<Book[]>([]);

  const toggleBookmark = (book: Book) => {
    setBookmarks((prev) =>
      prev.some((b) => b.id === book.id)
        ? prev.filter((b) => b.id !== book.id)
        : [...prev, book]
    );
  };

  const isBookmarked = (id: string) => bookmarks.some((b) => b.id === id);

  return (
    <BookmarkContext.Provider value={{ bookmarks, toggleBookmark, isBookmarked }}>
      {children}
    </BookmarkContext.Provider>
  );
}

export function useBookmarks() {
  const context = useContext(BookmarkContext);
  if (!context) throw new Error('useBookmarks must be used within BookmarkProvider');
  return context;
}