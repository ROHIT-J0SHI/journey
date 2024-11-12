import React, { useState, useCallback } from "react";
import debounce from "lodash.debounce";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AI_PROPMT, SelectBudgetOptions, SelectTravelsList } from "@/constants/Options";
import { toast } from "sonner";
import { chatSession } from "@/config/Gemini";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { useNavigate } from "react-router-dom";
import SignInDialog from "../custom/SignInDialog";

const FullScreenLoader = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-50 w-full h-full">
    <div className="flex flex-col items-center justify-center">
      <div className="border-t-4 border-b-4 border-main w-16 md:w-32 h-16 md:h-32 rounded-full animate-spin"></div>
      <p className="mt-4 text-center text-2xl text-black font-bold">
        Generating your plan, don't quit or refresh
      </p>
    </div>
  </div>
);



function CreateTrip() {
  const [place, setPlace] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [formData, setFormData] = useState({
    location: null,
    noOfDays: "",
    budget: "",
    people: "",
  });
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [selectedPeople, setSelectedPeople] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch suggestions with debounce to limit API calls
  const fetchSuggestions = useCallback(
    debounce(async (query) => {
      if (query.length > 2) {
        try {
          const response = await fetch(
            `https://us1.locationiq.com/v1/autocomplete.php?key=${import.meta.env.VITE_LOCATIONIQ_ACCESS_TOKEN}&q=${query}&format=json`
          );
          const data = await response.json();

          if (Array.isArray(data)) {
            setSuggestions(data);
          } else {
            console.error("Unexpected API response format:", data);
            setSuggestions([]);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
          setSuggestions([]);
        }
      } else {
        setSuggestions([]);
      }
    }, 500),
    []
  );

  const handleChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSuggestionClick = (suggestion) => {
    setPlace(suggestion.display_name);
    setSuggestions([]);
    handleChange("location", suggestion);
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setPlace(newValue);
    fetchSuggestions(newValue);
  };

  const handleBudgetClick = (budget) => {
    handleChange("budget", budget.title);
    setSelectedBudget(budget.title);
  };

  const handlePeopleClick = (people) => {
    handleChange("people", people.title);
    setSelectedPeople(people.title);
  };

  // Validate and generate the trip
  const onGenerateTrip = async () => {
    const user = localStorage.getItem("user");

    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (formData?.noOfDays > 7) {
      alert("Number of days should not be more than 7.");
      return; // Stop execution here
    }

    if (!formData.location || !formData.budget || !formData.people || !formData.noOfDays) {
      toast("Please fill all the details...");
      return; // Stop execution if form data is incomplete
    }

    setLoading(true);

    // Replace prompt placeholders
    const FINAL_PROMPT = AI_PROPMT.replace("{location}", formData.location.display_name)
      .replace("{totalDays}", formData.noOfDays)
      .replace("{traveller}", formData.people)
      .replace("{budget}", formData.budget);

    try {
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      const responseText = await result.response.text(); // Properly await response text
      saveAiTrip(responseText);
    } catch (error) {
      console.error("Error generating trip:", error);
      setLoading(false); // Stop loading if an error occurs
      toast("Error generating trip. Please try again.");
    }
  };

  // Save the AI-generated trip to Firebase
  const saveAiTrip = async (tripData) => {
    setLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const docID = Date.now().toString();
      const formattedTripData = JSON.parse(tripData); // Parse trip data properly

      await setDoc(doc(db, "AITrips", docID), {
        userSelection: formData,
        tripInfo: formattedTripData,
        userEmail: user.email,
        id: docID,
      });

      setLoading(false);
      navigate("/view-trip/" + docID);
    } catch (error) {
      console.error("Error saving trip:", error);
      setLoading(false); // Stop loading if an error occurs
      toast("Error saving trip. Please try again.");
    }
  };

  return (
    <div className="bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-lg rounded-lg p-6 mx-auto max-w-3xl">
        <h2 className="text-3xl font-bold text-center text-main">
          Tell us your travel preferences 🏕
        </h2>
        <p className="mt-2 text-gray-600 text-center text-lg">
          Provide some basic information, and your trip planner will generate a customized journey based on your preferences.
        </p>

        <div className="mt-10 space-y-8">
          <div>
            <h2 className="text-xl font-semibold mb-2">What is your destination?</h2>
            <Input
              type="text"
              value={place}
              onChange={handleInputChange}
              placeholder="Search for a place"
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-main transition duration-300 w-full"
            />
            {suggestions.length > 0 && (
              <ul className="mt-2 border border-gray-300 rounded-md shadow-lg bg-white">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={`${suggestion.place_id}-${index}`} // Correct key interpolation
                    className="p-3 border-b border-gray-200 cursor-pointer hover:bg-main hover:text-white transition duration-200"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion.display_name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <h2 className="text-xl mt-10 font-semibold mb-2">For how many days are you planning the trip?</h2>
            <Input
              placeholder="Example: 3"
              type="number"
              value={formData.noOfDays}
              onChange={(e) => handleChange("noOfDays", e.target.value)}
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-main transition duration-300 w-full"
            />
          </div>
        </div>

        <div>
          <h2 className="text-xl mt-10 font-semibold my-4">What is your budget?</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
            {SelectBudgetOptions.map((item, index) => (
              <div
                key={index}
                className={`p-4 border rounded-lg shadow-md hover:shadow-xl transition-transform hover:scale-105 cursor-pointer ${
                  selectedBudget === item.title ? "border-2 border-main bg-gray-100" : "border-gray-300"
                }`}
                onClick={() => handleBudgetClick(item)}
              >
                <h2 className="text-4xl text-center">{item.icon}</h2>
                <h2 className="font-semibold text-lg mt-2 text-center">{item.title}</h2>
                <h2 className="text-gray-500 text-sm text-center">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl mt-10 font-semibold my-4">With whom are you planning your next adventure?</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
            {SelectTravelsList.map((item, index) => (
              <div
                key={index}
                className={`p-4 border rounded-lg shadow-md hover:shadow-xl transition-transform hover:scale-105 cursor-pointer ${
                  selectedPeople === item.title ? "border-2 border-main bg-gray-100" : "border-gray-300"
                }`}
                onClick={() => handlePeopleClick(item)}
              >
                <h2 className="text-4xl text-center">{item.icon}</h2>
                <h2 className="font-semibold text-lg mt-2 text-center">{item.title}</h2>
                <h2 className="text-gray-500 text-sm text-center">{item.desc}</h2>
                <h2 className="text-gray-800 text-sm text-center">People: {item.people}</h2>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center my-10">
          <Button
            onClick={onGenerateTrip}
            disabled={loading}
            className="bg-main text-white rounded-lg px-6 py-3 shadow-md hover:shadow-lg transition duration-300 w-full sm:w-auto"
          >
            {loading ? <AiOutlineLoading3Quarters className="h-5 w-5 animate-spin" /> : "Generate my trip"}
          </Button>
          {loading && <span className="mt-2 text-gray-500">Generating your plan, don't quit or refresh</span>}
        </div>

        {loading && <FullScreenLoader />}

        <SignInDialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          onSignInSuccess={() => console.log("Signed In!")}
        />
      </div>
    </div>
  );
}

export default CreateTrip;
