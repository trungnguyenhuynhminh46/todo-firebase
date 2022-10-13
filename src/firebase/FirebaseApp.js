import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
  serverTimestamp,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "./firebase-config";

const FirebaseApp = () => {
  // colRef
  const colRef = collection(db, "posts");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [docID, setDocID] = useState("");
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    // 1. Get collection data (posts)
    // getDocs(colRef)
    //   .then((snapshot) => {
    //     let posts = [];
    //     snapshot.docs.forEach((doc) => {
    //       posts.push({
    //         id: doc.id,
    //         ...doc.data(),
    //       });
    //     });
    //     // console.log(posts);
    //     setPosts(posts);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    // 2. Get document in realtime
    onSnapshot(colRef, (snapshot) => {
      let posts = [];
      snapshot.docs.forEach((doc) => {
        posts.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      // console.log(posts);
      setPosts(posts);
    });
    // 3. Fetching single document
    const docRef = doc(db, "posts", "2cW3X0mC8auDImHHAtvG");
    onSnapshot(docRef, (doc) => {
      console.log({ id: doc.id, ...doc.data() });
    });
    // 4.query
    const q = query(colRef, where("author", "==", "Tèo"), limit(2));
    onSnapshot(q, (snapshot) => {
      let posts = [];
      snapshot.docs.forEach((doc) => {
        posts.push({ id: doc.id, ...doc.data() });
      });
      console.log(posts);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // Handlers
  const handleAddPost = (e) => {
    e.preventDefault();
    // 2. Add data to collection
    addDoc(colRef, {
      title,
      author,
      created_at: serverTimestamp(),
    })
      .then(() => {
        console.log("success");
        // Reset form
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleDeletePost = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(db, "posts", docID);
      await deleteDoc(docRef);
      console.log("success delete");
    } catch (err) {
      console.log(err);
    }
  };
  const handleUpdatePost = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(db, "posts", docID);
      await updateDoc(docRef, {
        title,
        author,
      });
      console.log("success update");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="p-10">
      {/* Input form */}
      <div className="w-full max-w-[500px] mx-auto bg-white shadow-lg p-5 mb-10">
        <form onSubmit={handleAddPost}>
          <input
            type="text"
            className="p-3 rounded border border-gray-200 w-full mb-5 outline-none focus:border-blue-500"
            name="title"
            placeholder="Enter your title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            id=""
          />
          <input
            type="text"
            className="p-3 rounded border border-gray-200 w-full mb-5 outline-none focus:border-blue-500"
            name="author"
            placeholder="Enter your author"
            value={author}
            onChange={(e) => {
              setAuthor(e.target.value);
            }}
            id=""
          />
          <button
            type="submit"
            className="p-3 bg-blue-500 text-white text-sm font-medium w-full rounded-lg cursor-pointer hover:bg-blue-700"
          >
            Add post
          </button>
        </form>
      </div>
      {/* Delete form */}
      <div className="w-full max-w-[500px] mx-auto bg-white shadow-lg p-5 mb-10">
        <form onSubmit={handleDeletePost}>
          <input
            type="text"
            className="p-3 rounded border border-gray-200 w-full mb-5 outline-none focus:border-blue-500"
            name="docID"
            placeholder="Enter your id"
            value={docID}
            onChange={(e) => {
              setDocID(e.target.value);
            }}
            id=""
          />
          <button
            type="submit"
            className="p-3 bg-red-500 text-white text-sm font-medium w-full rounded-lg cursor-pointer hover:bg-red-700"
          >
            Delete post
          </button>
        </form>
      </div>
      {/* Update form */}
      <div className="w-full max-w-[500px] mx-auto bg-white shadow-lg p-5 mb-10">
        <form onSubmit={handleUpdatePost}>
          <input
            type="text"
            className="p-3 rounded border border-gray-200 w-full mb-5 outline-none focus:border-blue-500"
            name="title"
            placeholder="Enter your title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            id=""
          />
          <input
            type="text"
            className="p-3 rounded border border-gray-200 w-full mb-5 outline-none focus:border-blue-500"
            name="author"
            placeholder="Enter your author"
            value={author}
            onChange={(e) => {
              setAuthor(e.target.value);
            }}
            id=""
          />
          <button
            type="submit"
            className="p-3 bg-blue-500 text-white text-sm font-medium w-full rounded-lg cursor-pointer hover:bg-blue-700"
          >
            Update post
          </button>
        </form>
      </div>
      {/* Show Posts */}
      <div className="w-full max-w-[500px] mx-auto bg-white shadow-lg p-5 mb-10">
        {posts.length > 0 &&
          posts.map((item) => {
            return (
              <div key={item.title}>
                <div>
                  {item.id}-{item.title}-{item.author}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default FirebaseApp;
