import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import mlokhia from '../asset/images/mlokhia.jpg'
export default function MlokhiaIngredients() {
  return (
    <>
      {/* Title */}
      <div className="flex justify-center items-center mb-6">
        <h1 className="text-3xl font-bold text-[#466919] mb-12">Molokhia with Chicken</h1>
      </div>
      
      {/* Content Section with h5 and Card on the left, Image on the right */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-12 px-4">
        <div className="md:w-1/2 text-center md:text-left">
          <h5 className="text-lg font-medium text-[#CD8F08] ml-40">
            Molokhia is a popular Arab dish known for its delicious taste and high nutritional value. 
            Molokhia is made from the cooked leaves of the molokhia plant, served with chicken or meat broth, and is accompanied by white rice.
          </h5>
        </div>
        <div className="md:w-1/2">
          <img src={mlokhia} alt="Molokhia with Chicken" className="rounded-lg shadow-lg w-full md:w-3/4 mx-auto"/>
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
                  - 1 kg Molokhia leaves, finely chopped <br />
                  - 1 whole chicken, cut into pieces <br />
                  - 2 medium onions, finely chopped <br />
                  - 6 garlic cloves, minced <br />
                  - 1/4 cup vegetable oil <br />
                  - 2 tbsp Molokhia spice mix (optional) <br />
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
                  - 5 cups chicken broth <br />
                  - 1 tsp ground coriander <br />
                  - 1/2 tsp cumin <br />
                  - Salt and pepper, to taste <br />
                  - 1 cup rice (for serving) <br />
                </Typography>
              </div>

              {/* Centering the button */}
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
