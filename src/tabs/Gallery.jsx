import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export class Gallery extends Component {
  state = {
    query: '',
    page: 1,
    photos: [],
    isLoading: false,
    error: null,
    isVisible: false,
    isEmpty: false,
  };
  async componentDidUpdate(pP, pS) {
    const { query, page } = this.state;
    if (pS.query !== query || pS.page !== page) {
      this.setState({ isLoading: true });

      try {
        const respons = await ImageService.getImages(query, page);
        if(respons.data.photos.length === 0){
          this.setState({ isEmpty: true });
        }
        this.setState(prevState => ({
          photos: [...prevState.photos, ...respons.data.photos],
          isVisible: respons.data.page < Math.ceil(respons.data.total_results / respons.data.per_page),
        }));
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  handleSubmitForm = query => {
    this.setState({ query, page: 1, photos: [], error: null, isEmpty: false, isVisible: false });
  };

  onLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  }

  render() {
    return (
      <>
        <SearchForm onSubmit={this.handleSubmitForm} />
        
        {this.state.isEmpty && <Text textAlign="center">Sorry. There are no images ... 😭</Text>}
        <Grid>
          {this.state.photos.length > 0 && this.state.photos.map(({ id, avg_color, alt, src }) => (
            <GridItem key={id}>
              <CardItem color={avg_color}>
                <img src={src.large} alt={alt} />
              </CardItem>
            </GridItem>
          ))}
        </Grid>
        {this.state.isVisible && <Button onClick={this.onLoadMore} disabled={this.state.isLoading}>{this.state.isLoading ? 'Loading...' : 'Load more'}</Button>}
      </>
    );
  }
}
