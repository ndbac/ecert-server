export const regExpEscape = (str: string) => {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

export const buildRegexSearchOptions = (
  searchText: string | undefined,
  fields: string | string[],
) => {
  if (!searchText) return {};
  if (typeof fields === 'string') {
    fields = [fields];
  }

  return {
    $or: fields.map((field) => ({
      [field]: new RegExp(regExpEscape(searchText), 'i'),
    })),
  };
};
