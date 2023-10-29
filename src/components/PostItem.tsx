import { useState, useEffect } from "react";

import { IPost } from "./Timeline";
import styled from "styled-components";
import { auth, db, storage } from "../firebase";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import {
  deleteObject,
  ref,
  uploadBytes,
  storageRef,
  getDownloadURL,
} from "firebase/storage";
import { FileInput, LabelBtn, Textarea } from "./Form-styled";

interface IEditedPost {
  post: string;
  photo?: File | null;
}

export default function PostItem({ photo, post, userId, username, id }: IPost) {
  const user = auth.currentUser; //현재 로그인한 사용자 정보
  const photoRef = ref(storage, `posts/${user.uid}/${id}`); // 이미지 참조

  const handleDelete = async () => {
    const ok = confirm("해당 게시물을 삭제하시겠습니까?");
    if (!ok || user?.uid !== userId) return;
    try {
      await deleteDoc(doc(db, "posts", id));
      if (photo) {
        await deleteObject(photoRef);
      }
    } catch (err) {
      console.log(err);
    } finally {
      //
    }
  };

  const [isEditing, setIsEditing] = useState(false);
  const [editedPost, setEditedPost] = useState(post);
  const [editedPhoto, setEditedPhoto] = useState<File | null>(null);

  const handleEdit = async () => {
    if (user?.uid !== userId) return;
    try {
      // 수정 로직 구현
      if (editedPhoto) {
        await uploadBytes(photoRef, editedPhoto); // 이미지 업로드
        const updatedPhotoURL = await getDownloadURL(photoRef);

        // Firestore 문서 업데이트, post와 photo 모두 업데이트
        const postRef = doc(db, "posts", id);
        await setDoc(
          postRef,
          { post: editedPost, photo: updatedPhotoURL },
          { merge: true }
        );
      } else {
        // 이미지를 수정하지 않을 경우, post만 업데이트
        const postRef = doc(db, "posts", id);
        await setDoc(postRef, { post: editedPost }, { merge: true });
      }

      setIsEditing(false); // 수정 모드 비활성화
    } catch (err) {
      console.log(err);
    } finally {
      // 수정 후의 추가 작업
    }
  };
  const onChangeEditPost = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedPost(e.target.value);
  };

  const onChangeEditPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setEditedPhoto(file);
  };
  return (
    <Wrapper>
      <Column>
        <Username>{username}</Username>
        {isEditing ? (
          <Textarea value={editedPost} onChange={onChangeEditPost} />
        ) : (
          <Payload>{editedPost}</Payload>
        )}

        {user?.uid === userId ? (
          <ButtonsArea>
            <DeleteButton onClick={handleDelete}>삭제</DeleteButton>
            {isEditing ? (
              <EditButton onClick={handleEdit}>저장</EditButton>
            ) : (
              <EditButton onClick={() => setIsEditing(true)}>수정</EditButton>
            )}
          </ButtonsArea>
        ) : null}
      </Column>
      <Column>
        {editedPhoto ? (
          <Photo src={URL.createObjectURL(editedPhoto)} alt="Edited Photo" />
        ) : photo ? (
          <Photo src={photo} alt="Post Photo" />
        ) : null}
        {isEditing ? (
          <div>
            <EditImgButton htmlFor="editfile">이미지 수정</EditImgButton>
            <FileInput
              id="editfile"
              type="file"
              accept="image/*"
              onChange={onChangeEditPhoto}
            />
          </div>
        ) : null}
      </Column>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  padding: 20px;
  background: rgb(255 255 255 / 20%);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 15px;
`;

const Column = styled.div`
  &:last-child {
    place-self: end;
  }
`;

const Photo = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 15px;
`;

const Username = styled.span`
  font-weight: 600;
  font-size: 15px;
`;

const Payload = styled.p`
  margin: 10px 0px;
  font-size: 18px;
`;

const ButtonsArea = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 5px;
`;

const DeleteButton = styled.button`
  background-color: tomato;
  color: white;
  font-weight: 600;
  border: 0;
  font-size: 12px;
  padding: 5px 10px;
  text-transform: uppercase;
  border-radius: 5px;
  cursor: pointer;
`;
const EditButton = styled.button`
  background-color: orange;
  color: white;
  font-weight: 600;
  border: 0;
  font-size: 12px;
  padding: 5px 10px;
  text-transform: uppercase;
  border-radius: 5px;
  cursor: pointer;
`;
const EditImgButton = styled.label`
  margin-top: 20px;
  color: #fff;
  font-weight: 600;
  border: 1px solid #fff;
  font-size: 12px;
  padding: 5px 10px;
  text-transform: uppercase;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  display: block;
  width: 100px;
`;
