import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import React from 'react';
import { FooterDiv } from '../styledComponents/footer.styled';
const Footer = () => (
  <FooterDiv>
    <a
      href='https://github.com/KshitijRaj09'
      target='_blank'
      rel='noreferrer noopener'
    >
      <GitHubIcon
        fontSize='large'
        sx={{ color: '#F3E9DD', cursor: 'pointer' }}
      />
    </a>
    <a
      href='https://www.linkedin.com/in/kshitijrajsingh/'
      target='_blank'
      rel='noreferrer noopener'
    >
      <LinkedInIcon
        fontSize='large'
        sx={{ color: '#F3E9DD', cursor: 'pointer' }}
      />
    </a>
    <a
      href='mailto:peacekshitij@gmail.com'
      target='_blank'
      rel='noreferrer noopener'
    >
      <EmailIcon
        fontSize='large'
        sx={{ color: '#F3E9DD', cursor: 'pointer' }}
      />
    </a>
  </FooterDiv>
);
export default Footer;
