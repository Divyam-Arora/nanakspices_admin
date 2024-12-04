"use client";
import { useAppSelector } from "@/hooks/storeHooks";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import { appActions } from "@/store/appSlice";
import { RootState } from "@/store";

const DialogBox = () => {
  const { alert } = useSelector((s: RootState) => s.app);
  const dispatch = useDispatch();
  return (
    <>
      <AlertDialog open={alert.id}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{alert.title}</AlertDialogTitle>
            <AlertDialogDescription>{alert.description}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction asChild>
              <Button onClick={() => dispatch(appActions.clearAlert())}>
                Ok
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DialogBox;
