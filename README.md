# AP Image Analysis

A React web application that uses the Groq API to analyze and describe images using AI.

## Features

- Upload images through a web interface
- Preview uploaded images
- Analyze images using Groq's AI models
- Display detailed analysis results
- Reset functionality to start over

## Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Set up Environment Variables**
   Create a `.env` file in the root directory with your Groq API key:
   ```
   REACT_APP_GROQ_API_KEY=your_groq_api_key_here
   ```
   
   To get your API key:
   - Visit [Groq Console](https://console.groq.com/)
   - Sign up or log in
   - Generate an API key
   - Copy the key to your `.env` file

3. **Start the Development Server**
   ```bash
   npm start
   ```

4. **Open the App**
   The app will open automatically in your browser at `http://localhost:3000`

## Usage

1. Click "Choose Image" to select an image file
2. Preview the selected image
3. Click "Analyze Image" to get AI-powered analysis
4. View the detailed description of what's in the image
5. Use "Reset" to start over with a new image

## Technologies Used

- React 18
- Groq SDK for API integration
- Base64 image encoding for API requests
- Modern CSS for styling

## API Model

The app uses the `meta-llama/llama-4-scout-17b-16e-instruct` model for image analysis, which provides detailed descriptions of image contents.

## Troubleshooting

- Make sure your Groq API key is correctly set in the `.env` file
- Ensure the API key has sufficient credits/quota
- Check the browser console for any error messages
- Verify that the image file is a supported format (JPEG, PNG, etc.) # ImageAnalysisAI
