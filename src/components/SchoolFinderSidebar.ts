import {
  SchoolFinderSidebarOptions,
  AreaOption,
  PartnerCentreOption,
  SpecialNeedsOption,
} from '../models/SchoolFinderSidebarOptions';
import '@govtechsg/sgds-web-component';
import '@govtechsg/sgds-web-component/themes/root.css';

/**
 * Web component for the "School Finder" sidebar filter panel.
 *
 * Data should be provided inside a <script type="application/json"> child, e.g.
 *
 * <school-finder-sidebar>
 *   <script type="application/json">
 *     {
 *       "distanceOptions": [ ... ],
 *       "areas": [ ... ],
 *       "partnerCentres": [ ... ],
 *       "specialNeeds": [ ... ]
 *     }
 *   </script>
 * </school-finder-sidebar>
 */
export class SchoolFinderSidebar extends HTMLElement {
  private options: Required<SchoolFinderSidebarOptions> = {
    placeholder: 'Enter your address or postal code',
    distanceOptions: [
      { label: 'Schools within 500m', value: '0.5', disabled: true },
      { label: 'Schools between 500m to 1km', value: '1', disabled: true },
    ],
    areas: [],
    partnerCentres: [],
    specialNeeds: [],
  };

  constructor() {
    super();
  }

  connectedCallback() {
    this.style.display = 'block'; // ensure component behaves like a block element
    this.style.width = '100%';
    this.parseData();
    this.render();
  }

  /**
   * Parse JSON data from child <script type="application/json"> tag
   */
  private parseData() {
    const script = this.querySelector('script[type="application/json"]');
    if (script) {
      try {
        const data = JSON.parse(script.textContent || '{}') as Partial<SchoolFinderSidebarOptions>;
        this.options = { ...this.options, ...data } as Required<SchoolFinderSidebarOptions>;
      } catch (err) {
        console.error('Failed to parse SchoolFinderSidebar data', err);
      }
    }
  }

  createRenderRoot() {
    // Use light DOM so that Tailwind / global styles apply
    return this;
  }

  private render() {
    this.innerHTML = `
      <div class="col-span-4 pr-8 py-8" id="schoolFinderSidebar">
        ${this.renderHeader()}
        <sgds-accordion>
          ${this.renderLocationAccordion()}
          ${this.renderPartnerCentresAccordion()}
          ${this.renderSpecialNeedsAccordion()}
        </sgds-accordion>
      </div>
    `;
  }

  private renderHeader() {
    return `
      <div class="flex items-center justify-between text-gray-700 mb-4">
        <div class="flex items-center">
          <span class="text-xl mr-2 icon-filter"></span>
          <span class="text-base">Criteria</span>
        </div>
        <button class="text-primary-500 text-base" id="clearAllBtn">Clear all</button>
      </div>
    `;
  }

  private renderLocationAccordion() {
    const distanceRadios = this.options.distanceOptions
      .map(
        (opt, idx) => `
          <div class="moe-radio mt-4 ${opt.disabled ? 'type--disabled' : ''}">
            <input id="distance-${idx}" type="radio" name="postal-code-filter" value="${opt.value}" ${
          opt.disabled ? 'disabled' : ''
        } />
            <label for="distance-${idx}" class="pl-2">
              ${opt.label}
              <div class="check"></div>
            </label>
          </div>
        `,
      )
      .join('');

    const areaOptions = this.options.areas
      .map((area) => `<option value="${area.value}">${area.label}</option>`) // for future select implementation
      .join('');

    return `
      <sgds-accordion-item open>
        <div slot="header" class="moe-sidebar-toggle__button w-full flex items-center justify-between">
          <div class="moe-sidebar-toggle__button__label">Location</div>
          <span class="icon-chevron-down"></span>
        </div>
        <div slot="content" class="moe-sidebar-toggle__content__inner">
          <div class="mb-4 flex items-center">
            <span class="moe-tooltip mr-2" data-tippy-content="Information correct as November 2022. Singapore Land Authority." tabindex="0"></span>
            <span class="text-xs text-gray-400">Disclaimer</span>
          </div>
          <span class="block text-sm mb-2">Search for schools near you</span>
          <div class="moe-autosuggest moe-autosuggest--size-large mb-4">
            <input placeholder="${this.options.placeholder}" aria-label="${this.options.placeholder}" class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500" />
          </div>
          ${distanceRadios}
          <span class="block my-6 text-sm font-bold">OR</span>
          <div class="flex flex-row justify-between items-center mb-2">
            <span class="text-sm">Search for schools by area</span>
          </div>
          <div class="moe-select mb-4 moe-select--no-selection moe-select--size-full">
            <button type="button" class="w-full flex items-center justify-between border border-gray-300 rounded px-3 py-2">
              Select an area
              <span class="icon-dropdown"></span>
            </button>
            <!-- future select menu: ${areaOptions} -->
          </div>
        </div>
      </sgds-accordion-item>
    `;
  }

  private renderPartnerCentresAccordion() {
    const checkboxes = this.options.partnerCentres
      .map(
        (c) => `
          <label for="pc-${c.id}" class="moe-checkbox flex items-center space-x-2 mt-2">
            <input id="pc-${c.id}" type="checkbox" value="${c.value}" />
            <span class="checkmark type-grey-2"></span>
            <span class="text-sm text-gray-500">${c.label}</span>
          </label>
        `,
      )
      .join('');

    return `
      <sgds-accordion-item>
        <div slot="header" class="moe-sidebar-toggle__button w-full flex items-center justify-between">
          <div class="moe-sidebar-toggle__button__label">Partner Early Years Centres</div>
          <span class="icon-chevron-down"></span>
        </div>
        <div slot="content" class="moe-sidebar-toggle__content__inner">
          <div class="mb-4 flex items-center">
            <span class="moe-tooltip mr-2" data-tippy-content="E-Bridge Pre-school, NTUC My First Skool …" tabindex="0"></span>
            <span class="text-xs text-gray-400">Who are they?</span>
          </div>
          ${checkboxes}
        </div>
      </sgds-accordion-item>
    `;
  }

  private renderSpecialNeedsAccordion() {
    const checkboxes = this.options.specialNeeds
      .map(
        (sn) => `
          <label for="sn-${sn.id}" class="moe-checkbox flex items-center space-x-2 mt-2">
            <input id="sn-${sn.id}" type="checkbox" value="${sn.value}" />
            <span class="checkmark type-grey-2"></span>
            <span class="text-sm text-gray-500">${sn.label}</span>
          </label>
        `,
      )
      .join('');

    return `
      <sgds-accordion-item>
        <div slot="header" class="moe-sidebar-toggle__button w-full flex items-center justify-between">
          <div class="moe-sidebar-toggle__button__label">Support for special educational needs</div>
          <span class="icon-chevron-down"></span>
        </div>
        <div slot="content" class="moe-sidebar-toggle__content__inner">
          ${checkboxes}
          <span class="block text-sm text-gray-400 mb-2 mt-6"><strong>Note</strong>: All MKs are committed to supporting children …</span>
        </div>
      </sgds-accordion-item>
    `;
  }
}

// Register the custom element
if (!customElements.get('school-finder-sidebar')) {
  customElements.define('school-finder-sidebar', SchoolFinderSidebar);
}

export default SchoolFinderSidebar;
