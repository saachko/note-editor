import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';

import { sortByDate } from 'utils/functions';
import { Tag } from 'utils/interfaces';
import SetState from 'utils/types';

interface TagsInputProps {
  selectedTags: Array<string>;
  setSelectedTags: SetState<Array<string>>;
  tags: Tag[];
  newTag: Tag;
  setNewTag: SetState<Tag>;
  createTag: (tagToCreate: Tag) => Promise<void>;
  deleteTag: (tagToDelete: Tag) => Promise<void>;
}

function TagsInput({
  selectedTags,
  setSelectedTags,
  tags,
  newTag,
  setNewTag,
  createTag,
  deleteTag,
}: TagsInputProps) {
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
              onClick={(event) => {
                event.stopPropagation();
                deleteTag(tag);
              }}
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
