import React, { useState, useEffect } from "react";
import { getCodesByUserId, deleteCode, getAllCodesByUsername } from "../../helpers/helper";
import {
  Grid,
  Box,
  Typography,
  CircularProgress,
  useTheme,
  Button
} from "@mui/material";
import { styled } from "@mui/system";
import { setCodeFromSaveFile } from "../../utils/Webcontainer";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSelectedLanguage } from "../../store/slices/languageSelectorSlice";
import Swal from 'sweetalert2';

const GetUserCode = () => {
  const theme = useTheme();
  const [codes, setCodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const codesData = await getCodesByUserId();
      setCodes(codesData.userCodes);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching codes:", error);
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
        confirmButtonText: 'Yes, delete it!'
      });
      if (result.isConfirmed) {
        await deleteCode(id);
        await fetchData();
        Swal.fire(
          'Deleted!',
          'Your code has been deleted.',
          'success'
        )
      }
    } catch (error) {
      console.error("Error deleting code:", error);
    }
  };

  const handleBoxClick = (codeLanguage, code, id, title, description) => {
    const firstBraceIndex = code.indexOf("{");
    const lastBraceIndex = code.lastIndexOf("}");

    const cleanedCode = code
      .substring(firstBraceIndex + 1, lastBraceIndex)
      .trim();
    const cleanedObject = JSON.parse(`{${cleanedCode}}`);
    dispatch(setSelectedLanguage(codeLanguage));
    setCodeFromSaveFile(cleanedObject, id, codeLanguage, title, description);
    navigate("/playground");
  };

  const StyledBox = styled(Box)(({ theme }) => ({
    padding: 16,
    borderRadius: 8,
    backgroundColor: theme.palette.mode === "dark" ? "#424242" : "#f0f0f0",
    color: theme.palette.text.primary,
    margin: "10px",
    boxShadow:
      theme.palette.mode === "dark"
        ? "0 2px 10px rgba(0, 0, 0, 0.6)"
        : "0 2px 10px rgba(0, 0, 0, 0.1)",
    transition: "background-color 0.3s ease",
    "&:hover": {
      backgroundColor: theme.palette.mode === "dark" ? "#444" : "#e0e0e0",
    },
  }));

  return (
    <Grid container spacing={2}>
      {loading ? (
        <Grid item xs={12}>
          <Box display="flex" justifyContent="center">
            <CircularProgress />
            {"Loading ...."}
          </Box>
        </Grid>
      ) : (
        <>
          {codes &&
            codes.map((code) => (
              <Grid item key={code._id} xs={12} sm={6} md={4} lg={3}>
                <StyledBox>
                  <Typography
                    variant="h6"
                    gutterBottom
                    style={{
                      fontWeight: "bold",
                      marginBottom: "8px",
                      color:
                        theme.palette.mode == "dark" ? "yellow" : "#66635c",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {code.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    style={{
                      color: theme.palette.text.primary,
                      fontStyle: "italic",
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
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
                    <Button onClick={() => handleDelete(code._id)}>
                      Delete
                    </Button>
                  </Box>
                </StyledBox>
              </Grid>
            ))}
          <Grid
      container
      
      style={{ marginTop: "50px"}}
    >
      {!codes.length && (
        <Grid item xs={12}>
          <Typography variant="h5" align="center" color="textPrimary">
            No codes found
          </Typography>
        </Grid>
      )}
    </Grid>
        </>
      )}
    </Grid>
  );
};

export default GetUserCode;
