// Dynamic header and footer loading
async function loadHeaderFooter() {
    try {
        // Load header
        const headerResponse = await fetch('header.html');
        const headerHtml = await headerResponse.text();
        document.getElementById('header-placeholder').innerHTML = headerHtml;
        
        // Load footer
        const footerResponse = await fetch('footer.html');
        const footerHtml = await footerResponse.text();
        document.getElementById('footer-placeholder').innerHTML = footerHtml;
    } catch (error) {
        console.error('Error loading header/footer:', error);
    }
}

// Tool search functionality
function initializeSearch() {
    const searchInput = document.getElementById('tool-search');
    const toolItems = document.querySelectorAll('.tool-item');
    
    if (searchInput && toolItems.length > 0) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();
            
            toolItems.forEach(item => {
                const searchContent = item.getAttribute('data-search').toLowerCase();
                const isVisible = searchContent.includes(searchTerm);
                item.style.display = isVisible ? 'block' : 'none';
            });
        });
    }
}

// Tool filtering by category
function filterToolsByCategory(category) {
    const toolItems = document.querySelectorAll('.tool-item');
    
    toolItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        const shouldShow = category === 'all' || itemCategory === category;
        item.style.display = shouldShow ? 'block' : 'none';
    });
}

// Initialize tooltips
function initializeTooltips() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Initialize other components
    initializeTooltips();
});

// Utility functions for tools
const ToolUtils = {
    // Format numbers with commas
    formatNumber: function(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    
    // Generate random string
    generateRandomString: function(length) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    },
    
    // Copy text to clipboard
    copyToClipboard: function(text) {
        navigator.clipboard.writeText(text).then(() => {
            // Show success message
            const alert = document.createElement('div');
            alert.className = 'alert alert-success alert-dismissible fade show position-fixed';
            alert.style.top = '20px';
            alert.style.right = '20px';
            alert.style.zIndex = '9999';
            alert.innerHTML = `
                <strong>Success!</strong> Text copied to clipboard.
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            `;
            document.body.appendChild(alert);
            
            setTimeout(() => {
                alert.remove();
            }, 3000);
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    },
    
    // Download file
    downloadFile: function(content, filename, contentType = 'text/plain') {
        const blob = new Blob([content], { type: contentType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    },
    
    // Validate email
    validateEmail: function(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },
    
    // Validate URL
    validateURL: function(url) {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    }
};

// Analytics tracking (optional)
function trackToolUsage(toolName) {
    if (window.gtag) {
        gtag('event', 'tool_used', {
            'event_category': 'Tools',
            'event_label': toolName
        });
    }
}

// Performance monitoring
function measurePerformance() {
    if ('performance' in window) {
        window.addEventListener('load', function() {
            setTimeout(function() {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart);
            }, 0);
        });
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    measurePerformance();
});