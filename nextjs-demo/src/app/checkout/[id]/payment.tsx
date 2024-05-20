'use client';

import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import Image from 'next/image';
import { ResponseError, ResponseSuccess } from '../../../../type';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import Spinner from '@/components/spinner';

type IProps = {
    price: string;
};

type Response = {
    payUrl: string;
    orderId: string;
};

export default function PaymentBtn({ price }: IProps) {
    const router = useRouter();
    const { mutate: onCheckout, isPending } = useMutation<
        ResponseSuccess<Response>,
        ResponseError
    >({
        mutationFn: async () => {
            const options = {
                method: 'POST',
                url: 'http://localhost:8080/payment',
                headers: {
                    'Content-Type': 'application/json',
                },
                data: {
                    amount: price,
                },
            };

            return await axios(options);
        },
        onSuccess: (res) => {
            console.log('res?.data?.statusCode', res?.data?.statusCode);

            if (res?.data?.statusCode === 201) {
                router.push(res?.data?.metadata?.payUrl);
            } else {
                toast.error(res?.data?.message);
            }
        },
        onError: (error) => {
            toast.error(
                error?.response?.data?.message ?? 'Some thing went wrong!'
            );
        },
    });

    return (
        <button
            disabled={isPending}
            onClick={() => onCheckout()}
            className='flex items-center gap-2 border border-white rounded-md text-white px-5 py-2'
        >
            {isPending && <Spinner />}
            <figure className='w-7 h-7 relative rounded-md'>
                <Image
                    src='/momo.png'
                    alt=''
                    fill
                    className=' object-cover rounded-md'
                />
            </figure>
            Payment with MoMo
        </button>
    );
}
