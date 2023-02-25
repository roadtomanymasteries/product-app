import { useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Product } from '../apis/productsApis';
import TextField from '@mui/material/TextField';
import { v4 as uuidv4 } from 'uuid';

export interface ProductFormProps {
  formId?: string;
  loading?: boolean;
  product?: Product;
  onSubmit: (formValues: ProductFormFields) => Promise<void>;
  onCancel: () => void;
}

export type ProductActionTypes = 'ADD' | 'EDIT';

export interface ProductFormFields {
  id: string;
  description: string;
  brand: string;
  model: string;
}

export const ProductForm = ({
  formId,
  product,
  onSubmit,
  onCancel,
}: ProductFormProps) => {
  const { register, handleSubmit } = useForm<ProductFormFields>({
    defaultValues: {
      id: uuidv4(),
      description: product?.description,
      brand: product?.brand,
      model: product?.model,
    },
  });

  return (
    <form id={formId}>
      <Stack spacing={2}>
        <TextField
          {...register('description')}
          autoFocus
          margin="dense"
          id="description"
          label="Description"
          type="text"
          fullWidth
          variant="standard"
        />
        <TextField
          {...register('brand')}
          autoFocus
          margin="dense"
          id="brand"
          label="Brand"
          type="text"
          fullWidth
          variant="standard"
        />
        <TextField
          {...register('model')}
          autoFocus
          margin="dense"
          id="model"
          label="Model"
          type="text"
          fullWidth
          variant="standard"
        />
        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={handleSubmit(onSubmit)}> Submit</Button>
      </Stack>
    </form>
  );
};
