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
            <div className="tag-header">
                <h4>TAGS</h4>
                <p>Select time for your event</p>
            </div>
            <div id="tagInput" className="tagInput">
                <ul>
                    {
                        tags.map((tag, index) => {
                            return (
                                <li key={index}>
                                    <span>{tag}</span>
                                    <button onClick={() => removeTags(index)}>
                                        <FontAwesomeIcon icon={faTimes} />
                                    </button>
                                </li>
                            )
                        })
                    }
                </ul>
                <input value={value} onKeyPress={keyboardHandler} onChange={(e) => changeHandler(e)} id="tag-input" type="text" placeholder="ADD TAGS" />
            </div>
            {
                isSuggest && <div className="tagSuggestion">
                    <div className="suggest-lists">
                        {
                            suggestion.length > 0 ? suggestion.map(s => <p onClick={() => addTagFromSuggest(s)} className="suggest-list">{s}</p>) :
                                <p className="notFound">Not Found</p>
                        }
                    </div>
                </div>
            }
        </div>
    );
};

export default TagInput;