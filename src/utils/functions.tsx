import $ from 'jquery';

import { Note, Tag } from './interfaces';

const sortByDate = () => (a: Note | Tag, b: Note | Tag) =>
  (a.date || 0) < (b.date || 1) ? 1 : -1;

const addHashtagToTag = (tag: Tag) => {
  let tagWithHashtag = '#';
  if (tag.tagName && tag.tagName[0] !== '#') {
    tagWithHashtag += tag.tagName;
    return { ...tag, tagName: tagWithHashtag };
  }
  return tag;
};

const findHashtagsInText = (text: string) => {
  const newTags: string[] = text.split(' ').filter((item) => item[0] === '#');
  return newTags;
};

const highlightTags = (inputId: string, divId: string) => {
  $(document).ready(() => {
    let str = $(`#${inputId}`).val() as string;
    str = str.replace(/(<.+?>)/gi, '');
    str = str.replace(/(?:\r\n|\n\r|\r|\n)/g, '<br /> ');
    str = str.replace(/(?:\s|^)#([^W\s][а-яА-ЯёЁa-zA-Z0-9]*)/g, ' <b>#$1</b>');
    $(`#${divId}`).html(str);
  });
};

export { sortByDate, addHashtagToTag, findHashtagsInText, highlightTags };
