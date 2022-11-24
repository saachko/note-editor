import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';

import { sortByDate } from 'utils/functions';
import SetState from 'utils/types';

import useTags from 'hooks/useTags';

interface TagsInputProps {
  selectedTags: Array<string>;
  setSelectedTags: SetState<Array<string>>;
}

function TagsInput({ selectedTags, setSelectedTags }: TagsInputProps) {
  const { tags, newTag, setNewTag, createTag, deleteTag } = useTags();

  const selectTag = (tagName: string) => {
    if (selectedTags.find((item) => item === tagName)) {
      setSelectedTags((prev) => [...prev.filter((item) => item !== tagName)]);
      return;
    }
    setSelectedTags((prev) => [...prev, tagName]);
  };

  return (
    <div className="tags__wrapper">
      <ul className="tags__list">
        {tags.sort(sortByDate()).map((tag) => (
          <li
            key={tag.id}
            className="tag"
            aria-hidden="true"
            onClick={({ target }) => {
              (target as HTMLElement).classList.toggle('tag_active');
              selectTag(tag.tagName);
            }}
          >
            {tag.tagName}
            <button
              type="button"
              id="close"
              className="button tag__close-button"
              onClick={() => deleteTag(tag.id)}
            >
              <AiOutlineClose />
            </button>
          </li>
        ))}
      </ul>
      <input
        className="tags__input"
        type="text"
        value={newTag.tagName}
        onChange={({ target }) => {
          setNewTag((prev) => ({ ...prev, tagName: target.value }));
        }}
        onKeyUp={(event) => (event.key === 'Enter' ? createTag(newTag) : null)}
        placeholder="Press Enter to add tags"
      />
    </div>
  );
}

export default TagsInput;
