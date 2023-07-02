import { Component } from 'react';
import css from './Button.module.css';

export class Button extends Component {
  handleClick = event => this.props.onClick(event);

  render() {
    return (
      <div className={css.btnLoadMore}>
        <button
          type="button"
          onClick={this.handleClick}
          className={css.btnLoadMore__item}
        >
          Load more
        </button>
      </div>
    );
  }
}
