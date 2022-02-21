import React from 'react';
import { HomePage } from '../pages/HomePage';
import { render } from '@testing-library/react';

it("Should display a search bar", () => {
    const { queryByTestId, queryByPlaceholderText} = render(<HomePage />);

    expect(queryByTestId('searchbar')).toBeTruthy();

})