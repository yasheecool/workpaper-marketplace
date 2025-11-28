'use client';
import LabelText from '@/components/input/LabelText';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSendVendorRequest } from '@/hooks/react-query/firm';
import { toast } from 'react-toastify';

const formSchema = z.object({
  contactEmail: z.string().email('Invalid email address'),
  contactPhone: z.string().min(1, 'Phone number is required'),
});

type FormType = z.infer<typeof formSchema>;

const RequestForm = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormType>({
    resolver: zodResolver(formSchema),
  });

  const { mutate: sendVendorRequest } = useSendVendorRequest();

  const onSubmit = async (data: FormType) => {
    try {
      const formData = { ...data };
      sendVendorRequest(formData, {
        onSuccess: () => {
          toast.success('Vendor request submitted successfully!');
        },
      });

      reset(); // Reset the form after successful submission
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  return (
    <form
      className='flex flex-col gap-6'
      onSubmit={handleSubmit(onSubmit, (errors) => console.error(errors))}
    >
      <LabelText
        label={'Email'}
        type='input'
        required={true}
        register={register}
        name='contactEmail'
      />
      <LabelText
        label={'Phone Number'}
        type='input'
        required={true}
        register={register}
        name='contactPhone'
      />

      <button
        className='bg-secondary-500 text-white btn hover:bg-secondary-700'
        type='submit'
      >
        Submit
      </button>
    </form>
  );
};
export default RequestForm;
