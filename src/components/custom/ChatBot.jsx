import React, { useState } from "react";

const JourneyChatBot = () => {
  const predefinedQuestions = [
    { id: 1, question: "Where can I travel for a weekend trip?" },
    { id: 2, question: "What are the best travel destinations in 2024?" },
    { id: 3, question: "How can I book a flight?" },
    { id: 4, question: "Can you help me with hotel bookings?" },
    { id: 5, question: "What are the top adventure travel destinations?" },
    { id: 6, question: "What is the best time to visit Europe?" },
    { id: 7, question: "How do I plan a family vacation?" },
    { id: 8, question: "Can you suggest a budget-friendly trip?" },
    { id: 9, question: "What are the must-see attractions in Paris?" },
    { id: 10, question: "How can I travel with pets?" },
  ];

  const predefinedAnswers = {
    1: "For a weekend trip, you can explore nearby cities or scenic locations. Popular weekend destinations include coastal towns, hill stations, or cultural cities.",
    2: "Some of the best travel destinations in 2024 include Japan, Iceland, Costa Rica, and Greece. These places offer stunning landscapes and unique experiences.",
    3: "We don't provide flight booking facility currently but you can book a flight directly through airline websites, travel agencies, or booking platforms like Expedia, Kayak, or Google Flights.",
    4: "Yes, I can help with hotel bookings! I can recommend you hotels based on your budget and your destination. For generating the travel plan click on Generate Trip and plan your trip.",
    5: "Top adventure travel destinations include New Zealand for bungee jumping and hiking, Costa Rica for ziplining, and Switzerland for skiing.",
    6: "The best time to visit Europe is during the spring (April to June) or fall (September to October), as the weather is pleasant and there are fewer crowds.",
    7: "Planning a family vacation involves choosing a destination with activities for everyone. Family-friendly spots include Orlando, Florida, and the beaches of Hawaii.",
    8: "For a budget-friendly trip, consider destinations in Southeast Asia, Eastern Europe, or Mexico. These regions offer great experiences at affordable prices.",
    9: "Must-see attractions in Paris include the Eiffel Tower, Louvre Museum, Notre Dame Cathedral, and Montmartre. Don't forget to enjoy a Seine river cruise.",
    10: "Traveling with pets requires research on pet-friendly destinations, accommodations, and transport options. Always check pet policies in advance.",
  };

  const [messages, setMessages] = useState([
    { sender: "bot", text: "Please select your query from below and I will assist you." },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false); // Track if chatbot is open or closed
  const [questionVisible, setQuestionVisible] = useState(false); // Show predefined questions on demand

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    setMessages([...messages, { sender: "user", text: inputMessage }]);

    // Simulate bot response after 1 second
    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: "Thanks for reaching out! Currently we do not provide custom questions service but we will add it soon. Till then Happy Journey!" },
      ]);
    }, 1000);

    setInputMessage("");
    setQuestionVisible(false); // Hide questions after a query is made
  };

  const handlePredefinedQuestionClick = (questionId) => {
    const selectedQuestion = predefinedQuestions.find((q) => q.id === questionId).question;
    const answer = predefinedAnswers[questionId];

    setMessages([
      ...messages,
      { sender: "user", text: selectedQuestion },
      { sender: "bot", text: answer },
    ]);

    setQuestionVisible(false); // Hide the question list after the answer is given
  };

  // Toggle the chatbot visibility
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
    if (isChatOpen) setQuestionVisible(false); // Hide questions when chatbot is closed
  };

  return (
    <div className="hidden md:block"> {/* Hide component on screens smaller than md (phone screens) */}
      {/* Chatbot Button (Hidden on phone screens) */}
      <div className="fixed bottom-6 right-6">
        <button
          onClick={toggleChat}
          className="bg-main text-white p-3 rounded-full md:text-lg lg:text-xl shadow-lg focus:outline-none hover:bg-secondary transition duration-300 ease-in-out"
        >
          💬
        </button>
      </div>

      {/* Chatbot Container */}
      {isChatOpen && (
        <div className="fixed bottom-6 right-6 w-[400px] h-[500px] bg-white shadow-lg rounded-lg overflow-hidden flex flex-col">
          {/* Chat Header */}
          <div className="flex items-center justify-between p-3 bg-main text-white">
            <span className="font-semibold">Customer Support</span>
            <button className="text-white focus:outline-none" onClick={toggleChat}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-x-circle"
                viewBox="0 0 16 16"
              >
                <path d="M11.354 4.646a1 1 0 0 1 0 1.414L8.707 8l2.646 2.646a1 1 0 0 1-1.414 1.414L8 9.414 5.354 12.06a1 1 0 0 1-1.414-1.414L6.586 8 3.94 5.354a1 1 0 0 1 1.414-1.414L8 6.586l2.646-2.646a1 1 0 0 1 1.414 0z" />
              </svg>
            </button>
          </div>

          {/* Chat messages (Scrollable) */}
          <div className="flex-grow p-4 overflow-y-auto">
            {messages.map((message, index) => (
              <div key={index} className={`mb-3 ${message.sender === "bot" ? "text-left" : "text-right"}`}>
                <span className={`inline-block px-4 py-2 rounded-lg ${message.sender === "bot" ? "bg-gray-200" : "bg-main text-white"}`}>
                  {message.text}
                </span>
              </div>
            ))}
          </div>

          {/* Predefined Questions (Hidden initially, clickable) */}
          {!questionVisible && (
            <div className="p-4 bg-gray-100">
              <button onClick={() => setQuestionVisible(true)} className="text-main hover:underline">
                Show Questions
              </button>
            </div>
          )}

          {questionVisible && (
            <div className="p-4 bg-gray-100">
              <p className="text-sm font-semibold mb-2">Select a question:</p>
              <div className="space-y-2">
                {predefinedQuestions.map((q) => (
                  <button
                    key={q.id}
                    onClick={() => handlePredefinedQuestionClick(q.id)}
                    className="w-full text-xs bg-gray-300 hover:bg-gray-400 text-left py-1 px-2 rounded-lg" // Reduce font-size and padding
                  >
                    {q.question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Message input area */}
          <div className="p-4 bg-gray-100 flex items-center">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none"
            />
            <button onClick={handleSendMessage} className="ml-2 bg-main text-white px-4 py-2 rounded-lg">
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JourneyChatBot;
