import { NavigationOptions, NavigationItem, NavigationSubItem } from '../models/NavigationOptions';

/**
 * Renders a navigation menu with dropdown functionality
 */
export class NavigationRenderer {
  private options: Required<NavigationOptions>;
  private dropdownsExpanded: Map<number, boolean>;

  constructor(options: {
    items: NavigationItem[];
    containerClass?: string;
    itemClass?: string;
    submenuClass?: string;
    submenuItemClass?: string;
    dropdownPosition?: 'left' | 'center' | 'right';
    closeOnClickOutside?: boolean;
  }) {
    this.options = {
      items: options.items || [],
      containerClass: options.containerClass || '',
      itemClass: options.itemClass || '',
      submenuClass: options.submenuClass || '',
      submenuItemClass: options.submenuItemClass || '',
      dropdownPosition: options.dropdownPosition || 'left',
      closeOnClickOutside: options.closeOnClickOutside !== false
    };
    
    this.dropdownsExpanded = new Map();
  }

  /**
   * Renders the navigation component
   */
  render(): HTMLElement {
    const navContainer = document.createElement('div');
    navContainer.className = `col-span-10 pr-4 flex flex-row items-end h-full ${this.options.containerClass}`;
    
    const navWrapper = document.createElement('div');
    navWrapper.className = 'moe-site-navigation__globals flex-grow ml-12 h-full';
    
    const utilitiesWrapper = document.createElement('div');
    utilitiesWrapper.className = 'moe-site-navigation__global-utilities flex flex-row items-end justify-between h-full';
    
    const navList = document.createElement('ul');
    navList.className = 'global-main-list flex flex-row h-full items-end';
    
    // Render each navigation item
    this.options.items.forEach((item, index) => {
      const listItem = this.renderNavigationItem(item, index);
      navList.appendChild(listItem);
    });
    
    utilitiesWrapper.appendChild(navList);
    navWrapper.appendChild(utilitiesWrapper);
    navContainer.appendChild(navWrapper);
    
    // Set up event listeners for closing dropdowns when clicking outside
    if (this.options.closeOnClickOutside) {
      document.addEventListener('click', (event) => {
        const target = event.target as HTMLElement;
        if (!navContainer.contains(target)) {
          this.closeAllDropdowns(navList);
        }
      });
    }
    
    return navContainer;
  }
  
  /**
   * Renders a single navigation item
   */
  private renderNavigationItem(item: NavigationItem, index: number): HTMLElement {
    const listItem = document.createElement('li');
    const hasChildren = item.subItems && item.subItems.length > 0;
    
    if (hasChildren) {
      listItem.className = `relative has-children h-full flex items-end ${this.options.itemClass}`;
      // Add data attribute for easier selection
      listItem.setAttribute('data-dropdown-parent', String(index));
    } else {
      listItem.className = `h-full flex items-end ${this.options.itemClass}`;
    }
    
    // Create the main navigation link
    const link = document.createElement('a');
    link.className = 'block px-4 py-2 hover:text-blue-600 flex items-end h-full';
    link.href = item.url || '#';
    link.textContent = item.text;
    
    if (hasChildren) {
      link.setAttribute('role', 'button');
      
      // Create the dropdown button
      const dropdownButton = this.createDropdownButton(item.text, index);
      
      // Create the dropdown menu
      const dropdownMenu = this.createDropdownMenu(item.subItems || [], index);
      
      // Set up event handlers for dropdown
      this.setupDropdownEvents(listItem, dropdownMenu, index);
      
      listItem.appendChild(link);
      listItem.appendChild(dropdownButton);
      listItem.appendChild(dropdownMenu);
    } else {
      listItem.appendChild(link);
    }
    
    return listItem;
  }
  
