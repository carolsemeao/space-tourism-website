const nav = document.querySelector(".primary-navigation");
const navToggle = document.querySelector(".mobile-nav-toggle");

// When someone clicks the hamburger button
navToggle.addEventListener("click", () => {
    const visibility = nav.getAttribute("data-visible");
    if (visibility == "false") {
        // if the nav is closed, open it
        nav.setAttribute("data-visible", true);
        navToggle.setAttribute("aria-expanded", true);
    } else {
        // if the nav is open, close it
        nav.setAttribute("data-visible", false);
        navToggle.setAttribute("aria-expanded", false);
    }
});


// Tab Menu Functionality
const tabList = document.querySelector('[role="tablist"]');
const tabs = tabList.querySelectorAll('[role="tab"]');

tabList.addEventListener('keydown', changeTabFocus)

tabs.forEach((tab) => {
    tab.addEventListener('click', changeTabPanel)
});


let tabFocus = 0;
function changeTabFocus(e) {
    const keydownLeft = 37;
    const keydownRight= 39;

    // change the tabindex of the current tab to -1
    if (e.keyCode === keydownLeft || e.keyCode === keydownRight) {
        tabs[tabFocus].setAttribute("tabindex", -1);

        if (e.keyCode === keydownRight) {
            tabFocus++;
            if (tabFocus >= tabs.length) {
                tabFocus = 0;
            }
        } else if (e.keyCode === keydownLeft) {
            tabFocus--;
            if (tabFocus < 0) {
                tabFocus = tabs.length - 1;
            }
        }

        tabs[tabFocus].setAttribute("tabindex", 0);
        tabs[tabFocus].focus();
    }
}

function changeTabPanel(e) {
    const targetTab = e.target;
    const targetPanel = targetTab.getAttribute("aria-controls");
    const targetImage = targetTab.getAttribute("data-image");

    const tabContainer = targetTab.parentNode;
    const mainContainer = tabContainer.parentNode;
   
    // Change selected state on tab when selected
    tabContainer
        .querySelector('[aria-selected="true"]')
        .setAttribute("aria-selected", false);

    targetTab.setAttribute("aria-selected", true);
    
    // Change content based on tab selected
    hideContent(mainContainer, '[role="tabpanel"]');
    showContent(mainContainer, `#${targetPanel}`);

    hideContent(mainContainer, 'picture');
    showContent(mainContainer, `#${targetImage}`);
}

function hideContent(parent, content) {
    parent
        .querySelectorAll(content)
        .forEach((item) => item.setAttribute("hidden", true));
}

function showContent(parent, content) {
    parent.querySelector([content]).removeAttribute('hidden');
}