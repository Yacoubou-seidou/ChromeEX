async function fetchFaviconLink(u) {
  const url = new URL(chrome.runtime.getURL("/_favicon/"));
  url.searchParams.set("pageUrl", u);
  url.searchParams.set("size", "32");
  return url.toString();
}

// function findFaviconLink(html) {
//   const parser = new DOMParser();
//   const doc = parser.parseFromString(html, 'text/html');
//   const faviconTag = doc.querySelector('meta[itemprop="image"]');
//   if (faviconTag) {
//     return faviconTag.getAttribute('content');
//   }
//   return null;
// }


export {
  fetchFaviconLink
};
