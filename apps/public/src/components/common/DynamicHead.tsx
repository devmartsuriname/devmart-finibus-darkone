import { Helmet } from 'react-helmet-async';
import { usePublicSettings } from '../../hooks/usePublicSettings';

export function DynamicHead() {
  const { settings } = usePublicSettings();
  
  return (
    <Helmet>
      <link rel="icon" type="image/png" href={settings.favicon_url} />
    </Helmet>
  );
}
