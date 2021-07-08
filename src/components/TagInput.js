import React, { useState } from 'react';
import './TagInput.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const TagInput = ({ get, postToDatabaseHandler }) => {
    const [value, setValue] = useState("");
    const [text, setText] = useState("");
    const [tags, setTags] = useState([]);
    const [isSuggest, setIsSuggest] = useState(false);
    const [suggestion, setSuggestion] = useState([]);

    const changeHandler = (e) => {
        const tagInputValue = e.target.value;
        if (tagInputValue.length > 0) {
            setIsSuggest(true);
            setSuggestion(get.filter((e) => e.toLowerCase().includes(tagInputValue.toLowerCase())));
        }
        else {
            setIsSuggest(false);
        }
        setValue(tagInputValue);
        setText(tagInputValue);
    }

    const keyboardHandler = (e) => {
        if (e.code === "Enter" || e.code==="Space" || e.code==="NumpadAdd") {
            postToDatabaseHandler(text)
            setTags([...tags, text])
            setValue("");
        }
    }
    const addTagFromSuggest = (tag) => {
        const existTag = tags.find(tg => tg === tag);
        if (existTag !== tag) {
            setTags([...tags, tag])
            setValue("");
            setIsSuggest(false);
        }
        else {
            alert("Tag Already Added!");
        }
    }
    const removeTags = (indexToRemove) => {
        const afterRemoveTags = tags.filter((_, index) => index !== indexToRemove);
        setTags(afterRemoveTags);
    }
    return (
        <div className="container">
            <div className="tag-header mt-12">
                <h4 className="text-green-600 text-2xl font-bold mb-1 text-gray-700">TAGS</h4>
                <p className="mb-2 text-gray-600">Select time for your event</p>
            </div>
            <div id="tagInput" className="tagInput p-5 rounded-lg transition duration-500 ease-in-out bg-gray-100 border-b-2 focus:border-green-600 hover:border-green-600">
                <ul>
                    {
                        tags.map((tag, index) => {
                            return (
                                <li className="mx-1 my-2 hover:bg-green-700 bg-green-600 text-white px-3 py-1 rounded-lg" key={index}>
                                    <span>{tag}</span>
                                    <button onClick={() => removeTags(index)}>
                                        <FontAwesomeIcon icon={faTimes} />
                                    </button>
                                </li>
                            )
                        })
                    }
                </ul>
                <input className="mt-2 text-lg text-gray-800" value={value} onKeyPress={keyboardHandler} onChange={(e) => changeHandler(e)} id="tag-input" type="text" placeholder="ADD TAGS" />
            </div>
            {
                isSuggest && <div className="tagSuggestion">
                    <div className="suggest-lists">
                        {
                            suggestion.length > 0 ? suggestion.map(s => <p onClick={() => addTagFromSuggest(s)} className="py-3 px-3 hover:bg-green-600 hover:text-white rounded text-lg my-2 cursor-pointer">{s}</p>) :
                                <p className="text-gray-600 text-2xl ml-5 mt-5">Not Found</p>
                        }
                    </div>
                </div>
            }
        </div>
    );
};

export default TagInput;