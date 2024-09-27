import React, { useState } from "react";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { googleLogout } from "@react-oauth/google";
import dummypic from "@/assets/dummy-profile-pic.jpg";
import SignInDialog from "../custom/SignInDialog"; // Import the SignInDialog

function Header() {
  const user = JSON.parse(localStorage.getItem('user'));
  const profilepic = user?.picture;
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);

  const handleLogout = () => {
    googleLogout();
    localStorage.clear();
    navigate('/'); // Redirect to home
  };

  return (
    <div className="flex h-[9vh] shadow-md justify-between items-center px-4 md:px-12 py-4 bg-white z-50 relative">
      <Link to={"/"}>
        <div className="flex gap-2 items-center">
          <img src={logo} className="w-8 h-8 md:w-11 md:h-11" alt="WorldTour Logo" />
          <span className="text-xl md:text-2xl font-bold">journey</span>
        </div>
      </Link>

      <div >
        {user ? (
          <div>
            {/* <Button variant="outline" className='rounded-full'>My Trips</Button> */}
            
            <Popover>
              <PopoverTrigger>
                <img src={profilepic || dummypic} className="w-9 h-9 rounded-full" alt="Profile" />
              </PopoverTrigger>
              <PopoverContent>
                <h2 onClick={handleLogout} className="cursor-pointer">Log out</h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <div>
            <Button size='sm' className="px-6" onClick={() => setOpenDialog(true)}>Sign In</Button>
          </div>
        )}
      </div>

      <SignInDialog open={openDialog} onClose={() => setOpenDialog(false)} onSignInSuccess={() => console.log("Signed In!")} />
    </div>
  );
}

export default Header;
