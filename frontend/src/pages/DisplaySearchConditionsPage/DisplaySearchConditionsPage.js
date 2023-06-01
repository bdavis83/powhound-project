import React from 'react';
import SearchConditions from "../../components/SearchConditions/SearchConditions";
import { Typography, Card, CardContent, Box } from '@mui/material';
import { useLocation } from "react-router-dom";


function DisplaySearchConditionsPage() {
  const location = useLocation();
  const state = location.state;

  // Access the search results from the state object
  const searchResults = state && state.searchResults;

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Display Search Conditions
      </Typography>
      {searchResults && (
        <Box display="flex" flexWrap="wrap">
          {searchResults.map((resort) => (
            <Card key={resort.id} sx={{ minWidth: 275, margin: '0.5rem' }}>
              <CardContent>
                <Typography variant="h6" component="div">
                  {resort.name}
                </Typography>
                {resort.powderConditions && (
                  <Typography color="textSecondary">Powder Conditions</Typography>
                )}
                {resort.springConditions && (
                  <Typography color="textSecondary">Spring Conditions</Typography>
                )}
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </div>
  );
}

export default DisplaySearchConditionsPage;