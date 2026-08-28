import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchChatHistory } from "../../features/profileAssistant/profileAssistantChat";

const ChatHistory = () => {
  const dispatch = useDispatch();

  const { assistantName } = useSelector((state) => state.profileAssistantName);

  const { chatHistory, currentChatId, status, error } = useSelector(
    (state) => state.profileAssistantChat,
  );

  useEffect(() => {
    if (currentChatId) {
      dispatch(fetchChatHistory());
    }
  }, [dispatch, currentChatId]);

  return (
    <div className="list-group">
      {status === "waiting for response" && (
        <div className="list-group-item">Loading chat history...</div>
      )}

      {error && <div className="list-group-item text-danger">{error}</div>}

      {status === "success" && chatHistory.length === 0 && (
        <div className="list-group-item">No chat history available.</div>
      )}

      {chatHistory.map((chat) => (
        <div key={chat.request_id || chat.response_id}>
          {/* User Request */}
          {chat.request && (
            <div className="list-group-item border-0">
              <div className="d-flex justify-content-end">
                <div className="text-end">
                  <strong className="d-block">You:</strong>

                  <span>{chat.request}</span>
                </div>
              </div>
            </div>
          )}

          {/* Assistant Response */}
          {chat.response && (
            <div className="list-group-item border-0">
              <div className="d-flex justify-content-start">
                <div>
                  <strong className="d-block">{assistantName}:</strong>

                  <span>{chat.response}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ChatHistory;
