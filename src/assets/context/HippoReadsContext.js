import { useLocalStorage } from "@uidotdev/usehooks";
import { createContext, useEffect, useState } from "react";
import { v4 as id } from "uuid";
export const HippoReadsContext = createContext(null);

export function HippoReadsContextProvider(props) {
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activePage, setActivePage] = useState("");
  
  const [theme, setTheme] = useLocalStorage("theme");

  const [loggedIn, setLoggedIn] = useLocalStorage("loggedIn");
  const [recentlyViewedBooks, setRecentlyViewedBooks] = useLocalStorage("recentlyViewedBooks");
  const [profile, setProfile] = useLocalStorage("profile");
  const [users, setUsers] = useLocalStorage("users");
  const [booksRead, setBooksRead] = useLocalStorage("booksRead");
  const [booksReading, setBooksReading] = useLocalStorage("booksReading");
  const [booksToBeRead, setBooksToBeRead] = useLocalStorage("booksToBeRead");
  const [bookComments, setBookComments] = useLocalStorage("bookComments");

  const [userFollowers, setUserFollowers] = useLocalStorage("userFollowers");

  const url_books = `https://65c5cbb5e5b94dfca2e04e3f.mockapi.io/hipporeads/books`;

  const getBooks = async () => {
    setLoading(true);
    await fetch(url_books)
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
        setLoading(false);
      });
  };

  const getAuthors = async () => {
    setLoading(true);

    await fetch(
      `https://65c5cbb5e5b94dfca2e04e3f.mockapi.io/hipporeads/authors`
    )
      .then((res) => res.json())
      .then((data) => {
        setAuthors(data);
        setLoading(false);
      });
  };

  const followUser = (user) => {
    if (userFollowers == undefined) {
      setUserFollowers([]);
    } else {
      let userFollowed = {
        userId: loggedIn.id,
        followerId: user.id,
      };
      setUserFollowers([...userFollowers, userFollowed]);
    }
  };
  const unFollowUser = (user) => {
    if (userFollowers == undefined) {
      setUserFollowers([]);
    } else {
      let followerToRemove = userFollowers.filter(
        (follower) =>
          follower.followerId !== user.id && follower.userId == loggedIn.id
      );
      setUserFollowers(followerToRemove);
    }
  };

  const DoIFollowThisUser = (user) => {
    if (userFollowers == undefined) {
      return false;
    } else {
      return userFollowers.find(
        (follower) =>
          follower.followerId == user.id && follower.userId == loggedIn.id
      );
    }
  };

  const addBookToShelf = (shelfName, book) => {
    let newBook = {
      userId: loggedIn.id,
      book: book,
    };

    if (shelfName == "read") {
      if (
        booksRead.find(
          (book) =>
            book.book.name == newBook.book.name && book.userId == loggedIn.id
        )
      ) {
        alert("Already added");
      } else {
        setBooksRead([...booksRead, newBook]);
        console.log("Added");
      }
      return;
    } else if (shelfName == "reading") {
      if (
        booksReading.find(
          (book) =>
            book.book.name == newBook.book.name && book.userId == loggedIn.id
        )
      ) {
        alert("Already added");
      } else {
        setBooksReading([...booksReading, newBook]);
        console.log("Added");
      }

      return;
    } else if (shelfName == "want to read") {
      if (
        booksToBeRead.find(
          (book) =>
            book.book.name == newBook.book.name && book.userId == loggedIn.id
        )
      ) {
        alert("Already added");
      } else {
        setBooksToBeRead([...booksToBeRead, newBook]);
        console.log("Added");
      }

      return;
    } else {
      alert(
        `${book.name} cannot be added to ${shelfName} because ${shelfName} does not exist`
      );
    }
  };

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  } 
  const [searchBookResult, setSearchBookResult] = useState([]);
  const [searchUserResult, setSearchUserResult] = useState([]);
  const [searchAuthorsResult, setSearchAuthorsResult] = useState([]);



  const searchResults = async (searchTerm) => { 
    let booksearched = books.filter((book) =>
      book.name.toLowerCase().startsWith(searchTerm.toLowerCase())
    );
    if (booksearched.length < 4) {
      booksearched = [
        ...booksearched,
        ...books.filter((book) =>
          book.name.toLowerCase().includes(searchTerm.toLowerCase())
        ),
      ];
    }

    setSearchBookResult([...new Set(booksearched)]);

    setSearchUserResult(
      users.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
      let authorSearched = authors.filter((author) =>
      author.name.toLowerCase().startsWith(searchTerm.toLowerCase()))
      
      if (authorSearched.length < 4) {
        authorSearched = [
          ...authorSearched,
          ...authors.filter((authors) =>
          authors.name.toLowerCase().includes(searchTerm.toLowerCase())
          ),
        ];
      }
    setSearchAuthorsResult([...new Set(authorSearched)]);
 
  }; 


  useEffect(() => {
   
    if (users == undefined) {
      setUsers([]);
    }
    if (userFollowers == undefined) {
      setUserFollowers([]);
    }
    if (booksRead == undefined) {
      setBooksRead([]);
    }
    if (booksReading == undefined) {
      setBooksReading([]);
    }
    if (booksToBeRead == undefined) {
      setBooksToBeRead([]);
    }
    if (profile == undefined) {
      setProfile([]);
    }
    if (recentlyViewedBooks == undefined) {
      setRecentlyViewedBooks([]);
    }
    if (bookComments == undefined) {
      setBookComments([]);
    }

    getBooks();
    getAuthors();
  }, []);

  const contextValue = {
    books,
    setBooks,
    authors,
    activePage,
    setActivePage,searchBookResult,
    searchUserResult,
    searchAuthorsResult,
    loggedIn,
    searchResults,
    setLoggedIn,
    followUser,
    unFollowUser,
    DoIFollowThisUser,
    booksRead,
    setBooksRead,
    booksReading,
    setBooksReading,
    booksToBeRead,
    setBooksToBeRead,
    addBookToShelf,
    url_books,
    loading, setLoading,
    recentlyViewedBooks, setRecentlyViewedBooks, 
    bookComments, setBookComments,
    profile, setProfile,
    users, setUsers,
    userFollowers, setUserFollowers,
    theme, setTheme,
    shuffle
  };

  return (
    <HippoReadsContext.Provider value={contextValue}>
      {props.children}
    </HippoReadsContext.Provider>
  );
}
