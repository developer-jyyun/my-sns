import React from "react";
import PostsForm from "../components/PostsForm";
import styled from "styled-components";

import Timeline from "../components/Timeline";
export default function Home() {
  return (
    <div>
      <PostsForm />
      <Timeline />
    </div>
  );
}
