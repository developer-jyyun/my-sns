import React, { useState } from "react";
import {
  FileInput,
  Form,
  FormTitle,
  LabelBtn,
  SubmitBtn,
  Textarea,
} from "./Form-styled";
import { auth, db, storage } from "../firebase";
import { collection, addDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export default function PostsForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [post, setPost] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPost(e.target.value);
  };

  // 파일 크기 제한 (2MB 미만)
  const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length === 1) {
      const selectedFile = files[0];
      //파일 크기 제한
      if (selectedFile.size <= MAX_FILE_SIZE) {
        setFile(selectedFile);
      } else {
        alert("파일 크기가 2MB를 초과합니다. 더 작은 파일을 선택해주세요.");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user || isLoading || post === null || post.length > 180) {
      return;
    }
    try {
      setIsLoading(true);
      const doc = await addDoc(collection(db, "posts"), {
        post,
        createdAt: Date.now(),
        username: user.displayName || "익명",
        userId: user.uid,
      });
      if (file) {
        const locationRef = ref(storage, `posts/${user.uid}/${doc.id}`);
        const result = await uploadBytes(locationRef, file);
        const url = await getDownloadURL(result.ref);
        await updateDoc(doc, {
          // doc에 image url 추가하기
          photo: url,
        });
      }
      setPost("");
      setFile(null);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
      <FormTitle>🍒 게시글 작성 💌 </FormTitle>
      <Textarea
        rows={5}
        maxLength={180}
        placeholder="내용을 입력해 주세요:)"
        value={post}
        onChange={handleChange}
      />
      <LabelBtn htmlFor="file">
        {file ? "이미지가 추가되었습니다 ✅" : "이미지를 추가해 주세요 📷"}
      </LabelBtn>
      <FileInput
        onChange={handleFileChange}
        id="file"
        type="file"
        accept="image/*"
      />
      <SubmitBtn
        type="submit"
        value={isLoading ? "포스팅중.." : "새 게시글 등록"}
      />
    </Form>
  );
}
