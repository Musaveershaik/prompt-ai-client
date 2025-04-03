import React, { useState } from "react";
import ReactMarkdown from "react-markdown";

const ChatResponse = ({ response }) => {
  if (!response) {
    return null;
  }

  const { candidates, usageMetadata } = response;
  const [copySuccess, setCopySuccess] = useState({});

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    
    // Set this specific button to success state
    setCopySuccess({ ...copySuccess, [index]: true });
    
    // Reset the button after animation completes
    setTimeout(() => {
      setCopySuccess({ ...copySuccess, [index]: false });
    }, 2000);
  };

  return (
    <>
      {candidates.map((candidate, index) => (
        <div className="response-container" key={index}>
          <div className="response-header">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Response
            <button
              className={`copy-button ${copySuccess[index] ? 'success' : ''}`}
              onClick={() => copyToClipboard(candidate.content.parts[0].text, index)}
              aria-label="Copy to clipboard"
            >
              {copySuccess[index] ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="currentColor"/>
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 4V16C8 17.1 8.9 18 10 18H18C19.1 18 20 17.1 20 16V8.4C20 8.2 19.9 7.9 19.7 7.8L16.2 4.2C16.1 4.1 15.8 4 15.6 4H10C8.9 4 8 4.9 8 6ZM16 5.4L18.6 8H16V5.4ZM4 6C4 4.9 4.9 4 6 4H7V6H6V18H14V20H6C4.9 20 4 19.1 4 18V6Z" fill="currentColor"/>
                </svg>
              )}
            </button>
          </div>
          <div className="response-body">
            <div className="response-text">
              <ReactMarkdown>{candidate.content.parts[0].text}</ReactMarkdown>
            </div>
            {candidate?.citationMetadata?.citationSources?.length > 0 && (
              <div className="response-citations">
                <h3>Citations</h3>
                <ul>
                  {candidate.citationMetadata.citationSources.map(
                    (source, idx) => (
                      <li key={idx}>
                        <a
                          href={source.uri}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {source.uri}
                        </a>{" "}
                        (Indexes: {source.startIndex} - {source.endIndex})
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      ))}

      {response && (
        <div className="metadata-container">
          <div className="metadata-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 6V12L16 14M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Usage Metadata
          </div>
          <div className="metadata-stats">
            <div className="stat-card">
              <span className="stat-label">Prompt Tokens</span>
              <span className="stat-value">{usageMetadata.promptTokenCount}</span>
            </div>
            <div className="stat-card">
              <span className="stat-label">Response Tokens</span>
              <span className="stat-value">{usageMetadata.candidatesTokenCount}</span>
            </div>
            <div className="stat-card">
              <span className="stat-label">Total Tokens</span>
              <span className="stat-value">{usageMetadata.totalTokenCount}</span>
            </div>
          </div>
        </div>
      )}

      {/* Add this CSS for animation */}
      <style jsx>{`
        .copy-button {
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .copy-button.success {
          color: #10b981;
        }
        
        .copy-button svg {
          transition: transform 0.3s ease;
        }
        
        .copy-button.success svg {
          transform: scale(1.2);
        }
      `}</style>
    </>
  );
};

export default ChatResponse;

// import React, { useState } from "react";
// import ReactMarkdown from "react-markdown";
// import { FaClipboard, FaCheck, FaRobot, FaChartBar } from "react-icons/fa";
// import "./ChatResponse.css";

// const ChatResponse = ({ response }) => {
//   const [copied, setCopied] = useState(false);

//   if (!response || !response.candidates || !response.usageMetadata) {
//     return null;
//   }

//   const { candidates, usageMetadata } = response;

//   const copyToClipboard = (text) => {
//     navigator.clipboard.writeText(text);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   return (
//     <div className="chat-container">
//       {candidates.map((candidate, index) => (
//         <div className="chat-card" key={index}>
//           {/* Copy Button */}
//           <button
//             className={`copy-button ${copied ? "copied" : ""}`}
//             onClick={() => copyToClipboard(candidate.content.parts[0].text)}
//             aria-label="Copy to clipboard"
//           >
//             {copied ? <FaCheck /> : <FaClipboard />}
//           </button>

//           <div className="chat-card-body">
//             <div className="chat-card-header">
//               <FaRobot className="response-icon" />
//               <h5 className="chat-card-title">Response</h5>
//             </div>

//             <div className="chat-card-content">
//               <ReactMarkdown>{candidate.content.parts[0].text}</ReactMarkdown>
//             </div>
            
//             {candidate?.citationMetadata?.citationSources.length > 0 && (
//               <div className="citations-container">
//                 <h6 className="chat-citations-title">Citations:</h6>
//                 <ul className="chat-citations">
//                   {candidate.citationMetadata.citationSources.map(
//                     (source, idx) => (
//                       <li key={idx} className="chat-citation-item">
//                         <a
//                           href={source.uri}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                         >
//                           {source.uri}
//                         </a>{" "}
//                         <span className="citation-indexes">
//                           (Indexes: {source.startIndex} - {source.endIndex})
//                         </span>
//                       </li>
//                     )
//                   )}
//                 </ul>
//               </div>
//             )}
//           </div>
//         </div>
//       ))}

//       <div className="usage-metadata">
//         <div className="metadata-header">
//           <FaChartBar className="metadata-icon" />
//           <h4 className="metadata-title">Usage Metadata</h4>
//         </div>
//         <div className="metadata-content">
//           <div className="metadata-item">
//             <span className="metadata-label">Prompt Tokens:</span>
//             <span className="metadata-value">{usageMetadata.promptTokenCount}</span>
//           </div>
//           <div className="metadata-item">
//             <span className="metadata-label">Response Tokens:</span>
//             <span className="metadata-value">{usageMetadata.candidatesTokenCount}</span>
//           </div>
//           <div className="metadata-item">
//             <span className="metadata-label">Total Tokens:</span>
//             <span className="metadata-value">{usageMetadata.totalTokenCount}</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatResponse;

// import React from "react";
// import ReactMarkdown from "react-markdown";
// import { FaClipboard } from "react-icons/fa";
// import "./ChatResponse.css";

// const ChatResponse = ({ response }) => {
//   if (!response || !response.candidates || !response.usageMetadata) {
//     return null;
//   }

//   const { candidates, usageMetadata } = response;

//   const copyToClipboard = (text) => {
//     navigator.clipboard.writeText(text);
//     alert("Copied to clipboard! ✅");
//   };

//   return (
//     <div className="chat-container">

//       {candidates.map((candidate, index) => (
//         <div className="chat-card" key={index}>
//           {/* Copy Button */}
//           <button
//             className="copy-button"
//             onClick={() => copyToClipboard(candidate.content.parts[0].text)}
//           >
//             <FaClipboard />
//           </button>

//           <div className="chat-card-body">
//           <h5 className="chat-card-title">🔹 Response</h5>

//             <div className="chat-card-text">
//               <ReactMarkdown>{candidate.content.parts[0].text}</ReactMarkdown>
//             </div>
//             {candidate?.citationMetadata?.citationSources.length > 0 && (
//               <>
//                 <h6 className="chat-citations-title">Citations:</h6>
//                 <ul className="chat-citations">
//                   {candidate.citationMetadata.citationSources.map(
//                     (source, idx) => (
//                       <li key={idx} className="chat-citation-item">
//                         <a
//                           href={source.uri}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                         >
//                           {source.uri}
//                         </a>{" "}
//                         (Indexes: {source.startIndex} - {source.endIndex})
//                       </li>
//                     )
//                   )}
//                 </ul>
//               </>
//             )}
//           </div>
//         </div>
//       ))}

//       <div className="usage-metadata">
//         <h4 className="usage-title">Usage Metadata</h4>
//         <p className="usage-text">
//           <strong>Prompt Tokens:</strong> {usageMetadata.promptTokenCount}
//         </p>
//         <p className="usage-text">
//           <strong>Response Tokens:</strong> {usageMetadata.candidatesTokenCount}
//         </p>
//         <p className="usage-text">
//           <strong>Total Tokens:</strong> {usageMetadata.totalTokenCount}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default ChatResponse;



// const ChatResponse = ({ response }) => {
//     if (!response) {
//         return null;
//     }
    
//     const {candidates, usageMetadata } = response;

//     return (
//         <div className="container my-4">
//             <h3>Response</h3>
//         {candidates.map((candidate, index) => (
//             <div className="card mb-3" key={index}>
//             <div className="card-body">
//               <h5 className="card-title">Candidate {index + 1}</h5>
//               <p className="card-text">{candidate.content.parts[0].text}</p>
//               <h6>Citations:</h6>
//               <ul>
//                 {candidate?.citationMetadata?.citationSources.map((source, idx) => (
//                     <li key={idx}>
//                         <a href={source.uri} target="_blank" rel="noopener noreferrer">
//                             {source.uri}
//                         </a> {" "}
//                         (Indexes: {source.startIndex} - {source.endIndex})
//                     </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         ))}

//         <h4>Usage Metadata</h4>
//         <p>Prompt Tokens: {usageMetadata.promptTokenCount}</p>
//         <p>ProResponse Tokens: {usageMetadata.candidatesTokenCount}</p>
//         <p>Total Tokens: {usageMetadata.totalTokenCount}</p>
//         </div>
//     )
// }

// export default ChatResponse;