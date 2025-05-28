
import React from 'react'
import CodeSnippetWrapper from './CodeSnippetWrapper'



const Installation = () => {
    const snippetPath = [
        "src/components/installation/html-snippet.html",
        "src/components/installation/chatbot-iframe.tsx",
        "src/components/installation/layout-code.tsx",
    ]
  return (
    <div className="flex flex-col gap-10 md:ml-20">
     <div className='flex flex-col gap-3 '>
        <p className='text-2xl font-medium' > Choose your techstack</p>
    </div>
    <CodeSnippetWrapper path={snippetPath}/>
  </div>  
  )
}

export default Installation