export { }

console.log(
  "Live now; make now always the most precious time. Now will never come again. Save your favorite links now"
)

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "saveLink") {
    console.log('Link Saved');
    sendResponse({ message: "Link saved successfully!" });
  } else if (request.action === "deleteLink") {
    console.log('Link Deleted');
    sendResponse({ message: "Task deleted successfully!" });
  } else if (request.action === "editLink") {
    console.log('Link Edited');
    sendResponse({ message: "Task edited successfully!" });
  }
});
