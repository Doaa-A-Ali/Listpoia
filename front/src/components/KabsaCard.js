import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import kabsa from '../asset/images/kabsa.jpg';

import KabsaIngredients from './KabsaIngredients'; 

export function KabsaCard() {
  const [open, setOpen] = React.useState(false); 

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false); 
  };

  return (
    <>
      {/* البطاقة */}
      <Card sx={{ maxWidth: 345, position: 'relative', paddingBottom: '2rem' }}>
        <CardMedia component="img" height="150" image={kabsa} alt="kabsa" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" sx={{ color: '#466919' }}>
            Kabsa with Chicken
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            A traditional Arabic dish made of rice cooked with pieces of chicken and a special blend of spices. 
            It is considered one of the famous dishes.
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

      {/* نافذة مكون KabsaIngredients */}
      <Dialog 
        open={open} 
        onClose={handleClose} 
        fullWidth 
        maxWidth="md"
      >
        <div style={{ padding: '16px' }}>
          <KabsaIngredients />
        </div>
      </Dialog>
    </>
  );
}
