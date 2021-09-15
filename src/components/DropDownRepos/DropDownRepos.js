import React, { useState } from 'react';
import styled from 'styled-components';

const DropDownWrapper = styled.div`
  color: ${props => props.theme.colors.textPrimary};
  margin-bottom: 8px;
`;

const DropDownText = styled.div`
  width: 100%;
  color: ${props => props.theme.colors.colorPrimary};
  padding: 10px 16px;
  cursor: pointer;
  height: 44px;
  background: #475154;

  &::after {
    content: '';
    transition: all 0.3s;
    border: solid #ccc;
    border-width: 0 1px 1px 0;
    float: right;
    margin-top: ${props => (props.isOpened ? '1px' : '8px')};
    margin-right: 6px;
    margin-left: 8px;
    padding: 5px;
    transform: ${props => (props.isOpened ? 'rotate(45deg)' : 'rotate(-135deg)')};
  }
`;

const RepoItemWrapper = styled.div`
  background-color: ${props => props.theme.colors.bgGreySecondary};
  height: ${props => (props.isOpened ? 'auto' : 0)};
  max-height: ${props => (props.isOpened ? '290px' : 0)};
  visibility: ${props => (props.isOpened ? 'visible' : 'hidden')};
  opacity: ${props => (props.isOpened ? 1 : 0)};
  &:not(:last-child) {
    border-bottom: 1px solid #666;
  }
  transition: ${props =>
    props.isOpened ? 'max-height 0.7s, opacity 2s, visibility 3s ease' : 'all 0s ease 0s'};
`;

const repos = [
  { title: 'Title1', description: 'Description1' },
  { title: 'Title2', description: 'Description2' },
  { title: 'Title3', description: 'Description3' },
];

const RepoItem = ({ title, description, isOpened }) => {
  return (
    <RepoItemWrapper isOpened={isOpened}>
      <h3>{title}</h3>
      <p>{description}</p>
    </RepoItemWrapper>
  );
};

export function DropDownRepos({ userName }) {
  const [isOpened, setIsOpened] = useState(false);

  const handleClick = () => {
    setIsOpened(!isOpened);
  };

  return (
    <DropDownWrapper isOpened={isOpened} onClick={handleClick}>
      <DropDownText isOpened={isOpened}>{userName}</DropDownText>
      {repos.map(repo => (
        <RepoItem
          isOpened={isOpened}
          key={repo.title}
          title={repo.title}
          description={repo.description}
        />
      ))}
    </DropDownWrapper>
  );
}