  /**
   * Set up event handlers for dropdown menus
   * @private
   */
  private setupDropdownEvents(listItem: HTMLElement, dropdownMenu: HTMLElement, index: number): void {
    // Track if mouse is over the menu item or its dropdown
    let isOverMenuItem = false;
    let isOverDropdown = false;
    
    // Function to check if we should keep the dropdown open
    const updateDropdownVisibility = () => {
      if (isOverMenuItem || isOverDropdown) {
        // Keep dropdown open
        dropdownMenu.classList.remove('hidden');
        dropdownMenu.classList.add('block');
      } else {
        // Close dropdown immediately when mouse is not over either element
        dropdownMenu.classList.remove('block');
        dropdownMenu.classList.add('hidden');
      }
    };
    
    // Mouse enter/leave for menu item
    listItem.addEventListener('mouseenter', () => {
      isOverMenuItem = true;
      updateDropdownVisibility();
    });
    
    listItem.addEventListener('mouseleave', () => {
      isOverMenuItem = false;
      // Small delay before checking if we should close
      // This gives time for the mouse to enter the dropdown
      setTimeout(updateDropdownVisibility, 100);
    });
    
    // Mouse enter/leave for dropdown
    dropdownMenu.addEventListener('mouseenter', () => {
      isOverDropdown = true;
      updateDropdownVisibility();
    });
    
    dropdownMenu.addEventListener('mouseleave', () => {
      isOverDropdown = false;
      updateDropdownVisibility();
    });
    
    // Click handler for dropdown button
    const dropdownButton = listItem.querySelector('.navigation-arrow') as HTMLButtonElement;
    if (dropdownButton) {
      dropdownButton.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const isExpanded = dropdownMenu.classList.contains('block');
        
        if (isExpanded) {
          dropdownMenu.classList.remove('block');
          dropdownMenu.classList.add('hidden');
          dropdownButton.setAttribute('aria-expanded', 'false');
        } else {
          dropdownMenu.classList.remove('hidden');
          dropdownMenu.classList.add('block');
          dropdownButton.setAttribute('aria-expanded', 'true');
        }
      });
    }
  }
  
  /**
   * Creates a dropdown toggle button
   */
  private createDropdownButton(itemText: string, index: number): HTMLElement {
    const button = document.createElement('button');
    button.className = 'navigation-arrow p-2 ml-1';
    button.type = 'button';
    button.setAttribute('aria-pressed', 'false');
    button.setAttribute('aria-expanded', 'false');
    
    const icon = document.createElement('span');
    icon.className = 'icon icon-chevron-down--after';
    
    const srText = document.createElement('span');
    srText.className = 'sr-only';
    srText.textContent = `show submenu for ${itemText}`;
    
    button.appendChild(icon);
    button.appendChild(srText);
    
    return button;
  }
  
  /**
   * Creates a dropdown menu with submenu items
   */
  private createDropdownMenu(subItems: NavigationSubItem[], parentIndex: number): HTMLElement {
    const dropdownPosition = this.getDropdownPosition();
    
    const dropdownMenu = document.createElement('div');
    dropdownMenu.className = `moe-site-navigation__globals__dropdown-menu absolute left-0 right-0 top-full ${dropdownPosition} hidden bg-white shadow-lg border-t-0 border border-gray-200 rounded-t-none rounded-b-md z-30 min-w-48 ${this.options.submenuClass}`;
    dropdownMenu.style.marginTop = '0';
    dropdownMenu.style.paddingTop = '0';
    dropdownMenu.setAttribute('data-dropdown-index', String(parentIndex));
    
    // No arrow needed for direct connection
    const arrow = document.createElement('div');
    arrow.className = 'hidden';
    
    // Create submenu items list
    const subItemsList = document.createElement('ul');
    subItemsList.className = 'py-2';
    
    // Add submenu items
    subItems.forEach(subItem => {
      const listItem = document.createElement('li');
      
      const link = document.createElement('a');
      link.href = subItem.url;
      link.className = `block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600 ${this.options.submenuItemClass}`;
      link.textContent = subItem.text;
      
      listItem.appendChild(link);
      subItemsList.appendChild(listItem);
    });
    
    dropdownMenu.appendChild(arrow);
    dropdownMenu.appendChild(subItemsList);
    
    return dropdownMenu;
  }
  
  /**
   * Close all open dropdowns
   */
  private closeAllDropdowns(navList: HTMLElement): void {
    const dropdownButtons = navList.querySelectorAll<HTMLButtonElement>('.navigation-arrow');
    dropdownButtons.forEach((button, index) => {
      if (button && this.dropdownsExpanded.get(index)) {
        this.toggleDropdown(index, button);
      }
    });
  }
  
  /**
   * Toggle dropdown visibility
   */
  private toggleDropdown(index: number, button: HTMLButtonElement): void {
    const currentState = this.dropdownsExpanded.get(index) || false;
    const newState = !currentState;
    
    // Update state
    this.dropdownsExpanded.set(index, newState);
    
    // Find the dropdown menu
    const parentLi = button.closest('li');
    if (!parentLi) return;
    
    const dropdown = parentLi.querySelector('.moe-site-navigation__globals__dropdown-menu') as HTMLElement;
    if (!dropdown) return;
    
    // Update attributes
    button.setAttribute('aria-pressed', String(newState));
    button.setAttribute('aria-expanded', String(newState));
    
    // Toggle display
    dropdown.classList.toggle('hidden', !newState);
    dropdown.classList.toggle('block', newState);
    dropdown.classList.toggle('group-hover:block', !newState);
  }
  
  /**
   * Get dropdown position class based on options
   */
  private getDropdownPosition(): string {
    switch (this.options.dropdownPosition) {
      case 'center':
        return 'left-1/2 transform -translate-x-1/2';
      case 'right':
        return 'right-0';
      case 'left':
      default:
        return 'left-0';
    }
  }
}
