import React, { useState, useCallback, useEffect } from "react";
import debounce from "lodash.debounce";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  AI_PROPMT,
  SelectBudgetOptions,
  SelectTravelsList,
} from "@/constants/Options";
import { toast } from "sonner";
import { chatSession } from "@/config/Gemini";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { useNavigate } from "react-router-dom";
import SignInDialog from "../custom/SignInDialog";




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
  const navigate = useNavigate()

  const fetchSuggestions = useCallback(
    debounce(async (query) => {
      if (query.length > 2) {
        try {
          const response = await fetch(
            `https://us1.locationiq.com/v1/autocomplete.php?key=${
              import.meta.env.VITE_LOCATIONIQ_ACCESS_TOKEN
            }&q=${query}&format=json`
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
    }, 500), // Debounce delay
    []
  );

  const handleChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // useEffect(() => {
  //   console.log(formData);
  // }, [formData]);

  const handleSuggestionClick = (suggestion) => {
    setPlace(suggestion.display_name); // This will update the input field
    setSuggestions([]);
    handleChange("location", suggestion); // Update formData with the entire suggestion object
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


  const onGenerateTrip = async () => {
    const user = localStorage.getItem("user");

    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (formData?.noOfDays > 7) {
      alert(
        "Number of days should not be more than 7. However, we will update it for more than 5 days soon...Happy Journey!✈️"
      );
    } else if (
      !formData.location ||
      !formData.budget ||
      !formData.people ||
      !formData.noOfDays
    ) {
      toast("Please fill all the details...");
    }

    console.log(formData);

    setLoading(true);
    const FINAL_PROMPT = AI_PROPMT.replace("{location}",
      formData.location.display_name
    )   
      .replace("{totalDays}", formData.noOfDays)
      .replace("{traveller}", formData.people)
      .replace("{budget}", formData.budget)
      .replace("{totalDays}", formData.noOfDays);

    const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log(result.response.text());
    setLoading(false);
    saveAiTrip(result.response.text());
  };

  const saveAiTrip = async (tripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const docID = Date.now().toString();
    const formattedTripData = JSON.parse(tripData);
    await setDoc(doc(db, "AITrips", docID), {
      userSelection: formData,
      tripInfo: formattedTripData,
      userEmail: user.email,
      id: docID,
    });
    setLoading(false);
    navigate('/view-trip/'+docID)
  };


  return (
    <div className="px-5 sm:px-10 md:px-28 lg:px-44 2xl:px-56 mt-16">
      <h2 className="font-bold text-3xl md:text-4xl">
        Tell us your travel preferences 🏕️
      </h2>
      <p className="mt-3 text-gray-500 text-lg md:text-xl">
        Just provide some basic information, and your trip planner will generate
        a customized journey based on your preferences.
      </p>

      <div className="mt-10 md:mt-20 flex flex-col gap-10">
        <div>
          <h2 className="text-xl md:text-2xl my-3 font-medium">
            What is your destination?
          </h2>
          <Input
            type="text"
            value={place}
            onChange={handleInputChange}
            placeholder={"Search for a place"}
          />
          {suggestions.length > 0 && (
            <ul className="mt-2 border border-gray-300 rounded">
              {suggestions.map((suggestion, index) => (
                <li
                  key={`${suggestion.place_id}-${index}`}
                  className="p-2 border-b cursor-pointer hover:bg-main hover:text-white"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion.display_name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium md:text-2xl">
            For how many days you are planning the trip?
          </h2>
          <Input
            placeholder={"Example: 3"}
            type="number"
            value={formData.noOfDays}
            onChange={(e) => handleChange("noOfDays", e.target.value)}
          />
        </div>
      </div>

      <div>
        <h2 className="text-xl my-3 font-medium mt-16 md:text-2xl">
          What is your budget?
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 my-5">
          {SelectBudgetOptions.map((item, index) => (
            <div
              key={index}
              className={`p-4 border rounded-lg hover:shadow-xl transition-transform hover:scale-[1.01] cursor-pointer ${
                selectedBudget === item.title
                  ? "border-2 border-main shadow-xl"
                  : ""
              }`}
              onClick={() => handleBudgetClick(item)}
            >
              <h2 className="text-4xl ">{item.icon}</h2>
              <h2 className="font-bold text-lg mt-2">{item.title}</h2>
              <h2 className="text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl my-3 font-medium mt-16 font md:text-2xl">
          With whom you are planning your next adventure?
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 my-5">
          {SelectTravelsList.map((item, index) => (
            <div
              key={index}
              className={`p-4 border rounded-lg hover:shadow-xl transition-transform hover:scale-[1.01] cursor-pointer ${
                selectedPeople === item.title
                  ? "border-2 border-main shadow-xl"
                  : ""
              }`}
              onClick={() => handlePeopleClick(item)}
            >
              <h2 className="text-4xl ">{item.icon}</h2>
              <h2 className="font-bold text-lg mt-2">{item.title}</h2>
              <h2 className="text-gray-500">{item.desc}</h2>
              <h2 className="text-gray-800">People: {item.people}</h2>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end my-10">
        <Button onClick={onGenerateTrip} disabled={loading}>
          {loading ? (
            <AiOutlineLoading3Quarters className="h-6 w-20 animate-spin" />
          ) : (
            "Generate my trip"
          )}
        </Button>
      </div>

      <SignInDialog open={openDialog} onClose={() => setOpenDialog(false)} onSignInSuccess={() => console.log("Signed In!")} />
    </div>
  );
}

export default CreateTrip;
