import { useState } from 'react';
import './App.css';
import ChatInput from './components/ChatInput';
import ChatResponse from './components/ChatResponse';
import { fetchChatResponse } from './services/api';

function App() {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleQuestionSubmit = async (question) => {
    setLoading(true);
    setResponse(null);
    try {
      const apiResponse = await fetchChatResponse(question);
      setResponse(apiResponse);
    } catch (error) {
      alert("Failed to get response");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="app-header">
        <span className="robot-icon">🤖</span>
        <h1>AI Prompt Generator</h1>
      </header>
      <ChatInput onSubmit={handleQuestionSubmit} />
      {loading && (
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      )}
      <ChatResponse response={response} />
    </div>
  );
}

export default App;

// import { useState } from 'react';
// import './App.css';
// import ChatInput from './components/ChatInput';
// import ChatResponse from './components/ChatResponse';
// import { fetchChatResponse } from './services/api';

// function App() {
//   const [response, setResponse] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleQuestionSubmit = async (question) => {
//     setLoading(true);
//     setResponse(null);
//     try {
//       const apiResponse = await fetchChatResponse(question);
//       setResponse(apiResponse);
//     } catch (error) {
//       alert("Failed to get response");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="App">
//       <header className="app-header">
//         <h1>🤖 AI Prompt Generator</h1>
//       </header>
//       <ChatInput onSubmit={handleQuestionSubmit} />
//       {loading && <h3 className="loading-text">Loading...</h3>}
//       <ChatResponse response={response} />
//     </div>
//   );
// }

// export default App;


// import { useState } from 'react'
// import './App.css'
// import ChatInput from './components/ChatInput'
// import ChatResponse from './components/ChatResponse'
// import { fetchChatResponse } from './services/api';

// function App() {
//   const [response, setResponse] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleQuestionSubmit = async (question) => {
//     setLoading(true);
//     setResponse(null);
//     try {
//       const apiResponse = await fetchChatResponse(question);
//       setResponse(apiResponse);
//     } catch (error) {
//       alert("Failed to get response")
//     } finally {
//       setLoading(false);
//     }
//   }

  
//   // if (loading) {
//   //   return (<h1>Loading...</h1>);
//   // }

//   return (
//     <div className='App'>
//       <header className='bg-primary text-white text-center py-4'>
//         <h1>Gemini ChatBot</h1>
//       </header>
//       <ChatInput onSubmit={handleQuestionSubmit}/>
//       {loading &&  <h3>Loading...</h3>}
//         <ChatResponse response={response} />
//       {/* RESPONSE */}
//     </div>
//   )
// }

// export default App
