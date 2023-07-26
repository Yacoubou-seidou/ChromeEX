async function fetchFaviconLink(url) {
  try {
    const response = await fetch(url, { mode: 'no-cors' });
    const html = await response.text();
    console.log(response);
    const faviconUrl = findFaviconLink(html);
    return faviconUrl;
  } catch (error) {
    console.error('Error fetching favicon link:', error);
    return null;
  }
}

function findFaviconLink(html) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const faviconTag = doc.querySelector('meta[itemprop="image"]');
  if (faviconTag) {
    return faviconTag.getAttribute('content');
  }
  return null;
}


export {
  fetchFaviconLink
};
