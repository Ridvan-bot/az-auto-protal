"use client";
import React, { useRef, useState, useEffect } from 'react';
import Convert from './convert';
import { handleFileChange, handleSaveTemplate } from './utils/fileHandler';
import { getTemplate, getTemplates } from '@/services/api';
import { extractKeys, mapKeys } from './utils/utils';


const Home: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState<any[]>([]);
  const [templateName, setTemplateName] = useState<string>(''); // State for template name
  const [message, setMessage] = useState<string>('');
  const [messageColor, setMessageColor] = useState<string>(''); // State for message color
  const [tableHeaders, setTableHeaders] = useState<string[]>([]); // State for table headers
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleImportClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  useEffect(() => {
    if (searchQuery) {
      fetchTemplate(searchQuery);
      console.log(searchQuery);
    }
  }, [searchQuery]);
  
  const fetchTemplate = async (filename: string) => {
    try {
      const data = await getTemplate(filename);
      const keys = extractKeys(data);
      setTableHeaders(keys);
      const updatedContent = mapKeys(fileContent, keys);
      setFileContent(updatedContent);
    } catch (error) {
      setMessage('Mallen finns inte eller kunde inte hämtas');
      setMessageColor('text-red-500');
      setTimeout(() => {
        setMessage('');
        setMessageColor('');
      }, 5000);
    }
  };

  

  return (
    <div className="container-fluid flex flex-col items-center pt-4 ">
      <div className="flex space-x-4">
        <button
          className="button-custom px-4 py-2 bg-customButton text-customButtonTextColor rounded"
          onClick={handleImportClick}
        >
          Importera CSV
        </button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={(event) => handleFileChange(event, setUploadedFileName, setFileContent, setMessage)}
        />
        <input
          type="text"
          value={templateName}
          onChange={(e) => setTemplateName(e.target.value)}
          placeholder="Ange mallens namn"
          className="input-custom px-4 py-2 rounded"
        />
        <button
          className="button-custom px-4 py-2 bg-customButton text-customButtonTextColor rounded"
          onClick={() => handleSaveTemplate(fileContent, templateName, setMessage, setMessageColor)}
        >
          Spara Mall
        </button>
        <div className="relative">
          <button
            className="button-custom px-4 py-2 bg-customButton text-customButtonTextColor rounded" 
            onClick={() => fetchTemplate(templateName)}
          >
            Använd Mall
          </button>
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Sök efter mallar"
          className="input-custom px-4 py-2 rounded"
        />
      </div>
      {message && <p className={messageColor}>{message}</p>}
      {fileContent.length > 0 && <Convert fileContent={fileContent}  />}
    </div>
  );
};

export default Home;