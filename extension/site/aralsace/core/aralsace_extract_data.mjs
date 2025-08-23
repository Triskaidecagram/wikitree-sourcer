/*
MIT License

Copyright (c) 2020 Robert M Pavey

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

function extractData(document, url) {
  var result = {};

  if (url) {
    result.url = url;
  }
  result.success = false;

  const recordData = document.querySelector("h1.titre_rubrique");
  if (recordData) {
    const text = recordData.textContent.trim();
    const firstDash = text.indexOf("-");
    const lastDash = text.lastIndexOf("-");
    if (firstDash !== -1 && lastDash !== -1 && firstDash !== lastDash) {
      result.town = text.substring(0, firstDash).trim();
      result.recordNumber = text.substring(lastDash + 1).trim();
      result.recordName = text.substring(firstDash + 1, lastDash).trim();
    } else {
      // fallback if format is unexpected
      result.town = "";
      result.recordName = text;
      result.recordNumber = "";
    }
  }

  const paginationContainer = document.getElementById("pagination-container");
  if (paginationContainer) {
    const paginationMin = paginationContainer.querySelector(".pagination-min");
    if (paginationMin) {
      result.imageNumber = paginationMin.textContent.trim();
    }
  }
  result.success = true;

  return result;
}

export { extractData };
