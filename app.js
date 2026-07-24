// ==========================================================================
// Main Application Controller (app.js)
// ==========================================================================

// Global state for theme, active route, and tab values
const state = {
    theme: 'dark',
    activeRoute: '#home',
    isoOS: 'win10',
    rufusOS: 'win10'
};

// --------------------------------------------------------------------------
// Navigation & Routing (Hash-based Router)
// --------------------------------------------------------------------------
function handleRouting() {
    const rawHash = window.location.hash;
    const defaultHash = '#home';
    const targetHash = rawHash && document.querySelector(rawHash) ? rawHash : defaultHash;
    
    // 1. Hide all content sections and show the active one
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    const activeSection = document.querySelector(targetHash);
    if (activeSection) {
        activeSection.classList.add('active');
    }
    
    // 2. Update active states on sidebar menu links
    document.querySelectorAll('.sidebar-nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === targetHash) {
            link.classList.add('active');
            
            // Expand parent category if collapsed
            const parentCategory = link.closest('.category-item');
            if (parentCategory) {
                parentCategory.classList.add('expanded');
                const caret = parentCategory.querySelector('.category-caret');
                if (caret) caret.style.transform = 'rotate(90deg)';
            }
        }
    });

    // 3. Scroll page to top
    window.scrollTo({ top: 0, behavior: 'instant' });
    
    // 4. Update state tracking
    state.activeRoute = targetHash;
    
    // 5. Auto-close sidebar on mobile
    closeSidebar();

    // 6. Dynamically update browser favicon
    updateFavicon(targetHash);
}

// Dynamically update browser favicon matching each active guide
function updateFavicon(targetHash) {
    const favicons = {
        '#home': "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%230072ff' d='M12 2L2 5v6c0 5.5 4.5 10 10 11 5.5-1 10-5.5 10-11V5l-10-3z'/%3E%3Cpath fill='%2300c6ff' d='M10 15.5l-4-4 1.5-1.5L10 12.5l6.5-6.5 1.5 1.5-8 8z'/%3E%3C/svg%3E",
        '#iso': "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%230072ff' d='M0 3.449L9.75 2.1v9.45H0V3.449zM0 12.45h9.75v9.45L0 20.551v-8.1z'/%3E%3Cpath fill='%2300c6ff' d='M11.25 1.899L24 0v11.55H11.25V1.899zM11.25 12.45H24v11.55l-12.75-1.9v-9.65z'/%3E%3C/svg%3E",
        '#usb': "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Crect x='9' y='1' width='6' height='5' rx='1' fill='%2300c6ff'/%3E%3Crect x='10.5' y='2.5' width='1' height='1.5' fill='%230b0f19'/%3E%3Crect x='12.5' y='2.5' width='1' height='1.5' fill='%230b0f19'/%3E%3Crect x='6' y='6' width='12' height='16' rx='2' fill='%230072ff'/%3E%3Cpath d='M12 9v8M10 13l2-2 2 2' stroke='%23ffffff' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round' fill='none'/%3E%3C/svg%3E",
        '#install': "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%230072ff' d='M21 2H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h7l-2 3v1h8v-1l-2-3h7c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z'/%3E%3Cpath fill='%2300c6ff' d='M6 6.5l3.5-.5v3.5H6V6.5zm0 4H9.5V14L6 13.5v-3zm4.5-4.5L18 5v5h-7.5V6zm0 5H18v5l-7.5-.7v-4.3z'/%3E%3C/svg%3E",
        '#activation': "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%230072ff' d='M12 2L2 5v6c0 5.5 4.5 10 10 11 5.5-1 10-5.5 10-11V5l-10-3z'/%3E%3Cpath fill='%2300c6ff' d='M10 15.5l-4-4 1.5-1.5L10 12.5l6.5-6.5 1.5 1.5-8 8z'/%3E%3C/svg%3E"
    };
    const href = favicons[targetHash] || favicons['#home'];
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        link.type = 'image/svg+xml';
        document.getElementsByTagName('head')[0].appendChild(link);
    }
    link.href = href;
}

// --------------------------------------------------------------------------
// Theme Management (Light / Dark Mode)
// --------------------------------------------------------------------------
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    state.theme = savedTheme;
    updateThemeUI();
}

function toggleTheme() {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', state.theme);
    updateThemeUI();
}

function updateThemeUI() {
    const themeIcon = document.getElementById('theme-icon');
    if (state.theme === 'light') {
        document.body.classList.add('light-mode');
        if (themeIcon) themeIcon.className = 'fas fa-moon';
    } else {
        document.body.classList.remove('light-mode');
        if (themeIcon) themeIcon.className = 'fas fa-sun';
    }
}

