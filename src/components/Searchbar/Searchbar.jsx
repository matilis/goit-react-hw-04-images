import React, { useState } from 'react';
import css from './Searchbar.module.css';

const INITIAL_STATE = {
  name: '',
};

export const Searchbar = ({ name, onSubmit }) => {
  const [searchData, setSearchData] = useState(INITIAL_STATE);

  const handleSubmit = event => {
    event.preventDefault();
    const { name } = searchData;
    onSubmit(name);
    setSearchData({ name: '' });
  };

  const handleChange = event => {
    const { value } = event.currentTarget;
    setSearchData({ name: value });
  };

  return (
    <header className={css.searchbar}>
      <form className={css.searchbar__form} onSubmit={handleSubmit}>
        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
          value={name}
          className={css.searchbar__input}
        />
        <button className={css.searchbar__btn} type="submit">
          <span className={css.searchbar__btnText}>Search</span>
        </button>
      </form>
    </header>
  );
};
