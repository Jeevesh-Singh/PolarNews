const GoogleGenerativeAI = require("@google/generative-ai");

const apiKey = "AIzaSyCNm_S-b2A8aLxwCdzkJ93MAfvryDSlCn4"; // Replace with your actual API key


async function getGenerativeModel() {
    try {
      const response = await fetch("https://esm.run/@google/generative-ai");
      const module = await response.text();

      const script = document.createElement('script');
      script.textContent = module;
      document.head.appendChild(script);

      // Optional: Wait for script to load (if necessary for your extension framework)
      // await new Promise(resolve => script.onload = resolve);

      const GoogleGenerativeAI = window.GoogleGenerativeAI; // Access the exported object
      return new GoogleGenerativeAI(apiKey);
    } catch (error) {
      console.error("Error fetching generative model:", error);
      throw error; // Re-throw for potential handling in the extension code
    }
  }

  async function run() {
    const genAI = await getGenerativeModel();

    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = "Write a very short story ";

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    alert(text);
  }

  run();