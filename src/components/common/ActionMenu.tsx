import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useState } from "react";
import IconifyIcon from "../base/IconifyIcon";

interface Action {
  id: number;
  icon: string;
  title: string;
  action: () => void;
}

interface ActionMenuProps {
  actions: Action[];
}

const ActionMenu = ({ actions }: ActionMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleActionMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleActionMenuClose = () => {
    setAnchorEl(null);
  };

  const handleActionItemClick = (action?: () => void) => {
    if (action) action();
    handleActionMenuClose();
  };

  return (
    <>
      <IconButton
        onClick={handleActionMenuClick}
        size="small"
        sx={{ zIndex: 1000 }}
      >
        <IconifyIcon icon="solar:menu-dots-bold" />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleActionMenuClose}
        onClick={handleActionMenuClose}
        sx={{
          mt: 0.5,
          "& .MuiPaper-root": {
            width: 120,
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
      >
        {actions.map((actionItem) => {
          return (
            <MenuItem
              key={actionItem.id}
              onClick={() => handleActionItemClick(actionItem.action)}
            >
              <ListItemIcon sx={{ mr: 1, fontSize: "h5.fontSize" }}>
                <IconifyIcon icon={actionItem.icon} color="text.primary" />
              </ListItemIcon>
              <ListItemText>
                <Typography color="text.primary">{actionItem.title}</Typography>
              </ListItemText>
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
};

export default ActionMenu;
