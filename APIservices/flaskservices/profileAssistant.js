const FLASK_BASE_URL = import.meta.env.VITE_FLASK_URL;

export const getProfileAssistantName = async () => {
  console.log("GET PROFILE ASSISTANT NAME CALLED");

  const url = `${FLASK_BASE_URL}/profile_assistant/get-name`;

  console.log("REQUEST URL:", url);

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  console.log("RESPONSE STATUS:", response.status);

  if (!response.ok) {
    throw new Error("Failed to retrieve profile assistant name");
  }

  const data = await response.json();

  console.log("PROFILE ASSISTANT DATA:", data);

  return data;
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
