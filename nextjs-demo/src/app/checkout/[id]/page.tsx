import dummy from '@/components/dummy.json';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import PaymentBtn from './payment';

type IProps = {
    params: {
        id: string;
    };
};

export default function Checkout(props: IProps) {
    const { id } = props?.params ?? {};

    const findSong = dummy.find((item) => item.id.toString() === id);

    if (!findSong) {
        notFound();
    }

    return (
        <>
            <section className=' relative z-[1] mt-24 mx-auto max-w-[700px] gap-7 flex flex-col items-center'>
                <figure className='w-[400px] h-[300px] relative rounded-md'>
                    <Image
                        src={findSong.thumnail}
                        alt=''
                        fill
                        className=' object-cover rounded-md'
                    />
                </figure>

                <p className='text-white text-3xl font-medium'>
                    {findSong.artist}
                </p>

                <p className='text-white text-2xl'>
                    {findSong.price.toLocaleString()}
                </p>

                <PaymentBtn price={findSong.price.toString()} />
            </section>

            <div className=' absolute inset-0 bg-clip-content backdrop-blur-[80px] backdrop-filter'></div>

            <div className=' absolute inset-0 z-[-2]'>
                <Image
                    src={findSong.thumnail}
                    alt=''
                    fill
                    className=' object-cover rounded-md'
                />
            </div>
        </>
    );
}
