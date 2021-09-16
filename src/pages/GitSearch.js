import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { loadUsers, getFirstFiveUsers } from '../store/users';
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
  min-height: 100vh;
  padding: 16px;
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.colors.bgLight};
  margin: 0 auto;
  box-shadow: 0 13px 26px 0 rgba(0, 0, 0, 0.16);
`;

const ErrorMessage = styled.span`
  color: tomato;
  font-weight: 500;
  font-size: 14px;
  text-align: left;
  margin: 0 8px 12px;
`;

export const GitSearch = () => {
  const [searchValue, setSearchValue] = useState('');
  const [showError, setShowError] = useState(false);
  const usersData = useSelector(getFirstFiveUsers());
  const dispatch = useDispatch();

  const searchValueChangeHandler = event => {
    const { value } = event.target;
    setSearchValue(value);
  };

  const onSubmit = event => {
    event.preventDefault();
    dispatch({ type: 'projects/projectsCleared' });
    if (searchValue === '') {
      setShowError(true);
      return;
    }
    setShowError(false);
    dispatch(loadUsers(searchValue));
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
        {showError && <ErrorMessage>Please, fill in username input field</ErrorMessage>}
        {usersData.length > 0 &&
          usersData.map(user => {
            return <DropDownRepos key={user?.login} userName={user?.login} />;
          })}
      </StyledPanel>
    </Wrapper>
  );
};
