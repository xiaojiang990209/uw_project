import React, { useState, useEffect } from 'react';
import ReactList from 'react-list';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import MatchedGroup from './MatchedGroup';
import { StyledButton, StyledGroupResultWrapper } from './component';

function MatchedGroupModal(props) { 
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => setIsOpen(props.matchedGroups !== null), [props.matchedGroups]);
  const toggle = () => setIsOpen(!isOpen);
  const exactMatch = (props.matchedGroups || {}).exactMatch || [];
  const fuzzyMatch = (props.matchedGroups || {}).fuzzyMatch || [];
  const matches = [...exactMatch, ...fuzzyMatch];

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader>Available Study Groups</ModalHeader>
      <ModalBody>
        <StyledGroupResultWrapper>
          <ReactList length={matches.length} itemRenderer={(idx, key) => (
            <MatchedGroup key={key} group={matches[idx]} user={props.user} />
          )} />
        </StyledGroupResultWrapper>
        <StyledButton color="danger" outline block onClick={props.onCreateGroup}>
          Create another group
        </StyledButton>
      </ModalBody>
    </Modal>
  );
}

export default MatchedGroupModal;
