import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, CircularProgress, Button } from '@mui/material';
import { styled } from '@mui/system';
import { useTheme } from '@mui/material';
import { setCodeFromSaveFile } from '../../utils/Webcontainer';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSelectedLanguage } from '../../store/slices/languageSelectorSlice';
import Swal from 'sweetalert2';
import { getAllCodesByUsername, deleteCode } from '../../helpers/helper';

const Container = styled('div')({
  height: '87.5vh',
  overflowY: 'auto',
  '&::-webkit-scrollbar': {
    display: 'none', // Hide scrollbar for Chrome, Safari, and Opera
  },
  '-ms-overflow-style': 'none', // Hide scrollbar for Internet Explorer and Edge
  scrollbarWidth: 'none', // Hide scrollbar for Firefox
});

const StyledBox = styled(Box)(({ theme }) => ({
  padding: 16,
  borderRadius: 8,
  backgroundColor: theme.palette.mode === 'dark' ? '#424242' : '#f0f0f0',
  color: theme.palette.text.primary,
  margin: '10px',
  boxShadow:
    theme.palette.mode === 'dark'
      ? '0 2px 10px rgba(0, 0, 0, 0.6)'
      : '0 2px 10px rgba(0, 0, 0, 0.1)',
  transition: 'background-color 0.3s ease',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' ? '#444' : '#e0e0e0',
  },
}));

const GetAllUserCodes = () => {
  const theme = useTheme();
  const [codesByUser, setCodesByUser] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await getAllCodesByUsername();
      setCodesByUser(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching codes by username:', error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      });

      if (result.isConfirmed) {
        await deleteCode(id);
        await Swal.fire('Deleted!', 'Your code has been deleted.', 'success');
        // After successful deletion, refetch the data
        await fetchData();
      }
    } catch (error) {
      console.error('Error deleting code:', error);
    }
  };

  const handleBoxClick = (codeLanguage, code, id, title, description) => {
    const firstBraceIndex = code.indexOf('{');
    const lastBraceIndex = code.lastIndexOf('}');

    const cleanedCode = code.substring(firstBraceIndex + 1, lastBraceIndex).trim();
    const cleanedObject = JSON.parse(`{${cleanedCode}}`);
    dispatch(setSelectedLanguage(codeLanguage));
    setCodeFromSaveFile(cleanedObject, id, codeLanguage, title, description);
    navigate('/playground');
  };

  return (
    <Container>
      <Grid container spacing={2}>
        {loading ? (
          <Grid item xs={12}>
            <Box display="flex" justifyContent="center">
              <CircularProgress />
              {'Loading ....'}
            </Box>
          </Grid>
        ) : (
          <>
            {Object.entries(codesByUser || {}).map(([username, userCodes]) => (
              <React.Fragment key={username}>
                <Grid item xs={12}>
                  <Typography variant="h5" align="center" color="textPrimary">
                    {username}'s Codes
                  </Typography>
                </Grid>
                {userCodes.map((code) => (
                  <Grid item key={code._id} xs={12} sm={6} md={4} lg={3}>
                    <StyledBox>
                      <Typography
                        variant="h6"
                        gutterBottom
                        style={{
                          fontWeight: 'bold',
                          marginBottom: '8px',
                          color: theme.palette.mode == 'dark' ? 'yellow' : '#66635c',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {code.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        style={{
                          color: theme.palette.text.primary,
                          fontStyle: 'italic',
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {code.description ? code.description : `No description`}
                      </Typography>
                      <Box>
                        <Button
                          onClick={() =>
                            handleBoxClick(
                              code.codeLanguage,
                              code.code,
                              code._id,
                              code.title,
                              code.description ? code.description : `No description`
                            )
                          }
                        >
                          Update
                        </Button>
                        <Button onClick={() => handleDelete(code._id)}>Delete</Button>
                      </Box>
                    </StyledBox>
                  </Grid>
                ))}
              </React.Fragment>
            ))}
            {Object.keys(codesByUser || {}).length === 0 && (
              <Grid item xs={12}>
                <Typography variant="h5" align="center" color="textPrimary">
                  No codes found
                </Typography>
              </Grid>
            )}
          </>
        )}
      </Grid>
    </Container>
  );
};

export default GetAllUserCodes;
