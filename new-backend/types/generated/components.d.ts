import type { Schema, Struct } from '@strapi/strapi';

export interface BlockExperience extends Struct.ComponentSchema {
  collectionName: 'components_block_experiences';
  info: {
    displayName: 'Experience';
  };
  attributes: {
    companyLogo: Schema.Attribute.Media<'images'>;
    companyName: Schema.Attribute.String;
    description: Schema.Attribute.RichText;
    endDate: Schema.Attribute.Date;
    image: Schema.Attribute.Media<'images'>;
    links: Schema.Attribute.Component<'shared.link', true>;
    presentation: Schema.Attribute.RichText;
    startDate: Schema.Attribute.Date;
    tags: Schema.Attribute.Component<'shared.tag', true>;
    title: Schema.Attribute.String;
  };
}

export interface BlockExperienceGrid extends Struct.ComponentSchema {
  collectionName: 'components_block_experience_grids';
  info: {
    displayName: 'ExperienceGrid';
  };
  attributes: {
    experiences: Schema.Attribute.Component<'block.experience', true>;
    title: Schema.Attribute.String;
  };
}

export interface BlockProfile extends Struct.ComponentSchema {
  collectionName: 'components_block_profiles';
  info: {
    displayName: 'Profile';
  };
  attributes: {
    description: Schema.Attribute.RichText;
    image: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedFooter extends Struct.ComponentSchema {
  collectionName: 'components_shared_footers';
  info: {
    displayName: 'Footer';
  };
  attributes: {
    copyright: Schema.Attribute.String;
    links: Schema.Attribute.Component<'shared.link', true>;
  };
}

export interface SharedLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_links';
  info: {
    displayName: 'Link';
  };
  attributes: {
    href: Schema.Attribute.String;
    icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    isButton: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<false>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedNavBar extends Struct.ComponentSchema {
  collectionName: 'components_shared_nav_bars';
  info: {
    displayName: 'NavBar';
  };
  attributes: {
    logo: Schema.Attribute.Media<'images'>;
    navItems: Schema.Attribute.Component<'shared.nav-item', true>;
  };
}

export interface SharedNavItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_nav_items';
  info: {
    displayName: 'NavItem';
  };
  attributes: {
    alternativeText: Schema.Attribute.String;
    hasSideMenu: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<false>;
    href: Schema.Attribute.String;
    icon: Schema.Attribute.String;
    isButton: Schema.Attribute.Boolean;
    label: Schema.Attribute.String;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: '';
    displayName: 'Seo';
    icon: 'allergies';
    name: 'Seo';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    shareImage: Schema.Attribute.Media<'images'>;
    siteUrl: Schema.Attribute.String;
  };
}

export interface SharedSideMenu extends Struct.ComponentSchema {
  collectionName: 'components_shared_side_menus';
  info: {
    displayName: 'SideMenu';
  };
  attributes: {
    sideMenuItems: Schema.Attribute.Component<'shared.side-menu-item', true>;
  };
}

export interface SharedSideMenuItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_side_menu_items';
  info: {
    displayName: 'SideMenuItem';
  };
  attributes: {
    color: Schema.Attribute.String;
    label: Schema.Attribute.String;
  };
}

export interface SharedTag extends Struct.ComponentSchema {
  collectionName: 'components_shared_tags';
  info: {
    displayName: 'Tag';
  };
  attributes: {
    label: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'block.experience': BlockExperience;
      'block.experience-grid': BlockExperienceGrid;
      'block.profile': BlockProfile;
      'shared.footer': SharedFooter;
      'shared.link': SharedLink;
      'shared.nav-bar': SharedNavBar;
      'shared.nav-item': SharedNavItem;
      'shared.seo': SharedSeo;
      'shared.side-menu': SharedSideMenu;
      'shared.side-menu-item': SharedSideMenuItem;
      'shared.tag': SharedTag;
    }
  }
}
