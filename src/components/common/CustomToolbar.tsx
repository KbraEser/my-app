import { Button, Menu, MenuItem } from "@mui/material";
import { GridToolbarContainer } from "@mui/x-data-grid";
import { useRef, useState } from "react";

const CustomToolbar = ({
  onExport,
  onUpload,
}: {
  onExport: (format: string) => void;
  onUpload: (file: File) => void;
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = (format?: string) => {
    setAnchorEl(null);
    if (format) {
      onExport(format);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onUpload(file); // Pass the selected file to the upload handler
    }
  };

  return (
    <GridToolbarContainer>
      <Button variant="contained" color="primary" onClick={handleOpenMenu}>
        İndir
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleCloseMenu()}
      >
        <MenuItem
          onClick={() =>
            handleCloseMenu(
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            )
          }
        >
          Excel İndir
        </MenuItem>
        <MenuItem onClick={() => handleCloseMenu("text/csv")}>
          CSV İndir
        </MenuItem>
      </Menu>
      <Button variant="contained" color="primary" onClick={handleUploadClick}>
        Yükle
      </Button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        style={{ display: "none" }}
      />
    </GridToolbarContainer>
  );
};

export default CustomToolbar;
