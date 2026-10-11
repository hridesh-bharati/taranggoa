export default async function sitemap() {
  const baseUrl = 'https://www.taranggoa.in';

  // Website ke saare main public pages jo navbar aur footer mein hain
  const routes = [
    '',
    '/about',
    '/events',
    '/gallery',
    '/membership',
    '/entrepreneurs',
    '/contact',
    '/member-registration',
    '/exhibitor-registration',
    '/exhibitions',
    '/event-calendar',
    '/media-coverage',
    '/faqs',
    '/privacy-policy',
    '/terms',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));

  return [...routes];
}