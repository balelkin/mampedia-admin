import React from 'react';
import PropTypes from 'prop-types';
import { Box, Breadcrumbs, styled, Chip, emphasize } from '@mui/material';

const StyledBreadcrumb = styled(Chip)(({ theme, component }) => {
  const backgroundColor =
    theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[800];
  const cursor = component === 'a' ? 'pointer' : 'default';

  return {
    backgroundColor,
    cursor,
    height: theme.spacing(3),
    fontSize: '12px',
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover, &:focus': { backgroundColor: emphasize(backgroundColor, 0.06) },
    '&:active': {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
});

export default function BreadcrumbsComponent({ crumbs }) {
  if (crumbs.length <= 1) {
    return null;
  }

  return (
    <Box sx={{ padding: '16px 0 0 36px' }}>
      <Breadcrumbs aria-label="breadcrumb">
        {crumbs.map(({ title, path }, key) =>
          key + 1 === crumbs.length ? (
            <StyledBreadcrumb key={path} component="span" label={title} />
          ) : (
            <StyledBreadcrumb key={path} component="a" href={path} label={title} />
          ),
        )}
      </Breadcrumbs>
    </Box>
  );
}

BreadcrumbsComponent.propTypes = {
  crumbs: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
