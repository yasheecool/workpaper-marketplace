import isEqual from 'lodash.isequal';

//USED IN LISTING EDITOR FORM
export const getChangedFields = <T>(data: T, initialData: T) => {
  const changedFields: Partial<T> = {};

  for (const key in data) {
    if (
      typeof data[key] === 'object' &&
      Array.isArray(data[key]) &&
      Array.isArray(initialData[key]) &&
      !isEqual(data[key].sort(), initialData[key].sort())
    ) {
      changedFields[key] = data[key];
    } else if (!isEqual(data[key], initialData[key])) {
      changedFields[key] = data[key];
    }
  }

  return changedFields;
};
