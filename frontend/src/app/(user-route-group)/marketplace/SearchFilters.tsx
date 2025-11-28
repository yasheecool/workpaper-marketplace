import CheckboxGroup from '@/components/input/CheckboxGroup';
import {
  CONTENT_TYPE,
  ENTITY_TYPES,
  REGIONS,
  WORKPAPER_TYPES,
} from '@/types/Cimplico_Marketplace_Typescript_Definitions';
import useAppStore from '@/store/appStore';

const SearchFilters = () => {
  const {
    workpaperType,
    setWorkpaperType,
    entityType,
    setEntityType,
    contentType,
    setContentType,
  } = useAppStore();

  return (
    <>
      <CheckboxGroup
        legend='Content Type'
        optionsObj={CONTENT_TYPE}
        name='contentType'
        setterFunction={setContentType}
        stateValue={contentType}
      />

      <CheckboxGroup
        legend='Workpaper Type'
        optionsObj={WORKPAPER_TYPES}
        name='workpaperType'
        setterFunction={setWorkpaperType}
        stateValue={workpaperType}
      />

      {/* OPTIONALLY, the listings can be filtered by region as well */}
      {/* <CheckboxGroup legend='Region' optionsObj={REGIONS} name='region' /> */}

      <CheckboxGroup
        legend='Entity Type'
        optionsObj={ENTITY_TYPES}
        name='entityType'
        setterFunction={setEntityType}
        stateValue={entityType}
      />
    </>
  );
};
export default SearchFilters;
