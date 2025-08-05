import Groq from 'groq-sdk';

// Debug: Check if API key is available
const apiKey = process.env.REACT_APP_GROQ_API_KEY || process.env.GROQ_API_KEY;
if (!apiKey) {
  console.error('Groq API key not found. Please check your .env file.');
}

const client = new Groq({
  apiKey: apiKey,
  dangerouslyAllowBrowser: true
});

export const analyzeImage = async (imageFile) => {
  try {
    const base64Image = await fileToBase64(imageFile);
    
    const completion = await client.chat.completions.create({
      model: "meta-llama/llama-4-scout-17b-16e-instruct",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "What's in this image? Please provide a detailed description."
            },
            {
              type: "image_url",
              image_url: {
                url: `data:${imageFile.type};base64,${base64Image}`
              }
            }
          ]
        }
      ],
      temperature: 1,
      max_completion_tokens: 1024,
      top_p: 1,
      stream: false,
      stop: null,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Error analyzing image:', error);
    throw new Error('Failed to analyze image. Please check your API key and try again.');
  }
};

const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64 = reader.result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = (error) => reject(error);
  });
};