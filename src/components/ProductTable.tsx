import React, { useState, useEffect, useCallback } from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { ProductActionTypes, ProductFormFields } from './ProductForm';
import { visuallyHidden } from '@mui/utils';
import { v4 as uuidv4 } from 'uuid';
import {
  getProducts,
  deleteProductById,
  updateProductById,
  addNewProduct,
  Product,
} from '../apis/productsApis';
import { ProductForm } from './ProductForm';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { Link } from 'react-router-dom';
import { withAuthenticationRequired } from '@auth0/auth0-react';

interface Data {
  id: string;
  description: string;
  brand: string;
  model: string;
}

const descendingComparator = <T extends unknown>(
  a: T,
  b: T,
  orderBy: keyof T,
) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

type Order = 'asc' | 'desc';

const getComparator = <Key extends keyof any>(
  order: Order,
  orderBy: Key,
): ((
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number) => {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

const stableSort = <T extends unknown>(
  array: readonly T[],
  comparator: (a: T, b: T) => number,
) => {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'id',
    numeric: false,
    disablePadding: true,
    label: 'Product Id',
  },
  {
    id: 'description',
    numeric: false,
    disablePadding: false,
    label: 'Description',
  },
  {
    id: 'brand',
    numeric: false,
    disablePadding: false,
    label: 'Brand',
  },
  {
    id: 'model',
    numeric: false,
    disablePadding: false,
    label: 'Model',
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data,
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

const EnhancedTableHead = (props: EnhancedTableProps) => {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

interface EnhancedTableToolbarProps {
  numSelected: number;
  handleDelete: () => void;
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const { numSelected, handleDelete } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity,
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Product Management Console
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

const ProductTable = () => {
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof Data>('brand');
  const [selected, setSelected] = useState<string[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [productList, setProductList] = useState<Product[]>([]);
  const [modalAction, setModalAction] = useState<ProductActionTypes | null>(
    null,
  );
  const [filterType, setFilterType] = useState('');
  const [searchFilterTerm, setSearchFilterTerm] = useState('');
  let types = ['description', 'model', 'brand'];

  const loadProducts = useCallback(async () => {
    const result = await getProducts();
    setProductList(result);
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const handleDelete = async () => {
    const promises = selected.map((element) => {
      return deleteProductById(element);
    });
    await Promise.all(promises);
    setSelected([]);
    loadProducts();
  };

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = productList.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const closeProductModal = () => {
    setModalAction(null);
    setSelectedProduct(null);
  };

  const handleAddProduct = async ({
    description,
    brand,
    model,
  }: ProductFormFields) => {
    await addNewProduct({
      id: uuidv4(),
      description,
      model,
      brand,
    } as Product);
    setModalAction(null);
    setSelectedProduct(null);
    loadProducts();
  };

  const handleUpdateProduct = async ({
    description,
    brand,
    model,
  }: ProductFormFields) => {
    await updateProductById({
      productId: selectedProduct?.id as string,
      args: {
        id: uuidv4(),
        description,
        model,
        brand,
      },
    });
    setModalAction(null);
    setSelectedProduct(null);
    loadProducts();
  };

  const handleProductFilterSelect = (e: SelectChangeEvent) => {
    setFilterType(e.target.value);
  };

  const handleFilterClick = async () => {
    if (!filterType || !searchFilterTerm) {
      return;
    }
    const result = await getProducts({
      type: filterType,
      value: searchFilterTerm,
    });
    setProductList(result);
  };

  const handleReset = () => {
    setFilterType('');
    setSearchFilterTerm('');
    loadProducts();
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - productList.length) : 0;

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          handleDelete={handleDelete}
        />

        <TableContainer>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="space-between"
            sx={{ minHeight: '5rem' }}
          >
            <IconButton
              onClick={() => {
                setModalAction('ADD');
              }}
            >
              <Typography
                sx={{ display: 'flex', alignItems: 'center' }}
                color="inherit"
                variant="subtitle1"
                component="div"
              >
                <AddIcon /> Add a new product
              </Typography>
            </IconButton>
            <Stack direction="row" spacing={1} alignItems="center">
              <FormControl>
                <InputLabel id="product-filter-select">Filter Type</InputLabel>
                <Select
                  id="product-filter-select"
                  value={filterType}
                  label="filterTypes"
                  onChange={handleProductFilterSelect}
                  sx={{ width: '12rem', height: '3rem' }}
                >
                  {types.map((type) => {
                    return <MenuItem value={type}>{type}</MenuItem>;
                  })}
                </Select>
              </FormControl>
              <TextField
                size="small"
                value={searchFilterTerm}
                onChange={(e) => setSearchFilterTerm(e.target.value)}
                id="search-filter-term"
              />

              <Button variant="contained" onClick={handleFilterClick}>
                Filter
              </Button>
              <Button variant="contained" onClick={handleReset}>
                Reset
              </Button>
            </Stack>
          </Stack>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={productList.length}
            />
            <TableBody>
              {stableSort(productList, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                        align="left"
                        sx={{ width: '20%' }}
                      >
                        <Link
                          to={row.id}
                          style={{ textDecoration: 'none', color: 'black' }}
                        >
                          {row.id}
                        </Link>
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{ width: '30%', overflow: 'hidden' }}
                      >
                        {row.description}
                      </TableCell>
                      <TableCell align="left">{row.brand}</TableCell>
                      <TableCell align="left">{row.model}</TableCell>
                      <TableCell padding="checkbox">
                        <IconButton
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedProduct(row);
                            setModalAction('EDIT');
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}

              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={productList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />

        <Dialog open={modalAction === 'ADD'} onClose={closeProductModal}>
          <DialogTitle>Add Product</DialogTitle>
          <DialogContent sx={{ mt: 1 }}>
            <ProductForm
              onSubmit={handleAddProduct}
              formId={'AddProductFormId'}
              onCancel={closeProductModal}
            />
          </DialogContent>
        </Dialog>
        <Dialog open={modalAction === 'EDIT'} onClose={closeProductModal}>
          <DialogTitle>Edit product details</DialogTitle>
          <DialogContent sx={{ mt: 1 }}>
            <ProductForm
              onSubmit={handleUpdateProduct}
              formId={'UpdateProductFormId'}
              product={selectedProduct as Product}
              onCancel={closeProductModal}
            />
          </DialogContent>
        </Dialog>
        <Typography sx={{ p: 2 }}>
          * To view individual product details, click on a Product Id
        </Typography>
      </Paper>
    </Box>
  );
};

export default withAuthenticationRequired(ProductTable, {
  onRedirecting: () => <div>loading...</div>,
});
