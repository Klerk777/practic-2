import { useState } from 'react';

import { FiSearch } from 'react-icons/fi';
import { FormBtn, InputSearch, SearchFormStyled } from './SearchForm.styled';

export const SearchForm = ({onSubmitForm}) => {
  const [query, setQuery] = useState('')

  const onChange = e => {
    // this.setState({ query: e.target.value });
    setQuery(e.target.value)
  };
  const onSubmit = e => {
    e.preventDefault();
    
    onSubmitForm(query);
  };

  
   
    return (
      <SearchFormStyled onSubmit={onSubmit}>
        <FormBtn type="submit">
          <FiSearch size="16px" />
        </FormBtn>
        <InputSearch
          placeholder="What do you want to write?"
          name="query"
          required
          autoFocus
          onChange={onChange}
          value={query}
        />
      </SearchFormStyled>
    );
  }

