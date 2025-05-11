import React from 'react'
import Section from '../section-label'
import CodeSnippet from './code-snippet'

type Props = {}

const Installation = (props: Props) => {
    const snippetPath = [
        "src/components/installation/html-snippet.html",
        "src/components/installation/react-snippet.tsx",
    ]
  return (
    <div className="flex flex-col gap-10 md:ml-20">
     <div className='flex flex-col gap-3 '>
        <p className='text-2xl font-medium' > Choose your techstack</p>
    </div>
    <CodeSnippet path={snippetPath}  />
    
  </div>
  )
}

export default Installation