"use client";
import React, { useState, ChangeEvent, useEffect } from 'react';
import { FiX } from 'react-icons/fi';

interface Option {
  id: number;
  label: string;
}

const SelectSearch: React.FC = () => {
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
  const [options, setOptions] = useState<Option[]>([
    { id: 1, label: "Aarav Patel" },
    { id: 2, label: "Aditi Sharma" },
    { id: 3, label: "Akshay Singh" },
    { id: 4, label: "Anaya Verma" },
    { id: 5, label: "Arjun Gupta" },
    { id: 6, label: "Avni Joshi" },
    { id: 7, label: "Divya Kumar" },
    { id: 8, label: "Esha Trivedi" },
    { id: 9, label: "Ishaan Choudhary" },
    { id: 10, label: "Kavya Sharma" },
    { id: 11, label: "Manish Yadav" },
    { id: 12, label: "Mira Jain" },
    { id: 13, label: "Neha Mehta" },
    { id: 14, label: "Rahul Kapoor" },
    { id: 15, label: "Riya Malhotra" },
    { id: 16, label: "Rohan Saha" },
    { id: 17, label: "Sanya Gupta" },
    { id: 18, label: "Shiv Kumar" },
    { id: 19, label: "Tanvi Patel" },
    { id: 20, label: "Yash Joshi" }
  ]);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleOptionClick = (option: Option) => {
    if (!selectedOptions.find((selected) => selected.id === option.id)) {
      setSelectedOptions([...selectedOptions, option]);
      setOptions((prevOptions) => prevOptions.filter((o) => o.id !== option.id));
    }
    setSearchTerm('');
  };

  
  const handleRemoveOption = (id: number) => {
      const removedOption = selectedOptions.find((option) => option.id === id);
    if (removedOption) {
        setSelectedOptions(selectedOptions.filter((option) => option.id !== id));
        setOptions([...options, removedOption]);
    }
};

const handleInputFocus = () => {
    setIsInputFocused(true);
};

useEffect(() => {
  setOptions((prevOptions) => [...prevOptions].sort((a, b) => a.label.localeCompare(b.label)));
}, [options]);

return (
    <div className='h-[60vh] flex justify-center items-center'>
        <div className="relative w-full max-w-[50vw] ">
                <div className="flex flex-wrap mt-2">
                    {selectedOptions.map((option) => (
                        <div key={option.id} className="flex text-xs items-center bg-gray-200 rounded-full mr-2 mb-2 p-2 ">
                            {option.label}
                            <FiX
                                className="ml-2 cursor-pointer"
                                onClick={() => handleRemoveOption(option.id)}
                            />
                        </div>
                    ))}
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearch}
                    onFocus={handleInputFocus}
                    className="py-2 outline-none px-3 inline"
                    placeholder="Search Names..."
                />
            </div>
            {isInputFocused && (
                <div className="absolute top-full left-0 mt-1 w-full max-h-[40vh] overflow-scroll bg-white border rounded shadow-lg text-xs">
                    {searchTerm === '' ? (
                        // Show all options when input is empty
                        options.map((option) => (
                            <div
                                key={option.id}
                                className="p-2 cursor-pointer hover:bg-gray-100"
                                onClick={() => handleOptionClick(option)}
                            >
                                {option.label}
                            </div>
                        ))
                    ) : (
                        // Show filtered options based on the input
                        filteredOptions.map((option) => (
                            <div
                                key={option.id}
                                className="p-2 cursor-pointer hover:bg-gray-100"
                                onClick={() => handleOptionClick(option)}
                            >
                                {option.label}
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    </div>
);
};

export default SelectSearch;
