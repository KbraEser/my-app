import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export interface Variant {
  id: number;
  productId: number;
  code: string;
  name: string;
  barcode: string;
  model: string;
  criticalStockLevel: number;
  imgUrl: string;
  isActive: boolean;
}

export interface Stoks {
  model: string;
  criticalStockLevel: number;
  stockQuantity: number;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  vatRate: number;
  categoryName: string;
  categoryId: number;
  variants: Variant[];
  isActive: boolean;
  stoks: Stoks[];
}

interface ProductProps {
  product: Product;
}

function Product({ product }: ProductProps) {
  const dispatch = useDispatch<AppDispatch>();
  const {
    id,
    name,
    description,
    price,
    vatRate,
    categoryName,
    variants,
    isActive,
    stoks,
  } = product;

  return (
    <Card sx={{ minWidth: 275, m: 2 }}>
      <CardContent>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Grid item>
            <Typography variant="h5" component="div">
              {name}
            </Typography>
          </Grid>
          <Grid item>
            <IconButton color="primary" size="small">
              <EditIcon />
            </IconButton>
            <IconButton color="error" size="small">
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>

        <Typography color="text.secondary" gutterBottom>
          {description}
        </Typography>

        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="body2" color="text.secondary">
              Fiyat
            </Typography>
            <Typography variant="h6">
              {price.toLocaleString("tr-TR", {
                style: "currency",
                currency: "TRY",
              })}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="body2" color="text.secondary">
              KDV Oranı
            </Typography>
            <Typography variant="h6">%{vatRate}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="body2" color="text.secondary">
              Kategori
            </Typography>
            <Typography variant="h6">{categoryName}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="body2" color="text.secondary">
              Durum
            </Typography>
            <Chip
              label={isActive ? "Aktif" : "Pasif"}
              color={isActive ? "success" : "error"}
              size="small"
            />
          </Grid>
        </Grid>

        <Accordion sx={{ mt: 2 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Varyantlar</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TableContainer component={Paper}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Model</TableCell>
                    <TableCell>Barkod</TableCell>
                    <TableCell>Kritik Stok</TableCell>
                    <TableCell>Durum</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {variants.map((variant) => (
                    <TableRow key={variant.id}>
                      <TableCell>{variant.model}</TableCell>
                      <TableCell>{variant.barcode}</TableCell>
                      <TableCell>{variant.criticalStockLevel}</TableCell>
                      <TableCell>
                        <Chip
                          label={variant.isActive ? "Aktif" : "Pasif"}
                          color={variant.isActive ? "success" : "error"}
                          size="small"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </AccordionDetails>
        </Accordion>

        <Accordion sx={{ mt: 1 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Stok Durumu</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TableContainer component={Paper}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Model</TableCell>
                    <TableCell>Stok Miktarı</TableCell>
                    <TableCell>Kritik Stok Seviyesi</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {stoks.map((stok, index) => (
                    <TableRow key={index}>
                      <TableCell>{stok.model}</TableCell>
                      <TableCell>{stok.stockQuantity}</TableCell>
                      <TableCell>{stok.criticalStockLevel}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </AccordionDetails>
        </Accordion>
      </CardContent>
    </Card>
  );
}

export default Product;
