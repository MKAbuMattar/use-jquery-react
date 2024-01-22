import {useEffect, useState} from 'react';
import $ from 'jquery';

// types
import {UseJQueryOptions} from '../types';

export const useJQuery = (
  {
    version = '3.7.1',
    cdnUrl,
    onError,
    onLoadSuccess,
    autoInject,
  }: UseJQueryOptions = {
    autoInject: true,
  },
) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window.$ !== 'undefined' && !autoInject) {
      return;
    }

    const script = document.createElement('script');
    script.src = cdnUrl || `https://code.jquery.com/jquery-${version}.min.js`;
    script.async = true;

    const onLoad = () => {
      window.$ = window.jQuery = $;
      setLoading(false);
      if (onLoadSuccess) {
        onLoadSuccess();
      }
    };

    const onErrorCallback = (event: Event) => {
      setLoading(false);
      if (onError) {
        onError(event);
      }
    };

    script.addEventListener('load', onLoad);
    script.addEventListener('error', onErrorCallback);

    setLoading(true);
    document.body.appendChild(script);

    return () => {
      script.removeEventListener('load', onLoad);
      script.removeEventListener('error', onErrorCallback);
      document.body.removeChild(script);
    };
  }, [version, cdnUrl, onError, onLoadSuccess]);

  return {$, loading};
};
