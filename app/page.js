// "use client";

// import { useState, useEffect, useRef } from "react";
// import { Box, Button, Stack, TextField } from "@mui/material";

// export default function Home() {
//   const [messages, setMessages] = useState([
//     {
//       role: "assistant",
//       content:
//         "Hi! I'm the Headstarter support assistant. How can I help you today?",
//     },
//   ]);
//   const [message, setMessage] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   // We'll implement this function in the next section
//   const sendMessage = async () => {
//     if (!message.trim()) return; // Don't send empty messages

//     setMessage("");
//     setMessages((messages) => [
//       ...messages,
//       { role: "user", content: message },
//       { role: "assistant", content: "" },
//     ]);

//     try {
//       const response = await fetch("/api/chat", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify([...messages, { role: "user", content: message }]),
//       });

//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }

//       const reader = response.body.getReader();
//       const decoder = new TextDecoder();

//       while (true) {
//         const { done, value } = await reader.read();
//         if (done) break;
//         const text = decoder.decode(value, { stream: true });
//         setMessages((messages) => {
//           let lastMessage = messages[messages.length - 1];
//           let otherMessages = messages.slice(0, messages.length - 1);
//           return [
//             ...otherMessages,
//             { ...lastMessage, content: lastMessage.content + text },
//           ];
//         });
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       setMessages((messages) => [
//         ...messages,
//         {
//           role: "assistant",
//           content:
//             "I'm sorry, but I encountered an error. Please try again later.",
//         },
//       ]);
//     }
//   };

//   const handleKeyPress = (event) => {
//     if (event.key === "Enter" && !event.shiftKey) {
//       event.preventDefault();
//       sendMessage();
//     }
//   };

//   const messagesEndRef = useRef(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   return (
//     <Box
//       width="100vw"
//       height="100vh"
//       display="flex"
//       flexDirection="column"
//       justifyContent="center"
//       alignItems="center"
//       bgcolor="white"
//     >
//       <Stack
//         direction={"column"}
//         width="500px"
//         height="700px"
//         border="1px solid black"
//         p={2}
//         spacing={3}
//       >
//         <Stack
//           direction={"column"}
//           spacing={2}
//           flexGrow={1}
//           overflow="auto"
//           maxHeight="100%"
//         >
//           {messages.map((message, index) => (
//             <Box
//               key={index}
//               display="flex"
//               justifyContent={
//                 message.role === "assistant" ? "flex-start" : "flex-end"
//               }
//             >
//               <Box
//                 bgcolor={
//                   message.role === "assistant"
//                     ? "primary.main"
//                     : "secondary.main"
//                 }
//                 color="white"
//                 borderRadius={16}
//                 p={3}
//               >
//                 {message.content}
//               </Box>
//             </Box>
//           ))}
//           <div ref={messagesEndRef} />
//         </Stack>
//         <Stack direction={"row"} spacing={2}>
//           <TextField
//             label="Message"
//             fullWidth
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             onKeyPress={handleKeyPress}
//             disabled={isLoading}
//           />
//           <Button
//             variant="contained"
//             onClick={sendMessage}
//             disabled={isLoading}
//           >
//             {isLoading ? "Sending..." : "Send"}
//           </Button>
//         </Stack>
//       </Stack>
//     </Box>
//   );
// }

"use client";

import { Box, Button, Stack, TextField } from "@mui/material";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! How can I help you today? Feel free to ask me anything about Web Development!",
    },
  ]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const hardcodedResponses = {
    "what is html":
      "HTML stands for HyperText Markup Language. It's the standard language for creating web pages and web applications.",
    "what is css":
      "CSS stands for Cascading Style Sheets. It's used to style and layout web pages—for example, to alter the font, color, spacing, and layout of elements on a page.",
    "what is javascript":
      "JavaScript is a programming language that lets you implement complex features on web pages, including displaying timely content updates, interactive maps, animated 2D/3D graphics, and more.",
    "what is react":
      "React is a popular JavaScript library for building user interfaces, especially for single-page applications. It's maintained by Facebook and a community of developers.",
    "what is the difference between frontend and backend":
      "Frontend refers to the part of a website that users interact with directly (like HTML, CSS, JavaScript). Backend refers to the server-side of a website, where data is stored, and operations like user authentication, database communication, and server logic take place.",
    "what is api":
      "An API, or Application Programming Interface, allows different software applications to communicate with each other. In web development, APIs are often used to allow the frontend to interact with the backend.",
    "what is responsive design":
      "Responsive design is an approach to web design that makes web pages render well on various devices and window or screen sizes, from desktop monitors to mobile phones.",
    "how do i deploy a website":
      "There are several ways to deploy a website. Popular options include using services like Netlify, Vercel, or GitHub Pages for static sites, or deploying on cloud platforms like AWS, Google Cloud, or Heroku for dynamic sites.",
    default:
      "Sorry, I don't understand that. Can you please rephrase your question?",
  };

  const getHardcodedResponse = (userMessage) => {
    const key = userMessage.toLowerCase();
    return hardcodedResponses[key] || hardcodedResponses.default;
  };

  const sendMessage = async () => {
    if (!message.trim()) return; // Don't send empty messages

    const userMessage = message.trim();
    setMessage(""); // Clear input field

    // Add user's message to chat
    setMessages((messages) => [
      ...messages,
      { role: "user", content: userMessage },
      { role: "assistant", content: "" }, // Placeholder for assistant's message
    ]);

    setIsLoading(true); // Indicate loading

    // Simulate API response delay
    setTimeout(() => {
      const responseMessage = getHardcodedResponse(userMessage);

      // Update assistant's message with the hardcoded response
      setMessages((messages) => {
        let lastMessage = messages[messages.length - 1];
        let otherMessages = messages.slice(0, messages.length - 1);
        return [...otherMessages, { ...lastMessage, content: responseMessage }];
      });

      setIsLoading(false); // Stop loading
    }, 1000); // 1 second delay to simulate response time
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      bgcolor="white" // Set background to white
    >
      <Stack
        direction={"column"}
        width="500px"
        height="700px"
        border="1px solid black"
        p={2}
        spacing={3}
        bgcolor="white" // Set inner box background to white
      >
        <Stack
          direction={"column"}
          spacing={2}
          flexGrow={1}
          overflow="auto"
          maxHeight="100%"
        >
          {messages.map((message, index) => (
            <Box
              key={index}
              display="flex"
              justifyContent={
                message.role === "assistant" ? "flex-start" : "flex-end"
              }
            >
              <Box
                bgcolor={
                  message.role === "assistant"
                    ? "primary.main"
                    : "secondary.main"
                }
                color="white"
                borderRadius={16}
                p={3}
              >
                {message.content}
              </Box>
            </Box>
          ))}
          <div ref={messagesEndRef} />
        </Stack>
        <Stack direction={"row"} spacing={2}>
          <TextField
            label="Message"
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
          />
          <Button
            variant="contained"
            onClick={sendMessage}
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send"}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
