
import CodeCard from "./code-card";
import fs from 'fs/promises';
import { onGetAllAccountDomains } from "@/actions/settings";
import React from "react";

type Props = {
  path : string[];
};

const CodeSnippet = async ({  path }: Props) => {
  const domains = await onGetAllAccountDomains();
  const backendUrl = process.env.BACKEND_URL;

  const getCode = async(path:string[])=>{
    const getChatbotCode = path.map((path)=>{
      return  fs.readFile(path, "utf-8")
    })                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
    return Promise.all(getChatbotCode)
  }
   const getId = (path:string[])=>{
   
  const domainId = domains?.domains?.[0]?.id ?? null;
 
  const snippetWithId = path.map((path) => {
    return path
      .replace(/\$\{id\}/g, domainId ?? "")
      .replace(/\$\{backendurl\}/g, backendUrl ?? "");
  })
  return snippetWithId;
  }
   const chatbotCode1 = await getCode(path);
   const codeSnippetWithId = getId(chatbotCode1);

  return (
    <div className="w-full flex">
        <CodeCard code={codeSnippetWithId}/>
      </div>
   
  );
};

export default CodeSnippet;
