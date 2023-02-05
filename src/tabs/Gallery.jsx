import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export class Gallery extends Component {
  state = {
    query: '',
    page: 1,
    photos: [],
  };
  async componentDidUpdate(pP, pS) {
    const { query, page } = this.state;
    if (pS.query !== query) {
      const respons = await ImageService.getImages(query, page);
      console.log('respons :>> ', respons);
      this.setState(prevState => ({
        photos: [...prevState.photos, ...respons.data.photos],
      }));
    }
  }

  handleSubmitForm = query => {
    this.setState({ query });
  };

  render() {
    return (
      <>
        <SearchForm onSubmit={this.handleSubmitForm} />
        <Text textAlign="center">Sorry. There are no images ... 😭</Text>
      </>
    );
  }
}
