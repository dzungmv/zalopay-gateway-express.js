'use client';
import { useMutation } from '@tanstack/react-query';
import { redirect, useRouter } from 'next/navigation';
import { ResponseError, ResponseSuccess } from '../../../type';
import axios from 'axios';
import { toast } from 'sonner';
import Spinner from '@/components/spinner';
import { useEffect } from 'react';

type Iprops = {
    searchParams: Record<string, number | string>;
};

export default function Checking({ searchParams }: Iprops) {
    const router = useRouter();

    if (!searchParams?.apptransid) {
        redirect('/');
    }

    const { mutate: onChecking } = useMutation<
        ResponseSuccess<{}>,
        ResponseError
    >({
        mutationFn: async () => {
            const options = {
                method: 'POST',
                url: 'http://localhost:8080/checking-payment',
                headers: {
                    'Content-Type': 'application/json',
                },
                data: {
                    app_trans_id: searchParams.apptransid,
                },
            };

            return await axios(options);
        },
        onSuccess: (response) => {
            if (response?.data?.statusCode === 200) {
                toast.success('Buying product successfully!');
                router.push('/');
            } else {
                toast.error(response?.data?.message);
            }
        },
        onError: (error) => {
            toast.success(
                error?.response?.data?.message ?? 'Some thing went wrong!'
            );
            router.push('/');
        },
    });

    useEffect(() => {
        if (!!searchParams?.apptransid) {
            onChecking?.();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams?.apptransid]);

    return (
        <section className='h-screen w-full flex items-center justify-center gap-2'>
            <Spinner />
            Please wait a minute...
        </section>
    );
}
