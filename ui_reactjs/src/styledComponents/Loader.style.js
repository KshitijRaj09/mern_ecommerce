import styled, { keyframes } from 'styled-components';

export const Loader = styled.div`
  margin: 10% auto;
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #3498db;
  width: 120px;
  height: 120px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;

  @-webkit-keyframes spin {
    0% {
      -webkit-transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const LoaderMore = styled.div`
  position: relative;
  left: -9999px;
  margin: 2% auto;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  animation: dotLoading 1.5s infinite linear;

  @keyframes dotLoading {
    0% {
      box-shadow: 9984px 0 0 0 #c3dbd9, 9999px 0 0 0 #c3dbd9,
        10014px 0 0 0 #c3dbd9;
    }
    16.667% {
      box-shadow: 9984px -10px 0 0 #c3dbd9, 9999px 0 0 0 #c3dbd9,
        10014px 0 0 0 #c3dbd9;
    }
    33.333% {
      box-shadow: 9984px 0 0 0 #c3dbd9, 9999px 0 0 0 #c3dbd9,
        10014px 0 0 0 #c3dbd9;
    }
    50% {
      box-shadow: 9984px 0 0 0 #c3dbd9, 9999px -10px 0 0 #c3dbd9,
        10014px 0 0 0 #c3dbd9;
    }
    66.667% {
      box-shadow: 9984px 0 0 0 #c3dbd9, 9999px 0 0 0 #c3dbd9,
        10014px 0 0 0 #c3dbd9;
    }
    83.333% {
      box-shadow: 9984px 0 0 0 #c3dbd9, 9999px 0 0 0 #c3dbd9,
        10014px -10px 0 0 #c3dbd9;
    }
    100% {
      box-shadow: 9984px 0 0 0 #c3dbd9, 9999px 0 0 0 #c3dbd9,
        10014px 0 0 0 #c3dbd9;
    }
  }
`;
