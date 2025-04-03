import { useState, useRef, useEffect } from "react";

const ChatInput = ({ onSubmit }) => {
    const [question, setQuestion] = useState("");
    const textareaRef = useRef(null);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (question.trim()) {
            onSubmit(question);
            setQuestion("");
        }
    };
    
    const adjustTextareaHeight = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = "auto";
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    };
    
    useEffect(() => {
        adjustTextareaHeight();
    }, [question]);

    return (
        <div className="input-container">
            <form onSubmit={handleSubmit}>
                <label htmlFor="question">Give me your Prompt</label>
                <textarea
                    ref={textareaRef}
                    id="question"
                    placeholder="Enter your prompt to optimize it..."
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                />
                <button type="submit" className="generate-btn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 4V20M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Generate
                </button>
            </form>
        </div>
    );
};

export default ChatInput;

// import { useState } from "react";

// const ChatInput = ({ onSubmit }) => {
//     const [question, setQuestion] = useState("");
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (question.trim()) {
//             onSubmit(question);
//             setQuestion("");
//         }
//     }

//     return (
//         <div className="container my-4">
//             <form onSubmit={handleSubmit}>
//                 <div className="form-group">
//                     <label htmlFor="question">Give me your Prompt</label>
//                     <textarea
//                         className="form-control auto-expand"
//                         id="question"
//                         placeholder="Enter your Prompt"
//                         value={question}
//                         onChange={(e) => {
//                             setQuestion(e.target.value);
//                             e.target.style.height = "auto"; // Reset height
//                             e.target.style.height = e.target.scrollHeight + "px"; // Set new height
//                         }}
//                     />

//                 </div>

//                 <button type="submit" className="btn btn-primary mt-4">
//                     Generate
//                 </button>
//             </form>
//         </div>
//     )
// }

// export default ChatInput;