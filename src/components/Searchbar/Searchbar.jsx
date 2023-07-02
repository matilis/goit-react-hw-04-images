import { Component } from 'react';
import css from './Searchbar.module.css';

export class Searchbar extends Component {
  state = {
    name: '',
  };

  handleSubmit = event => {
    event.preventDefault();
    const { name } = this.state;
    this.props.onSubmit(name);
    this.setState({ name: '' });
  };

  handleChange = event => {
    const { value } = event.currentTarget;
    this.setState({ name: value });
  };

  render() {
    const { name } = this.state;

    return (
      <header className={css.searchbar}>
        <form className={css.searchbar__form} onSubmit={this.handleSubmit}>
          <input
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
            value={name}
            className={css.searchbar__input}
          />
          <button className={css.searchbar__btn} type="submit">
            <span className={css.searchbar__btnText}>Search</span>
          </button>
        </form>
      </header>
    );
  }
}
