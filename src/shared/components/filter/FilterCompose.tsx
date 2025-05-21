
import React, { FC, useEffect, useState } from 'react'
import useI18n from 'use/i18n/useI18n'
import { useModalStore } from 'use/modal/useModal'
import SortUtility from 'use/filter/SortUtility'
import FilterModel, { IFilterModel, TFilterMapper } from 'use/filter/store/model/FilterModel'

import { DrawerCompose } from 'compose/layout/DrawerCompose'
import { FilterSelect } from 'components/filter/FilterSelect'
import { DrawerFilterFormStyled, FilterChip, FilterFormStyled } from 'components/filter/styled'
import { Title } from 'components/common/common'
import icons from 'components/theme/icons'

import {
  ApplyButtonStyled,
  ButtonContainer,
  ChipContainerStyled,
  FilterRadioGroupStyled,
  OpenButtonStyled,
  TextStyled
} from './styled'
import { InputField } from 'components/form/InputField'
import { ISortModelMap } from 'utils/interface'




const labelIds = {  
  applyButton: 'filter.button.apply',
  filterButton: 'filter.button.filter',
  filterBy: 'filter.filterby',
  loading: 'common.loading',
  numResult: 'filter.numResult',
  numResults: 'filter.numResults',
  search: 'filter.searchby',
  sort: 'filter.sortby'
}
export interface IFilterOption {
  title: string;
  value: any;
}
export type TFilterOptionUpdate = Pick<IFilterModel, 'name' | 'options' | 'query'>
interface IProps {
  sortName?: string;
  searchName: string;
  filterId: string;
  onChange: (name: string, values: any) => void;

  list: any[];
  loading: boolean;
  model: IFilterModel[];
  filterMapper: TFilterMapper<unknown>;
  sortMap?: ISortModelMap;
  updateOptions: (list: unknown[], t?: any) => TFilterOptionUpdate[];
  children: (list: any[]) => React.ReactNode;
}
interface IChip {
  onDelete: (name: string) => void;
  active: IFilterModel[];
}

const Chips: FC<IChip> = ({
  onDelete,
  active
}) =>
  <ChipContainerStyled>
    { active.filter(f => f.options).map(filter => {
      const canBeDeleted = !filter.options[0].value
      const chipProps = Object.assign({
        label: getLabel(filter)
      }, canBeDeleted ? { onDelete: () => onDelete(filter.name) } : {})

      return (<FilterChip key={filter.name} {...chipProps} />)
    })}
  </ChipContainerStyled>

const onlyTempModels = (model: IFilterModel) => model.name !== 'search' && model.name !== 'sort'
const onlyDrawerModels = (model: IFilterModel) => model.name !== 'sort'
const onlyActiveHidden = (model: IFilterModel) => model.input && model.hideFilter
const onlyDisabled = (model: IFilterModel) => model.disabled
const getLabel = (filter: IFilterModel) => {
  const found = filter.options
    .find(option => option.value === filter.input)
  
  const label = found ? found.title : ''
  return label.length < 20
    ? label
    : `${label.slice(0, Math.min(label.length - 10, 15))}...${label.slice(-5)}`
}

