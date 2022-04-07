import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import useApi from './useApi';
import axios from 'axios';
import produce from 'immer';

const useComments = (postId, commentInput, setCommentInput, comments, setComments) => {
  const location = useLocation();
  const onSubmit = e => {
    e.preventDefault();
    axios({
      url: '/api/comment/add',
      method: 'POST',
      data: {
        commentInput,
        postId,
      },
    }).then(({ data }) => {
      // if (data.success) window.location.reload();
      if (data.success) {
        setComments(prev => {
          setCommentInput('');
          return [...prev, data.comment];
        });
      }
    });
  };
  console.log('33');
  return { onSubmit };
};

export default useComments;
