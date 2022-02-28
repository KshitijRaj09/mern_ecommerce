import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container, Avatar, Tooltip,
  Box, AppBar, Toolbar, IconButton,
  Typography, Menu, InputBase, Badge
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import LoginModal from "./authComponents/LoginModal";
import Logout from "./authComponents/Logout";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { MenuDiv } from "../styledComponents/menuDiv.style";
import { getItems } from "../redux/actions/itemsAction";
import { Link } from "react-router-dom";
import { useCartUpdate } from "../hooks/useCartUpdate";
import { StyledLink } from "../styledComponents/StyledLink.style";

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: '4px',
  marginRight: '3px',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(2),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 1),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(3)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '18ch',
      '&:focus': {
        width: '30ch',
      },
    },
  },
}));
const shoppingIcon = <StyledLink to="cart"> <Badge badgeContent={10} color='primary'> <ShoppingCartIcon /> </Badge> </StyledLink>;
const guestLinks = [shoppingIcon, <LoginModal />];
const authLinksMobile = [shoppingIcon, 'Orders', <Logout />];
const authLinksDesktop = ['Orders', <Logout />];

const AppNavbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.authReducer);

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  //const { totalCartItems } = useSelector(state => state.cartReducer);

  const dispatch = useDispatch();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#456268', color: '#FBF7F0' }}>
      <Container maxWidth>
        <Toolbar disableGutters sx={{ display: "flex" }}>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            LOGO
          </Typography>
          <Typography>
            <StyledLink to="/">Home</StyledLink>
          </Typography>
          <Search onChange={({ target }) => dispatch(getItems(target.value))}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          {!(user?.name) &&
            <><Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, justifyContent: 'flex-end' }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                MenuListProps={{ disablePadding: true }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
              >
                {guestLinks.map((page) => (
                  <MenuDiv key={page} onClick={handleCloseNavMenu} margin='0'>
                    {page}
                  </MenuDiv>
                ))}
              </Menu>
            </Box><Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>
                {guestLinks.map((page) => (
                  <MenuDiv
                    key={page}
                    margin={"0 2px"}
                    width="70px"
                  >
                    {page}
                  </MenuDiv>
                ))}
              </Box></>
          }
          {(user?.name) &&
            <Box sx={{ display: "flex", flexGrow: 1, justifyContent: "flex-end", alignItems: "center", gap: "20px" }}>
              <Typography textAlign="center" sx={{ display: { xs: 'none', md: 'flex' } }}>
                {shoppingIcon}
              </Typography>
              <Tooltip title="Open settings">
                <MenuDiv onClick={handleOpenUserMenu} width="70px">
                  <Avatar alt="Remy Sharp" src="" />
                </MenuDiv>
              </Tooltip>
              <Menu
                sx={{ mt: '45px', display: { xs: 'none', md: 'block' } }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
                MenuListProps={{ disablePadding: true }}
              >
                {authLinksDesktop.map((setting) => (
                  <MenuDiv key={setting}>{setting}</MenuDiv>
                ))}
              </Menu>
              <Menu
                sx={{ mt: '45px', display: { xs: 'block', md: 'none' } }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
                MenuListProps={{ disablePadding: true }}
              >
                {authLinksMobile.map((setting) => (
                  <MenuDiv key={setting}>{setting}</MenuDiv>
                ))}
              </Menu>
            </Box>
          }
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default AppNavbar;
