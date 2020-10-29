import React from 'react';

import AsyncSelect from 'react-select/lib/Async';
import { components } from 'react-select';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';

export const colourOptions = [
  { index: 0, value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true },
  { index: 1, value: 'blue', label: 'Blue', color: '#0052CC', isDisabled: true },
  { index: 2, value: 'purple', label: 'Purple', color: '#5243AA' },
  { index: 3, value: 'red', label: 'Red', color: '#FF5630', isFixed: true },
  { index: 4, value: 'orange', label: 'Orange', color: '#FF8B00' },
  { index: 5, value: 'yellow', label: 'Yellow', color: '#FFC400' },
  { index: 6, value: 'green', label: 'Green', color: '#36B37E' },
  { index: 7, value: 'forest', label: 'Forest', color: '#00875A' },
  { index: 8, value: 'slate', label: 'Slate', color: '#253858' },
  { index: 9, value: 'silver', label: 'Silver', color: '#666666' },
];


function arrayMove(array, from, to) {
  array = array.slice();
  array.splice(to < 0 ? array.length + to : to, 0, array.splice(from, 1)[0]);
  return array;
}

const SortableMultiValue = SortableElement(props => {
  const onMouseDown = e => {
    e.preventDefault();
    e.stopPropagation();
  };
  const innerProps = { onMouseDown };
  console.log('sortable element props',props);
  return <components.MultiValue {...props} innerProps={innerProps} />;
});

const SortableSelect = SortableContainer(AsyncSelect);

export default function MultiSelectSort({ className }) {
  const [selected, setSelected] = React.useState([]);

  const onChange = selectedOptions => setSelected(selectedOptions);

  const onSortEnd = ({ oldIndex, newIndex }) => {
    const newValue = arrayMove(selected, oldIndex, newIndex);
    setSelected(newValue.map(({ value, label }, index) => ({ index, value, label })));
  };

  return (
    <SortableSelect
      axis="xy"
      onSortEnd={onSortEnd}
      distance={4}
      getHelperDimensions={({ node }) => node.getBoundingClientRect()}

    isMulti
    defaultValue={[]}
    cacheOptions
    id="playlist"
    loadOptions={() => Promise.resolve(colourOptions)}
      onChange={onChange}
      className={className}
      components={{
        MultiValue: SortableMultiValue,
      }}
      closeMenuOnSelect={false}
    />
  );
}
