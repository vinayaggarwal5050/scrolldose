import { Box, Button, Card, CardContent, CardMedia, CircularProgress, Stack, Typography, Chip} from "@mui/material";
import { useLocation } from 'react-router-dom';
import { backendURL } from "../../constants/backend-url";
import { useEffect, useState } from "react";


const Product = () => {

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const slug: string | null = params.get('slug');
  
  const [product, setProduct] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<any>();

  const getProductFromServer = async(slug: string | null) => {
    try {
      const res = await fetch(`${backendURL}/product?productslug=${slug}`);
      const response = await res.json();

      if(response?.status) {
        setProduct(response?.data);
        setSelectedImage(response?.data?. mainImageUrl);
      } else {
        setProduct(null);
      }

    } catch(error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const fetchFromServer = async() => {
      setLoading(true);
      await getProductFromServer(slug);
      setLoading(false);
    }

    fetchFromServer();

  } , []);


  if(loading) {
    return (
      <Box sx={{ minWidth: "50vh", minHeight: "50vh", display: "flex", justifyContent: "center", alignItems: "center"}}>
        <CircularProgress/>
      </Box>
    )
  }

  return (
    <Box sx={{ maxWidth: 500, margin: "auto", p: 2 }}>

      {/* Product Details */}
      <Card sx={{ mb: 2 }}>

        <CardMedia 
          component="img"
          height="300"
          image={selectedImage}
          alt={product.name}
          sx={{ objectFit: "contain" }}
        />

        <CardContent>
          <Typography variant="h5" fontWeight="bold">{product.name}</Typography>
          <Typography variant="body2" color="text.secondary">{product.description}</Typography>
          <Typography variant="h6" color="primary" mt={1}>₹{product.price}</Typography>
          <Typography variant="body2" color={product.stock > 0 ? "green" : "red"} mt={1}>
            {product.stock > 0 ? `In Stock (${product.stock} available)` : "Out of Stock"}
          </Typography>
          <Chip label={product?.tags} sx={{ color: "green", mt: 1}}  />
          
          {/* Buttons */}
          <Stack direction="row" spacing={1} mt={2}>
            {product.videoUrl && (
              <Button variant="outlined" color="secondary" href={product.videoUrl} target="_blank">
                Watch Video
              </Button>
            )}
            {product.isAffiliateLink && (
              <Button variant="contained" color="primary" href={product.affiliateLink} target="_blank">
                Buy on {product.affiliateHost}
              </Button>
            )}
          </Stack>
        </CardContent>
      </Card>
  </Box>
  )
}

export default Product;