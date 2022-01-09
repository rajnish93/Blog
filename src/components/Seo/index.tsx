import React from 'react';
import Helmet from 'react-helmet';
import config from '../../data/config';

const Seo = () => {
  const description = config.defaultDescription;
  const thumbnail = config.logo;
  const url = config.url;
  const title = config.defaultTitle;
  const location = '';

  return (
    <Helmet>
      <meta name="description" content={description} />
      <meta name="image" content={thumbnail} />
      <meta property="og:url" content={`${url}${location}/?ref=rajnish.app`} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={thumbnail} />
      <title>{title}</title>
      <html lang="en" dir="ltr" />
    </Helmet>
  );
};

export default Seo;
