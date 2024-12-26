import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import MlokhiaIngredients from './MlokhiaIngredients'; // Import the Ingredients Component
import mlokhia from '../asset/images/mlokhia.jpg';

export function MlokhiaCard() {
  const [open, setOpen] = React.useState(false);

  // Handlers for opening and closing the dialog
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {/* Main Card */}
      <Card sx={{ maxWidth: 345, position: 'relative', paddingBottom: '2rem' }}> 
        <CardMedia component="img" height="150" image={mlokhia} alt="mlokhia" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" sx={{ color: '#466919' }}>
            Mlokhia with rice
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            is a popular Arab dish known for its delicious taste and high nutritional value. Molokhia is made from the cooked leaves of the molokhia plant, served with chicken or meat broth, and is accompanied by white rice.
          </Typography>
        </CardContent>
        <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '0 16px' }}>
          <button
            type="button"
            onClick={handleClickOpen} // Open Dialog on Click
            className="text-white bg-orange-500 hover:bg-opacity-50 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
            >
            Show Ingredients
          </button>
        </div>
      </Card>

      {/* Dialog for displaying ingredients */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>
          
        </DialogTitle>
        <DialogContent>
          <MlokhiaIngredients /> {/* Render the Ingredients Component */}
        </DialogContent>
      </Dialog>
    </>
  );
}
