class FilterNews {
  public filterNewsInList = (toFilterList: NodeListOf<Element>, filteringCriteria: string): void => {
    const filteringStringToLowerCase = filteringCriteria.toLocaleLowerCase();

    if (filteringCriteria.length > 0) {
      toFilterList.forEach((el) => {
        const sourceId = el.getAttribute('data-source-id');
        if (sourceId !== null) {
          const modifiedSourceId = sourceId.replace(/-/g, ' ').toLowerCase();
          const isIncludeStringInSourceId = modifiedSourceId.includes(filteringStringToLowerCase);

          if (isIncludeStringInSourceId) {
            el.classList.add('active');
            el.classList.remove('hide');
          } else {
            el.classList.remove('active');
            el.classList.add('hide');
          }
        }
      });
    } else {
      toFilterList.forEach((el) => el.classList.remove('active', 'hide'));
    }
  };
}
export default FilterNews;
