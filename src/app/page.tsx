import ClientWrapper from '@/components/ClientWrapper';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import SectionFeatured from '@/components/SectionFeatured';
import SectionAbout from '@/components/SectionAbout';
import SectionTechStack from '@/components/SectionTechStack';
import SectionContact from '@/components/SectionContact';
import ReturnToTop from '@/components/ReturnToTop';

export default function Home() {
  return (
    <ClientWrapper>
      {/* Header */}
      <Header />
      
      <div className="relative z-10 w-full">
        {/* Hero Section (full-bleed) */}
        <Hero />

        {/* Full-width sections with horizontal padding */}
        <SectionFeatured />
        <SectionAbout />
        <SectionTechStack />
        <SectionContact />
      </div>

      {/* Return to Top Button */}
      <ReturnToTop />
    </ClientWrapper>
  );
}