import { useLocation } from 'react-router';
import { HomePageSections } from '@/components/site/home-sections';
import { getContactByRegion, getProofBarCopy, getRegionFromPathname } from '@/lib/site-content';

export default function HomePage() {
  const pathname = useLocation().pathname;
  const region = getRegionFromPathname(pathname);
  const contact = getContactByRegion(region);
  const proofBarCopy = getProofBarCopy(region);

  return <HomePageSections region={region} contact={contact} proofBarCopy={proofBarCopy} />;
}
