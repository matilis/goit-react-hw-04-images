import React, { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar';
import { fetchPhotosWithQuery } from './services';
import { ImageGallery } from './ImageGallery';
import { Loader } from './Loader';
import { Button } from './Button';
import { Modal } from './Modal';

export const App = () => {
  const [photos, setPhotos] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState('');

  const searchValueHandler = event => {
    setSearchValue(event);
    setPage(1);
    setPhotos([]);
  };

  const loadBtnVisibility = () => {
    if (photos.length < 12) return 'none';
  };

  const loadBtnMore = event => {
    if (event) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const handleModal = imageAddress => {
    setModal(imageAddress);
  };

  const modalClose = event => {
    setModal(event);
  };

  const showModal = () => {
    return modal;
  };

  useEffect(() => {
    const fetchData = async () => {
      if (searchValue !== '' || page !== 1) {
        try {
          setIsLoading(true);

          const fetchedPhotos = await fetchPhotosWithQuery(searchValue, page);

          setPhotos(prevPhotos => [
            ...prevPhotos,
            ...fetchedPhotos.map(photo => ({
              id: photo.id,
              webformatURL: photo.webformatURL,
              largeImageURL: photo.largeImageURL,
              tags: photo.tags,
            })),
          ]);
        } catch (error) {
          alert(error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchData();
  }, [searchValue, page]);

  return (
    <div>
      <Searchbar onSubmit={searchValueHandler} />
      <ImageGallery photos={photos} imageAddress={handleModal} />
      {isLoading && <Loader />}
      <div style={{ display: loadBtnVisibility() }}>
        {!isLoading && <Button onClick={loadBtnMore} />}
      </div>
      {modal !== '' && (
        <Modal imageAddress={showModal()} onClick={modalClose} />
      )}
    </div>
  );
};
