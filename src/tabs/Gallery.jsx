import { useState, useEffect } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export  function Gallery() {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    const dataFethc = async () => {
     

      try {
        const respons = await ImageService.getImages(query, page);
        if (respons.data.photos.length === 0) {
          setIsEmpty(true);
        }
        // this.setState(prevState => ({
        //   photos: [...prevState.photos, ...respons.data.photos],
        //   isVisible: respons.data.page < Math.ceil(respons.data.total_results / respons.data.per_page),
        // }));
        setPhotos([...photos, ...respons.data.photos]);
        setIsVisible(
          respons.data.page <
            Math.ceil(respons.data.total_results / respons.data.per_page)
        );
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    if (query !== ""){
      setIsLoading(true);
      dataFethc();
    }
    
  }, [page, query]);

  const handleSubmitForm = query => {
    setQuery(query);
    setPage(1);
    setPhotos([]);
    setError(null);
    setIsEmpty(false);
    setIsVisible(false);
  };

   const  onLoadMore = () => {
    
    setPage(prevState => (
      prevState + 1
    ))
  }
  return (
          <>
            <SearchForm onSubmitForm={handleSubmitForm} />
    
            {isEmpty && <Text textAlign="center">Sorry. There are no images ... 😭</Text>}
            <Grid>
              {photos.length > 0 && photos.map(({ id, avg_color, alt, src }) => (
                <GridItem key={id}>
                  <CardItem color={avg_color}>
                    <img src={src.large} alt={alt} />
                  </CardItem>
                </GridItem>
              ))}
            </Grid>
            {isVisible && <Button onClick={onLoadMore} disabled={isLoading}>{isLoading ? 'Loading...' : 'Load more'}</Button>}
          </>
        );
}
// export class Gallery extends Component {
//   state = {
//     query: '',
//     page: 1,
//     photos: [],
//     isLoading: false,
//     error: null,
//     isVisible: false,
//     isEmpty: false,
//   };
//   async componentDidUpdate(pP, pS) {
//     const { query, page } = this.state;
//     if (pS.query !== query || pS.page !== page) {
//       this.setState({ isLoading: true });

//       try {
//         const respons = await ImageService.getImages(query, page);
//         if(respons.data.photos.length === 0){
//           this.setState({ isEmpty: true });
//         }
//         this.setState(prevState => ({
//           photos: [...prevState.photos, ...respons.data.photos],
//           isVisible: respons.data.page < Math.ceil(respons.data.total_results / respons.data.per_page),
//         }));
//       } catch (error) {
//         this.setState({ error });
//       } finally {
//         this.setState({ isLoading: false });
//       }
//     }
//   }

//   handleSubmitForm = query => {
//     this.setState({ query, page: 1, photos: [], error: null, isEmpty: false, isVisible: false });
//   };

//   onLoadMore = () => {
//     this.setState(prevState => ({
//       page: prevState.page + 1,
//     }));
//   }

//   render() {
//     return (
//       <>
//         <SearchForm onSubmit={this.handleSubmitForm} />

//         {this.state.isEmpty && <Text textAlign="center">Sorry. There are no images ... 😭</Text>}
//         <Grid>
//           {this.state.photos.length > 0 && this.state.photos.map(({ id, avg_color, alt, src }) => (
//             <GridItem key={id}>
//               <CardItem color={avg_color}>
//                 <img src={src.large} alt={alt} />
//               </CardItem>
//             </GridItem>
//           ))}
//         </Grid>
//         {this.state.isVisible && <Button onClick={this.onLoadMore} disabled={this.state.isLoading}>{this.state.isLoading ? 'Loading...' : 'Load more'}</Button>}
//       </>
//     );
//   }
// }