// --------------------------------------------------------------------------
// Sidebar Menu Collapse / Expand Categories
// --------------------------------------------------------------------------
function toggleCategory(header) {
    const categoryItem = header.closest('.category-item');
    const caret = header.querySelector('.category-caret');
    
    if (categoryItem.classList.contains('expanded')) {
        categoryItem.classList.remove('expanded');
        if (caret) caret.style.transform = 'rotate(0deg)';
    } else {
        categoryItem.classList.add('expanded');
        if (caret) caret.style.transform = 'rotate(90deg)';
    }
}

// --------------------------------------------------------------------------
// Mobile Sidebar Control (Open / Close Drawer)
// --------------------------------------------------------------------------
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const backdrop = document.getElementById('sidebar-backdrop');
    if (sidebar) {
        sidebar.classList.toggle('active');
        if (backdrop) backdrop.classList.toggle('active');
    }
}

function closeSidebar() {
    const sidebar = document.getElementById('sidebar');
    const backdrop = document.getElementById('sidebar-backdrop');
    if (sidebar) {
        sidebar.classList.remove('active');
        if (backdrop) backdrop.classList.remove('active');
    }
}

// --------------------------------------------------------------------------
// OS Switchers (Tabs Logic for Step 1 & Step 2)
// --------------------------------------------------------------------------
function switchOS(guide, os) {
    if (guide === 'iso') {
        state.isoOS = os;
        
        // Update tab buttons style
        document.querySelectorAll('.iso-tab').forEach(btn => {
            btn.classList.remove('active');
        });
        document.getElementById(`iso-tab-${os}`).classList.add('active');
        
        // Update contents visibility
        document.getElementById('iso-win10-content').style.display = os === 'win10' ? 'block' : 'none';
        document.getElementById('iso-win11-content').style.display = os === 'win11' ? 'block' : 'none';
        
    } else if (guide === 'rufus') {
        state.rufusOS = os;
        
        // Update tab buttons style
        document.querySelectorAll('.rufus-tab').forEach(btn => {
            btn.classList.remove('active');
        });
        document.getElementById(`rufus-tab-${os}`).classList.add('active');
        
        // Update dynamic content slots (Step 4 & Step 6 screenshots vary by OS)
        const step4Img = document.getElementById('rufus-step4-img');
        const step6Title = document.getElementById('rufus-step6-title');
        const step6Img = document.getElementById('rufus-step6-img');
        
        if (os === 'win10') {
            document.getElementById('rufus-step4-description').innerHTML = 
                'Windows 10 customization dialog appears. Select <strong>"Create a local account with username"</strong> and configure it if needed. Then click <strong>"OK"</strong>.';
            if (step4Img) step4Img.src = 'https://i.postimg.cc/cHv01z1b/Rufus-5.png';
            
            if (step6Title) step6Title.innerText = 'Step 6 — Bootable USB Complete';
            if (step6Img) step6Img.src = 'https://i.postimg.cc/4xYD9cRH/Rufus-8.png';
        } else {
            document.getElementById('rufus-step4-description').innerHTML = 
                'Windows 11 customization dialog appears. Make sure you check <strong>"Remove requirement for 4GB+ RAM, Secure Boot and TPM 2.0"</strong> and <strong>"Remove requirement for an online Microsoft account"</strong>. Then click <strong>"OK"</strong>.';
            if (step4Img) step4Img.src = 'https://i.postimg.cc/5NK0J8m5/Rufus-9.png';
            
            if (step6Title) step6Title.innerText = 'Step 6 — Windows 11 Bootable USB Ready';
            if (step6Img) step6Img.src = 'https://i.postimg.cc/jSwCB68S/Screenshot-2026-05-20-213258.png';
        }
    }
}

// --------------------------------------------------------------------------
// MAS Method Tab Switcher
// --------------------------------------------------------------------------
function switchMASTab(method) {
    document.querySelectorAll('.mas-tab').forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
    });
    document.querySelectorAll('.mas-tab-panel').forEach(panel => {
        panel.style.display = 'none';
        panel.classList.remove('active');
    });

    if (method === 'ps') {
        const tab = document.getElementById('tab-ps');
        const content = document.getElementById('content-ps');
        if (tab) {
            tab.classList.add('active');
            tab.setAttribute('aria-selected', 'true');
        }
        if (content) {
            content.style.display = 'block';
            content.classList.add('active');
        }
    } else if (method === 'trad') {
        const tab = document.getElementById('tab-trad');
        const content = document.getElementById('content-trad');
        if (tab) {
            tab.classList.add('active');
            tab.setAttribute('aria-selected', 'true');
        }
        if (content) {
            content.style.display = 'block';
            content.classList.add('active');
        }
    }
}

