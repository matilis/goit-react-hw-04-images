import { Component } from 'react';
import { Searchbar } from './Searchbar';
import { fetchPhotosWithQuery } from './services';
import { ImageGallery } from './ImageGallery';
import { Loader } from './Loader';
import { Button } from './Button';
import { Modal } from './Modal';

export class App extends Component {
  state = {
    photos: [],
    searchValue: '',
    page: 1,
    error: null,
    isLoading: false,
    modal: '',
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      this.state.searchValue !== prevState.searchValue ||
      this.state.page !== prevState.page
    ) {
      try {
        this.setState({ isLoading: true });

        const photos = await fetchPhotosWithQuery(
          this.state.searchValue,
          this.state.page
        );

        photos.map(photo => {
          return this.setState(prevState => ({
            photos: [
              ...prevState.photos,
              {
                id: photo.id,
                webformatURL: photo.webformatURL,
                largeImageURL: photo.largeImageURL,
                tags: photo.tags,
              },
            ],
          }));
        });
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  searchValue = e =>
    this.setState({
      searchValue: e,
      page: 1,
      photos: [],
      error: null,
    });

  showPhotos = () => {
    const { photos } = this.state;
    return photos;
  };

  loadBtnVisibility = () => {
    if (this.state.photos.length < 12) return 'none';
  };

  loadBtnMore = event => {
    if (event) {
      this.setState({ page: this.state.page + 1 });
    }
  };

  handleModal = imageAddress => this.setState({ modal: imageAddress });

  modalClose = event => this.setState({ modal: event });

  showModal = () => this.state.modal;

  render() {
    const { photos, isLoading, modal } = this.state;

    return (
      <div>
        <Searchbar onSubmit={this.searchValue} />
        <ImageGallery photos={photos} imageAddress={this.handleModal} />
        {isLoading && <Loader />}
        <div style={{ display: this.loadBtnVisibility() }}>
          {!isLoading && <Button onClick={this.loadBtnMore} />}
        </div>
        {modal !== '' && (
          <Modal imageAddress={this.showModal()} onClick={this.modalClose} />
        )}
      </div>
    );
  }
}
