import React, { useState } from "react";
import {
  TextField,
  MenuItem,
  Box,
  Grid,
  Button,
  FormControl,
  Select,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import "./style.css";

// Định nghĩa các hằng số cho giá trị value
const OPTIONS = {
  ALL: "Tất cả",
  POSITION1: "Đang hoạt động",
  POSITION2: "Dừng hoạt động",
};

const FilterBar = () => {
  const [filterStatus, setFilterStatus] = useState(OPTIONS.ALL); // Cho TextField "Tất cả"
  const [searchTerm, setSearchTerm] = useState("");

  const handleFilterStatusChange = (event) => {
    setFilterStatus(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    console.log("Tìm kiếm:", searchTerm, "với bộ lọc:", {
      filterStatus,
    });
  };

  const handleAddNew = () => {
    console.log('Nút "Thêm mới" được nhấn');
  };

  return (
    <Box sx={{ flexGrow: 1, padding: 2, boxSizing: "border-box" }}>
      <Grid container justifyContent="center" alignItems="center" spacing={1} sx={{ height: "100%" }}>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleAddNew}
            style={{
              padding: "8px 15px",
              display: "flex",
              height: "90%",
              marginLeft: 1,
              border: "solid 1px #ccc",
              minWidth: "auto",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1rem",
            }}
          >
            Thêm mới
          </Button>
        </Grid>
        <Grid item xs>
          <TextField
            fullWidth
            placeholder="Nhập từ khóa"
            variant="outlined"
            size="small"
            sx={{
              width: 250,
              float: "right",
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": {
                  borderColor: "#1976d2",
                  transition: "border-color 0.3s ease",
                },
              },
            }}
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </Grid>
        <Grid item>
          <FormControl>
            <Select
              value={filterStatus}
              onChange={handleFilterStatusChange}
              variant="outlined"
              size="small"
              sx={{
                height: "2.5rem",
                width: "9rem",
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "#1976d2",
                    transition: "border-color 0.3s ease",
                  },
                },
              }}
            >
              <MenuItem value={OPTIONS.ALL}>Tất cả</MenuItem>
              <MenuItem value={OPTIONS.POSITION1} sx={{ color: "green" }}>
                Đang hoạt động
              </MenuItem>
              <MenuItem value={OPTIONS.POSITION2} sx={{ color: "red" }}>
                Dừng hoạt động
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FilterBar;
