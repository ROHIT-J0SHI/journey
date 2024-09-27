import { db } from "@/config/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import InfoSection from "../viewtripComponents/InfoSection";
import Hotels from "../viewtripComponents/Hotels";
import PlacesToVisit from "../viewtripComponents/PlacesToVisit";


function Viewtrip() {
  const hasLoaded = useRef(false);
  useEffect(() => {
    // Scroll to the top only if it's the first load
    if (!hasLoaded.current) {
      window.scrollTo(0, 0);
      hasLoaded.current = true; // Set ref to true after the first load
    }
  }, []);

  const { tripId } = useParams();
  const [trip, setTrip] = useState({});

  useEffect(() => {
    tripId && GetTripData();
  }, [tripId]);

  const GetTripData = async () => {
    const docRef = doc(db, "AITrips", tripId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists) {
      console.log("Document: ", docSnap.data());
      setTrip(docSnap.data());
    } else {
      console.log("No Such Document");
      toast("No Such Trip Found");
    }
  };

  return (
    <div className="p-5 md:p-8 lg:px-16 xl:px-24 2xl:px-32 ">
      <div >
        {/* Information Section */}
        <InfoSection trip={trip} />
        {/* Recommended Hotels */}
        <Hotels trip={trip} />
        {/* Daily Plan */}
        <PlacesToVisit trip={trip} />

        {/* Message Section */}
        <div className="text-center mt-20 ">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">💚 We wish you Happy and safe Journey! 💚</h2>
          <p className="mt-2 text-lg italic text-gray-600">
            "Travel makes one modest. You see what a tiny place you occupy in the world." 
          </p>
        </div>
      </div>
    </div>
  );
}

export default Viewtrip;
