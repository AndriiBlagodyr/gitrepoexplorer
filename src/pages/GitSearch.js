import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import { loadUsers } from '../store/users';
import { GitSearchInput, FullWidthButton } from '../styles/styles';
import { DropDownRepos } from '../components/DropDownRepos/DropDownRepos';

const StyledTitle = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.colors.bgGreySecondary};
`;

const StyledPanel = styled.div`
  max-width: 450px;
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
        <StyledTitle>Github Repos Explorer</StyledTitle>
        <form onSubmit={onSubmit}>
          <GitSearchInput
            type="text"
            name="searchValue"
            placeholder="Enter username"
            value={searchValue}
            onChange={searchValueChangeHandler}
            autoComplete="off"
          />
          <FullWidthButton type="submit" value="Search">
            Search
          </FullWidthButton>
        </form>
        <DropDownRepos userName="test" />
        <DropDownRepos userName="test2" />
      </StyledPanel>
    </Wrapper>
  );
};
