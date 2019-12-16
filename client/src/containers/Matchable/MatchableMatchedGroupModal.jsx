import React, { useState, useEffect } from 'react';
import ReactList from 'react-list';
import { Modal, ModalHeader, ModalBody, ModalFooter, ListGroupItem } from 'reactstrap';
import MatchedGroup from './MatchedGroup';

function MatchedGroupModal(props) { 
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => setIsOpen(props.matchedGroups !== null), [props.matchedGroups]);
  const toggle = () => setIsOpen(!isOpen);
  const exactMatch = (props.matchedGroups || {}).exactMatch || [];
  const fuzzyMatch = (props.matchedGroups || {}).fuzzyMatch || [];

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader>Available Study Groups</ModalHeader>
      <ModalBody>
        <strong>We have found the following study groups:</strong><br/>
        <ReactList length={exactMatch.length} itemRenderer={(index, key) => (
          <ListGroupItem key={key}>
            <MatchedGroup group={exactMatch[index]} />
          </ListGroupItem>
        )} /> 
        <hr/>
        <strong>You may also be interested:</strong><br/>
        <ReactList length={fuzzyMatch.length} itemRenderer={(index, key) => (
          <ListGroupItem key={key}>
            <MatchedGroup group={fuzzyMatch[index]} />
          </ListGroupItem>
        )} />
      </ModalBody>
    </Modal>
  );
}

export default MatchedGroupModal;
