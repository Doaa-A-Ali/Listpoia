import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import ShekhAlmihshiIngredients from './ShekhAlmihshiIngredients'; 
import shekhAlmihshi from '../asset/images/shekhAlmihshi.jpg'; 


export function ShekhAlmihshiCard() {
  const [open, setOpen] = React.useState(false);

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
        <CardMedia component="img" height="150" image={shekhAlmihshi} alt="Shekh Almihshi" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" sx={{ color: '#466919' }}>
            Shekh Almihshi
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Sheikh Al-Mahshi is a delicious traditional dish in Levantine cuisine, known for its rich flavor and appealing appearance. It consists of zucchini stuffed with minced meat and cooked with a seasoned yogurt sauce, offering a perfect blend of creaminess and spices.
</Typography>
        </CardContent>
        <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '0 16px' }}>
          <button
            type="button"
            onClick={handleClickOpen} 
            className="text-white bg-orange-500 hover:bg-opacity-50 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
          >
            Show Ingredients
          </button>
        </div>
      </Card>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>
          <Typography variant="h6" sx={{ color: '#466919' }}>
            Shekh Almihshi Ingredients
          </Typography>
        </DialogTitle>
        <DialogContent>
          <ShekhAlmihshiIngredients /> 
        </DialogContent>
      </Dialog>
    </>
  );
}
