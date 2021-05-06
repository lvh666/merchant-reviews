import React from 'react';
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

interface CommentRatingProps {
    rating: number;
    onChange: (event: React.ChangeEvent<{}>, value: number | null) => void;
}

const CustomizedRatings: React.FC<CommentRatingProps> = ({ rating, onChange }) => {
  return (
    <div>
      <Box component="fieldset" mb={3} borderColor="transparent">
        <Typography component="legend">评分</Typography>
        <Rating
          name="customized-empty"
          value={rating}
          precision={0.5}
          onChange={onChange}
          emptyIcon={<StarBorderIcon fontSize="inherit" />}
        />
      </Box>
    </div>
  );
}

export default CustomizedRatings;