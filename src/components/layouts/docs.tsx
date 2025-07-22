import type { PageTree } from 'fumadocs-core/server';
import { type HTMLAttributes, type ReactNode, useMemo } from 'react';
import { Languages, Sidebar as SidebarIcon } from 'lucide-react';
import { cn } from '../../lib/cn';
import { buttonVariants } from '../ui/button';
import {
  Sidebar,
  SidebarCollapseTrigger,
  SidebarFooter,
  SidebarHeader,
  SidebarPageTree,
  SidebarViewport,
} from '../layout/sidebar';
import { BaseLinkItem, type LinkItemType } from './links';
import { RootToggle } from '../layout/root-toggle';
import { type BaseLayoutProps, getLinks } from './shared';
import {
  LanguageToggle,
  LanguageToggleText,
} from '../layout/language-toggle';
import {
  CollapsibleControl,
  LayoutBody,
  Navbar,
  NavbarSidebarTrigger,
} from './docs-client';
import { TreeContextProvider } from 'fumadocs-ui/contexts/tree';
import { ThemeToggle } from '../layout/theme-toggle';
import {
  getSidebarTabsFromOptions,
  SidebarLinkItem,
  type SidebarOptions,
} from './docs/shared';
import { NavProvider } from 'fumadocs-ui/contexts/layout';
import Link from 'fumadocs-core/link';
import {
  LargeSearchToggle,
  SearchToggle,
} from '../layout/search-toggle';
import { HideIfEmpty } from 'fumadocs-core/hide-if-empty';

export interface DocsLayoutProps extends BaseLayoutProps {
  tree: PageTree.Root;

  sidebar?: Partial<SidebarOptions> & {
    enabled?: boolean;
    component?: ReactNode;
  };

  /**
   * Props for the `div` container
   */
  containerProps?: HTMLAttributes<HTMLDivElement>;
}

export function DocsLayout({
  nav: { transparentMode, ...nav } = {},
  sidebar: {
    tabs: sidebarTabs,
    footer: sidebarFooter,
    banner: sidebarBanner,
    enabled: sidebarEnabled = true,
    collapsible: sidebarCollapsible = true,
    component: sidebarComponent,
    components: sidebarComponents,
    ...sidebarProps
  } = {},
  searchToggle = {},
  disableThemeSwitch = false,
  themeSwitch = { enabled: !disableThemeSwitch },
  i18n = false,
  children,
  ...props
}: DocsLayoutProps) {
  const tabs = useMemo(
    () => getSidebarTabsFromOptions(sidebarTabs, props.tree) ?? [],
    [sidebarTabs, props.tree],
  );
  const links = getLinks(props.links ?? [], props.githubUrl);

  const variables = cn(
    sidebarEnabled &&
      'md:[--fd-sidebar-width:268px] lg:[--fd-sidebar-width:286px]',
      'xl:[--fd-toc-width:286px]',
    !nav.component && nav.enabled !== false
      ? '[--fd-nav-height:56px] md:[--fd-nav-height:64px]'
      : undefined,
  );

  const sidebar = sidebarComponent ?? (
    <Sidebar {...sidebarProps} collapsible={sidebarCollapsible} className="md:[--fd-nav-height:0px]">
      <HideIfEmpty>
        <SidebarHeader className="data-[empty=true]:hidden">
          <div className="flex max-md:hidden">
            <Link
              href={nav.url ?? '/'}
              className="inline-flex text-[15px] items-center gap-2.5 font-medium me-auto"
            >
              {nav.title}
            </Link>
            {nav.children}
            {sidebarCollapsible && (
              <SidebarCollapseTrigger
                className={cn(
                  buttonVariants({
                    color: 'ghost',
                    size: 'icon-sm',
                    className:
                      'mb-auto text-fd-muted-foreground max-md:hidden',
                  }),
                )}
              >
                <SidebarIcon />
              </SidebarCollapseTrigger>
            )}
          </div>
          {searchToggle.enabled !== false &&
            (searchToggle.components?.lg ?? (
              <LargeSearchToggle hideIfDisabled className="max-md:hidden" />
            ))}
          {tabs.length > 0 && <RootToggle options={tabs} />}

          {sidebarBanner}
        </SidebarHeader>
      </HideIfEmpty>
      <SidebarViewport>
        {links
          .filter((v) => v.type !== 'icon')
          .map((item, i, list) => (
            <SidebarLinkItem
              key={i}
              item={item}
              className={cn(i === list.length - 1 && 'mb-4')}
            />
          ))}
        <SidebarPageTree components={sidebarComponents} />
      </SidebarViewport>
      <HideIfEmpty>
        <SidebarFooter className="data-[empty=true]:hidden">
          <div className="flex items-center justify-end empty:hidden">
            {links
              .filter((item) => item.type === 'icon')
              .map((item, i, arr) => (
                <BaseLinkItem
                  key={i}
                  item={item}
                  className={cn(
                    buttonVariants({ size: 'icon', color: 'ghost' }),
                    'text-fd-muted-foreground md:[&_svg]:size-4.5',
                    i === arr.length - 1 && 'me-auto',
                  )}
                  aria-label={item.label}
                >
                  {item.icon}
                </BaseLinkItem>
              ))}
          </div>
          {sidebarFooter}
        </SidebarFooter>
      </HideIfEmpty>
    </Sidebar>
  );

  return (
    <TreeContextProvider tree={props.tree}>
      <NavProvider transparentMode={transparentMode}>
        <LayoutBody
          {...props.containerProps}
          className={cn(variables, props.containerProps?.className)}
        >
          {sidebarEnabled && sidebar}
          <Navbar>
            <div className="flex border-b px-4 flex-1 md:px-6">
              {sidebarCollapsible && (
                <div className="flex flex-row items-center">
                  <SidebarCollapseTrigger
                    className={cn(
                      buttonVariants({
                        color: 'ghost',
                        size: 'icon-sm',
                        className:
                          '-ms-1.5 me-2 data-[collapsed=false]:hidden text-fd-muted-foreground max-md:hidden',
                      }),
                    )}
                  >
                    <SidebarIcon />
                  </SidebarCollapseTrigger>
                </div>
              )}
              {searchToggle.enabled !== false &&
                (searchToggle.components?.lg ?? (
                  <LargeSearchToggle hideIfDisabled className="data-[collapsed=false]:hidden w-full my-auto max-md:hidden max-w-[240px]" />
              ))}
              <div className="flex flex-1 flex-row items-center justify-end">
                {i18n ? (
                  <LanguageToggle className="me-1.5 max-md:hidden">
                    <Languages className="size-4.5" />
                    <LanguageToggleText />
                  </LanguageToggle>
                ) : null}
                {themeSwitch.enabled !== false &&
                  (themeSwitch.component ?? (
                    <ThemeToggle className="p-0 max-md:hidden" mode={themeSwitch.mode} />
                ))}
                {searchToggle?.enabled !== false &&
                  (searchToggle.components?.sm ?? (
                    <SearchToggle className="p-2 md:hidden" hideIfDisabled />
                  ))}
                {sidebarEnabled && (
                  <NavbarSidebarTrigger className="p-2 -me-1.5 md:hidden" />
                )}
              </div>
            </div>
          </Navbar>
          {children}
        </LayoutBody>
      </NavProvider>
    </TreeContextProvider>
  );
}

export { CollapsibleControl, Navbar, NavbarSidebarTrigger, type LinkItemType };
