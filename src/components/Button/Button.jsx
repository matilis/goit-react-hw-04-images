import css from './Button.module.css';

export const Button = ({ onClick }) => {
  const handleClick = event => onClick(event);

  return (
    <div className={css.btnLoadMore}>
      <button
        type="button"
        onClick={handleClick}
        className={css.btnLoadMore__item}
      >
        Load more
      </button>
    </div>
  );
};
