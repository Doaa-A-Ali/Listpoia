import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import kabsa from '../asset/images/kabsa.jpg';

export default function KabsaIngredients() {
  return (
    <>
      {/* Title */}
      <div className="flex justify-center items-center mb-6">
        <h1 className="text-3xl font-bold text-[#466919] mb-12">Kabsa with Chicken</h1>
      </div>

      {/* Content Section with h5 and Card on the left, Image on the right */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-12 px-4">
        <div className="md:w-1/2 text-center md:text-left">
          <h5 className="text-lg font-medium text-[#CD8F08] ml-40">
            A traditional Arabic dish made of rice cooked with pieces of chicken and a special blend of spices. 
            It is considered one of the famous dishes.
          </h5>
        </div>
        <div className="md:w-1/2">
          <img src={kabsa} alt="Kabsa with Chicken" className="rounded-lg shadow-lg w-full md:w-3/4 mx-auto" />
        </div>
      </div>

      {/* Ingredients Card */}
      <div className="flex justify-center px-4">
        <Card
          sx={{
            width: '100%',
            maxWidth: 600,
            borderRadius: 3,
            boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden',
            marginBottom: '40px',
          }}
        >
          <CardActionArea>
            <CardContent sx={{ padding: '24px' }}>
              <Typography variant="h6" component="div" sx={{ marginBottom: 2, fontWeight: 'bold', color: '#466919' }}>
                Ingredients
              </Typography>

              {/* Grid for Ingredients */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
                  - 2 cups basmati rice <br />
                  - 1 kg chicken, cut into pieces <br />
                  - 2 medium onions, finely chopped <br />
                  - 3 medium tomatoes, pureed <br />
                  - 4 garlic cloves, minced
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
                  - 1/4 cup vegetable oil <br />
                  - 1/2 cup raisins (optional) <br />
                  - 1/2 cup almonds, toasted <br />
                  - 2 tbsp Kabsa spice mix <br />
                  - 3 cups chicken broth <br />
                  - Salt and pepper, to taste
                </Typography>
              </div>

              {/* Button aligned to the center */}
              <div className="flex justify-center mt-6">
                <button
                  type="button"
                  className="text-white bg-orange-500 hover:bg-opacity-50 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
                >
                  Generate Ingredients List
                </button>
              </div>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    </>
  );
}
