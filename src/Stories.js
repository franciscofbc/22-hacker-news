import React from 'react';

import { useGlobalContext } from './context';

const Stories = () => {
  const { isLoading, hits, removeStory } = useGlobalContext();

  if (isLoading) {
    return <div className="loading"></div>;
  }

  return (
    <section className="stories">
      {hits.map((hit) => {
        const { objectID, title, num_comments, url, points, author } = hit;
        return (
          <article className="story" key={objectID}>
            <h4 className="title">{title}</h4>
            <p className="info">
              {points} points by <span>{author} | </span>
              {num_comments}
            </p>
            <div>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="read-link"
              >
                read more
              </a>
              <button
                type="button"
                className="remove-btn"
                onClick={() => {
                  removeStory(objectID);
                }}
              >
                remove
              </button>
            </div>
          </article>
        );
      })}
    </section>
  );
};

export default Stories;
