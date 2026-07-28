const getResume = async () => {
  const response = await fetch("/data/resume.json");

  if (!response.ok) {
    throw new Error("Failed to load resume data");
  }

  return await response.json();
};

const resumeService = {
  getResume,
};

export default resumeService;
