import { useCallback, useMemo, useState } from 'react';
import { Tabs, Typography, useMediaContext } from 'elui-react';
import { useFirstMountState } from 'react-use/esm/useFirstMountState';

import type { TShopItemType } from 'services/api';
import { useShopGroupsQuery } from 'services';
import { AccordionItem } from 'components/AccordionItem';

import { TGroup, TShopContext } from './types';
import { ShopProvider, useSelectedItems, useShopSearch } from './hooks';
import { Cart, Header, ItemCard, MobileCart } from './units';
import { StyledCartBox, StyledShop, StyledShopGroup, StyledShopGroupItem, StyledShopItems, StyledTabs } from './styled';

export const Shop = () => {
  const { isMobile } = useMediaContext();
  const [activeTab, setActiveTab] = useState<TShopItemType>('buy');
  const isFirstMount = useFirstMountState();
  const { searchValue, debounceSearch, filteredShop, onSearch } = useShopSearch();
  const { add, remove, removeAll, selectedIds } = useSelectedItems();
  const { groups } = useShopGroupsQuery();

  const ctx = useMemo<TShopContext>(() => {
    return { add, remove, removeAll, selectedIds };
  }, [add, remove, removeAll, selectedIds]);

  const activeFilteredItems = useMemo(() => {
    if (debounceSearch) return filteredShop;

    return filteredShop.filter(item => item.type === activeTab && item.isShow);
  }, [filteredShop, activeTab, debounceSearch]);

  const activeFilteredGroups = useMemo(() => {
    return groups.reduce<TGroup[]>((acc, curr) => {
      const groupItems = activeFilteredItems.filter(item => item.group === curr.id);

      if (groupItems.length) acc.push({ ...curr, items: groupItems });

      return acc;
    }, []);
  }, [activeFilteredItems, groups]);

  const onChangeTab = useCallback((tab: TShopItemType) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <ShopProvider value={ctx}>
      <Header onSearch={onSearch} searchValue={searchValue} />
      {!debounceSearch && (
        <StyledTabs>
          <Tabs<TShopItemType>
            isScrollable={false}
            activeTab={activeTab}
            onTabChange={onChangeTab}
            activeLineStyle={isFirstMount ? undefined : { transitionDuration: '.3s!important' }}
          >
            <Tabs.Tab<TShopItemType> value="buy">Продать</Tabs.Tab>
            <Tabs.Tab<TShopItemType> value="sell">Купить</Tabs.Tab>
          </Tabs>
        </StyledTabs>
      )}
      <StyledShop>
        {!activeFilteredGroups.length && (
          <Typography variant="h6">{`По запросу «${debounceSearch}» ничего не найдено`}</Typography>
        )}
        <StyledShopGroup>
          {activeFilteredGroups.map(({ name, description, isToggle, items }, shopIndex) => (
            <StyledShopGroupItem key={`${name}_${shopIndex}`}>
              <AccordionItem title={name} description={description} isInitialOpen={!isToggle}>
                <StyledShopItems>
                  {items.map(item => (
                    <ItemCard key={item.id} {...{ item }} />
                  ))}
                </StyledShopItems>
              </AccordionItem>
            </StyledShopGroupItem>
          ))}
        </StyledShopGroup>
      </StyledShop>
      {isMobile ? (
        <MobileCart />
      ) : (
        <StyledCartBox>
          <Cart />
        </StyledCartBox>
      )}
    </ShopProvider>
  );
};
