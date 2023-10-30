import { useEffect, useState } from "react";
import { auth, db, storage } from "../firebase";
import PostItem from "../components/PostItem";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import {
  collection,
  getDocs,
  limit,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { IPost } from "../components/Timeline";
import styled from "styled-components";
import { H2Title } from "../components/Common-styled";
import { RiUser3Fill } from "react-icons/ri";
import { FileInput } from "../components/Form-styled";

export default function Profile() {
  const user = auth.currentUser;
  const [avatar, setAvatar] = useState(user?.photoURL);
  const [myPosts, setMyPosts] = useState<IPost[]>([]);
  const [name, setName] = useState(user?.displayName ?? "Anonymous");
  const [editMode, setEditMode] = useState(false);
  const onAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!user) return; //user===null

    if (files && files.length === 1) {
      const file = files[0];
      const locationRef = ref(storage, `avatar/${user.uid}`); //기존 이미지 덮어쓰기
      const result = await uploadBytes(locationRef, file);
      const avatarUrl = await getDownloadURL(result.ref);
      //파일 크기 제한
      const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
      if (file.size <= MAX_FILE_SIZE) {
        setAvatar(avatarUrl);
      } else {
        alert("파일 크기가 2MB를 초과합니다. 더 작은 파일을 선택해주세요.");
      }
      await updateProfile(user, {
        photoURL: avatarUrl,
      });
    }
  };
  const fetchPosts = async () => {
    const postQuery = query(
      collection(db, "posts"),
      where("userId", "==", user?.uid),
      orderBy("createdAt", "desc"),
      limit(25)
    );
    const snapshop = await getDocs(postQuery);
    const myPosts = snapshop.docs.map((doc) => {
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
    setMyPosts(myPosts);
  };
  useEffect(() => {
    fetchPosts();
  }, []);

  const onChangeNameClick = async () => {
    if (!user) return;
    setEditMode((prev) => !prev);
    if (!editMode) return;
    try {
      await updateProfile(user, {
        displayName: name,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setEditMode(false);
    }
  };

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  return (
    <Wrapper>
      <AvatarUpload htmlFor="avatar">
        {avatar ? <AvatarImage src={avatar} /> : <RiUser3Fill />}
      </AvatarUpload>
      <FileInput
        type="file"
        id="avatar"
        accept="image/*"
        onChange={onAvatarChange}
      />
      {editMode ? (
        <NameInput onChange={onNameChange} type="text" value={name} />
      ) : (
        <Name>{name ?? "이름없음"}</Name>
      )}
      <ChangeNameBtn onClick={onChangeNameClick}>
        {editMode ? "Save" : "Change Name"}
      </ChangeNameBtn>
      <MyPosts>
        <H2Title>🍒 나의 게시물 </H2Title>
        {myPosts.map((mypost) => (
          <PostItem key={mypost.id} {...mypost} />
        ))}
      </MyPosts>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const AvatarUpload = styled.label`
  width: 80px;
  overflow: hidden;
  height: 80px;
  border-radius: 50%;
  background-color: #1d9bf0;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    font-size: 50px;
  }
`;

const AvatarImage = styled.img`
  width: 100%;
`;
const Name = styled.span`
  font-size: 16px;
  display: block;
  text-align: center;
  margin: 10px auto 20px;
`;
const NameInput = styled.input`
  font-size: 16px;
  text-align: center;
  background: transparent;
  padding: 5px;
  color: #fff;
  outline: none;
  border: 1px solid white;
  border-radius: 5px;
  margin: 10px auto 20px;
`;
const ChangeNameBtn = styled.button`
  background: transparent;
  color: #fff;
  padding: 5px;
  font-size: 15px;
  border-radius: 10px;
  border: 0.1px solid white;
  min-width: 110px;
`;

const MyPosts = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 10px;
`;
