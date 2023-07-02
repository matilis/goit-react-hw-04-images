import { ImageGalleryItem } from '../ImageGalleryItem';
import css from './ImageGallery.module.css';

export const ImageGallery = ({ photos, imageAddress }) => {
  return (
    <ul className={css.gallery}>
      {photos.map(photo => {
        const { id, tags, webformatURL, largeImageURL } = photo;
        return (
          <ImageGalleryItem
            key={id}
            id={id}
            tags={tags}
            webformatURL={webformatURL}
            largeImageURL={largeImageURL}
            imageAddress={imageAddress}
          />
        );
      })}
    </ul>
  );
};
