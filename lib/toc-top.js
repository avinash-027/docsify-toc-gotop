// Generate the HTML string for the ToC of the current page by collecting headings.
// @param {Array} headings - List of heading elements to process.
// @returns {string} - HTML string representing the ToC.
function pageToC() {
  // Initialize ToC container with class for styling
  let toc = ['<div class="page_toc">'];
  const list = [];
  const ignoreHeaders = window.$docsify.toc.ignoreHeaders || [];
  const headings = document.querySelectorAll(
    `#main ${window.$docsify.toc.target}`
  );
  // Use the config value or default to 1
  const minHeadingsForToC = window.$docsify.toc.noTocIfHeadingsFoundIs || 1;

  if (headings) {
    headings.forEach(function (heading) {
      // Check if this header should be ignored based on user config
      const needSkip = ignoreHeaders.some((pattern) =>
        heading.innerText.match(pattern)
      );
      if (needSkip) return;
      // Generate HTML for this header with proper level wrapping
      const item = generateToC(
        heading.tagName.replace(/h/gi, ""),
        heading.innerHTML
      );
      if (item) list.push(item);
    });
  }
  // Only create ToC if the count is > minHeadingsForToC
  if (list.length > minHeadingsForToC) {
    toc = toc.concat(list);
    toc.push("</div>");
    return toc.join("");
  } else {
    return "";
  }
}

// Generate an individual ToC item wrapped in a div with level class.
// @param {string|number} level - Heading level (e.g. '1', '2', '3').
// @param {string} html - Inner HTML of the heading.
// @returns {string} - HTML string of the ToC item.
function generateToC(level, html) {
  // Only generate ToC entries up to max depth configured by user
  if (level >= 1 && level <= window.$docsify.toc.tocMaxLevel)
    return `<div class="lv${level}">${html}</div>`;
  return "";
}

let ticking = false;
function onScroll() {
  if (!ticking) {
    window.requestAnimationFrame(function() {
      scrollHandler();
      ticking = false;
    });
    ticking = true;
  }
}
window.addEventListener('scroll', onScroll);

// Scroll event handler to update active ToC entry based on visible headers.
const scrollHandler = () => {
  const clientHeight = window.innerHeight;
  const headings = document.querySelectorAll(
    `#main ${window.$docsify.toc.target}`
  );
  let visibleIndexes = [];

  // Determine which headings are currently visible in viewport
  headings.forEach((heading, index) => {
    const rect = heading.getBoundingClientRect();
    if (rect.top <= clientHeight && rect.top + rect.height > 0) {
      visibleIndexes.push(index);
    }
  });

  const scrollingElement = document.scrollingElement || document.body;

  if (scrollingElement.scrollTop === 0) {
    // At top, highlight first heading
    visibleIndexes = [0];
  } else if (
    scrollingElement.offsetHeight -
      window.innerHeight -
      scrollingElement.scrollTop <
      5 &&
    visibleIndexes.length > 0
  ) {
    // At bottom, highlight last visible heading
    visibleIndexes = [visibleIndexes[0]];
  }

  // Toggle active class on ToC entries accordingly
  if (visibleIndexes.length) {
    const tocItems = document.querySelectorAll(".page_toc > div");
    tocItems.forEach((item, index) => {
      if (index === visibleIndexes[0]) {
        item.classList.add("active");

        // // Scroll active item to middle of TOC panel
        // const container = document.querySelector('.docs-toc-nav');
        // const itemRect = item.getBoundingClientRect();
        // const containerRect = container.getBoundingClientRect();
        // const offset = (itemRect.top + itemRect.height / 2)
        //   - (containerRect.top + containerRect.height / 2);

        // container.scrollBy({
        //   top: offset,
        //   behavior: "smooth"
        // });

        // Ensure active item is visible inside .docs-toc-nav
        item.scrollIntoView({
          block: "nearest", // keeps within container, doesn't jump
          inline: "nearest",
          behavior: "smooth",
        });
      } else {
        item.classList.remove("active");
      }
    });
  }
};

// Smooth scroll to top function
var goTopFunction = function (e) {
  e.stopPropagation();
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

// Docsify plugin entry point - registers lifecycle hooks
// After Docsify has mounted, add aside container for ToC
function plugin(hook, vm) {
  // Docsify plugin hook to add "go to top" button on page mount
  hook.mounted(function () {
    var mainElm = document.querySelector("main");
    var content = window.Docsify.dom.find(".content");
    if (content) {
      var jxGoTop = window.Docsify.dom.create(
        "span",
        "<i class='fas fa-arrow-up'></i>"
      );
      jxGoTop.id = "docs-gotop";
      jxGoTop.title = "Back to top";
      jxGoTop.style.display = "none"; // initially hide
      jxGoTop.onclick = goTopFunction;
      window.Docsify.dom.before(mainElm, jxGoTop);

      // Show/hide button on window scroll
      window.addEventListener("scroll", function () {
        jxGoTop.style.display = window.scrollY > 300 ? "block" : "none";
      });
    }
  });

  // After each page load, generate and update the ToC HTML and bind scroll event
  hook.doneEach(function () {
    // Generate ToC HTML
    const tocHTML = pageToC().trim();

    // If not enough headings, remove toc-wrapper if it exists
    if (!tocHTML) {
      const existingWrapper = document.querySelector(".toc-wrapper");
      if (existingWrapper) existingWrapper.remove();
      window.document.removeEventListener("scroll", scrollHandler);
      return;
    }

    // Otherwise, ensure wrapper exists
    let wrapper = document.querySelector(".toc-wrapper");
    if (!wrapper) {
      const mainElm = document.querySelector("main");
      const wrapperDiv = window.Docsify.dom.create("div", "");
      wrapperDiv.className = "toc-wrapper";

      // Create the toggler icon
      const icon = window.Docsify.dom.create("div", "");
      icon.className = "toc-icon";
      icon.title = "Table of Contents";
      icon.setAttribute("tabindex", "0");
      icon.setAttribute("role", "button");
      icon.innerHTML = '<i class="fa-solid fa-table"></i>';

      // Create the aside container for TOC panel
      const nav = window.Docsify.dom.create("aside", "");
      window.Docsify.dom.toggleClass(nav, "add", "docs-toc-nav");

      // Append icon and nav into wrapper
      wrapperDiv.appendChild(icon);
      wrapperDiv.appendChild(nav);
      // Insert wrapper before main content
      window.Docsify.dom.before(mainElm, wrapperDiv);
      wrapper = wrapperDiv;

      // CLICK TO TOGGLE instead of hover
      icon.addEventListener("click", () => {
        wrapper.classList.toggle("open"); // toggles showing/hiding nav
      });
      // CLOSE when clicking outside the ToC wrapper
      document.addEventListener("click", (event) => {
        const isClickInside = wrapper.contains(event.target);
        if (!isClickInside) wrapper.classList.remove("open"); // close if outside
      });
    }

    // Update TOC
    const nav = wrapper.querySelector(".docs-toc-nav");
    if (nav) {
      nav.innerHTML = tocHTML;
      scrollHandler();
      window.document.removeEventListener("scroll", scrollHandler); // Remove previous to avoid duplicates
      window.document.addEventListener("scroll", scrollHandler); // Add fresh listener
    }
  });
}

// Register the plugin with Docsify
window.$docsify = window.$docsify || {};
window.$docsify.plugins = [].concat(plugin, window.$docsify.plugins);

