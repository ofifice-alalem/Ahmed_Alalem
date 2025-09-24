// Modern UI Controller
class ModernUI {
  constructor() {
    this.sidebar = null;
    this.overlay = null;
    this.menuToggle = null;
    this.init();
  }

  init() {
    this.createSidebar();
    this.setupEventListeners();
    this.setActiveNavItem();
  }

  createSidebar() {
    // Create sidebar overlay
    this.overlay = document.createElement('div');
    this.overlay.className = 'sidebar-overlay';
    document.body.appendChild(this.overlay);

    // Create sidebar
    this.sidebar = document.createElement('div');
    this.sidebar.className = 'sidebar';
    this.sidebar.innerHTML = this.getSidebarHTML();
    
    // Insert sidebar into app-layout
    const appLayout = document.querySelector('.app-layout');
    if (appLayout) {
      appLayout.appendChild(this.sidebar);
    } else {
      document.body.appendChild(this.sidebar);
    }

    // Get menu toggle button
    this.menuToggle = document.querySelector('.menu-toggle');
  }

  getSidebarHTML() {
    return `
      <div class="sidebar-header">
        <img src="logo/logo.png" alt="Logo" class="sidebar-logo">
        <h2 class="sidebar-title">شركة البديل </h2>
      </div>
      <nav class="sidebar-nav">
        <a href="index.html">الرئيسية</a>
        <a href="recharge.html">أنواع الشحن</a>
        <a href="كل_فرع_باجمالي_المبيعات.html">كل فرع - باجمالي المبيعات</a>
      </nav>
    `;
  }

  setupEventListeners() {
    // Menu toggle
    if (this.menuToggle) {
      this.menuToggle.addEventListener('click', () => this.toggleSidebar());
    }

    // Overlay click to close
    this.overlay.addEventListener('click', () => this.closeSidebar());

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeSidebar();
      }
    });

    // Handle window resize
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 768) {
        this.closeSidebar();
      }
    });
  }

  toggleSidebar() {
    if (this.sidebar.classList.contains('open')) {
      this.closeSidebar();
    } else {
      this.openSidebar();
    }
  }

  openSidebar() {
    this.sidebar.classList.add('open');
    this.overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  closeSidebar() {
    this.sidebar.classList.remove('open');
    this.overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  setActiveNavItem() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = this.sidebar.querySelectorAll('.sidebar-nav a');
    
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPage) {
        link.classList.add('active');
      }
    });
  }
}

// Table Enhancement Class
class ModernTable {
  constructor(tableId) {
    this.table = document.getElementById(tableId);
    this.init();
  }

  init() {
    if (this.table) {
      this.enhanceTable();
    }
  }

  enhanceTable() {
    // Add modern classes
    this.table.classList.add('modern-table');
    
    // Wrap table in container if not already wrapped
    if (!this.table.closest('.table-container')) {
      const container = document.createElement('div');
      container.className = 'table-container';
      
      const wrapper = document.createElement('div');
      wrapper.className = 'table-wrapper';
      
      this.table.parentNode.insertBefore(container, this.table);
      container.appendChild(wrapper);
      wrapper.appendChild(this.table);
    }
  }
}

// Stats Cards Class
class StatsCards {
  constructor() {
    this.container = null;
    this.init();
  }

  init() {
    this.createStatsContainer();
  }

  createStatsContainer() {
    const mainContent = document.querySelector('.main-content');
    if (!mainContent) return;

    this.container = document.createElement('div');
    this.container.className = 'stats-grid';
    this.container.id = 'stats-grid';
    
    // Insert at the beginning of main content
    mainContent.insertBefore(this.container, mainContent.firstChild);
  }

  updateStats(stats) {
    if (!this.container) return;

    this.container.innerHTML = '';
    
    stats.forEach(stat => {
      const card = this.createStatCard(stat);
      this.container.appendChild(card);
    });
  }

  createStatCard(stat) {
    const card = document.createElement('div');
    card.className = 'stat-card';
    
    card.innerHTML = `
      <div class="stat-card-header">
        <span class="stat-card-title">${stat.title}</span>
        <div class="stat-card-icon ${stat.iconType || 'primary'}">
          ${stat.icon || '📊'}
        </div>
      </div>
      <div class="stat-card-value">${stat.value}</div>
      ${stat.change ? `<div class="stat-card-change ${stat.change > 0 ? 'positive' : 'negative'}">
        ${stat.change > 0 ? '↗' : '↘'} ${Math.abs(stat.change)}%
      </div>` : ''}
    `;
    
    return card;
  }
}

