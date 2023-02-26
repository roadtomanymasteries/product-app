import { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { getProductById } from '../apis/productsApis';
import { Product } from '../apis/productsApis';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { withAuthenticationRequired } from '@auth0/auth0-react';

const ProductView = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product>({} as Product);

  const loadProduct = useCallback(async () => {
    const result = await getProductById(id as string);
    setProduct(result);
  }, [id]);

  useEffect(() => {
    loadProduct();
  }, [loadProduct]);

  return (
    <Paper sx={{ m: 20 }}>
      <Button
        variant="contained"
        sx={{ mb: 1 }}
        component={Link}
        to="/api/products"
      >
        Return to product management console
      </Button>

      <Box sx={{ minHeight: '20rem' }}>
        <Typography fontSize="x-large" sx={{ m: 4 }}>
          Product Page
        </Typography>
        {Object.keys(product).map((key) => {
          return (
            <Stack direction="row" sx={{ ml: 4, mb: 4 }}>
              <Stack direction="column" sx={{ width: '20%' }}>
                <Typography fontSize="x-large">
                  {key as keyof Product}
                </Typography>
              </Stack>
              <Stack direction="column" sx={{ width: '20%' }}>
                <Typography fontSize="x-large">
                  {product[key as keyof Product]}
                </Typography>
              </Stack>
            </Stack>
          );
        })}
      </Box>
    </Paper>
  );
};

export default withAuthenticationRequired(ProductView, {
  onRedirecting: () => <div>loading...</div>,
});
