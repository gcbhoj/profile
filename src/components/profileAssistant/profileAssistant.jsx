import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchProfileAssistantName } from "../../features/profileAssistant/profileAssistantName";
import {
  initNewChat,
  setRequest,
  startConversation,
  fetchChatHistory,
} from "../../features/profileAssistant/profileAssistantChat";

import { IoIosSend } from "react-icons/io";
import ChatHistory from "./chatHistory";

const ProfileAssistant = () => {
  const dispatch = useDispatch();

  // Local input state.
  // This changes while the user is typing.
  // It does NOT update Redux.
  const [userInput, setUserInput] = useState("");

  // Profile assistant name from Redux
  const { assistantName } = useSelector((state) => state.profileAssistantName);

  // Profile assistant chat state from Redux
  const {
    currentRequest,
    currentResponse,
    firstMessage,
    firstAudio,
    status,
    error,
  } = useSelector((state) => state.profileAssistantChat);

  // Function to normalize a string into individual sentences
  const normalizeSentence = (sentence) => {
    if (!sentence || typeof sentence !== "string") {
      return [];
    }

    return sentence
      .split(".")
      .map((part) => part.trim())
      .filter((part) => part.length > 0);
  };

  // Normalize the initial message
  const normalizedMessage = normalizeSentence(firstMessage);

  // Fetch profile assistant name when component starts
  useEffect(() => {
    // console.log("DISPATCHING FETCH PROFILE ASSISTANT NAME");

    dispatch(fetchProfileAssistantName());
  }, [dispatch]);

  // Initialize a new chat with the profile assistant
  const handleOpenChat = () => {
    dispatch(initNewChat());
  };

  // Monitor chat initialization
  useEffect(() => {
    if (status === "success") {
      // console.log("Chat initialized successfully");
    }

    if (status === "failure") {
      console.error("Chat initialization failed:", error);
    }
  }, [status, error]);

  // Update ONLY local input while typing
  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  // Submit the request
  const sendRequest = () => {
    const text = userInput.trim();

    // Do nothing if the input is empty
    if (!text) {
      return;
    }

    // console.log("Submitting request:", text);

    // Update Redux ONLY when Send is clicked
    dispatch(setRequest(text));

    // Clear the input after submitting
    setUserInput("");

    dispatch(startConversation());
    dispatch(fetchChatHistory());
  };

  // Send request when pressing Enter
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      sendRequest();
    }
  };

  return (
    <>
      {/* Profile Assistant */}
      <div
        className="container-fluid border border-2"
        style={{
          height: "120px",
          width: "100%",
        }}
      >
        <div
          className="d-flex justify-content-start align-items-center"
          style={{
            height: "100%",
          }}
        >
          <img
            src="/robo.png"
            alt="Profile Assistant"
            className="btn"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            onClick={handleOpenChat}
            style={{
              height: "calc(100% - 20px)",
              width: "100px",
              objectFit: "contain",
              margin: "10px",
              marginBottom: "2px",
            }}
          />

          <div
            className="bg-dark text-white px-3 py-2 rounded"
            style={{
              position: "relative",
              marginLeft: "10px",
              whiteSpace: "nowrap",
            }}
          >
            Hi! I'm {assistantName} 👋
          </div>
        </div>
      </div>

      {/* Modal */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            {/* Modal Header */}
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                {assistantName}
              </h1>

              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>

            {/* Modal Body */}
            <div className="modal-body">
              {/* Initial Message */}
              <div className="mb-3">
                <strong>{assistantName}:</strong>

                {normalizedMessage.length > 0 ? (
                  normalizedMessage.map((sentence, index) => (
                    <p key={index} className="mb-2">
                      {sentence}.
                    </p>
                  ))
                ) : (
                  <p className="text-muted">Waiting for response...</p>
                )}

                {/* Initial Audio */}
                {firstAudio && (
                  <audio controls className="mt-2 w-100">
                    <source src={firstAudio} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                )}
              </div>

              <hr />

              {/* Chat History */}
              <div className="accordion mb-3" id="chatHistoryAccordion">
                <div className="accordion-item border-0">
                  <h2 className="accordion-header" id="chatHistoryHeading">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#chatHistoryCollapse"
                      aria-expanded="false"
                      aria-controls="chatHistoryCollapse"
                    >
                      Previous Requests
                    </button>
                  </h2>

                  <div
                    id="chatHistoryCollapse"
                    className="accordion-collapse collapse"
                    aria-labelledby="chatHistoryHeading"
                    data-bs-parent="#chatHistoryAccordion"
                  >
                    <div className="accordion-body">
                      <ChatHistory />
                    </div>
                  </div>
                </div>
              </div>

              {/* Current Request and Response */}
              <div className="p-3">
                <h5 className="mb-3">Current Chat</h5>

                {/* Current Request */}
                {currentRequest && (
                  <div className="mb-3 d-flex justify-content-end">
                    <div
                      className="text-end"
                      style={{
                        maxWidth: "75%",
                      }}
                    >
                      <strong>You:</strong>

                      <div className="bg-primary text-white rounded p-2 mt-1">
                        {currentRequest}
                      </div>
                    </div>
                  </div>
                )}

                {/* Current Response */}
                <div>
                  <strong>{assistantName}:</strong>

                  <div className="bg-light rounded p-2 mt-1">
                    {currentResponse || (
                      <span className="text-muted">
                        Waiting for response...
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Input */}
            <div className="modal-footer">
              <div className="d-flex align-items-center w-100 gap-2">
                <div className="form-floating flex-grow-1">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingInput"
                    placeholder="Your Query"
                    value={userInput}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                  />

                  <label htmlFor="floatingInput">Your Query:</label>
                </div>

                <button
                  type="button"
                  className="btn d-flex align-items-center justify-content-center"
                  style={{
                    height: "58px",
                    width: "58px",
                  }}
                  onClick={sendRequest}
                >
                  <IoIosSend size={25} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileAssistant;
