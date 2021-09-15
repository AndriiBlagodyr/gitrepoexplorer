import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import { loadUsers } from '../store/users';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.colors.bgGreySecondary};
`;

const StyledPanel = styled.div`
  max-width: 650px;
  height: 100vh;
  padding: 16px;
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.colors.bgLight};
  margin: 0 auto;
  box-shadow: 0 13px 26px 0 rgba(0, 0, 0, 0.16);
`;

export const GitSearch = () => {
  const [searchValue, setSearchValue] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUsers());
  }, [dispatch]);

  const searchValueChangeHandler = event => {
    const { value } = event.target;
    setSearchValue(value);
  };

  const onSubmit = event => {
    event.preventDefault();
    console.log(searchValue);
  };
  return (
    <Wrapper>
      <StyledPanel>
        <h1>Git Search</h1>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="searchValue"
            placeholder="Enter username"
            value={searchValue}
            onChange={searchValueChangeHandler}
          />
          <input type="submit" value="Search" />
        </form>
      </StyledPanel>
    </Wrapper>
  );
};