// Enhanced Search Class
class EnhancedSearch {
  constructor(inputId, tableId, countId) {
    this.input = document.getElementById(inputId);
    this.table = document.getElementById(tableId);
    this.countElement = document.getElementById(countId);
    this.init();
  }

  init() {
    if (this.input) {
      this.enhanceSearchInput();
    }
  }

  enhanceSearchInput() {
    // Add modern classes
    this.input.classList.add('search-input');
    
    // Wrap in search section if not already wrapped
    if (!this.input.closest('.search-section')) {
      const section = document.createElement('div');
      section.className = 'search-section';
      
      const row = document.createElement('div');
      row.className = 'search-row';
      
      this.input.parentNode.insertBefore(section, this.input);
      section.appendChild(row);
      row.appendChild(this.input);
      
      // Move count badge if exists
      if (this.countElement) {
        this.countElement.classList.add('count-badge');
        const countWrapper = document.createElement('div');
        countWrapper.innerHTML = `عرض ${this.countElement.outerHTML} سجلات`;
        row.appendChild(countWrapper);
      }
    }
  }
}

// Totals Enhancement Class
class TotalsDisplay {
  constructor(totalsId) {
    this.totalsElement = document.getElementById(totalsId);
    this.init();
  }

  init() {
    if (this.totalsElement) {
      this.enhanceTotals();
    }
  }

  enhanceTotals() {
    // Create modern totals section
    const section = document.createElement('div');
    section.className = 'totals-section';
    
    const grid = document.createElement('div');
    grid.className = 'totals-grid';
    
    // Extract totals data
    const totalsData = this.extractTotalsData();
    
    totalsData.forEach(total => {
      const item = document.createElement('div');
      item.className = 'total-item';
      item.innerHTML = `
        <div class="total-label">${total.label}</div>
        <div class="total-value" id="${total.id}">${total.value}</div>
      `;
      grid.appendChild(item);
    });
    
    section.appendChild(grid);
    
    // Replace original totals
    this.totalsElement.parentNode.insertBefore(section, this.totalsElement);
    this.totalsElement.style.display = 'none';
  }

  extractTotalsData() {
    const totals = [];
    
    // Extract from existing totals element
    const totalAll = document.getElementById('total_all');
    const totalComm = document.getElementById('total_comm');
    const totalAfterComm = document.getElementById('total_after_comm');
    
    if (totalAll) {
      totals.push({
        label: 'الإجمالي الكلي',
        value: totalAll.textContent,
        id: 'total_all'
      });
    }
    
    if (totalComm) {
      totals.push({
        label: 'إجمالي العمولة',
        value: totalComm.textContent,
        id: 'total_comm'
      });
    }
    
    if (totalAfterComm) {
      totals.push({
        label: 'بعد العمولة',
        value: totalAfterComm.textContent,
        id: 'total_after_comm'
      });
    }
    
    return totals;
  }
}

// Animation utilities
class AnimationUtils {
  static fadeIn(element, duration = 300) {
    element.style.opacity = '0';
    element.style.display = 'block';
    
    let start = null;
    function animate(timestamp) {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      
      element.style.opacity = Math.min(progress / duration, 1);
      
      if (progress < duration) {
        requestAnimationFrame(animate);
      }
    }
    
    requestAnimationFrame(animate);
  }

  static slideIn(element, direction = 'right', duration = 300) {
    const translateValue = direction === 'right' ? '100%' : '-100%';
    element.style.transform = `translateX(${translateValue})`;
    element.style.transition = `transform ${duration}ms ease`;
    
    setTimeout(() => {
      element.style.transform = 'translateX(0)';
    }, 10);
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize Modern UI
  window.modernUI = new ModernUI();
  
  // Initialize table enhancements
  const tables = document.querySelectorAll('table');
  tables.forEach((table, index) => {
    if (table.id) {
      new ModernTable(table.id);
    }
  });
  
  // Initialize search enhancements
  const searchInput = document.getElementById('filter');
  if (searchInput) {
    new EnhancedSearch('filter', 'tbl', 'count');
  }
  
  // Initialize totals display
  const totalsElement = document.getElementById('totals');
  if (totalsElement) {
    new TotalsDisplay('totals');
  }
  
  // Add loading animation to buttons
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function() {
      if (!this.classList.contains('loading')) {
        this.classList.add('loading');
        setTimeout(() => {
          this.classList.remove('loading');
        }, 1000);
      }
    });
  });
});

// Export for use in other scripts
window.ModernUI = ModernUI;
window.ModernTable = ModernTable;
window.StatsCards = StatsCards;
window.EnhancedSearch = EnhancedSearch;
window.TotalsDisplay = TotalsDisplay;
window.AnimationUtils = AnimationUtils;