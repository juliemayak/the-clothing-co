import "./item-controls.scss";
import { IconButton } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

const ItemControls = ({ handleMinusClick, handlePlusClick, count }) => {
  return (
    <div className="item-controls">
      <IconButton onClick={handleMinusClick}>
        <RemoveIcon />
      </IconButton>
      <p className="item-controls__text">{count}</p>
      <IconButton onClick={handlePlusClick}>
        <AddIcon />
      </IconButton>
    </div>
  );
};

export default ItemControls;
