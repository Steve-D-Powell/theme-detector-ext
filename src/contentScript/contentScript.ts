const frame: HTMLIFrameElement = document.querySelector("#preview-bar-iframe");
let themeText: string = "Not Previewing a Theme";

if (frame) {
  frame.addEventListener("load", function () {
    const themeTextNode: HTMLElement =
      frame.contentWindow.document.querySelector(
        "[data-preview-bar-content] strong"
      );
    themeText = themeTextNode.innerText;
  });
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log("Message Received", request);
  if (request.from === "popup") {
    sendResponse({ themeName: themeText });
  }
  return true;
});
