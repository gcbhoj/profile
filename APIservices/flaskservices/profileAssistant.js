const FLASK_BASE_URL = import.meta.env.VITE_FLASK_URL;

export const getProfileAssistantName = async () => {
  const response = await fetch(`${FLASK_BASE_URL}/profile_assistant/get-name`, {
    method: "GET",
    headers: {
      Content_Type: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to retrieve profile assistant name");
  }

  console.log("Profile Assistant Name: ", response);

  return await response.json;
};

export const initializeNewChat = async () => {
  const response = await fetch(
    `${FLASK_BASE_URL}/profile_assistant/init-chat`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!response.ok) {
    throw new Error(`Failed to initialize chat: ${response.status}`);
  }

  return await response.json();
};

export const postNewQuery = async (sessionId, text) => {
  const response = await fetch(
    `${FLASK_BASE_URL}/profile_assistant/post-query`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        chat_id: sessionId,
        text: text,
      },
    },
  );
  if (!response.ok) {
    throw new Error("Failed to post Query to Profile Assistant");
  }

  return await response.json();
};
