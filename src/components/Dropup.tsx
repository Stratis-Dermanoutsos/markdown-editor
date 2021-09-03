import React, { useState } from 'react';
import { ButtonGroup, Dropdown, DropdownButton } from 'react-bootstrap';
import { Snippet } from './snippets';

export default function Dropup({ items, addSnippet }: { items: Snippet[], addSnippet: (val: string) => void }) {
    return (
        <DropdownButton drop={'up'} variant='primary' title={'Snippets'} className='me-auto' as={ButtonGroup}>
            {items.map(item => <DropupItem item={item} addSnippet={addSnippet} key={item.name} />)}
        </DropdownButton>
    )
}

function DropupItem({ item, addSnippet }: { item: Snippet, addSnippet: (val: string) => void }) {
    function handleClick() {
        addSnippet(item.value);
    }

    return <Dropdown.Item as="button" onClick={handleClick}>{item.name}</Dropdown.Item>;
}
