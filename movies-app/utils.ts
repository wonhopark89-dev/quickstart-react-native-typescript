export const makeImgPath = (img: string, width: string | undefined = 'w500') => {
  // https://image.tmdb.org/t/p/w500/kqjL17yufvn9OVLyXYpvtyrFfak.jpg
  return `https://image.tmdb.org/t/p/${width}${img}`;
};