export const FilterCompose: FC<IProps> = ({
  sortName,
  searchName,
  filterId,
  list,
  loading,
  model = [],
  filterMapper,
  sortMap,
  onChange,
  updateOptions,
  children
 }) => {

  const { t, tm } = useI18n()
  const labels = tm(labelIds)
  const getResults = num => t(labelIds[`numResult${num === 1 ? '' : 's'}`], { num })

  const drawerId = `filter.${filterId}`
  const { open, close } = useModalStore(drawerId)

  const sort = model.find(ob => ob.name === sortName)
  const search = model.find(ob => ob.name === searchName)
    
  const [ filteredList, setFilteredList ] = useState<unknown[]>([])
  const [ tempModel, setTempModel ] = useState<IFilterModel[]>([])
  const [ tempNum, setTempNum ] = useState<number>(0)

  const activeDrawer = tempModel.filter(ob => ob.input && !ob.server)
  const activeNotServer = model.filter(ob => ob.input && ob.name !== 'sort' && !ob.server)

  const onChangeValue = (name: string, input: any) => {
    const result = {}
    model.forEach(({ name, input }) => {
      result[name] = input
    })
    const values = { ...result, ...{ [name]: input }}
    onChange(name, values)
  }

  const onChangeSearch = e => {
    onChangeValue(searchName, FilterModel.flatName(e.target.value))
  }
  const onDelete = (name: string) => {
    onChangeValue(name, '')
  }
  const onTempDelete = (name: string) => {
    onChangeTempValue(name, '')
  }
  const openFilters = () => {
    updateFilterOptions(filteredList, tempModel)
    open()
  }

  const updateFilterOptions = (arr, m) => {
    const newModel = updateOptions(arr, t).filter(onlyTempModels)

    const newUpdatedModel = m.map(model => {
      return {
        ...model,
        ...newModel.find(m => !model.input && m.name === model.name) || {}
      }
    })
    setTempModel(newUpdatedModel)
  }
  const onChangeTempValue = (name: string, input: any) => {
    const newTempModel = tempModel
      .map(f => ({ ...f, ...(f.name === name && { input })}))

    const newFilteredList = FilterModel.filterList(
      list, newTempModel, filterMapper
    )
    updateFilterOptions(newFilteredList, newTempModel)
    setTempNum(newFilteredList.length)
  }

  const onChangeServerValue = (name: string, input: any) => {
    setTempNum(-1)
    setTimeout(() => {
      model.filter(onlyActiveHidden)
        .forEach(f => {
          onChangeValue(f.name, '')
        })
      model.filter(onlyDisabled)
        .forEach(f => {
          onChangeValue('search', '')
        })
      onChangeValue(name, input)
    })
  }

  const apply = () => {
    tempModel.filter(o => !o.server).forEach(m => {
      onChangeValue(m.name, m.input)
    })
    close()
  }
  const drawerModel = model.filter(onlyDrawerModels)
  const flatValues = model.filter(o => !o.server).map(o => o.input)

  const text = loading ? labels.loading : getResults(filteredList.length)
  const drawerText = tempNum < 0 ? labels.loading : getResults(tempNum)

  useEffect(() => {
    setTempModel(model.filter(onlyTempModels))
  }, [ model ])

  useEffect(() => {
    if (loading) setTempNum(-2)
    else if (tempNum === -2) {
      setTempNum(0)
    }
  }, [loading])

  useEffect(() => {
    if (list) {
      
      const f = flatValues.join('').length
        ? FilterModel.filterList(list, drawerModel, filterMapper)
        : list

      setFilteredList(sortMap && sort
          ? f.sort(SortUtility.sortBy(sortMap[sort.input]))
          : f)
      setTempNum(f.length)
    }
  }, [ flatValues.join(), list ])
  
  const inputDisabled = search && (search.disabled || (!search.input && !list?.length))
  
  return (
    <>
      <DrawerCompose
        anchor="top"
        id={drawerId}
       ><Title value={labels.filterBy} />
        <DrawerFilterFormStyled>
          {tempModel.filter(m => !m.hideFilter)
            .map(({ name, label, options, input, server }: IFilterModel) => (
              options
              ? (
                server
                ? (<>
                    <FilterRadioGroupStyled
                      key={name}
                      selected={input}
                      items={options.map(o => ({ key: o.value, label: o.title }))}
                      onChange={value => onChangeServerValue(name, value)} />
                    <em />
                  </>)
                : <FilterSelect
                    key={name}
                    label={label}
                    value={input}
                    onChange={value => onChangeTempValue(name, value)}
                    options={options}
                    variant={'dropdown'}
                />)
              : <InputField
                  key={name}
                  label={label}
                  name={name}
                  value={input}
                  onChange={e => onChangeTempValue(name, e.target.value)}
              />
            )
            
            )}
        </DrawerFilterFormStyled>
        <TextStyled>{ drawerText }</TextStyled>
        <Chips active={activeDrawer} onDelete={onTempDelete} />
        <ButtonContainer>
          <ApplyButtonStyled onClick={apply} >{labels.applyButton}</ApplyButtonStyled>
        </ButtonContainer>
      </DrawerCompose>
      <Chips active={activeNotServer} onDelete={onDelete} />
      { !loading &&
        <FilterFormStyled>
          { sort && sort.options && <FilterSelect
            icon={icons.sort}
            label={labels.sort}
            value={sort.input}
            onChange={value => onChangeValue(sortName, value)}
            options={sort.options}
            variant='dropdown'
            />}
          { search && <InputField
            disabled={inputDisabled}
            label={search.label}
            name={searchName}
            value={search.input}
            onChange={onChangeSearch}
            />}
          <OpenButtonStyled onClick={openFilters}>{labels.filterButton}</OpenButtonStyled>
        </FilterFormStyled>
      }
      { <TextStyled>{ text }</TextStyled>}
      { children(filteredList) }
    </>
  )
}
