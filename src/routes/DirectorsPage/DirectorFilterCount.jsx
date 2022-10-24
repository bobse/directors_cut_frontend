import { React } from 'react';
import { Box, Link } from '@chakra-ui/react';

const DirectorFilterCount = ({
  filteredCount,
  directorCount,
  clearFilters,
}) => {
  return (
    <Box fontSize={'sm'} mb={4} textAlign={'right'}>
      Showing {filteredCount} of {directorCount} directors
      <Link px={2} onClick={clearFilters}>
        ( Clear filters )
      </Link>
    </Box>
  );
};

export default DirectorFilterCount;