// --------------------------------------------------------------------------
// Alternative Command Toggle Drawer
// --------------------------------------------------------------------------
function toggleAltCmd() {
    const btn = document.querySelector('.alt-toggle-btn');
    const container = document.getElementById('alt-cmd-container');
    if (btn) btn.classList.toggle('active');
    
    if (container) {
        if (container.classList.contains('open')) {
            container.classList.remove('open');
        } else {
            container.classList.add('open');
        }
    }
}

// --------------------------------------------------------------------------
// Copy Clipboard Helper
// --------------------------------------------------------------------------
function copyCommand(elementId) {
    const codeText = document.getElementById(elementId).innerText;
    
    navigator.clipboard.writeText(codeText).then(() => {
        const btn = document.querySelector(`[onclick="copyCommand('${elementId}')"]`);
        if (btn) {
            const originalText = btn.innerText;
            btn.innerText = 'Copied!';
            btn.style.background = '#10b981';
            btn.style.borderColor = '#10b981';
            btn.style.color = '#ffffff';
            
            setTimeout(() => {
                btn.innerText = originalText;
                btn.style.background = '';
                btn.style.borderColor = '';
                btn.style.color = '';
            }, 1500);
        }
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}

// --------------------------------------------------------------------------
// Lightbox Modal for Screenshots
// --------------------------------------------------------------------------
const galleryImages = [
    'https://i.postimg.cc/3xRbg0Lc/Screenshot-2026-05-31-080557.png',
    'https://i.postimg.cc/76dTQdDV/Screenshot-2026-05-31-081948.png',
    'https://i.postimg.cc/fb5L1F7c/Screenshot-2026-05-31-081629.png',
    'https://i.postimg.cc/ZnWC8cdr/Screenshot-2026-05-31-081500.png'
];
let currentImageIndex = 0;

function openLightbox(imgSrc) {
    const modalEl = document.getElementById('image-modal');
    const sliderTrack = document.getElementById('modal-slider-track');
    if (!modalEl || !sliderTrack) return;

    currentImageIndex = galleryImages.indexOf(imgSrc);
    if (currentImageIndex === -1) currentImageIndex = 0;
    
    sliderTrack.style.transition = 'none';
    updateLightboxImage();
    
    sliderTrack.offsetHeight; // reflow
    
    sliderTrack.style.transition = 'transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1)';
    
    modalEl.classList.add('open');
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
}

function closeLightbox(event) {
    const modalEl = document.getElementById('image-modal');
    if (!modalEl) return;

    if (event) {
        const closeBtn = document.querySelector('.modal-close');
        if (event.target !== modalEl && (!closeBtn || !closeBtn.contains(event.target))) {
            return;
        }
    }
    modalEl.classList.remove('open');
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
}

function updateLightboxImage() {
    const sliderTrack = document.getElementById('modal-slider-track');
    if (sliderTrack) {
        sliderTrack.style.transform = `translateX(-${currentImageIndex * 100}%)`;
    }
}

function navigateLightbox(direction) {
    if (direction === 'prev') {
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    } else {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    }
    updateLightboxImage();
}

// --------------------------------------------------------------------------
// Initialization & Event Binding
// --------------------------------------------------------------------------
window.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Theme
    initTheme();
    
    // 2. Initialize Routing
    handleRouting();
    window.addEventListener('hashchange', handleRouting);
    
    // 3. Initialize OS Switcher Defaults
    switchOS('iso', 'win10');
    switchOS('rufus', 'win10');

    // 4. Initialize Gallery Event Bindings
    document.querySelectorAll('.gallery-item').forEach(item => {
        const imgSrc = item.getAttribute('data-src');
        item.addEventListener('click', () => {
            openLightbox(imgSrc);
        });
    });

    // 5. Lightbox Navigation Button Click Handlers
    const prevBtn = document.getElementById('modal-prev');
    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            navigateLightbox('prev');
        });
    }

    const nextBtn = document.getElementById('modal-next');
    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            navigateLightbox('next');
        });
    }

    // 6. Keyboard navigation support for Lightbox
    document.addEventListener('keydown', (e) => {
        const modalEl = document.getElementById('image-modal');
        if (!modalEl || !modalEl.classList.contains('open')) return;
        
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            navigateLightbox('prev');
        } else if (e.key === 'ArrowRight') {
            navigateLightbox('next');
        }
    });
});
