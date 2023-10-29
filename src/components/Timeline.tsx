import {
  collection,
  query,
  orderBy,
  onSnapshot,
  limit,
} from "firebase/firestore";
import { db } from "../firebase";
import { Unsubscribe } from "firebase/auth";
import { useState, useEffect } from "react";
import styled from "styled-components";
import PostItem from "./PostItem";

export interface IPost {
  photo?: string;
  post: string;
  userId: string;
  username: string;
  createdAt: number;
  id: string;
}
export default function Timeline() {
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    let unsubscribe: Unsubscribe | null = null;
    const fetchPosts = async () => {
      const postsQuery = query(
        collection(db, "posts"),
        orderBy("createdAt", "desc"),
        limit(25)
      );
      unsubscribe = await onSnapshot(postsQuery, (snapshot) => {
        const postList = snapshot.docs.map((doc) => {
          console.log("doc.data", doc.data());
          const { photo, post, userId, username, createdAt } = doc.data();
          return {
            photo,
            post,
            userId,
            username,
            createdAt,
            id: doc.id,
          };
        });
        setPosts(postList);
      });
    };
    fetchPosts();
    return () => {
      //clean up
      unsubscribe && unsubscribe();
    };
  }, []);

  return (
    <Wrapper>
      {posts.map((postItem) => (
        <PostItem key={postItem.id} {...postItem} />
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
  margin-top: 20px;
`;
