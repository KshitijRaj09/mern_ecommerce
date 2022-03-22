import React from 'react';
import { Main } from '../styledComponents/pageNotFound.style';

const PageNotFound = (props) => {
  const { text } = props;
  return (
    <Main>
      <h4>404 - {text ? <>{text}</> : <> Page Not Found </>}</h4>
    </Main>
  );
};

export default PageNotFound;
