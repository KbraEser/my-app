import { Box, Card, CardContent, Grid, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import IconifyIcon from '../components/base/IconifyIcon';

function Home() {
  const navigate = useNavigate();

  const features = [
    {
      title: 'Müşteriler',
      description: 'Müşteri listesini görüntüle ve yönet',
      icon: 'mdi:account-group',
      path: '/customers'
    },
    {
      title: 'Ürünler',
      description: 'Ürün kataloğunu yönet',
      icon: 'mdi:package-variant',
      path: '/products'
    }
  ];

  return (
    <Box>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        {/* Hoş Geldin Bölümü */}
        <Box sx={{mt: 10, mb: 6, textAlign: 'center' }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Yönetim Paneline Hoş Geldiniz
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Müşterilerinizi ve ürünlerinizi kolayca yönetin
          </Typography>
        </Box>

        {/* Özellik Kartları */}
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 3
                  }
                }}
              >
                <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                  <IconifyIcon icon={feature.icon} fontSize={48} color="primary" />
                  <Typography variant="h5" component="h2" sx={{ mt: 2 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                    {feature.description}
                  </Typography>
                  <Button 
                    variant="contained" 
                    sx={{ mt: 3 }}
                    onClick={() => navigate(feature.path)}
                  >
                    Görüntüle
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Alt Bilgi */}
        <Box sx={{ mt: 6, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            © 2024 Yönetim Sistemi. Tüm hakları saklıdır.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Home;
