"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import {
  ArrowBackIosNewRounded,
  ArrowBackIosRounded,
  ArrowBackRounded,
} from "@mui/icons-material";

const BackButton = () => {
  const router = useRouter();

  return (
    <Button size="icon" variant="ghost" onClick={() => router.back()}>
      <ArrowBackIosNewRounded />
    </Button>
  );
};

export default BackButton;
