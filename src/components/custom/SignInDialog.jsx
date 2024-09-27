import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import logo from '@/assets/logo.png';

const SignInDialog = ({ open, onClose, onSignInSuccess }) => {
  const login = useGoogleLogin({
    onSuccess: (codeResp) => getUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  const getUserProfile = (tokenInfo) => {
    axios
      .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`, {
        headers: {
          Authorization: `Bearer ${tokenInfo.access_token}`,
          Accept: "Application/json",
        },
      })
      .then((resp) => {
        console.log(resp);
        localStorage.setItem("user", JSON.stringify(resp.data));
        onClose(); // Close dialog
        onSignInSuccess(); // Call the success callback
      });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Sign In with Google</DialogTitle>
          <DialogDescription>
            <div className="flex gap-2 items-center">
              <img src={logo} className="w-10 h-10 rounded-full" alt="WorldTour Logo" />
              <span className="text-black text-xl font-bold">journeyAI</span>
            </div>
            <p>Sign In to the App with Google authentication securely.</p>
            <Button onClick={login} className="w-full mt-5 flex gap-3 items-center">
              <FcGoogle className="h-6 w-6" /> Sign In with Google
            </Button>
          </DialogDescription>
        </DialogHeader>
        <DialogClose asChild>
          <Button type="button" variant="secondary">
            Close
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default SignInDialog;
