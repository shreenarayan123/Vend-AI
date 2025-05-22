'use client'
import { useEffect } from "react";
  
  const ChatBotIframe = () => {
    useEffect(() => {
      // Create iframe element
      const iframe = document.createElement("iframe");
      iframe.src = "${backendurl}chatbot?id=${id}";
      iframe.classList.add("chat-frame");
  
      // Add the iframe to the DOM
      document.body.appendChild(iframe);
  
      // Create and apply styles
      const style = document.createElement("style");
      style.textContent = `
     .chat-frame {
       position: fixed;
       bottom: 50px;
       right: 50px;
       border: none;
     }
   `;
      document.head.append(style);
  
      // Set up message event listener
      const handleMessage = (e: MessageEvent) => {
        try {
          const dimensions = JSON.parse(e.data);
          if (iframe && dimensions.width && dimensions.height) {
            iframe.width = dimensions.width;
            iframe.height = dimensions.height;
          }
        } catch (error) {
          console.error("Error processing iframe message:", error);
        }
      };
  
      window.addEventListener("message", handleMessage);
  
      // Cleanup function
      return () => {
        window.removeEventListener("message", handleMessage);
        if (iframe && iframe.parentNode) {
          iframe.parentNode.removeChild(iframe);
        }
        if (style && style.parentNode) {
          style.parentNode.removeChild(style);
        }
      };
    }, []);
  
    return null;
  };
  
  export default ChatBotIframe;