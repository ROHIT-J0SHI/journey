import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { googleLogout } from "@react-oauth/google";
import dummypic from "@/assets/dummy-profile-pic.jpg";
import SignInDialog from "../custom/SignInDialog"; // Import the SignInDialog

function Header() {
  const user = JSON.parse(localStorage.getItem("user"));
  const profilepic = user?.picture || dummypic;
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);

  const handleLogout = () => {
    googleLogout();
    localStorage.clear();
    navigate("/"); // Redirect to home
  };

  useEffect(() => {
    if (!user) {
      setOpenDialog(true); // Automatically open the sign-in dialog
    }
  }, [user]);

  const UserProfile = ({ user }) => {
    return (
      <div className="bg-white rounded-xl shadow-lg p-4 flex flex-col items-center text-center">
        <img src={profilepic} className="w-9 h-9 rounded-full" alt="Profile" />
        <h2 className="text-lg font-semibold mt-4">Hi, {user.name}!</h2>
        <p className="text-sm text-gray-500">{user.email}</p>
        <div className="mt-4 flex justify-between w-full px-6">
          <button className="text-main" onClick={() => setOpenDialog(true)}>
            Add account
          </button>
          <button className="text-main" onClick={handleLogout}>
            Sign out
          </button>
        </div>
        <div className="mt-4 text-xs text-gray-400">
          <p>Privacy Policy · Terms of Service</p>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="flex h-[9vh] shadow-md justify-between items-center px-4 md:px-12 py-4 bg-white bg-opacity-30 z-50 relative">
        <Link to={"/"}>
          <div className="flex gap-2 items-center">
            <img
              src={logo}
              className="w-8 h-8 md:w-11 md:h-11"
              alt="journey Logo"
            />
            <span className="text-xl md:text-2xl font-bold">journey</span>
          </div>
        </Link>

        {/* Default layout for larger screens */}
        <div className="hidden md:flex justify-center items-center space-x-6">
          <Link
            to="/"
            className="text-blue flex items-center gap-1 hover:text-main "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-house"
              viewBox="0 0 16 16"
            >
              <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z" />
            </svg>
            Home
          </Link>
          <Link
            to="/contact"
            className="text-blue flex items-center gap-1 hover:text-main "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-info-circle"
              viewBox="0 0 16 16"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
              <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
            </svg>
            About
          </Link>
          <Link
            to={"/Create-trip"}
            className="text-blue flex items-center gap-1 hover:text-main "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-globe-central-south-asia"
              viewBox="0 0 16 16"
            >
              <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0M4.882 1.731a.48.48 0 0 0 .14.291.487.487 0 0 1-.126.78l-.291.146a.7.7 0 0 0-.188.135l-.48.48a1 1 0 0 1-1.023.242l-.02-.007a1 1 0 0 0-.462-.04 7 7 0 0 1 2.45-2.027m-3 9.674.86-.216a1 1 0 0 0 .758-.97v-.184a1 1 0 0 1 .445-.832l.04-.026a1 1 0 0 0 .152-1.54L3.121 6.621a.414.414 0 0 1 .542-.624l1.09.818a.5.5 0 0 0 .523.047.5.5 0 0 1 .724.447v.455a.8.8 0 0 0 .131.433l.795 1.192a1 1 0 0 1 .116.238l.73 2.19a1 1 0 0 0 .949.683h.058a1 1 0 0 0 .949-.684l.73-2.189a1 1 0 0 1 .116-.238l.791-1.187A.45.45 0 0 1 11.743 8c.16 0 .306.084.392.218.557.875 1.63 2.282 2.365 2.282l.04-.001a7.003 7.003 0 0 1-12.658.905Z" />
            </svg>
            Generate Trip
          </Link>
          <Link
            to="/contact-us"
            className="text-blue flex items-center gap-1 hover:text-main "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-telephone"
              viewBox="0 0 16 16"
            >
              <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.459-1.657l.547-2.19a.68.68 0 0 0-.122-.58L3.654 1.328Z" />
            </svg>
            Contact Us
          </Link>
        </div>

        {/* UserProfile component */}
        <div>
          {user ? (
            <Popover>
              <PopoverTrigger>
                <img
                  src={profilepic}
                  className="w-9 h-9 rounded-full"
                  alt="Profile"
                />
              </PopoverTrigger>
              <PopoverContent>
                <UserProfile user={user} />
              </PopoverContent>
            </Popover>
          ) : (
            <Button
              size="sm"
              className="px-6 text-white"
              onClick={() => setOpenDialog(true)}
            >
              Sign In
            </Button>
          )}
        </div>

        <SignInDialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          onSignInSuccess={() => {
            console.log("Signed In!");
            setOpenDialog(false); // Close the dialog after sign-in
          }}
        />
      </div>

      {/* Mobile Layout: Fixed bottom navigation bar */}
      <div
        className="md:hidden fixed z-50 bottom-0 w-full bg-white flex justify-around items-center py-4 shadow-inner"
        style={{ boxShadow: " 0 4px 12px rgba(0, 0, 0, 0.5)" }}
      >
        <Link
          to="/"
          className="text-blue flex flex-col items-center hover:text-main hover:font-bold"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            className="bi bi-house"
            viewBox="0 0 16 16"
          >
            <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z" />
          </svg>
        </Link>

        <Link
          to="/contact"
          className="text-blue flex flex-col items-center hover:text-main hover:font-bold"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            className="bi bi-info-circle"
            viewBox="0 0 16 16"
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
            <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
          </svg>
        </Link>

        <Link
          to={"/Create-trip"}
          className="text-blue flex flex-col items-center hover:text-main hover:font-bold"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            className="bi bi-globe-central-south-asia"
            viewBox="0 0 16 16"
          >
            <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0M4.882 1.731a.48.48 0 0 0 .14.291.487.487 0 0 1-.126.78l-.291.146a.7.7 0 0 0-.188.135l-.48.48a1 1 0 0 1-1.023.242l-.02-.007a1 1 0 0 0-.462-.04 7 7 0 0 1 2.45-2.027m-3 9.674.86-.216a1 1 0 0 0 .758-.97v-.184a1 1 0 0 1 .445-.832l.04-.026a1 1 0 0 0 .152-1.54L3.121 6.621a.414.414 0 0 1 .542-.624l1.09.818a.5.5 0 0 0 .523.047.5.5 0 0 1 .724.447v.455a.8.8 0 0 0 .131.433l.795 1.192a1 1 0 0 1 .116.238l.73 2.19a1 1 0 0 0 .949.683h.058a1 1 0 0 0 .949-.684l.73-2.189a1 1 0 0 1 .116-.238l.791-1.187A.45.45 0 0 1 11.743 8c.16 0 .306.084.392.218.557.875 1.63 2.282 2.365 2.282l.04-.001a7.003 7.003 0 0 1-12.658.905Z" />
          </svg>
        </Link>

        <Link
          to="/contact-us"
          className="text-blue flex flex-col items-center hover:text-main hover:font-bold"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            className="bi bi-telephone"
            viewBox="0 0 16 16"
          >
            <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.459-1.657l.547-2.19a.68.68 0 0 0-.122-.58L3.654 1.328Z" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

export default Header;
