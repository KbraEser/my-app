import React from "react";
import { Container } from "@mui/material";

const PageContainer = ({ children }: { children: React.ReactNode }) => {
  return <Container maxWidth="lg">{children}</Container>;
};

export default PageContainer;
