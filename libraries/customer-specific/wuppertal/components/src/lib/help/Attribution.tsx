import React from 'react';

type AttributionProps = {
  applicationName: string;
  applicationVersion: string;
};

const Attribution: React.FC<AttributionProps> = ({
  applicationName = document.title,
  applicationVersion,
}) => {
  return (
    <div>
      <b>
        {applicationName} #{applicationVersion}
      </b>{' '}
      made with ❤️ by{' '}
      <a href="https://cismet.de/" target="_cismet">
        cismet GmbH
      </a>{' '}
      auf Basis von{' '}
      <a href="https://cismet.de/#refs" target="_cismet">
        cids
      </a>{' '}
      und{' '}
      <a href="https://github.com/cismet/carma" target="_cismet">
        carma
      </a>{' '}
      |{' '}
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://cismet.de/datenschutzerklaerung.html"
      >
        Datenschutzerklärung (Privacy Policy)
      </a>
    </div>
  );
};

export default Attribution;
