import { Component } from 'react';

import { FiSearch } from 'react-icons/fi';
import { FormBtn, InputSearch, SearchFormStyled } from './SearchForm.styled';

export class SearchForm extends Component {
  state = {
    query: '',
  };

  onChange = e => {
    this.setState({ query: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    const { query } = this.state;
    this.props.onSubmit(query);
  };

  render() {
    const { query } = this.state;
    return (
      <SearchFormStyled onSubmit={this.onSubmit}>
        <FormBtn type="submit">
          <FiSearch size="16px" />
        </FormBtn>
        <InputSearch
          placeholder="What do you want to write?"
          name="query"
          required
          autoFocus
          onChange={this.onChange}
          value={query}
        />
      </SearchFormStyled>
    );
  }
}
